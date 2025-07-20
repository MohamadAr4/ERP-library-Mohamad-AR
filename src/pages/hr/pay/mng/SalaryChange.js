import React, { useEffect, useState } from "react";
import MasterTransaction from "../../../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../../../data/Jsons/hr/pay/mng/SalaryChange";
import PhFOperations from "../../../../data/operation";
import axios from "axios";
import { useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
import BaseUrl from "../../../../data/contants";
function SalaryChange() {
  const MTRef = useState();
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [vaFields, setvAFields] = useState(meta.Fields);
  const [brktOption, setBrktOption] = useState([]);

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

  //if some option have to be gettin it from Api call
  
  const getExampleoption = async () => {
    let option;
    try {
      const url = `${BaseUrl}UC/Emp/ChangesalaryBracketsMst/Search/0/0`;
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
        setBrktOption(response.data.data.List);
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

  const brkt = brktOption.map((setting , index) => ({
    value: setting.id,
    label: setting.name,
    // id : setting.aList[index].amt,
    // eamt : setting.aList[index].eamt,
    // samt : setting.aList[index].samt,
  }));

  const aType = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpChangeType //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Type = aType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));


  const aSalaryType = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpAffectedSalary //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const SalaryType = aSalaryType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));


  const sectionOptions = {
   brk : brkt,
   type : Type,
   SType : SalaryType
  };

  function preInsert() {
    return true;
  }

  function preUpdate() {
    return true;
  }
  console.log("Type" , Type);
  console.log("Salary Type" , SalaryType);
  console.log("brackets" , brkt);
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
export default SalaryChange;
