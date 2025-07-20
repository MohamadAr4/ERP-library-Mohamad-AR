import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/pay/qry/DeductionTypes";
import { useEffect, useState } from "react";
import BaseUrl from "../../../../data/contants";
import axios from "axios";

function QueryDeductionTypes() {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);

  const aAmount = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsAmountType//after data we put the objet that we want to get the option from ex : UsrCodes.StrTransactionType
  );
  const Amount = aAmount.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
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
export default QueryDeductionTypes;
