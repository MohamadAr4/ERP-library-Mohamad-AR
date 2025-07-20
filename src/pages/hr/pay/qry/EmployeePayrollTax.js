import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/pay/qry/EmployeePayrollTax";
import { useEffect, useState } from "react";

function QueryEmployeePayrollTax() {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  let aFields = meta;
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [vaFields, setvAFields] = useState(aFields.Fields);

  const sectionOptions = {};

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
export default QueryEmployeePayrollTax;
