import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/att/qry/MissionRequest";
import { useState } from "react";

function MissionRequest() {
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);

  const aType = useSelector((state) => state.user.user.data.UsrCodes.EmpLeave);
  const Type = aType.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  let aRequestType = [
    {
      id: 0,
      name: getLabel("Leaves"),
      aCode: PhSettings.UsrCodes.EmpLeave,
      urlSearch: "/UC/Emp/LeaveRequest/Search/0/0",
      urlApprove: "/CC/HR/ApproveLeaveRequest",
      urlReject: "/CC/HR/RejectLeaveRequest",
    },
    {
      id: 1,
      name: getLabel("Missions"),
      aCode: PhSettings.UsrCodes.EmpMission,
      urlSearch: "/UC/Emp/MissionsRequest/Search/0/0",
      urlApprove: "/CC/HR/ApproveMissionRequest",
      urlReject: "/CC/HR/RejectMissionRequest",
    },
    {
      id: 2,
      name: getLabel("Overtimes"),
      aCode: PhSettings.UsrCodes.EmpOvertime,
      urlSearch: "/UC/Emp/OvertimeRequest/Search/0/0",
      urlApprove: "/CC/HR/ApproveOvertimeRequest",
      urlReject: "/CC/HR/RejectOvertimeRequest",
    },
  ];

  const sectionOptions = {
    aType: Type,
    requestType: aRequestType,
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
export default MissionRequest;
