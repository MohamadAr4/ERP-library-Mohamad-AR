import React, { useState } from "react";
import MasterTransaction from "../../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../../data/Jsons/hr/hr/ADMConsideration";
import { useSelector } from "react-redux";
import PhFOperations from "../../../data/operation";

function ADMConsideration() {
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

  const aType = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpConsideration
  );
  const aApprGroup = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpAppraisalGrp
  );

  const aApprItem = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpAppraisalItem
  );

  const type = aType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const ApprGroup = aApprGroup.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const ApprItem = aApprItem.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    appGroup: ApprGroup,
    itm: ApprItem,
    types: type,
  };

  function preInsert() {
    return true;
  }

  function preUpdate() {
    return true;
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
      ></MasterTransaction>
    </>
  );
}
export default ADMConsideration;
