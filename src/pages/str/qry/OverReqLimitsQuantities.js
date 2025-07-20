import React, { useState , useEffect } from "react";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import QueryForm from "../../../components/QueryForm/QueryForm";
import {meta} from '../../../data/Jsons/str/qry/OverReqLimitsQuantities';
import axios from "axios";
function OverReqLimitsQuantities(){
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [stroeOption, setStoreOption] = useState([]);
  const getStoreoption = async () => {
    let option;
    try {
      const url = `	http://localhost:9090/phs/api/UC/Str/Stores/List`;
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
        setStoreOption(response.data.data.List);
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
  useEffect(() => {
    getStoreoption();
  }, []);
  const stores = stroeOption.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const PhStatusSetting = useSelector(
    (state) => state.user.user.data.PhsCodes.Status
  );
  const aSpc1 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification1
  );
  const aSpc2 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification2
  );
  const aSpc3 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification3
  );
  const aSpc4 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification4
  );
  const aSpc5 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrSpecification5
  );
  // const Statusoptions = PhStatusSetting.map((setting) => ({
  //   value: setting.id,
  //   label: setting.name,
  // }));
  const aLocation1 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrLocation1
  );
  const aLocation2 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrLocation1
  );
  const aLocation3 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrLocation1
  );
  const Unit = useSelector(
    (state) => state.user.user.data.CpyCodes.CpyCodeUnit
  );
  const unit = Unit.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Location1 = aLocation1.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Location2 = aLocation2.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Location3 = aLocation3.map((setting) => ({
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
  const Spc5 = aSpc5.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    sec1: Spc1,
    sec2: Spc2,
    sec3: Spc3,
    sec4: Spc4,
    sec5: Spc5,
    unit : unit,
    store: stores,
    loc1name: Location1,
    loc2name: Location2,
    loc3name: Location3,
  };

  const [vaFields, setvAFields] = useState(meta.Fields);

  return(
    <>
    <main id="main" class="main">
        <Header userMenu={userMenu} phsMenu={phsMenu}></Header>
        <QueryForm meta = {meta} vaFields={vaFields} setvAFields = {setvAFields} sectionOptions = {sectionOptions}></QueryForm>
        
    </main>
    </>
  );
}
export default OverReqLimitsQuantities;