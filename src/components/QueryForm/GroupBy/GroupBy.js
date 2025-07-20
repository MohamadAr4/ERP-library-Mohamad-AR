import React, { useState, forwardRef , Ref , useImperativeHandle } from "react";
import Accordion from "react-bootstrap/Accordion";
function GroupBy(props,ref) {

  useImperativeHandle(ref , () => ({  
    prepareDataForGroupedSearch,divGroupCount,setDivGroupCount,setSelectedOptions
  }));
  //state for store who many Group that i added
  const [divGroupCount, setDivGroupCount] = useState(1);
  //var to get each group index
  const keysArray = Array.from({ length: divGroupCount }, (_, index) => index);
  //function tp prepare the data that i selected to send it to the server
  const prepareDataForGroupedSearch = () => {
    let oRet = [];
    keysArray.forEach((key, index) => {
      if (selectedOptions[index]) {
        oRet[key] = selectedOptions[index];
      }
    });
    console.log(oRet);
    return oRet;
  };
  
  const [selectedOptions, setSelectedOptions] = useState(
    Array(divGroupCount).fill("")
  );
  //function to handle the select change
  const handleSelectChange = (event, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    console.log(event.target);
    setSelectedOptions(newSelectedOptions);
  };
  //function to add another select of the group
  const handleAddGroupDiv = () => {
    if (divGroupCount < props.aFields.GroupBy[0].body.fields.options.length + 1) {
      setDivGroupCount(divGroupCount + 1);
    }
  };
  return (
    <div class="col-sm-4">
      <div class="card-header pb-0">
        <div class="row">
          <Accordion>
            <Accordion.Item defaultActiveKey={["0"]} alwaysopen>
              <Accordion.Header>التجميع</Accordion.Header>
              <Accordion.Body>
                <div class="card-body pt-2">
                  <div id="DisposalStatisticsGroupBody" class="row row-cols-1">
                    <div class="row pb-1">
                      <div class="col-sm-1 offset-11">
                        <button
                          id="DisposalStatisticsGroup-ph-addGroup"
                          class="btn btn-primary btn-sm toolbar-btn"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-custom-class="tooltip-primary-bg"
                          data-bs-title="Add"
                          title="Add"
                          onClick={handleAddGroupDiv}
                        >
                          <i class="bi bi-plus-circle"></i>
                        </button>
                      </div>
                    </div>
                    {Array.from({ length: divGroupCount}, (_, index) => (
                      <div class="col">
                        <div class="row">
                          <label
                            for={`DisposalStatisticsGrp${index}`}
                            class="col-sm-2 form-label ph-label text-start text-sm-end pt-2"
                            data-label="Group.by"
                          >
                            {props.aFields.GroupBy[0].body.fields.label}
                          </label>
                          <div class="col-sm-10 pt-sm-1">
                            <select
                              id={`DisposalStatisticsGrp${index}`}
                              class="form-select form-select-sm"
                              data-fieldname="grp"
                              value={selectedOptions[index] || ""}
                              onChange={(event) =>
                                handleSelectChange(event, index)
                              }
                            >
                              <option value="" selected></option>
                              {props.aFields.GroupBy[0].body.fields.options.map(
                                (option, index) => {
                                  return (
                                    <option value={`${option.id}`}>
                                      {option.name}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div id="newGroup"> </div>
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
export default forwardRef(GroupBy);
