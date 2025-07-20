import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import axios from "axios";
import TableFooter from "../TableFooter/TableFooter";
import BaseUrl from "../../../data/contants";
// import { meta } from "../../../data/Jsons/acc/mng/chartOfAccounts/ChartOfAccounts";
function EntryTable(props, ref) {
  //Token from login request
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);

  // const Dbcr = useSelector((state) => state.user.user.data.PhsCodes.PhsDbcr);
  // const Status = useSelector(
  //   (state) => state.user.user.data.PhsCodes.PhsStatus
  // );
  // const Type = useSelector((state) => state.user.user.data.PhsCodes.PhsType);
  // const PhStatusSetting = useSelector(
  //   (state) => state.user.user.data.PhsCodes.PhsStatus
  // );
  // const Statusoptions = PhStatusSetting.map((setting) => ({
  //   value: setting.id,
  //   label: setting.name,
  // }));
  // const dbcR = Dbcr.map((setting) => ({
  //   value: setting.id,
  //   label: setting.name,
  // }));
  // const aType = Type.map((setting) => ({
  //   value: setting.id,
  //   label: setting.name,
  // }));
  // const sectionOptions = {
  //   status: Statusoptions,
  //   dbcR: dbcR,
  //   aType: aType,
  // };

  useImperativeHandle(ref, () => ({
    prepareDataForPost,
    preSubmit,
    resetCorrespondingField,
    resetRowsAndData,
    deletedRows,
    setRows,
    prepareDataForPut,
    validatedRow,
  }));

  const meta = props.meta;
  const rows = props.rows;
  const setRows = props.setRows;
  const sectionOptions = props.sectionOptions;
  const rate = props?.rate;
  const setRate = props?.setRate;
  const resetCorrespondingField = props?.resetCorrespondingField;

  //state to store in it the field that we type in
  const [activeInput, setActiveInput] = useState(null);
  //state to store autoComplete option
  const [options, setOptions] = useState([]);
  //state to store id of the row
  const [hoveredRowId, setHoveredRowId] = useState(null);
  //state to store the id of the deleted Row
  const [deletedRows, setDeletedRows] = useState([]);
  //state to store id of the row and increse it row by row
  const [lastId, setLastId] = useState(1);

  const [child, setChild] = useState(() => {
    return meta.Column.reduce((acc, field) => {
      if (field) {
          acc[field.field] = field.defValue;
          acc[field.rfield] = field.defValue;
      }
      return acc;
    }, {});
  });

  function formatDate(date) {
    if (!date || isNaN(date.getTime())) {
      return "";
    }
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleAutoComplete = async (event, field) => {
    const { value } = event.target;
    if (value.length > 0) {
      try {
        const baseUrl = BaseUrl.slice(0, -1);
        const url = baseUrl + field.ajaxURL;
        const headers = {
          Authorization: `Bearar ${PhToken}`,
          "Content-Type": "application/json",
        };
        let requestBody;
        if (field.hasOwnProperty("needValue")) {
          requestBody = {
            term: value,
            [field.needValue] : parseFloat(props.inputs[field.ValueforAutoComplete]),
          };
        } else {
          requestBody = {
            term: value,
          };
        }
        console.log(requestBody);
        const response = await axios.post(url, requestBody, {
          headers,
        });
        const optionsArray = response.data.data.List;
        setOptions(optionsArray);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching auto-complete data:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error", error.message);
        }
      }
    }
  };

  const handleInputChange = (event, rowId, colId) => {
    // console.log(event);
    const { id, value } = event.target;
    const field = meta.Column[colId];
    if (!field) {
      console.error("Field not found for id:", id);
      return;
    }
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    setHoveredRowId(rowId);
    if (rowIndex !== -1) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        if (field.isAutocomplete) {
          updatedRows[rowIndex][field.rfield] = value;
          handleAutoComplete(event, field);
        }
        if (!field.isAutocomplete) {
          updatedRows[rowIndex][field.field] = value;
          if (field.callBack && field.callBack.onchange) {
            console.log('has callback');
            eval(field.callBack.onchange)(event, field, rowIndex, rate);
          }
          if (field.aggregate) {
            aggValues();
          }
        }
        aggValues();
        return updatedRows;
      });
    }
  };

  const handleDateChange = (date, rowIndex, colField) => {
    console.log(date);
    setRows((prevRows) => {
      // Create a copy of the previous rows
      const updatedRows = [...prevRows];
      // Find the row to be updated
      const rowToUpdate = updatedRows.find((row, index) => index === rowIndex);
      // Update the date field of the row
      if (rowToUpdate) {
        rowToUpdate[colField] = date;
      }
      // Return the updated rows
      return updatedRows;
    });
  };

  const handleOptionSelect = (optionValue, optionLabel, field, rowId) => {
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[rowIndex][field.rfield] = optionLabel;
        updatedRows[rowIndex][field.field] = optionValue;
        return updatedRows;
      });
      setOptions([]);
    }
  };

  const handleOptionHover = (event, option, rowId) => {
    console.log("handleOptionHover called with:", { event, option, rowId });
    const field = meta.Column.find((f) => f.field === activeInput);
    if (!field) {
      console.error("Field not found for activeInput:", activeInput);
      return;
    }
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    console.log("rwoIndex:", rowIndex);
    if (rowIndex !== -1) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        console.log("Updating row:", rowIndex, "with option:", option);
        updatedRows[rowIndex][field.rfield] = option.label;
        updatedRows[rowIndex][field.field] = option.value;
        console.log("Updated rows:", updatedRows);
        return updatedRows;
      });

      if (field.hasOwnProperty("callback")) {
        (async () => {
          await field.callback.onchange(
            PhToken,
            option.value,
            props.setNewOption,
            props.setInputs,
            props.inputs,
            rows,
            setRows,
            rowId
          );
        })();
      }
    } else {
      console.error("Row not found for rowId:", rowId);
    }
  };

  function validatedRow() {
    rows.forEach((row) => {
      meta.Column.forEach((column, colId) => {
        const missingFieldsInRow = meta.Column.reduce((acc, column) => {
          if (
            column.isRequired &&
            (row[column.field] === undefined || row[column.field] === "")
          ) {
            acc[column.field] = true;
          }
          return acc;
        }, {});
        props.setMissingFieldsInRow(missingFieldsInRow);
        if (Object.keys(missingFieldsInRow).length > 0) {
          console.error(
            "Please fill all required fields:",
            Object.keys(missingFieldsInRow).join(", ")
          );
          return;
        }
      });
    });
    if (props.missingFieldsInRow.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function prepareDataForPost(rows, meta) {
    const preparedData = [];
    props.rows.forEach((row) => {
      const rowData = {};
      console.log(row);
      meta.Column.forEach((column, colId) => {
        rowData["id"] = 0;
        if (column.type === "date") {
          const date = new Date(row[column.field]);
          if (!date || isNaN(date.getTime())) {
            rowData[column.field] = "";
          } else {
            console.log(`Original date: ${date}`);
            const formattedDate = formatDate(date);
            console.log(`Formatted date: ${formattedDate}`);
            rowData[column.field] = formattedDate;
            console.log("after submit:", rowData[column.field]);
          }
        }
        if (row[column.field] === undefined && column.type !== "date") {
          console.log(row[column.field] === undefined);
          rowData[column.field] = child[column.field];
        }
        if (row[column.field] !== undefined && column.type !== "date") {
          rowData[column.field] = row[column.field];
        }
      });
      preparedData.push(rowData);
    });
    return preparedData;
  }

  function prepareDataForPut(rows, meta) {
    const preparedData = [];
    props.rows.forEach((row) => {
      const rowData = {};
      meta.Column.forEach((column, colId) => {
        if (column.type === "date") {
          //done
          const date = new Date(row[column.field]);
          if (!date || isNaN(date.getTime())) {
            rowData[column.field] = "";
          } else {
            console.log(`Original date: ${date}`);
            const formattedDate = formatDate(date);
            console.log(`Formatted date: ${formattedDate}`);
            rowData[column.field] = formattedDate;
            console.log("after submit:", rowData[column.field]);
          }
        }
        if (row[column.field] === undefined && column.type !== "date") {
          console.log("fieldhidden", child[column.field]);
          rowData[column.field] = child[column.field];
        } else if (row[column.field] !== null && column.type !== "date") {
          rowData[column.field] = row[column.field];
        }
      });
      preparedData.push(rowData);
    });
    return preparedData;
  }

  const preSubmit = () => {
  return true;
  };

  const resetRowsAndData = () => {
    setRows([]);
    setLastId(0);
  };
  // const updateInputsWithResponse = (responseData) => {
  //   // console.log('res',responseData.data);
  //   //here we make sure the response have something that called aList which have the data that i passed form the handle pager search if it does have aList that means that i have date in Row
  //   if (responseData.data.data.hasOwnProperty("List")) {
  //     const updatedRows = [];
  //     responseData.data.data.List.forEach((item, index) => {
  //       // console.log(item);
  //       const newRow = {};
  //       Object.keys(item).forEach((key) => {
  //         // console.log('key',key);
  //         //here we store the id of the response
  //         newRow["id"] = item["id"];
  //         //then we find the column in my Json file
  //         const field = meta.Column.find((field) => field.field === key);
  //         //if there is a field
  //         if (field) {
  //           // and the type of it is select
  //           if (field.type === "select") {
  //             //then we declare a var called matchingOption then we make the value of it the sectionOption which gave it the key which is field.options
  //             const matchingOption = sectionOptions[field.options].find(
  //               //then we took the option of it and make it value of the value that came form the Api
  //               (option) => option.value === item[key]
  //             );
  //             //after that if i have matchingOption that match with i have option in my column
  //             if (matchingOption) {
  //               //we make the value of it to be in the value of out select option in our column
  //               // newRow[field.defLabel] = matchingOption.label;
  //               newRow[field.field] = matchingOption.value;
  //             }
  //           }

  //             newRow[field.field] = item[key];
  //             newRow[field.rfield] = item[field.rfield];

  //         }
  //       });
  //       updatedRows.push(newRow);
  //     });
  //     //after update the value of the rows after get the data then we store the rows whith getten data to show it to the user and make him update if he want
  //     setRows(updatedRows);
  //     // console.log("Rows", rows);
  //   }
  // };

  // const getTree = async () => {
  //   try {
  //     const url = "http://localhost:9090/smb/api/UC/Acc/Account/List";
  //     const headers = {
  //       periodId: "2022",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${PhToken}`,
  //       "Content-Type": "application/json",
  //     };
  //     console.log(headers);
  //     const response = await axios.post(url, [], {
  //       headers: headers,
  //     });
  //     // console.log("response:", response);
  //     updateInputsWithResponse(response);
  //   } catch (error) {
  //     console.error("Error fetching new store data:", error);
  //     if (error.response) {
  //       console.error("Response data:", error.response.data);
  //       console.error("Response status:", error.response.status);
  //       console.error("Response headers:", error.response.headers);
  //     } else if (error.request) {
  //       console.error("No response received:", error.request);
  //     } else {
  //       console.error("Error", error.message);
  //     }
  //     console.error(error.config);
  //   }
  // };

  const deleteRowById = (rowId) => {
    console.log(rowId);
    setRows((prevRows) => {
      // Find the row to be deleted
      const rowToDelete = prevRows.find((row) => row.id === rowId);
      console.log("row to delete", rowToDelete.id);
      // If the row exists, add it to the deletedRows array
      if (rowToDelete) {
        setDeletedRows((prevDeletedRows) => [
          ...prevDeletedRows,
          rowToDelete.id,
        ]);
        aggValues();
      }
      // Filter out the row to be deleted
      const newRows = prevRows.filter((row) => row.id !== rowId);
      console.log("Filtered Rows:", newRows);
      return newRows;
    });
  };

  const addNewRow = () => {
    setLastId((prevId) => prevId + 1);
    setRows((prevRows) => [...prevRows, { id: lastId }]);
  };

  const aggValues = () => {
    meta.Column.forEach((col, colId) => {
      let total = 0;
      const field = col;
      rows.forEach((row) => {
        if (
          field &&
          field.hasOwnProperty("aggregate") &&
          field.hasOwnProperty("footerValue")
        ) {
          if (field.aggregate === "sum") {
            total += parseFloat(row[field.field]);
          } else if (field.aggregate === "max") {
            const currentValue = parseFloat(row[field.field]);
            if (isNaN(total) || currentValue > total) {
              total = currentValue;
            }
          } else if (field.aggregate === "min") {
            const currentValue = parseFloat(row[field.field]);
            if (isNaN(total) || currentValue < total) {
              total = currentValue;
            }
          } else if (field.aggregate === "avg") {
            total += parseFloat(row[field.field]);
          } else {
            total = eval(field.aggregate)(rows);
          }
        }
      });

      if (field.hasOwnProperty("footerValue")) {
        col.footerValue = total;
      }
    });
  };
  // useEffect(() => {
  //   getTree();
  // }, []);
  aggValues();
  return (
    <div class="row pt-2">
      <div class="col-12">
        <div id="phTable" style={{ overflowX: "auto", width: "100%" }}>
          <div
            class="ph-table-header"
            style={{ width: "2115px", display: "flex" }}
          >
            <div style={{ width: "31px" }}>
              <span
                id="phTable-PhTable-addRow"
                class="btn btn-sm btn-primary font-weight-bolder btn-phTable-PhTable-addRow text-uppercase pl-3 pr-2"
                data-tableid="phTable-PhTable"
                title="New Row"
                data-bs-title="New Row"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                onClick={()=>addNewRow()}
              >
                <i class="bi bi-plus-lg"></i>
              </span>
            </div>
            <div
              id="head-phTable-PhTable-0"
              style={{ width: "35px" }}
              class="ph-table-col float-left border border-1 text-center p-1"
            >
              <i class="icon flaticon-delete p-0"></i>
            </div>
            {meta.Column.filter((col) => col.type !== "hidden").map(
              (col, colIndex) => {
                return (
                  <div
                    id={`${col.id}`}
                    style={{ width: `${col.width}` }}
                    class={`${col.labelClass}`}
                  >
                    {col.title}
                  </div>
                );
              }
            )}
          </div>
          <div
            class="ph-table-body"
            style={{
              width: "2135px",
              maxHeight: "40vh",
              height: "40vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {rows.map((row, rowIndex) => {
              return (
                <form
                  id="StoreTable"
                  class={`${
                    Object.keys(props.missingFieldsInRow).length > 0
                      ? "was-validated"
                      : ""
                  }`}
                >
                  <div
                    class="ph-table-row ph-table-row-even align-items-center"
                    style={{ width: "2115px", display: "flex" }}
                  >
                    <div
                      style={{ width: "31px" }}
                      class="ph-table-cell p-0 text-center"
                    >
                      {rowIndex}
                    </div>
                    <div style={{ width: "35px" }} class="ph-table-cell p-0">
                      <button
                        class="btn btn-sm btn-danger delrow cell-phTable-PhTable p-1"
                        id="phTable-PhTable-0-0"
                        tabindex="1"
                        data-field="delrow"
                        data-tid="phTable-PhTable"
                        data-row="0"
                        data-col="0"
                        onClick={() => deleteRowById(row.id)}
                      >
                        <i class="bi bi-trash p-1"></i>
                      </button>
                    </div>
                    {meta.Column.map((col, colIndex) => {
                      return (
                        <>
                          {col.type !== "hidden" && (
                            <>
                              {col.type === "select" &&
                              sectionOptions[col.options] ? (
                                <div
                                  style={{ width: `${col.width}` }}
                                  class="ph-table-cell p-0"
                                >
                                  <select
                                    class={`${col.inputClass}`}
                                    type={`${col.type}`}
                                    id={`${col.id}`}
                                    enabled={`${col.enabled}`}
                                    tabindex={`${col.tabindex}`}
                                    required={`${col.isRequired}`}
                                    data-field={`${col.field}`}
                                    data-tid="phTable-PhTable"
                                    value={row[col.field]}
                                    data-row="0"
                                    data-col={`${colIndex}`}
                                    style={{ width: "100% important" }}
                                    onChange={(event) =>
                                      handleInputChange(event, row.id, colIndex)
                                    }
                                  >
                                     <option selected value=''></option>
                                    {sectionOptions[col.options].map(
                                      (option, optionIndex) => (
                                        <>
                                       
                                          <option
                                            key={optionIndex}
                                            id={option.rate}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        </>
                                      )
                                    )}
                                  </select>
                                </div>
                              ) : (
                                <div
                                  style={{ width: `${col.width}` }}
                                  class="ph-table-cell p-0"
                                >
                                  {col.type === "date" ? (
                                    <DatePicker
                                      id={`${col.id}`}
                                      required={col.isRequired}
                                      className={`${col.inputClass} ${
                                        props.missingFieldsInRow[col.element]
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      selected={rows[rowIndex][col.field]}
                                      dateFormat="dd-MM-yyyy"
                                      locale="en-GB"
                                      isClearable="true"
                                      onChange={(date) =>
                                        handleDateChange(
                                          date,
                                          rowIndex,
                                          col.field
                                        )
                                      }
                                    />
                                  ) : (
                                    <input
                                      className={`${col.inputClass} ${
                                        props.missingFieldsInRow[col.element]
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      type={`${col.type}`}
                                      id={`PhTable-${rowIndex}-${colIndex}`}
                                      tabindex={`${col.tabindex}`}
                                      required={col.isRequired}
                                      value={
                                        col.isAutocomplete
                                          ? rows[rowIndex][col.rfield]
                                          : rows[rowIndex][col.field] ||
                                            child[col.field]
                                      }
                                      data-field={`${col.field}`}
                                      data-tid="phTable-PhTable"
                                      data-row="0"
                                      data-col={`${colIndex}`}
                                      disabled={col.disable}
                                      onChange={(event) =>
                                        handleInputChange(
                                          event,
                                          row.id,
                                          colIndex
                                        )
                                      }
                                      onFocus={() => {
                                        setActiveInput(col.field);
                                      }}
                                      onBlur={() => {
                                        setActiveInput(null);
                                        setOptions([]);
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {col.isAutocomplete &&
                                activeInput === col.field &&
                                row.id === hoveredRowId && (
                                  <div className="autocomplete-options">
                                    {activeInput === col.field &&
                                      options.map((option, index) => {
                                        console.log(option);
                                        return (
                                          <div
                                            key={index}
                                            className="autocomplete-option"
                                            onClick={() => {
                                              handleOptionSelect(
                                                option.value,
                                                option.label,
                                                col,
                                                row.id
                                              );
                                            }}
                                            onMouseEnter={(e) =>
                                              handleOptionHover(
                                                e,
                                                option,
                                                row.id
                                              )
                                            }
                                          >
                                            {option.label}
                                          </div>
                                        );
                                      })}
                                  </div>
                                )}
                            </>
                          )}
                        </>
                      );
                    })}
                  </div>
                </form>
              );
            })}
          </div>
          <TableFooter
            meta={meta}
            rows={rows}
            rowLength={rows.length}
          ></TableFooter>
        </div>
      </div>
    </div>
  );
}
export default forwardRef(EntryTable);
