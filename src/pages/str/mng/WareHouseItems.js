import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import EntryForm from "../../../components/EntryForm/EntryForm";
import { meta } from "../../../data/Jsons/str/mng/WareHouseItems";
import PhFOperations from "../../../data/operation";
import axios from "axios";
import { GetOptions } from "../../../data/Jsons/hr/hr/AppraisalNote";

function WareHouseItems(props) {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [stroeOption, setStoreOption] = useState([]);
  const [inputs, setInputs] = useState(() => {
    return meta.Fields.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Form.defValue.toString();
        acc[field.second_element] = field.Query.value2;
        acc[field.rElement] = field.Form.defValue.toString();
        if (field.type !== "hidden") {
          acc[field.Query.Operation] =
            PhFOperations[field.Query.defOperationValue].sign;
        }
      }
      return acc;
    }, {});
  });
  const getStoreoption = async () => {
    let option;
    try {
      const url = `http://localhost:9090/phs/api/UC/Str/Stores/List`;
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

  const stores = stroeOption.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  useEffect(() => {
    getStoreoption();
  }, []);

  function preInsert() {
    console.log(
      parseFloat(inputs.fldMinLimit) +
        "=" +
        parseFloat(inputs.fldReqLimit) +
        "=" +
        parseFloat(inputs.fldMaxLimit),
      parseFloat(inputs.fldMinLimit) <
        parseFloat(inputs.fldReqLimit) <
        parseFloat(inputs.fldMaxLimit)
    );
    if (
      parseFloat(inputs.fldMinLimit) < parseFloat(inputs.fldReqLimit) &&
      parseFloat(inputs.fldMinLimit) < parseFloat(inputs.fldMaxLimit) &&
      parseFloat(inputs.fldReqLimit) < parseFloat(inputs.fldMaxLimit) 
    ) {
      return true;
    } else {
      return false;
    }
  }


  function preUpdate() {
    console.log(
      parseFloat(inputs.fldMinLimit) +
        "=" +
        parseFloat(inputs.fldReqLimit) +
        "=" +
        parseFloat(inputs.fldMaxLimit),
      parseFloat(inputs.fldMinLimit) <
        parseFloat(inputs.fldReqLimit) <
        parseFloat(inputs.fldMaxLimit)
    );
    if (
      parseFloat(inputs.fldMinLimit) < parseFloat(inputs.fldReqLimit) &&
      parseFloat(inputs.fldMinLimit) < parseFloat(inputs.fldMaxLimit) &&
      parseFloat(inputs.fldReqLimit) < parseFloat(inputs.fldMaxLimit) 
    ) {
      return true;
    } else {
      return false;
    }
  }

  const PhStatusSetting = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsStatus
  );
  const Location1 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrLocation1
  );
  const Location2 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrLocation2
  );
  const Location3 = useSelector(
    (state) => state.user.user.data.UsrCodes.StrLocation3
  );

  const Statusoptions = PhStatusSetting.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  

  const Loc1 = Location1.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Loc2 = Location2.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Loc3 = Location3.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

  const sectionOptions = {
    status: Statusoptions,
    loc1: Loc1,
    loc2: Loc2,
    loc3: Loc3,
    store: stores,
  };
  const [vaFields, setvAFields] = useState(meta.Fields);

  // Function to toggle the isShown property of a field
  const toggleFieldVisibility = (fieldd) => {
    setvAFields((prevFields) =>
      prevFields.map((field) => {
        if (field.element === fieldd) {
          return { ...field, isShown: !field.isShown };
        }
        return field;
      })
    );
  };
  return (
    <>
      <main id="main" class="main">
        <Header userMenu={userMenu} phsMenu={phsMenu}></Header>
        <EntryForm
          sectionOptions={sectionOptions}
          aFields={meta}
          preInsert={preInsert}
          preUpdate= {preUpdate}
          inputs={inputs}
          setInputs={setInputs}
          Statusoptions={Statusoptions}
          vaFields={vaFields}
          toggleFieldVisibility={toggleFieldVisibility}
        ></EntryForm>
      </main>
    </>
  );
}
export default WareHouseItems;
