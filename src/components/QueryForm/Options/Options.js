import Accordion from "react-bootstrap/Accordion";
import React, {
  useState,
  forwardRef,
  Ref,
  useImperativeHandle,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import BaseUrl from "../../../data/contants";
function Options(props, ref) {
  useImperativeHandle(ref, () => ({
    handleCheckboxChange,
    checkbox,
    prepareSearchData,
    resetCheckBoxes,
    resetInputs,
  }));

  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  //state for store the AC options for display it later
  const [options, setOptions] = useState([]);
  //state for store the active input that i type in
  const [activeInput, setActiveInput] = useState(null);

  const [inputs, setInputs] = useState(() => {
    return props.aFields.Options.reduce((acc, field) => {
      if (field && field.type !== "checkbox") {
        acc[field.element] = field.Query.defValue.toString();
        acc[field.rElement] = field.Query.defValue.toString();
      }
      return acc;
    }, {});
  });
  //funtion to reset the fields
  const resetInputs = () => {
    const initialInputs = props.aFields.Options.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Query.defValue.toString();
        acc[field.rElement] = field.Query.defValue.toString();
        acc[field.field] = field.Query.defValue.toString();
      }
      return acc;
    }, {});
    setInputs(initialInputs);
  };
  //function to handle autoComplete and make the Api calls for get the option to display it
  const handleAutoComplete = async (event, field) => {
    const { value } = event.target;
    if (value.length > 0) {
      try {
        const baseUrl = BaseUrl.slice(0, -1);
        const url = baseUrl + field.Query.autocomplete.data_acoperation;
        const headers = {
          Authorization: `Bearar ${PhToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          url,
          { term: value },
          {
            headers,
          }
        );
        console.log(response);
        const optionsArray = response.data.data.List;
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
  //function to handle the change that i make in the field
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(id);
    if (id.includes("-second")) {
      const field = props.aFields.Options.find((f) => f.second_element === id);
      if (field.Query.isAutocomplete) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [field.second_element]: value,
          [field.rElement]: value,
        }));
        handleAutoComplete(event, field);
      } else if (!field.Query.isAutocomplete) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [field.second_element]: value,
          [field.rElement]: value,
          [field.second_element]: value,
        }));
      }
    } else {
      const field = props.aFields.Options.find((f) => f.element === id);
      if (field.Query.isAutocomplete) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [field.element]: value,
          [field.rElement]: value,
        }));
        handleAutoComplete(event, field);
      } else if (!field.Query.isAutocomplete) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [field.element]: value,
          [field.rElement]: value,
          [field.field]: value,
        }));
      }
    }
  };
  //function to handle when i hover over on of the AC option
  const handleOptionHover = (option) => {
    const field = props.aFields.Options.find((f) => f.element === activeInput);
    if (field) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field.rElement]: option.label,
        [field.element]: option.value,
        [field.field]: option.value,
      }));
    }
  };
  //function to handle when i select one of the AC option
  const handleOptionSelect = (optionValue, optionLabel, field) => {
    // console.log("5");
    setInputs((prevInputs) => ({
      ...prevInputs,
      [field.defLabel]: optionLabel, // Update the input value to show the selected option's label
      [field.element]: optionValue, // Update the defValue with the selected option's value
    }));
    setOptions([]); // Clear the options after selection
    // prepareDataForPost(optionValue);
    setActiveInput(null); // Clear the active input field
  };

  const handleDateChange = (event, date, field) => {
    console.log('aaaaaaaaaaaaa');
    if (event === 2) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field.second_element]: date,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field.element]: date,
      }));
    }
  };

  //var to know how many chech boxes that i have in one row
  const inputsPerRow = 3;
  //function to handle when ever i click in the check box to make the value from it state to the opposite
  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    const field = props.aFields.Options.find((f) => f.element === id);
    setCheckbox((prevCheckbox) => ({
      ...prevCheckbox,
      [field.field]: !prevCheckbox[field.field],
    }));
  };
  const [checkbox, setCheckbox] = useState(() => {
    return props.aFields.Options.reduce((acc, field) => {
      if (field) {
        acc[field.field] = field.checked;
      }
      return acc;
    }, {});
  });
  //function to prepare the data for search here we take only the check boxes that i selected
  function prepareSearchData() {
    const searchData = {};
    props.aFields.Options.forEach((field) => {
      if (field.type === "checkbox") {
        searchData[field.field] = checkbox[field.field] === true ? "1" : "0";
        console.log(searchData[field.field]);
      }
      else if (field.type === "date") {
        const date = new Date(inputs[field.element]);
        if (!date || isNaN(date.getTime())) {
          searchData[field.field] = "";
        } else {
          const day = ("0" + date.getDate()).slice(-2);
          const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
          const year = date.getFullYear();
          searchData[field.field] = `${day}-${month}-${year}`;
          
        }
      }
      else
      {
        searchData[field.field] = inputs[field.element];
      }
    });
    console.log(searchData);
    return searchData;
  }

  //function to reset the check boxes to the default values
  const resetCheckBoxes = () => {
    const initialInputs = props.aFields.Options.reduce((acc, field) => {
      if (field) {
        acc[field.field] = field.checked;
      }
      return acc;
    }, {});
    setCheckbox(initialInputs);
  };
  return (
    <div class={props.aFields.displayOptioncardClass}>
      <div class="card-header pb-0">
        <div class="row">
          <Accordion>
            <Accordion.Item>
              <Accordion.Header>
                <div class="col-sm-4 pt-1 ps-sm-1 pt-sm-0 d-flex align-items-center justify-content-start justify-content-sm-start">
                  <label for="check-all" class="form-label fs-6">
                    الخيارات
                  </label>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div id="InventoryQuantitiesDisplayOptionBody" class="row">
                  <div class="form-check">
                    {props.aFields.Options.map((field, index) => {
                      if (
                        index % inputsPerRow === 0 &&
                        field.type === "checkbox"
                      ) {
                        return (
                          <div class="row" key={index}>
                            {props.aFields.Options.slice(
                              index,
                              index + inputsPerRow
                            ).map((field) => (
                              <div class="col-sm-3 pt-1" key={field.id}>
                                <div class="form-check d-flex align-items-center ps-1">
                                  <div class="col-sm-3">
                                    <input
                                      id={field.element}
                                      class={field.class}
                                      type={field.type}
                                      value={field.value}
                                      data-fieldname={field.field}
                                      checked={checkbox[field.field]}
                                      onChange={(e) => handleCheckboxChange(e)}
                                    />
                                  </div>
                                  <label
                                    for={field.id}
                                    class={field.labelClass}
                                    data-label={field.label}
                                  >
                                    {field.label}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })}
                    {props.aFields.Options.filter(
                      (field) =>
                        field.type !== "hidden" &&
                        field.isShown === true &&
                        field.isQuery === true &&
                        field.type !== "checkbox"
                    )
                      .reduce((acc, field, index) => {
                        if (index % 1 === 0) {
                          acc.push([field]);
                        } else {
                          acc[acc.length - 1].push(field);
                        }
                        return acc;
                      }, [])
                      .map((fieldGroup, groupIndex) => (
                        <div key={groupIndex} className="row mb-1">
                          {fieldGroup.map((field, fieldIndex) => (
                            <React.Fragment key={fieldIndex}>
                              <label
                                htmlFor={field.element}
                                className={field.Query.labelClass}
                              >
                                {field.label}
                              </label>
                              {field.type === "select" &&
                              props.sectionOptions[field.Query.options] ? (
                                <div className={field.Query.divClass}>
                                  <select
                                    id={field.element}
                                    className={field.Query.inputClass}
                                    value={
                                      field.Query.isAutocomplete
                                        ? inputs[field.rElement]
                                        : inputs[field.element]
                                    }
                                    required={field.Query.isRequired}
                                    onChange={(event) =>
                                      handleInputChange(event)
                                    }
                                  >
                                    <option value="" selected></option>
                                    {props.sectionOptions[
                                      field.Query.options
                                    ].map((option, optionIndex) => (
                                      <option
                                        key={optionIndex}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ) : (
                                <>
                                  {field.type === "date" ? (
                                    <div className={field.Query.divClass}>
                                      {console.log(field.Query.inputClass)}
                                      <DatePicker
                                        id={`${field.element}`}
                                        className={field.Query.inputClass}
                                        selected={inputs[field.element]}
                                        dateFormat="dd-MM-yyyy"
                                        required={field.Query.isRequired}
                                        onChange={(date) =>
                                          handleDateChange(1, date, field)
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div className={field.Query.divClass}>
                                      <input
                                        id={field.element}
                                        className={field.Query.inputClass}
                                        type={field.type}
                                        value={
                                          field.Query.isAutocomplete
                                            ? inputs[field.rElement]
                                            : inputs[field.element]
                                        }
                                        autocomplete={
                                          field.Query.isAutocomplete
                                        }
                                        required={field.Query.isRequired}
                                        onChange={(event) => {
                                          handleInputChange(event);
                                        }}
                                        onFocus={() => {
                                          setActiveInput(field.element);
                                        }}
                                        onBlur={() => {
                                          setActiveInput(null);
                                          setOptions([]);
                                        }}
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                              {field.Query.isAutocomplete && (
                                <div className="autocomplete-options">
                                  {activeInput === field.element &&
                                    options.map((option, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="autocomplete-option"
                                          onClick={() => {
                                            handleOptionSelect(
                                              option.value,
                                              option.label,
                                              field
                                            );
                                          }}
                                          onMouseEnter={() =>
                                            handleOptionHover(option)
                                          }
                                        >
                                          {option.label}
                                        </div>
                                      );
                                    })}
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default forwardRef(Options);
