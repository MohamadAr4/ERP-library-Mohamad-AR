import { meta } from "../../../data/Jsons/oredertest";
import { Accordion } from "react-bootstrap";
import React, { useState , useImperativeHandle, forwardRef } from "react";
function OrderBy(props, ref) {
  let aFields = meta;
  useImperativeHandle(ref , () => ({  
    prepareAggDataForSearch,divOrderCount,setDivOrderCount,resetState
  }));
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedOperValues, setSelectedOperValues] = useState([]);
  const [divOrderCount, setDivOrderCount] = useState(1);
  const handleSelectChange = (fieldIndex, selectedOption) => {
    setSelectedValues((prevValues) => {
      const existingIndex = prevValues.findIndex(
        (value) => value.fieldIndex === fieldIndex
      );

      if (existingIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = { fieldIndex, selectedOption };
        return updatedValues;
      } else {
        return [...prevValues, { fieldIndex, selectedOption }];
      }
    });
  };

  const handleOperSelectChange = (fieldIndex, selectedOption) => {
    setSelectedOperValues((prevValues) => {
      const existingIndex = prevValues.findIndex(
        (value) => value.fieldIndex === fieldIndex
      );

      if (existingIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = { fieldIndex, selectedOption };
        return updatedValues;
      } else {
        return [...prevValues, { fieldIndex, selectedOption }];
      }
    });
  };

  const prepareAggDataForSearch = () => {
    let oRet = [];
    selectedValues.forEach((option, index) => {
      if (selectedOperValues[index]) {
        oRet.push({ [option.selectedOption]: selectedOperValues[index].selectedOption.toString() });
      }
    });
    console.log(oRet);
    return oRet;
  };

  const resetState = () => {
    setSelectedValues([]);
    setSelectedOperValues([]);
    setDivOrderCount(1);
 };
 const handleAddOrderDiv = () => {
  if (divOrderCount < aFields.Field[0].options.length) {
    setDivOrderCount(divOrderCount + 1);
  }
};

  return (
    <div class="col-sm-4 order-3 ms-auto pt-2">
      <div class="card-header pb-0">
        <div class="row">
          <Accordion>
            <Accordion.Item defaultActiveKey={["0"]} alwaysopen>
              <Accordion.Header>OrederBy</Accordion.Header>
              <Accordion.Body>
                <div class="card-body pt-2">
                  <div
                    id="DisposalStatisticsAggregationBody"
                    class="row row-cols-1"
                  >
                    <div class="row pb-1">
                      <div class="col-sm-1"> </div>
                      <div class="col-sm-1 offset-10">
                        <button
                          id="DisposalStatisticsAggregation-ph-addAggre"
                          class="btn btn-primary btn-sm toolbar-btn"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-custom-class="tooltip-primary-bg"
                          data-bs-title="Add"
                          title="Add"
                          onClick={handleAddOrderDiv}
                        >
                          <i class="bi bi-plus-circle"></i>
                        </button>
                      </div>
                    </div>

                    {Array.from(
                      { length: divOrderCount },
                      (_, index) => (
                        <div class="col">
                          <div class="row">
                            {aFields.Field.map((field, fieldIndex) => {
                              return (
                                <>
                                  <label
                                    htmlFor={`${fieldIndex}`}
                                    className="col-sm-2 form-label ph-label text-start text-sm-end pt-2"
                                    data-label="OrderBy"
                                  >
                                    {field.label}
                                  </label>
                                  <div className="col-10 pt-sm-1">
                                    <div className="input-group">
                                      <div className="col-8">
                                        {/* {console.log(selectedValues[index].selectedOption)} */}
                                        <select
                                          id={`${index}`}
                                          className="form-select form-select-sm orederBy"
                                          data-fieldname="orderBy"
                                          data-rid={`DisposalStatisticsOrderByAfld${fieldIndex}`}
                                          onChange={(e) =>
                                            handleSelectChange(
                                              index,
                                              e.target.value
                                            )
                                          }
                                          value={selectedValues.find(value => value.fieldIndex === index)?.selectedOption || ""}
                                        >
                                          <option value=""></option>
                                          {field.options.map((option) => (
                                            <option
                                              id={option.id}
                                              key={option.id}
                                              value={option.id}
                                            >
                                              {option.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <select
                                        id={`qDisposalStatisticsAggrAfld${fieldIndex}`}
                                        class="form-control form-control-sm"
                                        onChange={(e) =>
                                          handleOperSelectChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                        value={selectedOperValues.find(value => value.fieldIndex === index)?.selectedOption || ""}
                                        
                                      >
                                        {field.aOpers.map(
                                          (option, optionIndex) => {
                                            return (
                                              <option
                                                id={optionIndex}
                                                value={option.sign}
                                              >
                                                {option.label}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      )
                    )}

                    <div id="newAggregation"> </div>
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
export default forwardRef(OrderBy);
