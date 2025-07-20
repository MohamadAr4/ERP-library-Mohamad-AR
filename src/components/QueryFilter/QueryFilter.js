import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import PhFOperations from "../../data/operation";
import DatePicker from "react-datepicker";
import axios from "axios";
function QueryFilter(props, ref) {
  let aFields = props.aFields;
  return (
    <div class="row">
      <div class="col-12 mx-auto">
        <div id="StoreEntryForm">
          <div class="row">
            <form
              id="StoreForm"
              class={`${
                props.missingFields && props.missingFields !== null
                  ? Object.keys(props.missingFields).length > 0
                    ? "was-validated"
                    : ""
                  : ""
              }`}
            >
              {aFields
                .filter(
                  (field) =>
                    field.type !== "hidden" &&
                    field.isShown === true &&
                    field.isQuery === true
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
                          className={field.Query.labelClass}
                        >
                          {field.label}
                        </label>
                        <div class="col-sm-1 px-1">
                          <select
                            id={`${field.element}`}
                            class="form-select form-select-sm QFld"
                            onChange={(event) => {
                              props.handleSearchSelect(event);
                            }}
                            value={props.inputs[field.Query.Operation]}
                          >
                            {field.Query.aOperations &&
                              field.Query.aOperations.map((oper, oindex) => {
                                return (
                                  <>
                                    <option
                                      value={`${PhFOperations[oper].sign}`}
                                      title={`${PhFOperations[oper].sign}`}
                                    >
                                      {`${PhFOperations[oper].sign}`}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                        <div className='col-sm-4 d-flex'>
                          {field.type === "select" &&
                          props.sectionOptions[field.Query.options] ? (
                            <select
                              id={field.element}
                              className={field.Query.inputClass}
                              value={
                                field.Query.isAutocomplete
                                  ? props.inputs[field.rElement]
                                  : props.inputs[field.element]
                              }
                              required={field.Query.isRequired}
                              onChange={(event) =>
                                props.handleInputChange(event)
                              }
                            >
                              <option value="" selected></option>
                              {props.sectionOptions[field.Query.options].map(
                                (option, optionIndex) => (
                                  <option
                                    key={optionIndex}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                )
                              )}
                            </select>
                          ) : (
                            <>
                              {field.type === "date" ? (
                                <DatePicker
                                  id={`${field.element}`}
                                  maxDate={eval(field.Query.maxDate)}
                                  minDate={eval(field.Query.minDate)}
                                  className={`${field.Query.inputClass}`}
                                  selected={props.inputs[field.element]}
                                  dateFormat="dd-MM-yyyy"
                                  required={field.Query.isRequired}
                                  onChange={(date) =>
                                    props.handleDateChange(1, date, field)
                                  }
                                />
                              ) : (
                                <input
                                  id={field.element}
                                  className={field.Query.inputClass}
                                  type={field.type}
                                  value={
                                    field.Query.isAutocomplete
                                      ? props.inputs[field.rElement]
                                      : props.inputs[field.element]
                                  }
                                  autocomplete={field.Query.isAutocomplete}
                                  required={field.Query.isRequired}
                                  onChange={(event) => {
                                    props.handleInputChange(event);
                                  }}
                                  onFocus={() => {
                                    props.setActiveInput(field.element);
                                  }}
                                  onBlur={() => {
                                    props.setActiveInput(null);
                                    props.setOptions([]);
                                  }}
                                />
                              )}
                            </>
                          )}
                          {field.hasSecondField && (
                            <>
                              {field.type === "select" &&
                              props.sectionOptions[field.Query.options] ? (
                                <select
                                  id={`${field.element}-second`}
                                  className={field.Query.inputClass}
                                  value={
                                    field.Query.isAutocomplete
                                      ? props.inputs[field.rElement]
                                      : props.inputs[field.second_element]
                                  }
                                  required={field.Query.isRequired}
                                  onChange={(event) =>
                                    props.handleInputChange(event)
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
                              ) : (
                                <>
                                  {field.type === "date" ? (
                                    <DatePicker
                                      id={`${field.second_element}`}
                                      maxDate={eval(field.Query.maxDate)}
                                      minDate={eval(field.Query.minDate)}
                                      className={`${field.Query.inputClass}`}
                                      selected={
                                        props.inputs[field.second_element]
                                      }
                                      dateFormat="dd-MM-yyyy"
                                      required={field.Query.isRequired}
                                      onChange={(date) =>
                                        props.handleDateChange(2, date, field)
                                      }
                                      disabled={
                                        props.inputs[field.Query.Operation] !==
                                          "<>" &&
                                        props.inputs[field.Query.Operation] !==
                                          "><"
                                      }
                                    />
                                  ) : (
                                    <input
                                      id={`${field.second_element}`}
                                      className={field.Query.inputClass}
                                      type={field.type}
                                      value={
                                        field.Query.isAutocomplete
                                          ? props.inputs[field.rElement]
                                          : props.inputs[field.second_element]
                                      }
                                      autocomplete={field.Query.isAutocomplete}
                                      required={field.Query.isRequired}
                                      onChange={(event) => {
                                        props.handleInputChange(event);
                                      }}
                                      onFocus={() => {
                                        props.setActiveInput(field.element);
                                      }}
                                      onBlur={() => {
                                        props.setActiveInput(null);
                                        props.setOptions([]);
                                      }}
                                      disabled={
                                        props.inputs[field.Query.Operation] !==
                                          "<>" &&
                                        props.inputs[field.Query.Operation] !==
                                          "><"
                                      }
                                    />
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {field.Query.isAutocomplete && (
                            <div className="autocomplete-options" style={{position : 'absolute', zIndex:'99'}}>
                              {props.activeInput === field.element &&
                                props.options.map((option, index) => (
                                  <div
                                    key={index}
                                    className="autocomplete-option"
                                    onClick={() => {
                                      props.handleOptionSelect(
                                        option.value,
                                        option.label,
                                        field
                                      );
                                    }}
                                    onMouseEnter={() =>
                                      props.handleOptionHover(option)
                                    }
                                  >
                                    {option.label}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default forwardRef(QueryFilter);
