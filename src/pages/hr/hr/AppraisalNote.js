import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import EntryForm from "../../../components/EntryForm/EntryForm";
import { meta } from "../../../data/Jsons/hr/hr/AppraisalNote";
import { GetOptions } from "../../../data/Jsons/hr/hr/AppraisalNote";
import PhFOperations from "../../../data/operation";
function AppraisalNote(props) {
  const EntryFormRef = useRef();
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const [newOption, setNewOption] = useState(null);
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

  const aType = useSelector((state) => state.user.user.data.PhsCodes.PhsSign);

  const type = aType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const ApprGroup = newOption
    ? newOption.aList.map((setting, index) => ({
        value: newOption.aList[index].apprgrpId,
        label: newOption.aList[index].apprgrpName,
      }))
    : [];

  const ApprItem = newOption
    ? newOption.aList
        .filter((item) => item.apprgrpId === inputs.fldApprgrpId) // Filter items first
        .map((filteredItem, index) => ({
          value: filteredItem.appritmId,
          label: filteredItem.appritmName,
        }))
    : [];

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
          setInputs={setInputs}
          setNewOption={setNewOption}
          sectionOptions={sectionOptions}
          aFields={meta}
          vaFields={vaFields}
          toggleFieldVisibility={toggleFieldVisibility}
        ></EntryForm>
      </main>
    </>
  );
}
export default AppraisalNote;
