import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/pay/qry/LoanPayments";
import { useState } from "react";
import Header from "../../../../components/Header/Header";

function LoanPayment() {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);

  const aJob = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpJob //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Job = aJob.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSection = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSection //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Section = aSection.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aDepartment = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpDepartment //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Department = aDepartment.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec1 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification1 //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Spec1 = aSpec1.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec2 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification2 //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Spec2 = aSpec2.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec3 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification3 //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Spec3 = aSpec3.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSpec4 = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpSpecification4 //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Spec4 = aSpec4.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aLevel = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpLevel //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Level = aLevel.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aYesNo = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsYesno//after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const YesNo = aYesNo.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aSource = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsSource//after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Source = aSource.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    pflg: YesNo,
    ploan : Source,
    sec : Section,
    dep : Department,
    jobs: Job,
    lvl : Level,
    sec1 : Spec1,
    sec2 : Spec2,
    sec3 : Spec3,
    sec4 : Spec4
  };

  return (
    <>
    {/* <Hea userMenu={userMenu} phsMenu={phsMenu}></Hea> */}
      <QueryForm
        meta={meta}
        vaFields={vaFields}
        setvAFields={setvAFields}
        sectionOptions={sectionOptions}
      ></QueryForm>
    </>
  );
}
export default LoanPayment;
