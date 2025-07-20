import { meta } from "../../../../data/Jsons/hr/hr/qry/EmployeeCardStatistics"
import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { useEffect, useState } from "react";
import axios from "axios";
function EmployeeCardStatistics(){
  let aFields = meta;
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [vaFields, setvAFields] = useState(aFields.Fields);
  const [TgradOption , setTgradOption] = useState([]);
  const [Wgstatus , setWgstatus] = useState([]);
  const aNationality = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpNationality
  );
  const aLevel = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpLevel
  );
  const aEducation = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpEducation
  );
  const aGender = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsGender
  );
  const aJob = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpJob
  );
  const aSection = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSection
  );
  const aDepartment = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpDepartment
  );
  const aSpc1 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification1
  );
  const aSpc2 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification2
  );
  const aSpc3 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification3
  );
  const aSpc4 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification4
  );
  const aMartial = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsMarital
  );
  const aLanguage = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpLanguage
  );
  const aMilitaryStatus = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsMilitaryStatus
  );
  const aEmpStatus = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpStatus
  );
  const Level = aLevel.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Language = aLanguage.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const MilitaryStatus = aMilitaryStatus.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Martial = aMartial.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const EmpStatus = aEmpStatus.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Nationality = aNationality.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Education = aEducation.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Gender = aGender.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Job = aJob.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Section = aSection.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Department = aDepartment.map((setting) => ({
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
  const Tgrad = TgradOption.map((setting) => ({
    value: setting.gradId,
    label: setting.grpName + '-' + setting.degreeName,

  }));
  const workshift = Wgstatus.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  console.log(Tgrad)
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
    getWgtatus();
  },[]);
  const sectionOptions = {
    gender:Gender,
    militry : MilitaryStatus,
    nat : Nationality,
    jobs : Job ,
    dep : Department,
    mat: Martial,
    edu: Education,
    lang: Language,
    employeeStatus : EmpStatus,
    dep : Department,
    sec : Section,
    emplvl : Level,
    sec1: Spc1,
    sec2: Spc2,
    sec3: Spc3,
    sec4: Spc4,
    tgrand : Tgrad,
    shiftStatus : workshift,

  };
  return(<>
  <QueryForm meta = {meta} vaFields={vaFields} setvAFields = {setvAFields} sectionOptions = {sectionOptions}></QueryForm>
  </>)
}
export default EmployeeCardStatistics;