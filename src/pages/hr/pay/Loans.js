import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import EntryForm from "../../../components/EntryForm/EntryForm";
import { meta } from "../../../data/Jsons/hr/pay/Loans";
import PhFOperations from "../../../data/operation";

function Loans(props) {
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

    const aStatus = useSelector(
      (state) => state.user.user.data.PhsCodes.PhsStatus
    );
    const Statusoptions = aStatus.map((setting) => ({
      value: setting.id,
      label: setting.name,
    }));

    const aYesNo = useSelector(
      (state) => state.user.user.data.PhsCodes.PhsYesno
    );
    const YesNo = aYesNo.map((setting) => ({
      value: setting.id,
      label: setting.name,
    }));
  
    const sectionOptions = {
      status: Statusoptions,
      pflg: YesNo,
    };


  function preInsert (){
    return true;
  }
  function preUpdate (){
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
      <main id="main" class="main">
        <Header userMenu={userMenu} phsMenu={phsMenu}></Header>
        <EntryForm
          sectionOptions={sectionOptions}
          aFields={meta}
          preInsert= {preInsert}
          preUpdate = {preUpdate}
          inputs = {inputs}
          setInputs = {setInputs}
          Statusoptions={Statusoptions}
          vaFields={vaFields}
          toggleFieldVisibility={toggleFieldVisibility}
        ></EntryForm>
      </main>
    </>
  );
}
export default Loans;
