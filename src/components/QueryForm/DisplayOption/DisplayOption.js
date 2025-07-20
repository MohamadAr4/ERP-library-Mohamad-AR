import Accordion from "react-bootstrap/Accordion";
import React, {
  useState,
  forwardRef,
  Ref,
  useImperativeHandle,
  useEffect,
} from "react";
function DisplayOption(props, ref) {
  useImperativeHandle(ref, () => ({
    handleCheckboxChange,
    checkbox,
    prepareSearchData,
    resetCheckBoxes,
  }));
  //var to know how many chech boxes that i have in one row
  const inputsPerRow = 4;
  //function to handle when ever i click in the check box to make the value from it state to the opposite
  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    const field = props.aFields.DisplayOption.find((f) => f.element === id);
    setCheckbox((prevCheckbox) => ({
      ...prevCheckbox,
      [field.field]: !prevCheckbox[field.field],
    }));
    console.log(field.checked);
  };
  const [checkbox, setCheckbox] = useState(() => {
    return props.aFields.DisplayOption.reduce((acc, field) => {
      if (field) {
        acc[field.field] = field.checked;
      }
      return acc;
    }, {});
  });
  //function to prepare the data for search here we take only the check boxes that i selected
  function prepareSearchData() {
    const searchData = {};
    props.aFields.DisplayOption.forEach((field) => {
      searchData[field.field] = checkbox[field.field] ? "1" : "0";
    });
    console.log(searchData);
    return searchData;
  }

  //function to reset the check boxes to the default values
  const resetCheckBoxes = () => {
    const initialInputs = props.aFields.DisplayOption.reduce((acc, field) => {
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
                    خيارات الاظهار
                  </label>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div id="InventoryQuantitiesDisplayOptionBody" class="row">
                  <div class="form-check">
                    {props.aFields.DisplayOption.map((field, index) => {
                      if (index % inputsPerRow === 0) {
                        return (
                          <div class="row" key={index}>
                            {props.aFields.DisplayOption.slice(
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
export default forwardRef(DisplayOption);
