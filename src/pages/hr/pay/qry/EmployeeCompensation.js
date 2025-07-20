import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/pay/qry/EmployeeCompensation";
import { useEffect, useState } from "react";
import Header from "../../../../components/Header/Header";
import axios from "axios";
import BaseUrl from "../../../../data/contants";

function QueryEmployeeCompensation() {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  let aFields = meta;
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [vaFields, setvAFields] = useState(aFields.Fields);
  const [TaxOption , setTaxOption] = useState([]);

  //if some option have to be gettin it from Api call
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
        setTaxOption(response.data.data.List);
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

  const TaxBrackets = TaxOption.map((setting) => ({
    value: setting.id,
    label: setting.num + '-' + setting.name,
  }));

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

  const aCompensationType = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpComtype //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const CompensationType = aCompensationType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aType = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsAmountType//after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const type = aType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  
  const aStatus = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsStatus//after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Status = aStatus.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    comtype : CompensationType,
    AmtType : type,
    brkt : TaxBrackets,
    sec : Section,
    dep : Department,
    jobs: Job,
    lvl : Level,
    sec1 : Spec1,
    sec2 : Spec2,
    sec3 : Spec3,
    sec4 : Spec4,
    status : Status
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
export default QueryEmployeeCompensation;
