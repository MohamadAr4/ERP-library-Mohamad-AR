import PhFOperations, {
  PhFOper_EQ,
  PhFOper_NE,
  PhFOper_GT,
  PhFOper_GE,
  PhFOper_LT,
  PhFOper_LE,
  PhFOper_BT,
  PhFOper_NB,
  PhFOper_ST,
  PhFOper_ED,
  PhFOper_CT,
  PhFOper_NST,
  PhFOper_NED,
  PhFOper_NCT,
  PhFC_Text,
  PhFC_Autocomplete,
  PhFC_Select,
  PhFC_DatePicker,
  PhFC_Number,
} from "../../../operation";
import BaseUrl from "../../../contants";
import axios from "axios";
export const GetOptions = async (
  PhToken,
  userID,
  setNewOption,
  setInputs,
  inputs
) => {
  let option1;
  try {
    const url = `${BaseUrl}CC/HR/EmployeeGradeTemplate/${userID}`;
    const headers = {
      periodId: 2022,
      Accept: "application/json",
      Authorization: `Bearer ${PhToken}`,
      "Content-Type": "application/json",
    };
    console.log(headers);
    const response = await axios.get(url, { headers: headers });
    console.log(response);
    if (response.data.status === true) {
      response.data.data.Obj.aList.map((option, optionIndex) => {
        if (response.data.data.TGrad_Id === option.id) {
          option1 = option;
          setInputs((inputs) => ({
            ...inputs,
            TgradOId: `${option.grpName} - ${option.degreeName}`,
          }));
          setInputs((inputs) => ({ ...inputs, tgradOid: `${option.id}` , tgradOName : `${option.grpId}` }));
        }
        setNewOption((prevOption) => {
          // Return the new state based on prevOption
          return  response.data.data.Obj.aList ;
        });
      });
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

  return inputs;
};
let meta = {
  hasTable: false,
  hasParent: true,
  Generals: {
    title: "GradeChange",
  },
  URLS: {
    New: {
      URl: `${BaseUrl}UC/Emp/GradeChange/New`,
      Method: "POST",
    },
    Update: {
      URl: `${BaseUrl}UC/Emp/GradeChange/`,
      Method: "PUT",
    },
    Delete: {
      URl: `${BaseUrl}UC/Emp/GradeChange/`,
      Method: "DELETE",
    },
    Search: {
      URl: `${BaseUrl}UC/Emp/GradeChange/Search/`,
      Method: "POST",
    },
    Get: {
      URl: `${BaseUrl}UC/Emp/GradeChange/`,
      Method: "GET",
    },
  },
  Fields: [
    {
      label: "Number",
      element: "Num",
      second_element: "Num-second", //if the field does not have second field this key must be removed
      rElement: "Num",
      field: "num",
      rField: "num",
      type: "text",
      dataType: PhFC_Number,
      isShown: true,
      hasSecondField: true, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-2 px-0", //if it doesnt have second field "col-sm-4 px-0"
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Number,
        Operation: "num", //must be unique
        aOperations: [
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_BT,
          PhFOper_NB,
          PhFOper_ST,
          PhFOper_ED,
          PhFOper_CT,
          PhFOper_NST,
          PhFOper_NED,
          PhFOper_NCT,
        ],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Date",
      element: "Ddate",
      second_element: "Ddate-second",
      field: "ddate",
      rField: "ddateName",
      type: "date",
      dataType: PhFC_DatePicker,
      isForm: true,
      isShown: true,
      hasSecondField: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        maxDate: "",
        minDate: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-4 px-0",
        autocomplete: false,
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_DatePicker,
        Operation: "ddate",
        aOperations: [
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_BT,
          PhFOper_NB,
        ],
        defOperationValue: PhFOper_GT,
        tableWidth: "10",
      },
    },
    {
      label: "Employee",
      element: "fldEmpId",
      rElement: "fldEmpName",
      field: "empId",
      rField: "empName",
      type: "text",
      dataType: PhFC_Autocomplete,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm phAutocomplete",
        isAutocomplete: true,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "/UC/Emp/Employee/Autocomplete", //Api Endpoint for AutoComplete
          data_params: "",
        },
        callback: {
          onchange: GetOptions,
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm phAutocomplete",
        divClass: "col-sm-4 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: true,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "/UC/Emp/Employee/Autocomplete", //Api Endpoint for AutoComplete
          data_params: "",
        },

        dataType: PhFC_Autocomplete,
        Operation: "empId", //must be unique
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Old.Grade",
      element: "TgradOId",
      rElement: "TgradOName",
      field: "tgradOid",
      rField: "tgradOName",
      type: "text",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm ",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
        disabled: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        autocomplete: false,
        divClass: "col-sm-4 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Select,
        Operation: "oldGrad",
        options: "oldGrade", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "New.Grade",
      element: "TgradNId",
      rElement: "TgradNName",
      field: "tgradNid",
      rField: "tgradNName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "newGrade",
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        autocomplete: false,
        divClass: "col-sm-4 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Select,
        Operation: "newGrad",
        options: "newGrade",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Grad.Start.Date",
      element: "SDate",
      second_element: "SDate-second",
      field: "sdate",
      rField: "sdateName",
      type: "date",
      dataType: PhFC_DatePicker,
      isForm: true,
      isShown: true,
      hasSecondField: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        maxDate: "",
        minDate: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-4 px-0",
        autocomplete: false,
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_DatePicker,
        Operation: "sdate",
        aOperations: [
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_BT,
          PhFOper_NB,
        ],
        defOperationValue: PhFOper_GT,
        tableWidth: "10",
      },
    },
    {
      label: "Grad.Days",
      element: "Days",
      second_element: "Days-second", //if the field does not have second field this key must be removed
      rElement: "DaysName",
      field: "days",
      rField: "days",
      type: "text",
      dataType: PhFC_Number,
      isShown: true,
      hasSecondField: true, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-2 px-0", //if it doesnt have second field "col-sm-4 px-0"
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Number,
        Operation: "Gradnum", //must be unique
        aOperations: [
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_BT,
          PhFOper_NB,
          PhFOper_ST,
          PhFOper_ED,
          PhFOper_CT,
          PhFOper_NST,
          PhFOper_NED,
          PhFOper_NCT,
        ],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Rem",
      element: "Rem",
      rElement: "Remname",
      field: "rem",
      rField: "rem",
      type: "text",
      dataType: PhFC_Text,
      isShown: true,
      hasSecondField: false, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: false,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-4 px-0", //if it doesnt have second field "col-sm-4 px-0"
        isRequired: false,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Text,
        Operation: "rem", //must be unique
        aOperations: [
          PhFOper_CT,
          PhFOper_NCT,
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_ST,
          PhFOper_NST,
          PhFOper_ED,
          PhFOper_NED,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      element: "fldId",
      rElement: "fldName",
      field: "id",
      rField: "id",
      type: "hidden",
      dataType: 0,
      isForm: false,
      isShown: false,
      Form: {
        labelClass: "",
        inputClass: "",
        isAutocomplete: false,
        options: "",
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: 0,
        isRequired: false,
      },
      isQuery: false,
      Query: {},
    },
  ],
};

export { meta };
