import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import EntryForm from "../../../../components/EntryForm/EntryForm";
import { meta } from "../../../../data/Jsons/hr/pay/mng/CompensationTypes";
import PhFOperations from "../../../../data/operation";
import axios from "axios";
import BaseUrl from "../../../../data/contants";

function CompensationTypes(props) {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const [vaFields, setvAFields] = useState(meta.Fields);
  const [option , setoption] = useState([]);
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
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

  const getExampleoption = async () => {
    let option;
    try {
      const url = `${BaseUrl}UC/Emp/TaxBracketsMaster/List`;
      const headers = {
        periodId: 2022,
        Accept: "application/json",
        Authorization: `Bearer ${PhToken}`,
        "Content-Type": "application/json",
      };
      console.log(headers);
      const response = await axios.post(url, [], { headers: headers });
      console.log(response);
      if (response.data.status === true) {
        setoption(response.data.data.List);
      }
    } catch (error) {
      console.error("Error fetching new store data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
    return option;
  };
  //then call the function one time in the page
  useEffect(() => {
    getExampleoption();
  }, []);

  const aOption = option.map((setting) => ({
    value: setting.id,
    label: setting.num + '-' + setting.name,
  }));


  const aType = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsAmountType
  );
  const Type = aType.map((setting) => ({
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

  const aCompensationType = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpComtype
  );
  const CompensationType = aCompensationType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));


    const sectionOptions = {
      brk : aOption,
      type : Type,
      comt : CompensationType,
      isd : YesNo,
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
          vaFields={vaFields}
          toggleFieldVisibility={toggleFieldVisibility}
        ></EntryForm>
      </main>
    </>
  );
}
export default CompensationTypes;
