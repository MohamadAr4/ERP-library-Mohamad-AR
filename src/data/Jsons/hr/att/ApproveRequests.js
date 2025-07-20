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
  PhFC_Number,
  PhFC_DatePicker,
} from "../../../operation";
import BaseUrl from "../../../contants";

function changeSearchUrl () {
  
}

let meta = {
  hasTable: false,
  hasParent: true,
  Generals: {
    title: "Leaves",
  },
  URLS: {
    New: {},
    Update: {},
    Delete: {},
    Search: {
      URl: `${BaseUrl}UC/Emp/Leaves/Search/`,
      Method: "POST",
    },
    Get: {},
  },
  Fields: [
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
    {
      label: "Requset Type",
      element: "fldTypeId",
      rElement: "fldTypeName",
      field: "typeId",
      rField: "typeName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "requestType", //we need to remmember it
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
        Operation: "typeId", //must be unique
        options: "requestType", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
        callback : {
          onchange : changeSearchUrl
        }
      },
    },
    {
      label: "Num",
      element: "fldNum",
      second_element: "fldNum-second", //if the field does not have second field this key must be removed
      rElement: "fldNumName",
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
        isRequired: false,
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
      element: "fldDate",
      second_element: "fldDate-second",
      rElement: "fldDateName",
      field: "ddate",
      rField: "ddate",
      type: "date",
      dataType: PhFC_DatePicker,
      isForm: true,
      hasSecondField: true,
      isShown: true,
      Form: {
        maxDate: "",
        minDate: "",
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
        dataType: PhFC_DatePicker,
        Operation: "ddate", //must be unique
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
      label: "Requset Type",
      element: "fldTypeId",
      rElement: "fldTypeName",
      field: "typeId",
      rField: "typeName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "type1", //we need to remmember it
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
        Operation: "typeId", //must be unique
        options: "type1", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
  ],
};

export { meta };
