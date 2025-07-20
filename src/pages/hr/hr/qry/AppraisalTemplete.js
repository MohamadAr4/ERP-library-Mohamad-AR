import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/hr/qry/ApprisalTemplete";
import { useState } from "react";

function ApprisalTemplete (){
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);

  const aApprGroup = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpAppraisalGrp
  );

  const aApprItem = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpAppraisalItem
  );

  const ApprGroup = aApprGroup.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const ApprItem = aApprItem.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    appGroup:ApprGroup,
    itm : ApprItem,
  };

  return(
    <>
    <QueryForm meta = {meta} vaFields={vaFields} setvAFields = {setvAFields} sectionOptions = {sectionOptions}></QueryForm>
    </>
  )
}
export default ApprisalTemplete;