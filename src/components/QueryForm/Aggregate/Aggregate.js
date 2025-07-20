import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import React, {
  useState,
  forwardRef,
  Ref,
  useImperativeHandle,
  useEffect,
} from "react";
function Aggreagte(props, ref) {
  useImperativeHandle(ref, () => ({
    prepareAggDataForSearch,
    setSecAggOptions,
    divCount,
    setAggOptions,
    setSecAggTOptions,
    setDivStates,
  }));

  //state for store how many agg block that i have
  const [divCount, setDivCount] = useState(1);
  //state for store how many agg that i have
  const [aggCount, setaggCount] = useState(1);
  //state for store arry of objects each object represent agg block
  const [divStates, setDivStates] = useState([{ id: 0 }]);
  //state for store the value of the agg
  const [aggOption, setAggOption] = useState("");
  //state that begin with one and every time that i add agg block i inc it by 1
  const [agg, setAgg] = useState(1);
  //state for store the agg Index
  const [aggIndex, setAggIndex] = useState(0);
  //state for store all the agg Index
  const [aggIndexes, setAggIndexes] = useState(Array(divCount).fill(0));

  const [optionCount, setOptionCount] = useState(
    props.aFields.Aggregation[0].Fields[0].options.length
  );
  const [aggOptionCount, setAggOptionCount] = useState(
    props.aFields.Aggregation[0].Fields[0].options[0].aPhAggregate.length
  );
  const [aggOptions, setAggOptions] = useState(() => {
    const initialAggOptions = Array(divCount).fill("");
    if (props.aFields.Aggregation[0].Fields[0].options.length > 0) {
      initialAggOptions[0] = "";
    }
    return initialAggOptions;
  });
  const [SecaggOptions, setSecAggOptions] = useState(() => {
    const initialAggOptions = Array(divCount).fill("");
    if (props.aFields.Aggregation[0].Fields[0].options.length > 0) {
      initialAggOptions[0] = "";
    }
    return initialAggOptions;
  });
  const [SecaggTOptions, setSecAggTOptions] = useState(() => {
    const initialAggOptions = Array(divCount).fill("");
    if (props.aFields.Aggregation[0].Fields[0].options.length > 0) {
      initialAggOptions[0] = "";
    }
    return initialAggOptions;
  });
  const [selectValues, setSelectValues] = useState(
    Array(aggCount)
      .fill()
      .map(() => "")
  );
  //function to handle add agg Block
  const handleAddDiv = () => {
    //first of all i have to make sure that the number of all the agg is less that divStates.length to allow the user to add one more
    if (divStates.length < optionCount * aggOptionCount) {
      setAgg(props.aFields.Aggregation[0].aggregationCount + 1);
      const newAggIndexes = [...aggIndexes, 0];
      setAggIndexes(newAggIndexes);
      const newAggOptions = [...aggOptions];
      setAggOptions(newAggOptions);
      const newSecAggOptions = [...SecaggOptions];
      setSecAggOptions(newSecAggOptions);
      setDivStates([...divStates, { id: divStates.length }]);
    }
  };
  //function to handle when i need to delete one of the agg Blocks by Id
  const handleDeleteDiv = (indexToDelete) => {
    console.log(`Deleting div at index: ${indexToDelete}`);
    const divToDelete = divStates.find((_, index) => index === indexToDelete);
    const updatedDivStates = divStates.filter(
      (divState) => divState.id !== divToDelete.id
    );
    setDivStates(updatedDivStates);
    const updatedAggOptions = aggOptions.filter(
      (_, index) => index !== indexToDelete
    );
    setAggOptions(updatedAggOptions);
    const updatedSecAggOptions = SecaggOptions.filter(
      (_, index) => index !== indexToDelete
    );
    setSecAggOptions(updatedSecAggOptions);
    const updatedAggIndexes = aggIndexes.filter(
      (_, index) => index !== indexToDelete
    );
    setAggIndexes(updatedAggIndexes);
  };
  //function to handle the agg option change
  const handleAggOptionChange = (event, index, field) => {
    const selectedIndex = parseInt(
      event.target.options[event.target.selectedIndex].id,
      10
    );
    const newAggOptions = [...aggOptions];
    newAggOptions[index] = event.target.value;
    setAggOptions(newAggOptions);
    setAggIndex(event.target.options[event.target.selectedIndex].id);
    setAggIndexes((prevAggIndexes) => {
      const newAggIndexes = [...prevAggIndexes];
      newAggIndexes[index] = selectedIndex;
      return newAggIndexes;
    });
  };
  //funtion to handle the agg select
  const handleAggSelectChange = (event, index) => {
    const selectedLabel =
      event.target.options[event.target.selectedIndex].value;
    const selectedValue = event.target.options[event.target.selectedIndex].id;
    console.log(selectedValue);
    const newSecAggOptions = [...SecaggOptions];
    newSecAggOptions[index] = selectedLabel;
    setSecAggOptions(newSecAggOptions);
    const newSecAggTOptions = [...SecaggTOptions];
    newSecAggTOptions[index] = selectedValue;
    setSecAggTOptions(newSecAggTOptions);
  };
  //function to prepare the Agg data to send it to the server
  const prepareAggDataForSearch = () => {
    let oRet = [];
    aggOptions.forEach((option, index) => {
      if (SecaggTOptions[index]) {
        oRet.push({ [option]: SecaggTOptions[index].toString() });
      }
    });
    console.log(oRet);
    return oRet;
  };
  useEffect(() => {}, [aggOption]);
  useEffect(() => {
    setSelectValues(
      Array(aggCount)
        .fill()
        .map(() => "")
    );
  }, [aggCount]);

  return (
    <div class="col-sm-4">
      <div class="card-header pb-0">
        <div class="row">
          <Accordion>
            <Accordion.Item defaultActiveKey={["0"]} alwaysopen>
              <Accordion.Header>المجاميع</Accordion.Header>
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
                          onClick={handleAddDiv}
                        >
                          <i class="bi bi-plus-circle"></i>
                        </button>
                      </div>
                    </div>

                    {divStates.map((divStates, index) => (
                      <div class="col" key={divStates.id}>
                        <div class="row">
                          {props.aFields.Aggregation[0].Fields.map(
                            (field, fieldIndex) => {
                              return (
                                <>
                                  <label
                                    htmlFor={`${fieldIndex}`}
                                    className="col-sm-2 form-label ph-label text-start text-sm-end pt-2"
                                    data-label="Aggregation"
                                  >
                                    {field.label}
                                  </label>
                                  <div className="col-10 pt-sm-1">
                                    <div className="input-group">
                                      <div className="col-8">
                                        <select
                                          id={`${fieldIndex}`}
                                          className="form-select form-select-sm aggr"
                                          data-fieldname="Aggr"
                                          data-rid={`DisposalStatisticsAggrAfld${fieldIndex}`}
                                          onChange={(event) =>
                                            handleAggOptionChange(
                                              event,
                                              index,
                                              field
                                            )
                                          }
                                          value={aggOptions[index] || ""}
                                        >
                                          <option value=""></option>
                                          {field.options.map((option) => (
                                            <option
                                              id={option.id}
                                              key={option.id}
                                              value={option.filed}
                                            >
                                              {option.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <select
                                        id={`qDisposalStatisticsAggrAfld${fieldIndex}`}
                                        class="form-control form-control-sm"
                                        onChange={(event) =>
                                          handleAggSelectChange(event, index)
                                        }
                                        value={SecaggOptions[index] || ""}
                                      >
                                        <option value=""></option>
                                        {field.options[aggIndexes[index]] &&
                                        field.options[aggIndexes[index]]
                                          .aPhAggregate
                                          ? field.options[
                                              aggIndexes[index]
                                            ].aPhAggregate.map((oper) => (
                                              <option id={oper}>
                                                {`${props.PhAggregate[oper].label}`}
                                              </option>
                                            ))
                                          : null}
                                      </select>
                                      <button
                                        className="btn btn-danger btn-sm toolbar-btn"
                                        onClick={() => handleDeleteDiv(index)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
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
export default forwardRef(Aggreagte);
