import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import EntryForm from "../../../components/EntryForm/EntryForm";
import { meta } from "../../../data/Jsons/hr/hr/GradeChange";
import PhFOperations from "../../../data/operation";
function EntryGradeChange(props) {
  const EntryFormRef = useRef();
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const [newOption, setNewOption] = useState([]);

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

  const NGrade = newOption
    ? newOption.map((setting) => {
        if (inputs.tgradOName === setting.grpId) {
          return {
            value: setting.grpId,
            label: setting.grpName + "-" + setting.degreeName,
          };
        }
        else{
          return ;
        }
      }).filter((f) => f !== undefined)
    : [];


  const sectionOptions = {
    newGrade: NGrade,
  };

  function preInsert() {
    return true;
  }

  function preUpdate() {
    return true;
  }
  const [vaFields, setvAFields] = useState(meta.Fields);

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
      <main id="main" class="main">
        <Header userMenu={userMenu} phsMenu={phsMenu}></Header>
        <EntryForm
          preInsert={preInsert}
          preUpdate={preUpdate}
          ref={EntryFormRef}
          inputs={inputs}
          setNewOption={setNewOption}
          setInputs={setInputs}
          sectionOptions={sectionOptions}
          aFields={meta}
          vaFields={vaFields}
          toggleFieldVisibility={toggleFieldVisibility}
        ></EntryForm>
      </main>
    </>
  );
}
export default EntryGradeChange;
