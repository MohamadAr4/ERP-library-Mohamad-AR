import React, { useEffect, useState } from "react";
import MasterTransaction from "../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../data/Jsons/str/Inbounds";
import PhFOperations from "../../data/operation";
import axios from "axios";
import { useSelector } from "react-redux";
function Inbounds() {
  const MTRef = useState();
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [stroeOption, setStoreOption] = useState([]);
  const [inputs, setInputs] = useState(() => {
    return meta.Fields.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Form.defValue;
        acc[field.second_element] = field.Query.value2;
        acc[field.rElement] = field.Form.defValue;
        if (field.type !== "hidden") {
          acc[field.Query.Operation] =
            PhFOperations[field.Query.defOperationValue].sign;
        }
      }
      return acc;
    }, {});
  });
  const resetCorrespondingField = (event, field, rowIndex) => {
    MTRef.current?.setRows((prevRows) => {
      const updatedRows = [...prevRows];
      if (field.field === "qnt") {
        const quantityField = meta.Column.find((f) => f.field === "qnt");
        const priceField = meta.Column.find((f) => f.field === "price");
        const amountField = meta.Column.find((f) => f.field === "amt");
        if (quantityField) {
          console.log(
            "price before parse",
            updatedRows[rowIndex][priceField.field]
          );
          if (updatedRows[rowIndex][priceField.field] === undefined) {
            updatedRows[rowIndex][amountField.field] = 0;
          } else {
            updatedRows[rowIndex][amountField.field] =
              parseFloat(updatedRows[rowIndex][quantityField.field]) *
              parseFloat(updatedRows[rowIndex][priceField.field]);
          }
        }
      } else if (field.field === "price") {
        const quantityField = meta.Column.find((f) => f.field === "qnt");
        const priceField = meta.Column.find((f) => f.field === "price");
        const amountField = meta.Column.find((f) => f.field === "amt");
        if (priceField) {
          if (updatedRows[rowIndex][priceField.field] === undefined) {
            updatedRows[rowIndex][amountField.field] = 0;
          } else {
            updatedRows[rowIndex][amountField.field] =
              parseFloat(updatedRows[rowIndex][quantityField.field]) *
              parseFloat(updatedRows[rowIndex][priceField.field]);
          }
        }
      }
      return updatedRows;
    });
  };

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

  const aDoucumnet = useSelector(
    (state) => state.user.user.data.UsrCodes.StrDocument
  );

  const document = aDoucumnet.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));

function preInsert () {
  return true ;
}

function preUpdate () {
  console.log(inputs.fldVhrId);
  if(inputs.fldVhrId === null){
    return true;
  }else{
    return false;
  }
}

  const stores = stroeOption.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  useEffect(() => {
    getStoreoption();
  }, []);
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
  const sectionOptions = {
    store : stores,
    doc : document,
  };
  return (
    <>
      <MasterTransaction
        ref={MTRef}
        meta={meta}
        preInsert = {preInsert}
        preUpdate = {preUpdate}
        inputs={inputs}
        setInputs={setInputs}
        sectionOptions={sectionOptions}
        resetCorrespondingField={resetCorrespondingField}
      ></MasterTransaction>
    </>
  );
}
export default Inbounds;
