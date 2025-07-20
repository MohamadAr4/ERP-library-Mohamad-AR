import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import PhFOperations from "../../data/operation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import EntryTable from "../MasterTransaction/EntryTable/EntryTable";
import { meta } from "../../data/Jsons/acc/DailyJournal/DailyJournal";
import { NavItem } from "react-bootstrap";
import BaseUrl, { PeriodId } from "../../data/contants";
function EntryBlock(props, ref) {
  //Out Token for Api Calls
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const tableRef = useRef(null);

  useImperativeHandle(ref, () => ({
    isUpdateDone,
    setIsUpdateDone,
    setIsAddNotDone,
    prepareDataForPost,
    isError,
    setIsError,
    handleSubmit,
    handelUpdate,
    resetRowsAndData,
  }));
  let aFields = props.aFields.Fields;
  let af = props.aFields;

  //state to store in it the field that we type in
  const [activeInput, setActiveInput] = useState(null);
  //state to check if the Add is Done successfully
  const [isDone, setIsDone] = useState(false);
  //state to check if the Add is Faild
  const [isError, setIsError] = useState(false);
  const [isAddNotDone, setIsAddNotDone] = useState(false);
  //state to check if the Update is Done successfully
  const [isUpdateDone, setIsUpdateDone] = useState(false);
  //state to store the field which is required and we didnt wirte anything in it
  const [missingFields, setMissingFields] = useState({});
  //state to store autoComplete option
  const [options, setOptions] = useState([]);
  //state to store the field which is required in we didnt wirte anything in it but in each row
  const [missingFieldsInRow, setMissingFieldsInRow] = useState({});

  //function to reset every thing in Rows in MT Pages
  const resetRowsAndData = () => {
    //here we call a function by the ref in MT component to reset everything
    tableRef.current?.resetRowsAndData();
  };
  //function to handle what is changing when i type in each field either if the field req or Not
  const handleInputChange = (event) => {
    console.log(event.target);
    //first of all when can get form the event the value of the input and the id
    const { id, value } = event.target;
    //then we find this field which we write in , in the Json file
    const field = aFields.find((f) => f.element === id);
    console.log(field);
    //we found it =>> then we check if the field is AutoComplete or Not
    if (field.Form.isAutocomplete) {
      //if it is AutoComplete then we make a copy on each input that we have and then add the updated input that we change
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        // we store the value in (Key:Value) the key will be the elemnt of each field which is uniqe
        [field.element]: value,
        [field.rElement]: value,
      }));
      //then we call the handleAutoComplete function which return the option that i can select
      handleAutoComplete(event, field);
    }
    //if it is not AutoColmplete then we dont have to call the function so we just store the value which we type in
    else if (!field.Form.isAutocomplete) {
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        [field.element]: value,
        [field.rElement]: value,
        [field.field]: value,
      }));
    }
    if (field.Form.hasOwnProperty("callback")) {
      field.Form.callback.onchange(
        event,
        [event.target.selectedIndex],
        props.inputs,
        props.setInputs,
        props.rows,
        props.setRows
      );
    }
  };
  //function to handel the date changing
  const handleDateChange = (date, field) => {
    console.log(date.toDateString());
    props.setInputs((prevInputs) => ({
      ...prevInputs,
      [field.element]: date,
    }));
  };
  //if the field is AC we call the function and pass to it the event and the entire field which we type in
  const handleAutoComplete = async (event, field) => {
    //first of all we catch the value of our event
    const { value } = event.target;
    //then we chech if the value it is not Empty
    if (value.length > 0) {
      //if it is Not we make an Api call to return the Option
      try {
        const baseUrl = BaseUrl.slice(0, -1);
        const url = baseUrl + field.Form.autocomplete.data_acoperation;
        const headers = {
          Authorization: `Bearar ${PhToken}`,
          "Content-Type": "application/json",
        };
        //here we use axios for Api calls which takes by order (url,body,header)
        let requestBody;
        if (field.Form.hasOwnProperty("needValue")) {
          requestBody = {
            term: value,
            [field.Form.needValue]: parseFloat(
              props.inputs[field.Form.ValueforAutoComplete]
            ),
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
        console.log(response);

        //here we make the value of the optionsArray to the List which is return form the Api call
        const optionsArray = response.data.data.List;
        //then we setState the Option to the Option state which we declare at first
        setOptions(optionsArray);
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

  //function to handle the selection of the option AC
  const handleOptionSelect = (option) => {
    //we pass the value of the option and the label and the field that we write in
    const field = aFields.find((f) => f.element === activeInput);
    if (field) {
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        [field.rElement]: option.label,
        [field.element]: option.value,
      }));
    }

    if (field.Form.hasOwnProperty("callback")) {
      (async () => {
        await field.Form.callback.onchange(
          PhToken,
          option.value,
          props.setNewOption,
          props.setInputs,
          props.inputs,
          tableRef.current?.rows,
          tableRef.current?.setRows
        );
      })();
    }

    setActiveInput(null);
    setOptions([]);
    //after we choose we clear the array of the option that we created
    //then we remove the active of the field);
  };
  //function to select the option when we hover on the option AC
  const handleOptionHover = (option) => {
    //we pass the option to the function and then we make sure that the field we type in , in the Json file
    const field = aFields.find((f) => f.element === activeInput);
    if (field) {
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        [field.rElement]: option.label,
        [field.element]: option.value,
      }));
    }

    if (field.Form.hasOwnProperty("callback")) {
      (async () => {
        await field.Form.callback.onchange(
          PhToken,
          option.value,
          props.setNewOption,
          props.setInputs,
          props.inputs
        );
      })();
    }
  };
  //function to make the Api call to Add any thing (New)
  const handleSubmit = async () => {
    //first of all we make sure if all the required fields are not empty
    //by making var called missing and make the value of it the element of the empty required field
    const missing = aFields.reduce((array, field) => {
      //two condition first is the field is required then make sure if it's empty or not
      if (
        field.isForm &&
        field.Form.isRequired &&
        props.inputs[field.element] === ""
      ) {
        array[field.element] = true;
      }
      return array;
    }, {});
    //then we make the missingField array state to have the value of the missing
    setMissingFields(missing);
    //then we call function in MT validatedRow to make sure that every required column of each row is not empty
    tableRef.current?.validatedRow();
    if (Object.keys(missing).length > 0 || tableRef.current?.validatedRow()) {
      console.error(
        "Please fill all required fields:",
        Object.keys(missing).join(", ")
      );
      return;
    }
    //here if we  have some condition before sumbit we check on it then we make the api call
    if (
      (!tableRef.current?.preSubmit || tableRef.current.preSubmit()) &&
      props.preInsert()
    ) {
      try {
        const url = `${props.aFields.URLS.New.URl}`;
        const headers = {
          periodId: PeriodId,
          Accept: "application/json",
          Authorization: `Bearer ${PhToken}`,
          "Content-Type": "application/json",
        };
        console.log(headers);
        const response = await axios.post(
          url,
          JSON.stringify(prepareDataForPost()),
          {
            headers: headers,
          }
        );
        console.log("response:", response);
        //here we pass the response of the api call to make sure if the response status is true or not
        handleSuccessAdd(response);
        //here we check if the status is true
        if (response.data.status === true) {
          //make the isDone state to true to show us message which tells us that the add is done
          setIsDone(true);
          //after every success add we get insertedId so we store it in state
          props.setInsertedId(response.data.data.InsertedId);
          console.log("insertedId:", props.insertedId);
          //as you remmember we make is done true to show message if we leave it like this the message will show for ever so you make setTimeout to change the value of it after 5 sec to false to make the message disappear
          setTimeout(() => {
            setIsDone(false);
          }, 5000);
          props.handelGet(props.insertedId);
        }
        //here if the response status is false so we have error
        else {
          //give the isError the message form teh response to display it
          setIsError(response.data.message);
          //make the isAddNotDone ture to tell the code that my add is not done
          setIsAddNotDone(true);
          //in the same way for isDone we make setTimeout
          setTimeout(() => {
            setIsAddNotDone(false);
          }, 5000);
        }
      } catch (error) {
        console.error("Error fetching new store data:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error", error.message);
        }
        console.error(error.config);
      }
    } else {
      setIsError(props.aFields.Generals.errorMessage); //add it to the Json File
      setIsAddNotDone(true);
      setTimeout(() => {
        setIsAddNotDone(false);
      }, 5000);
    }
  };

  //so after we fill our fields it is time to make the request which we will send it to the server
  const prepareDataForPost = () => {
    //first of all we have to create an object
    let oRet = {};
    //then we have to map the aField to make sure every field that we have in the screen we have it on the Json File

    aFields
      .map((field) => {
        if (!field.isForm && field.field !== "id") {
          return null; // Skip processing for fields where isForm is false
        }
        if (!field.element) {
          //if we catch one we print error message then break the function
          console.error("Field is missing an element property:", field);
          return null;
        }
        //the first step of load the values of each field to get the value as we rememmber we store it in (Key:Value) and the key in the element of each field
        let selectedValue = props.inputs[field.element];
        //after we get the value that we store it is came form field which it is type is date to formate the date to dd/mm/yyyy
        if (field.type === "date") {
          //here we take the value and make it Date object to use the special function to make the format easier
          const date = new Date(props.inputs[field.element]);
          //we check if the date is null or there is not date
          if (!date || isNaN(date.getTime())) {
            //then we store the fist value of the object oRet to make it "" the object will be like this {mdate:""} (mdate is example to the field element)
            oRet[field.field] = "";
          }
          //if it is not empty we make the format
          else {
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
            const year = date.getFullYear();
            selectedValue = `${day}-${month}-${year}`;
          }
        }
        //here for other fields to add them to the object
        oRet[field.field] = selectedValue;
        oRet["periodId"] = PeriodId.toString();
        return oRet;
      })
      .filter((item) => item !== null);

    //now if the page that we in it , it is MT then we have the pass the date in diffrent way
    let childs = {};
    //first we check if the page has Table in it to be MT
    if (af.hasTable) {
      //then we declare aRows to make it value to the data that i prepare in the MT page
      const aRows = tableRef.current.prepareDataForPost(
        tableRef.current?.rows,
        af
      );
      //here we make the structure of the request Json
      childs = {
        child: {
          aRows: aRows,
        },
      };
    }
    const result = {
      ...oRet,
      childs: childs,
    };
    // we print the result to make sure the json is right
    console.log(result);
    return result;
  };

  //in same way of handleSubmit we make handleUpdate but instead of (id:0) we make it (id:insertedId)
  const handelUpdate = async () => {
    if (
      (!tableRef.current?.preSubmit || tableRef.current.preSubmit()) &&
      props.preUpdate()
    ) {
      try {
        console.log("InsertedId in Update : ", props.insertedId);
        const url = `${props.aFields.URLS.Update.URl}`;
        const headers = {
          periodId: PeriodId,
          Accept: "application/json",
          Authorization: `Bearer ${PhToken}`,
          "Content-Type": "application/json",
        };
        console.log("update header : ", headers);
        const response = await axios.put(
          url,
          prepareDataForPut(props.insertedId),
          {
            headers: headers,
          }
        );
        console.log(response);
        if (response.data.status === true) {
          setIsUpdateDone(true);
          setTimeout(() => {
            setIsUpdateDone(false);
          }, 5000);
        } else {
          setIsError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching new store data:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error", error.message);
        }
        console.error(error.config);
      }
    } else {
      setIsError(props.aFields.Generals.errorMessage); //add it to the Json File
      setIsAddNotDone(true);
      setTimeout(() => {
        setIsAddNotDone(false);
      }, 5000);
    }
  };

  //function to prepare the data for put (Update) in the same way of for(Post) but instead of (id:0) we make it (id:insertedId)
  const prepareDataForPut = (insertedId) => {
    let oRet = {};
    const missing = aFields.reduce((acc, field) => {
      if (field.Form.isRequired && props.inputs[field.element] === "") {
        acc[field.element] = true;
      }
      return acc;
    }, {});
    setMissingFields(missing);
    if (Object.keys(missing).length > 0) {
      console.error(
        "Please fill all required fields:",
        Object.keys(missing).join(", ")
      );
      return;
    }
    const data = aFields
      .map((field) => {
        if (!field.element) {
          console.error("Field is missing an element property:", field);
          return null;
        }
        const selectedValue = props.inputs[field.element];
        if (field.type === "date") {
          const date = new Date(selectedValue);
          if (!date || isNaN(date.getTime()) || selectedValue === null) {
            console.log("hi i empty date");
            oRet[field.field] = "";
          } else {
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
            const year = date.getFullYear();
            oRet[field.field] = `${day}-${month}-${year}`;
            // console.log("date in oRet" ,oRet[field.field])
          }
        }
        if (field.field === "id") {
          //done
          oRet[field.field] = props.insertedId.toString();
        } else if (field.field !== "id" && field.type !== "date") {
          //docdId //docd // docn // mdate
          if (selectedValue !== null) {
            oRet[field.field] = selectedValue;
          } else {
            oRet[field.field] = "";
          }
        }
        //done
        oRet["periodId"] = "2022";
        return oRet;
      })
      .filter((item) => item !== null);
    let childs = {};
    if (af.hasTable) {
      //done
      const aRows = tableRef.current.prepareDataForPut(
        tableRef.current?.rows,
        af
      );
      //done
      childs = {
        child: {
          aRows: aRows,
          forDelete: tableRef.current?.deletedRows,
        },
      };
    }
    const result = {
      ...oRet,
      childs: childs,
    };
    console.log(result);
    return result;
  };

  //function to make sure that the Add is done successfully
  const handleSuccessAdd = (response) => {
    //we check if the response status is true
    if (response.data.status) {
      //then we make the isAddDone state True
      props.setIsAddDone(true);
    }
  };

  useEffect(() => {
    console.log("insertedId has been updated:", props.insertedId);
  }, [props.insertedId]);
  return (
    <section class="section">
      {af.hasParent && (
        <div class="row">
          <div class="col-10 mx-auto">
            <div id="StoreEntryForm" class="card card-custom">
              <div class="card-body">
                <div class="row">
                  <div class="col-4 mx-auto text-center">
                    {isDone && (
                      <div className="alert alert-success p-1" role="alert">
                        <p className="success-message">Added successfully!</p>
                      </div>
                    )}
                    {props.isDeleteDone && (
                      <div className="alert alert-danger p-1" role="alert">
                        <p className="success-message">Deleted successfully!</p>
                      </div>
                    )}
                    {isUpdateDone && (
                      <div className="alert alert-success p-1" role="alert">
                        <p className="success-message">Updated successfully!</p>
                      </div>
                    )}
                    {isAddNotDone && (
                      <div className="alert alert-danger p-1" role="alert">
                        <p className="success-message">{isError}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div class="row">
                  <form
                    id="StoreForm"
                    class={`${
                      Object.keys(missingFields).length > 0
                        ? "was-validated"
                        : ""
                    }`}
                  >
                    {props.afterGetMessage && props.afterGetMessage !== "" && (
                      <div class="row text-center">
                        <div class="col-12 text-danger">
                          <h4 class="ph-label" id="StoreForm">
                            {props.afterGetMessage}
                          </h4>
                        </div>
                      </div>
                    )}
                    {aFields
                      .filter(
                        (field) =>
                          field.type !== "hidden" &&
                          !field.hasOwnProperty("tabIndex") &&
                          field.isForm
                      )
                      .reduce((acc, field, index) => {
                        if (index % 2 === 0) {
                          acc.push([field]);
                        } else {
                          acc[acc.length - 1].push(field);
                        }
                        return acc;
                      }, [])
                      .map((fieldGroup, groupIndex) => (
                        <div key={groupIndex} className="row pt-1">
                          {fieldGroup.map((field, fieldIndex) => (
                            <React.Fragment key={fieldIndex}>
                              <label
                                htmlFor={field.element}
                                className={field.Form.labelClass}
                                data-label={field.Form.autocomplete.data_label}
                              >
                                {field.label}
                              </label>
                              <div className="col-sm-4">
                                {field.type === "select" &&
                                props.sectionOptions[field.Form.options] ? (
                                  <select
                                    id={field.element}
                                    className={field.Form.inputClass}
                                    disabled = {field.disabled}
                                    required={field.Form.isRequired}
                                    onChange={handleInputChange}
                                    value={props.inputs[field.element]}
                                  >
                                    <option selected value=""></option>
                                    {props.sectionOptions[
                                      field.Form.options
                                    ].map((option, optionIndex) => (
                                      // {...console.log(option)},
                                      <option
                                        key={optionIndex}
                                        value={option.value}
                                        id={`${option?.amt}`}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <>
                                    {field.type === "date" ? (
                                      <>
                                        <DatePicker
                                          id={`${field.id}`}
                                          maxDate={eval(field.Form.maxDate)}
                                          minDate={eval(field.Form.minDate)}
                                          className={`${
                                            field.Form.inputClass
                                          } ${
                                            missingFields[field.element]
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          selected={props.inputs[field.element]}
                                          dateFormat="dd-MM-yyyy"
                                          required={field.Form.isRequired}
                                          onChange={(date) =>
                                            handleDateChange(date, field)
                                          }
                                        />
                                      </>
                                    ) : (
                                      <input
                                        id={field.element}
                                        disabled={field.Form.disabled}
                                        className={`${field.Form.inputClass} ${
                                          missingFields[field.element]
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        type={field.type}
                                        value={
                                          field.Form.isAutocomplete
                                            ? props.inputs[field.rElement]
                                            : props.inputs[field.element]
                                        }
                                        autocomplete={field.Form.isAutocomplete}
                                        required={field.Form.isRequired}
                                        data_acrel={
                                          field.Form.autocomplete.data_acrel
                                        }
                                        data_acoperation={
                                          field.Form.autocomplete
                                            .data_acoperation
                                        }
                                        data_params={
                                          field.Form.autocomplete.data_params
                                        }
                                        onChange={(event) => {
                                          handleInputChange(event);
                                        }}
                                        onFocus={() => {
                                          setActiveInput(field.element);
                                        }}
                                        onBlur={() => {}}
                                      />
                                    )}
                                  </>
                                )}
                                {field.Form.isAutocomplete && (
                                  <div
                                    className="autocomplete-options"
                                    style={{
                                      position: "absolute",
                                      zIndex: "99",
                                    }}
                                  >
                                    {activeInput === field.element &&
                                      options.map((option, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="autocomplete-option"
                                            onClick={() =>
                                              handleOptionSelect(option)
                                            }
                                          >
                                            {option.label}
                                          </div>
                                        );
                                      })}
                                  </div>
                                )}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      ))}
                    {af.hasSpecialButton && (
                      <div class="col-sm-1">
                        <button
                          id="ph-isdefault"
                          className={`btn btn-sm btn-danger ${
                            !props.isGetDone ? "d-none" : ""
                          }`}
                          data-bs-title="تعيين كافتراضي"
                          data-bs-toggle="popover"
                          data-bs-placement="bottom"
                          data-bs-trigger="hover focus"
                          aria-label="حفظ"
                          data-bs-original-title="حفظ"
                          onClick={(e) => {
                            e.preventDefault();
                            af.callBack.setDefaultTemplete(
                              props.insertedId,
                              PhToken
                            );
                          }}
                        >
                          <i class="bi bi-gear"></i>
                        </button>
                      </div>
                    )}
                    <div className="row pt-3">
                      <div class="col-12">
                        <ul class="nav nav-pills" role="tablist">
                          {af.Tabs &&
                            af.Tabs.map((tab, tabIndex) => {
                              return (
                                <li class="nav-item" role="presentation">
                                  <span
                                    class={
                                      tabIndex === 0
                                        ? "tab-header nav-link btn btn-light active"
                                        : "tab-header nav-link btn btn-light"
                                    }
                                    data-bs-toggle="tab"
                                    data-bs-target={"#" + tab.id}
                                    aria-selected="false"
                                    role="tab"
                                  >
                                    {tab.label}
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="tab-content pt-2 mt-1 border-1">
                        {af.Tabs &&
                          af.Tabs.map((tab, tabIndex) => {
                            return (
                              <div
                                id={tab.id}
                                className={`tab-pane fade ${
                                  tabIndex === 0 ? "active show" : ""
                                }`}
                              >
                                {aFields
                                  .filter((field) => field.tabIndex === tab.id)
                                  .reduce((acc, field, index) => {
                                    if (index % 3 === 0) {
                                      acc.push([field]);
                                    } else {
                                      acc[acc.length - 1].push(field);
                                    }
                                    return acc;
                                  }, [])
                                  .map((fieldGroup, groupIndex) => (
                                    <div key={groupIndex} className="row pt-1">
                                      {fieldGroup.map((field, fieldIndex) => (
                                        <React.Fragment key={fieldIndex}>
                                          <label
                                            htmlFor={field.element}
                                            className={field.Form.labelClass}
                                            data-label={
                                              field.Form.autocomplete.data_label
                                            }
                                          >
                                            {field.label}
                                          </label>
                                          <div className="col-sm-3">
                                            {field.type === "select" &&
                                            props.sectionOptions[
                                              field.Form.options
                                            ] ? (
                                              <select
                                                id={field.element}
                                                className={
                                                  field.Form.inputClass
                                                }
                                                required={field.Form.isRequired}
                                                onChange={handleInputChange}
                                                value={
                                                  props.inputs[field.element]
                                                }
                                              >
                                                <option
                                                  selected
                                                  value=""
                                                ></option>
                                                {props.sectionOptions[
                                                  field.Form.options
                                                ].map((option, optionIndex) => (
                                                  <option
                                                    key={optionIndex}
                                                    value={option.value}
                                                  >
                                                    {option.label}
                                                  </option>
                                                ))}
                                              </select>
                                            ) : (
                                              <>
                                                {field.type === "date" ? (
                                                  <>
                                                    <DatePicker
                                                      id={`${field.id}`}
                                                      maxDate={eval(
                                                        field.Form.maxDate
                                                      )}
                                                      minDate={eval(
                                                        field.Form.minDate
                                                      )}
                                                      className={`${
                                                        field.Form.inputClass
                                                      } ${
                                                        missingFields[
                                                          field.element
                                                        ]
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      selected={
                                                        props.inputs[
                                                          field.element
                                                        ]
                                                      }
                                                      dateFormat="dd-MM-yyyy"
                                                      required={
                                                        field.Form.isRequired
                                                      }
                                                      onChange={(date) =>
                                                        handleDateChange(
                                                          date,
                                                          field
                                                        )
                                                      }
                                                    />
                                                  </>
                                                ) : (
                                                  <input
                                                    id={field.element}
                                                    disabled={
                                                      field.Form.disabled
                                                    }
                                                    className={`${
                                                      field.Form.inputClass
                                                    } ${
                                                      missingFields[
                                                        field.element
                                                      ]
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    type={field.type}
                                                    value={
                                                      field.Form.isAutocomplete
                                                        ? props.inputs[
                                                            field.rElement
                                                          ]
                                                        : props.inputs[
                                                            field.element
                                                          ]
                                                    }
                                                    autocomplete={
                                                      field.Form.isAutocomplete
                                                    }
                                                    required={
                                                      field.Form.isRequired
                                                    }
                                                    data_acrel={
                                                      field.Form.autocomplete
                                                        .data_acrel
                                                    }
                                                    data_acoperation={
                                                      field.Form.autocomplete
                                                        .data_acoperation
                                                    }
                                                    data_params={
                                                      field.Form.autocomplete
                                                        .data_params
                                                    }
                                                    onChange={(event) => {
                                                      handleInputChange(event);
                                                    }}
                                                    onFocus={() => {
                                                      setActiveInput(
                                                        field.element
                                                      );
                                                    }}
                                                    onBlur={() => {}}
                                                  />
                                                )}
                                              </>
                                            )}
                                            {field.Form.isAutocomplete && (
                                              <div
                                                className="autocomplete-options"
                                                style={{
                                                  position: "absolute",
                                                  zIndex: "99",
                                                }}
                                              >
                                                {activeInput ===
                                                  field.element &&
                                                  options.map(
                                                    (option, index) => {
                                                      return (
                                                        <div
                                                          key={index}
                                                          className="autocomplete-option"
                                                          onClick={() =>
                                                            handleOptionSelect(
                                                              option
                                                            )
                                                          }
                                                        >
                                                          {option.label}
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            )}
                                          </div>
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  ))}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {af.hasTable && (
        <EntryTable
          meta={af}
          sectionOptions={props.sectionOptions}
          ref={tableRef}
          inputs={props.inputs}
          rows={props.rows}
          setRows={props.setRows}
          missingFieldsInRow={missingFieldsInRow}
          setMissingFieldsInRow={setMissingFieldsInRow}
          rate={props.rate}
          setRate={props.setRate}
          resetCorrespondingField={props.resetCorrespondingField}
        ></EntryTable>
      )}
    </section>
  );
}
export default forwardRef(EntryBlock);
