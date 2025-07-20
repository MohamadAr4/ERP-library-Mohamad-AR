import React, { useState } from "react";
import MasterTransaction from "../../../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../../../data/Jsons/hr/hr/mng/GradeGroups";
import { useSelector } from "react-redux";
import PhFOperations from "../../../../data/operation";

function GradeGroups() {
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
  const aGroup = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpGradgrp
  );

  const Group = aGroup.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aDeggre = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpGraddegree
  );

  const Deggre = aDeggre.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    workGroup: Group,
    GradDegree: Deggre,
  };

  function preInsert() {
    return true;
  }

  function preUpdate() {
    return true;
  }

  function afterGet (response , setAfterGetMessage) {
    meta.callBack.afterGet(response , setAfterGetMessage);
  }

  return (
    <>
      <MasterTransaction
        preInsert={preInsert}
        preUpdate={preUpdate}
        ref={MTRef}
        meta={meta}
        inputs={inputs}
        setInputs={setInputs}
        sectionOptions={sectionOptions}
        afterGet= {afterGet}
      ></MasterTransaction>
    </>
  );
}
export default GradeGroups;
