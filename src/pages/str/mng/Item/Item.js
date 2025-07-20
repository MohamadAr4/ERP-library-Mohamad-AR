import React, { useState } from "react";
import Header from "../../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import EntryForm from "../../../../components/EntryForm/EntryForm";
import { meta } from "../../../../data/Jsons/str/mng/Fields/aQFields/aQfields";
import PhFOperations from "../../../../data/operation";

function Items(props) {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
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

  const PhStatusSetting = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsStatus
  );
  const aSpc1 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification1
  );
  const aSpc2 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification2
  );
  const aSpc3 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification3
  );
  const aSpc4 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification4
  );
  const aSpc5 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification5
  );
  const aUnit = useSelector(
    (state) => state.user.user.data.CpyCodes.CpyCodeUnit
  );
  const Statusoptions = PhStatusSetting.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc1 = aSpc1.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc2 = aSpc2.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc3 = aSpc3.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc4 = aSpc4.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc5 = aSpc5.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const unit = aUnit.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const sectionOptions = {
    status: Statusoptions,
    sec1: Spc1,
    sec2: Spc2,
    sec3: Spc3,
    sec4: Spc4,
    sec5: Spc5,
    unit: unit,
  };
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

  function preInsert () {
    return true;
  }

  function preUpdate () {
    return true;
  }

  return (
    <>
      <main id="main" class="main">
        <Header userMenu={userMenu} phsMenu={phsMenu}></Header>
        <EntryForm
          sectionOptions={sectionOptions}
          aFields={meta}
          inputs = {inputs}
          preInsert = {preInsert}
          preUpdate = {preUpdate}
          setInputs = {setInputs}
          Statusoptions={Statusoptions}
          vaFields={vaFields}
          toggleFieldVisibility={toggleFieldVisibility}
        ></EntryForm>
      </main>
    </>
  );
}
export default Items;
