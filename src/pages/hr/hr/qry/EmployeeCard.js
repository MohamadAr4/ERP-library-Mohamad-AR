import { meta } from "../../../../data/Jsons/hr/hr/qry/EmployeeCard"
import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { useState } from "react";
function EmployeeCardQuery(){
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);
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
    (state) => state.user.user.data.PhsCodes.aMartial
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
  // const Martial = aMartial.map((setting) => ({
  //   value: setting.id,
  //   label: setting.name,
  // }));
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

  const sectionOptions = {
    gender:Gender,
    militry : MilitaryStatus,
    nat : Nationality,
    jobs : Job ,
    dep : Department,
    // mat: Martial,
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
  };
  return(<>
  <QueryForm meta = {meta} vaFields={vaFields} setvAFields = {setvAFields} sectionOptions = {sectionOptions}></QueryForm>
  </>)
}
export default EmployeeCardQuery;