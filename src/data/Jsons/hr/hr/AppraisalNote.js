import axios from "axios";
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
} from "../../../operation";
import BaseUrl from "../../../contants";

export const GetOptions = async (PhToken, userID , setNewOption , setInputs , inputs) => {
  let option;
  try {
    const url = `${BaseUrl}CC/HR/EmployeeAppraisalTemplate/${userID}`;
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
      option = response.data.data.Obj;
      console.log(":",inputs.fldAppraisal);
      setInputs(inputs => ({...inputs , fldAppraisal: `${response.data.data.Obj.num} - ${response.data.data.Obj.name}`}));
      console.log(":",inputs.fldAppraisal);
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
  
  setNewOption(prevOption => {
    // Return the new state based on prevOption
    return {...prevOption,...option};
  });
  return option , inputs;
};

let meta = {
  hasTable: false,
  hasParent: true,

  Generals: {
    title: "دليل المواد",
  },
  URLS: {
    New: { URl: `${BaseUrl}UC/Emp/AppraisalNotes/New`, Method: "POST" },
    Update: { URl: `${BaseUrl}UC/Emp/AppraisalNotes/`, Method: "PUT" },
    Delete: { URl: `${BaseUrl}UC/Emp/AppraisalNotes/`, Method: "DELETE" },
    Search: { URl: `${BaseUrl}UC/Emp/AppraisalNotes/Search/`, Method: "POST" },
    Get: { URl: `${BaseUrl}CC/HR/EmployeeAppraisalTemplate/`, Method: "GET" },
  },
  Fields: [
    {
      label: "Number",
      element: "Num",
      rElement: "NumName",
      field: "num",
      rField: "num",
      type: "text",
      dataType: 0,
      isForm: true,
      isShown: true,
      isAutocomplete: false,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "Name",
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
        divClass: "col-sm-4 px-0",
        autocomplete: false,
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
        dataType: 0,
        Operation: "1",
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
      second_Element : 'Ddate-second',
      field: "ddate",
      rField: "ddateName",
      type: "date",
      dataType: 3,
      isForm: true,
      isShown: true,
      hasSecondField : true,
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
        dataType: 0,
        Operation: "2",
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
      dataType: 4,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm phAutocomplete",
        isAutocomplete: true,
        autocomplete: {
          data_label: "Employee",
          data_acrel: "EmpId",
          data_acoperation: "/UC/Emp/Employee/Autocomplete",
          data_params: "acParams",
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
        autocomplete: false,
        divClass: "col-sm-4 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: true,
        autocomplete: {
          data_label: "Employee",
          data_acrel: "EmpId",
          data_acoperation: "/UC/Emp/Employee/Autocomplete",
          data_params: "acParams",
        },
        dataType: 4,
        Operation: "3",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Appraisal.Temp",
      element: "fldAppraisal",
      rElement: "fldAppraisalName",
      field: "apprisalTemp",
      rField: "apprisalTemp",
      type: "text",
      dataType: 4,
      isForm: true,
      isShown: true,
      Form: {
        disabled: true,
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        divClass: "col-sm-4 px-0",
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: false,
      },
      isQuery: false,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-4 px-0",
        autocomplete: false,
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
        dataType: 4,
        Operation: "5",
        options: "",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Appraisal.Group",
      element: "fldApprgrpId",
      rElement: "fldApprgrpName",
      field: "apprgrpId",
      rField: "apprgrpName",
      type: "select",
      dataType: 4,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        options: "appGroup",
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        divClass: "col-sm-4 px-0",
        autocomplete: false,
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: true,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 4,
        Operation: "4",
        options: "appGroup",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Appraisal.Item",
      element: "fldAppritmId",
      rElement: "fldAppritmName",
      field: "appritmId",
      rField: "appritmName",
      type: "select",
      dataType: 4,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        divClass: "col-sm-4 px-0",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        options: "itm",
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        divClass: "col-sm-4 px-0",
        autocomplete: false,
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: true,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 4,
        Operation: "4",
        options: "itm",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Type",
      element: "fldTypeId",
      rElement: "fldTypeName",
      field: "typeId",
      rField: "typeName",
      type: "select",
      dataType: 4,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        options: "types",
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        divClass: "col-sm-4 px-0",
        autocomplete: false,
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: true,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 4,
        Operation: "4",
        options: "types",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Points",
      element: "fldPoints",
      rElement: "fldPointsName",
      field: "points",
      rField: "points",
      type: "text",
      dataType: 4,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-4 px-0",
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
        divClass: "col-sm-4 px-0",
        autocomplete: false,
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "Cost Account",
          data_acrel: "fldCstAccId",
          data_acoperation: "/UC/Acc/GrantedAccount/Autocomplete",
          data_params: "acParams",
        },
        dataType: 4,
        Operation: "5",
        options: "",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Rem",
      element: "fldRem",
      rElement: "rem",
      field: "rem",
      rField: "rem",
      type: "text",
      dataType: 0,
      isForm: true,
      isShown: true,
      Form: {
        labelClass: "col-sm-1 form-label ph-label text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        options: "sec3",
        autocomplete: {
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
        inputClass: "form-control form-control-sm col-sm",
        autocomplete: false,
        divClass: "col-sm-4 px-0",
        isRequired: false,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "8",
        options: "rem",
        aOperations: [
          PhFOper_EQ,
          PhFOper_ST,
          PhFOper_NE,
          PhFOper_NCT,
          PhFOper_NED,
          PhFOper_NST,
          PhFOper_CT,
          PhFOper_ED,
        ],
        defOperationValue: PhFOper_NCT,
        tableWidth: "10",
      },
    },
    {
      element: "fldId",
      rElement: "fldIdName",
      field: "id",
      rField: "",
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
