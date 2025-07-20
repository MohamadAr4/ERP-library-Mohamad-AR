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
} from "../../../../operation";
import BaseUrl from "../../../../contants";

let meta = {
  hasTable: false,
  hasParent: true,
  id:'',//page id 
  Generals: {
    title: "",
  },
  URLS: {
    New: {
      URl: `${BaseUrl}UC/Emp/Deduction/New`,
      Method: "POST",
    },
    Update: {
      URl: `${BaseUrl}UC/Emp/Deduction/`,
      Method: "PUT",
    },
    Delete: {
      URl: `${BaseUrl}UC/Emp/Deduction/`,
      Method: "DELETE",
    },
    Search: {
      URl: `${BaseUrl}UC/Emp/Deduction/Search/`,
      Method: "POST",
    },
    Get: {
      URl: `${BaseUrl}UC/Emp/Deduction/`,
      Method: "GET",
    },
  },
  Fields: [
    {
      label: "Number",
      element: "Num",
      second_element: "Num-second", //if the field does not have second field this key must be removed
      rElement: "NumName",
      field: "num",
      rField: "numName",
      type: "text",
      dataType: PhFC_Text,
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
        dataType: PhFC_Text,
        Operation: "numm", //must be unique
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
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      label: "Name",
      element: "Name",
      rElement: "NameName",
      field: "name",
      rField: "nameName",
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
        dataType: PhFC_Text,
        Operation: "namee", //must be unique
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
      label: "Amount.Type",
      element: "TypeId",
      rElement : 'TypeName',
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
        options: "type", //we need to remmember it
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: '',
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
        Operation: "typee", //must be unique
        options: "type", // we need to remmeber it
        aOperations: [PhFOper_EQ , PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "dedAmt",
      element: "Amt",
      second_element: "Amt-second",
      rElement: "AmtName",
      field: "amt",
      rField: "amtName",
      type: "text",
      dataType: PhFC_Text,
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
        dataType: PhFC_Text,
        Operation: "amtt", //must be unique
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
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      element: "id",
      rElement: "Id",
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
