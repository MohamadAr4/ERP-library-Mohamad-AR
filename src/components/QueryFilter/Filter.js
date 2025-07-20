import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import PhFOperations from "../../data/operation";
import axios from "axios";
import QueryFilter from "./QueryFilter";
import BaseUrl from "../../data/contants";
function Filter(props, ref) {
  useImperativeHandle(ref, () => ({
    isDeleteDone,
    setIsDeleteDone,
    prepareDataForSearch,
  }));
  let aFields = props.aFields;
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [options, setOptions] = useState([]);
  const [isDeleteDone, setIsDeleteDone] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(id);
    if (id.includes("-second")) {
      const field = props.aFields.find((f) => f.second_element === id);
      if (field.Query.isAutocomplete) {
        props.setInputs((prevInputs) => ({
          ...prevInputs,
          [field.second_element]: value,
          [field.rElement]: value,
        }));
        handleAutoComplete(event, field);
      } else if (!field.Query.isAutocomplete) {
        props.setInputs((prevInputs) => ({
          ...prevInputs,
          [field.second_element]: value,
          [field.rElement]: value,
          [field.second_element]: value,
        }));
      }
    } else {
      const field = aFields.find((f) => f.element === id);
      if (field.Query.isAutocomplete) {
        props.setInputs((prevInputs) => ({
          ...prevInputs,
          [field.element]: value,
          [field.rElement]: value,
        }));
        handleAutoComplete(event, field);
      } else if (!field.Query.isAutocomplete) {
        props.setInputs((prevInputs) => ({
          ...prevInputs,
          [field.element]: value,
          [field.rElement]: value,
          [field.field]: value,
        }));
      }
    }
  };
  const handleAutoComplete = async (event, field) => {
    const { value } = event.target;
    console.log(field);
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
  const handleOptionSelect = (optionValue, optionLabel, field) => {
    // console.log("5");
    props.setInputs((prevInputs) => ({
      ...prevInputs,
      [field.defLabel]: optionLabel, // Update the input value to show the selected option's label
      [field.element]: optionValue, // Update the defValue with the selected option's value
    }));
    setOptions([]); // Clear the options after selection
    // prepareDataForPost(optionValue);
    setActiveInput(null); // Clear the active input field
  };
  const onOptionSelected = (selectedOption) => {
    props.setInputs((prevInputs) => ({
      ...prevInputs,
      [selectedOption.key]: selectedOption.value,
    }));
  };
  function handleSearchSelect(event) {
    const { id } = event.target;
    const value = event.target.options[event.target.selectedIndex].value;
    console.log(value);
    const field = aFields.find((f) => f.element === id);
    if (field) {
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        [field.Query.Operation]: value,
      }));
    }
  }
  const handleOptionHover = (option) => {
    const field = aFields.find((f) => f.element === activeInput);
    if (field) {
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        [field.rElement]: option.label,
        [field.element]: option.value,
      }));
    }
  };
  const prepareDataForSearch = () => {
    let searchCriteria = props.aFields.reduce((acc, field) => {
      let value = props.inputs[field.element]; // Changed from const to let
      let operation = props.inputs[field.Query.Operation];
      let value2 = props.inputs[field.second_element]; // Changed from const to let

      if (value && field.element !== "fldId") {
        if (value && field.type === "date") {
          const date = new Date(props.inputs[field.element]);
          const date2 = new Date(props.inputs[field.second_element]);
          if (!date || isNaN(date.getTime())) {
            value = ""; // Now this is allowed since value is declared with let
            value2 = ""; // Now this is allowed since value2 is declared with let
          } else if (!date2 || isNaN(date2.getTime())) {
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
            const year = date.getFullYear();
            value = `${day}-${month}-${year}`;
            value = value;
            value2 = "";
          } else {
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
            const year = date.getFullYear();
            value = `${day}-${month}-${year}`;
            const day2 = ("0" + date2.getDate()).slice(-2);
            const month2 = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
            const year2 = date2.getFullYear();
            value2 = `${day2}-${month2}-${year2}`;
          }
        }
        acc.push({
          dataType: field.Query.dataType,
          fieldName: field.field,
          operation: operation,
          value1: value === null ? "" : value,
          value2: field.hasSecondField === false ? "" : value2,
        });
      }
      return acc;
    }, []);
    console.log("SearchCred", searchCriteria);
    props.setSearchCreadintal(searchCriteria);
    return searchCriteria;
  };
  const handleDateChange = (event, date, field) => {
    console.log(date.toDateString());
    if (event === 2) {
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        [field.second_element]: date,
      }));
    } else {
      props.setInputs((prevInputs) => ({
        ...prevInputs,
        [field.element]: date,
      }));
    }
  };
  return (
    <section class="section">
      <div class="row">
        <div class="col-10 mx-auto">
          <div id="Query" class="card card-custom">
            <div class="card-body">
              <QueryFilter
                aFields={props.aFields}
                selectedValue={props.selectedValue}
                handleInputChange={handleInputChange}
                setActiveInput={setActiveInput}
                activeInput={activeInput}
                setOptions={setOptions}
                handleOptionSelect={handleOptionSelect}
                missingField={props.missingField}
                onOptionSelected={onOptionSelected}
                handleOptionHover={handleOptionHover}
                inputs={props.inputs}
                Statusoptions={props.Statusoptions}
                options={options}
                selectedOperation={props.selectedOperation}
                prepareDataForSearch={prepareDataForSearch}
                handleSearchSelect={handleSearchSelect}
                sectionOptions={props.sectionOptions}
                handleDateChange={handleDateChange}
              ></QueryFilter>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default forwardRef(Filter);
