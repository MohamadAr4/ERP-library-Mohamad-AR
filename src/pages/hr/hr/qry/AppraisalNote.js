import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/hr/qry/AppraisalNote";
import { useState } from "react";

function AppraisalNote (){
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);
  const aType = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsSign
  );
  const aApprGroup = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpAppraisalGrp
  );

  const aApprItem = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpAppraisalItem
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
  const aLevel = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpLevel
  );
  const Level = aLevel.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const type = aType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const ApprGroup = aApprGroup.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const ApprItem = aApprItem.map((setting) => ({
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
    appGroup:ApprGroup,
    itm : ApprItem,
    types : type,
    jobs : Job ,
    dep : Department,
    sec: Section,
    lvl: Level,
    sec1: Spc1,
    sec2: Spc2,
    sec3: Spc3,
    sec4: Spc4,
  };

  return(
    <>
    <QueryForm meta = {meta} vaFields={vaFields} setvAFields = {setvAFields} sectionOptions = {sectionOptions}></QueryForm>
    </>
  )
}
export default AppraisalNote;