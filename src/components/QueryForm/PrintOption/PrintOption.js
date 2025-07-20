import Accordion from "react-bootstrap/Accordion";
import React, { useState, forwardRef , Ref , useImperativeHandle } from "react";
function PrintOption(props , ref) {

  useImperativeHandle(ref , () => ({  
    resetPrintInputs,preparePrintForSearch
  }));

  const [PrintOptionsinputs, setPrintOptionsInputs] = useState(() => {
    return props.aFields.PrintOptions.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.defValue.toString();
      }
      return acc;
    }, {});
  });
  const resetPrintInputs = () => {
    const initialPrintField = props.aFields.PrintOptions.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.defValue.toString();
      }
      return acc;
    }, {});
    setPrintOptionsInputs(initialPrintField);
  };
  const handlePrintInputChange = (event) => {
    const { id, value } = event.target;
    const field = props.aFields.PrintOptions.find((f) => f.id === id);
    if (field) {
      setPrintOptionsInputs((prevInputs) => ({
        ...prevInputs,
        [field.element]: value,
      }));
    }
  };
  const preparePrintForSearch = () => {
    let oRet = {};
    const data = props.aFields.PrintOptions.forEach((field) => {
      const selectedValue = PrintOptionsinputs[field.element];
      oRet[field.field] = selectedValue;
      return oRet;
    });

    console.log(oRet);
    return oRet;
  };

  return(
    <div class={props.aFields.printOptionCardCalss}>
          <div class="card-header pb-0">
            <div class="row">
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>
                    <div class="col-sm-4 pt-1 ps-sm-1 pt-sm-0 d-flex align-items-center justify-content-start justify-content-sm-start">
                      <label for="check-all" class="form-label fs-6">
                        خيارات الطباعة
                      </label>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div
                      id="InventoryQuantitiesPrintOptionCardBody"
                      class="row row-cols-undefined"
                    >
                      <div class="col-sm-12">
                        <div class="row">
                          {props.aFields.PrintOptions.map((field) => {
                            return(
                              <>
                              <label
                            for={field.id}
                            class={field.labelClass}
                          >
                            {field.label}
                          </label>
                          <div class="col-sm-10 pt-sm-1">
                            <input
                              id={field.id}
                              class={field.class}
                              type={field.type}
                              value={PrintOptionsinputs[field.element] || ''}
                              autocomplete="off"
                              onChange={handlePrintInputChange}
                            />
                          </div>
                              </>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
  )
}
export default forwardRef(PrintOption);