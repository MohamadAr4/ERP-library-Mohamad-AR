import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import EntryForm from "../../../../components/EntryForm/EntryForm";
import { meta } from "../../../../data/Jsons/hr/hr/mng/EmployeeCard";
import Example from "../../../../components/Modal/Modal";
import PhFOperations from "../../../../data/operation";
import axios from "axios";

function EmployeeCard(props) {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [TgradOption , setTgradOption] = useState([]);
  const [Wgstatus , setWgstatus] = useState([]);
  const [Appr , setAppr] = useState([]);

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
  const getAppr = async () => {
    let option;
    try {
      const url = `http://localhost:9090/phs/api/UC/Emp/AppraisalTemplatesMst/List`;
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
        setAppr(response.data.data.List);
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
  const getWgtatus = async () => {
    let option;
    try {
      const url = `http://localhost:9090/phs/api/UC/Emp/WorkGroups/List`;
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
        setWgstatus(response.data.data.List);
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
  const getTgrad = async () => {
    let option;
    try {
      const url = `http://localhost:9090/phs/api/UC/Emp/GradeTemplatesTrn/List`;
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
        setTgradOption(response.data.data.List);
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
  useEffect(()=>{
    getTgrad();
    getWgtatus();getAppr();
  },[]);

  const appr = Appr.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const aLevel = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpLevel
  );

  const Level = aLevel.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSection = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSection
  );

  const Section = aSection.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aEducation = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpEducation
  );

  const Education = aEducation.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aJob = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpJob
  );

  const Job = aJob.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec1 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification1
  );

  const Spec1 = aSpec1.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec2 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification2
  );

  const Spec2 = aSpec2.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec3 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification3
  );

  const Spec3 = aSpec3.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec4 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification4
  );

  const Spec4 = aSpec4.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aLocation = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpLocation
  );

  const Location = aLocation.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aDepartment = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpDepartment
  );

  const Department = aDepartment.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aNationality = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpNationality
  );

  const Nationality = aNationality.map((setting) => ({
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


  const aGender = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsGender
  );

  const Gender = aGender.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aMartial = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsMarital
  );

  const Martial = aMartial.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aLanguage = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpLanguage
  );

  const Language = aLanguage.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aMilitaryStatus = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsMilitaryStatus
  );

  const MilitaryStatus = aMilitaryStatus.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aStatus = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpStatus
  );

  const Status = aStatus.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));


  const Tgrad = TgradOption.map((setting) => ({
    value: setting.gradId,
    label: setting.grpName + '-' + setting.degreeName,

  }));
  const workshift = Wgstatus.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  function preInsert (){
    return true;
  }
  function preUpdate (){
    return true;
  }

  const sectionOptions = {
    gender : Gender,
    nationality : Nationality,
    military : MilitaryStatus,
    martial : Martial,
    language : Language,
    location : Location,
    education : Education,
    empstatus : Status,
    workShift : workshift,
    department : Department,
    section : Section,
    level : Level,
    job : Job,
    spc1 : Spec1,
    spc2 : Spec2,
    spc3 : Spec3,
    spc4 : Spec4,
    appr : appr,
    Tgrad : Tgrad,
  };

  console.log(sectionOptions);
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
export default EmployeeCard;
