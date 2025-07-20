import { useSelector } from "react-redux";
import QueryForm from "../../../../components/QueryForm/QueryForm";
import { meta } from "../../../../data/Jsons/hr/hr/qry/GradeGroups";
import { useEffect, useState } from "react";
import axios from "axios";

function GrandGroup (){
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [GradeOption, setGradeOption] = useState([]);
  const aDeggre = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpGraddegree
  );
  const Deggre = aDeggre.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const aYesNo = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsYesno
  );
  const EmpGroup = useSelector(
    (state) => state.user.user.data.UsrCodes.EmpGradgrp
  );
  const EmployeeGroup = EmpGroup.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const YesNo = aYesNo.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const getStoreoption = async () => {
    let option;
    try {
      const url = `http://localhost:9090/phs/api/UC/Emp/GradeTemplatesMst/List`;
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
        setGradeOption(response.data.data.List);
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

  useEffect(()=>{
    getStoreoption();
  },[]);

  const GradeGroup = GradeOption.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const sectionOptions = {
    templete :GradeGroup ,
    workGroup : EmployeeGroup,
    gradDegree :Deggre ,
    defaultName :YesNo ,
  };

  return(
    <>
    <QueryForm meta = {meta} vaFields={vaFields} setvAFields = {setvAFields} sectionOptions = {sectionOptions}></QueryForm>
    </>
  )
}
export default GrandGroup;