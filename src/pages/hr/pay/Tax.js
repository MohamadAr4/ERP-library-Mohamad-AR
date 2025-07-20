import React, { useEffect, useRef, useState } from "react";
import MasterTransaction from "../../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../../data/Jsons/hr/pay/mng/Tax";
import PhFOperations from "../../../data/operation";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
function Tax() {
  const MTRef = useRef();
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const [vaFields, setvAFields] = useState(meta.Fields);
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
      <Header userMenu={userMenu} phsMenu={phsMenu}></Header>
      <MasterTransaction
        ref={MTRef}
        meta={meta}
        preInsert={preInsert}
        preUpdate={preUpdate}
        inputs={inputs}
        setInputs={setInputs}
        sectionOptions={sectionOptions}
        toggleFieldVisibility={toggleFieldVisibility}
      ></MasterTransaction>
    </>
  );
}
export default Tax;
