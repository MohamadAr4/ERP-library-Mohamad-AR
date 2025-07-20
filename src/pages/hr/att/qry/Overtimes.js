import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/att/qry/LeaveRequest";
import { useState } from "react";

function Overtimes() {
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);
  const aJob = useSelector((state) => state.user.user.data.UsrCodes.EmpJob);
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
  const aLevel = useSelector((state) => state.user.user.data.UsrCodes.EmpLevel);
  const Level = aLevel.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aType = useSelector((state) => state.user.user.data.UsrCodes.EmpOvertime);
  const Type = aType.map((setting) => ({
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
    aJob: Job,
    aDepartment: Department,
    aSection: Section,
    aLevel: Level,
    aSpec1: Spc1,
    aSpec2: Spc2,
    aSpec3: Spc3,
    aSpec4: Spc4,
    aType : Type,
  };

  return (
    <>
      <QueryForm
        meta={meta}
        vaFields={vaFields}
        setvAFields={setvAFields}
        sectionOptions={sectionOptions}
      ></QueryForm>
    </>
  );
}
export default Overtimes;
