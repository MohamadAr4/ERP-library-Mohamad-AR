import React, { useState } from "react";
import MasterTransaction from "../../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../../data/Jsons/hr/hr/EmployeeAppraisal";
import { useSelector } from "react-redux";
import PhFOperations from "../../../data/operation";
function EmployeeAppraisal() {
  const MTRef = useState();
  const [inputs, setInputs] = useState(() => {
    return meta.Fields.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Form.defValue.toString();
        acc[field.rElement] = field.Form.defValue.toString();
        if (field.type !== "hidden") {
          acc[field.Query.Operation] =
            PhFOperations[field.Query.defOperationValue].sign;
        }
      }
      return acc;
    }, {});
  });
  const sectionOptions = {};
  return (
    <>
      <MasterTransaction
        ref={MTRef}
        meta={meta}
        inputs={inputs}
        setInputs={setInputs}
        sectionOptions={sectionOptions}
      ></MasterTransaction>
    </>
  );
}
export default EmployeeAppraisal;
