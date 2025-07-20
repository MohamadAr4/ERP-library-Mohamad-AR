import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/pay/qry/CompensationTypes";
import { useEffect, useState } from "react";
import BaseUrl from "../../../../data/contants";
import axios from "axios";

function CompensatiosTypesQuery() {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  let aFields = meta;
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

  const aCompensationType = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpComtype //after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const CompensationType = aCompensationType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aAmount = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsAmountType//after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Amount = aAmount.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aTaxpay = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsAmountType//after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const aaxpay = aTaxpay.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    comp: CompensationType,
    tax: TaxBrackets,
    amountt : Amount,
  };

  return (
    <>
    {/* <Header userMenu={userMenu} phsMenu={phsMenu}></Header> */}
      <QueryForm
        meta={meta}
        vaFields={vaFields}
        setvAFields={setvAFields}
        sectionOptions={sectionOptions}
      ></QueryForm>
    </>
  );
}
export default CompensatiosTypesQuery;
