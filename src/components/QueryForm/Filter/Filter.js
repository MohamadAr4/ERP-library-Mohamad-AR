import Accordion from "react-bootstrap/Accordion";
import QueryFilter from "../../QueryFilter/QueryFilter";
import axios from "axios";
import React, { useState, forwardRef, Ref, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhFOperations from "../../../data/operation";
import BaseUrl from "../../../data/contants";
function Filter(props, ref) {
  useImperativeHandle(ref, () => ({
    resetInputs,
    prepareDataForSearch,
    setSearchCreadintal,
    inputs
  }));
  //the Token that i get form the login response
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  //state for store the operation that i selected
  const [selectedOperation, setSelectedOperation] = useState("");
  //state for store the value of the option that i selected
  const [selectedValue, setSelectedValue] = useState("");
  //state for store the AC options for display it later
  const [options, setOptions] = useState([]);
  //state for store the Creadintal that i want to search about
  const [SearchCreadintal, setSearchCreadintal] = useState(null);
  //state for store the active input that i type in
  const [activeInput, setActiveInput] = useState(null);

  const [inputs, setInputs] = useState(() => {
    return props.aFields.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Query.defValue;
        acc[field.rElement] = field.Query.defValue;
        if (field.type !== "hidden") {
          acc[field.Query.Operation] =
            PhFOperations[field.Query.defOperationValue].sign;
        }
      }
      return acc;
    }, {});
  });
  //funtion to reset the fields
  const resetInputs = () => {
    const initialInputs = props.aFields.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Query.defValue.toString();
        acc[field.second_element] = field.Query.defValue.toString();
        acc[field.rElement] = field.Query.defValue.toString();
        acc[field.Query.Operation] =
          PhFOperations[field.Query.defOperationValue].sign;
        acc[field.field] = field.Query.defValue.toString();
      }
      return acc;
    }, {});
    props.setIsProgressClicked(false);
    props.setIsToogleClicked(false);
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
        let requestBody;
        if (field.Query.hasOwnProperty("needValue")) {
          requestBody = {
            term: value,
            [field.Query.needValue] : parseFloat(inputs[field.Query.ValueforAutoComplete]),
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
      const field = props.aFields.find((f) => f.second_element === id);
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
      const field = props.aFields.find((f) => f.element === id);
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
    const field = props.aFields.find((f) => f.element === activeInput);
    if (field) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field.rElement]: option.label,
        [field.element]: option.value,
        [field.field]: option.value,
      }));
    }
  };
  //function to handle the operation select
  function handleSearchSelect(event) {
    const { id } = event.target;
    console.log(id);
    const value = event.target.options[event.target.selectedIndex].value;
    console.log(event.target.options[event.target.selectedIndex].value);
    setSelectedOperation(value);
    const field = props.aFields.find((f) => f.element === id);
    if (field) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field.Query.Operation]: value,
      }));
    }
  }
  //function to handle when i select one of the AC option
  const handleOptionSelect = (option) => {
    //we pass the value of the option and the label and the field that we write in
    const field = props.aFields.find((f) => f.element === activeInput);
    console.log(field)
    if (field) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field.rElement]: option.label,
        [field.element]: option.value,
        [field.field]: option.value,
      }));
    }

    if (field.Query.hasOwnProperty("callback")) {
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

    setActiveInput(null);
    setOptions([]);
    //after we choose we clear the array of the option that we created
    //then we remove the active of the field);
  };
  const onOptionSelected = (selectedOption) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [selectedOption.key]: selectedOption.value,
    }));
  };
  //function to prepare the data that i fill for post it
  const prepareDataForSearch = () => {
    let searchCriteria = props.aFields.reduce((acc, field) => {
      let value = inputs[field.element]; // Changed from const to let
      let operation = inputs[field.Query.Operation];
      let value2 = inputs[field.second_element]; // Changed from const to let

      if (value && field.element !== "fldId") {
        if (value && field.type === "date") {
          const date = new Date(inputs[field.element]);
          const date2 = new Date(inputs[field.second_element]);
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
          value2: (field.hasSecondField && value2) === null ? "" : value2,
        });
      }
      return acc;
    }, []);
    console.log("SearchCred", searchCriteria);
    setSearchCreadintal(searchCriteria);
    return searchCriteria;
  };
  const handleDateChange = (event, date, field) => {
    console.log(date.toDateString());
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
  return (
    <div className="row row-cols-2">
      <div className="col-sm-10 order-0 mx-auto pt-2">
        <Accordion>
          <Accordion.Item defaultActiveKey={["0"]} alwaysopen>
            <Accordion.Header>شروط البحث</Accordion.Header>
            <Accordion.Body>
              <QueryFilter
                aFields={props.aFields}
                missingFields = {props.missingFields}
                setvAFields={props.setvAFields}
                selectedValue={selectedValue}
                handleInputChange={handleInputChange}
                setActiveInput={setActiveInput}
                activeInput={activeInput}
                setOptions={setOptions}
                handleOptionSelect={handleOptionSelect}
                onOptionSelected={onOptionSelected}
                handleOptionHover={handleOptionHover}
                inputs={inputs}
                Statusoptions={props.Statusoptions}
                options={options}
                selectedOperation={selectedOperation}
                prepareDataForSearch={prepareDataForSearch}
                handleSearchSelect={handleSearchSelect}
                sectionOptions={props.sectionOptions}
                handleDateChange={handleDateChange}
              ></QueryFilter>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
export default forwardRef(Filter);
