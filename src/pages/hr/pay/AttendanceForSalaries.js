import React, { useEffect, useState } from "react";
import MasterTransaction from "../../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../../data/Jsons/hr/pay/AttendanceForSalary";
import PhFOperations from "../../../data/operation";
import axios from "axios";
import { useSelector } from "react-redux";
function AttendanceForSalaries() {
  const MTRef = useState();
  const [vaFields, setvAFields] = useState(meta.Fields);

  const [inputs, setInputs] = useState(() => {
    return meta.Fields.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Form.defValue;
        acc[field.second_element] = field.Query.value2;
        acc[field.rElement] = field.Form.defValue;
        if (field.type !== "hidden") {
          acc[field.Query.Operation] =
            PhFOperations[field.Query.defOperationValue].sign;
        }
      }
      return acc;
    }, {});
  });

  const sectionOptions = {

  };

  function preInsert() {
    return true;
  }

  function preUpdate() {
    return true;
  }

    // Function to toggle the isShown property of a field
    const toggleFieldVisibility = (fieldd) => {
      setvAFields((prevFields) =>
        prevFields.map((field) => {
          if (field.element === fieldd) {
            return { ...field, isShown: !field.isShown };
          }
          return field;
        })
      );
    };
  return (
    <>
      <MasterTransaction
        ref={MTRef}
        meta={meta}
        preInsert={preInsert}
        preUpdate={preUpdate}
        inputs={inputs}
        setInputs={setInputs}
        sectionOptions={sectionOptions}
        toggleFieldVisibility = {toggleFieldVisibility}
      ></MasterTransaction>
    </>
  );
}
export default AttendanceForSalaries;
