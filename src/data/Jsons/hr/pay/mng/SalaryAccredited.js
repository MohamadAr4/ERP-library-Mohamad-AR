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
  id: "", //page id
  Generals: {
    title: "",
  },
  URLS: {
    New: {
      URl: `${BaseUrl}UC/Emp/Accredited/New`,
      Method: "POST",
    },
    Update: {
      URl: `${BaseUrl}UC/Emp/Accredited/`,
      Method: "PUT",
    },
    Delete: {
      URl: `${BaseUrl}UC/Emp/Accredited/`,
      Method: "DELETE",
    },
    Search: {
      URl: `${BaseUrl}UC/Emp/Accredited/Search/`,
      Method: "POST",
    },
    Get: {
      URl: `${BaseUrl}UC/Emp/Accredited/`,
      Method: "GET",
    },
  },
  Fields: [
    {
      element: "id",
      rElement: "idName",
      field: "id",
      rField: "idName",
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
      label: "Name",
      element: "Name",
      rElement: "Namename",
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
        Operation: "nname",
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
      label: "Rem",
      element: "Rem",
      rElement: "RemName",
      field: "rem",
      rField: "remName",
      type: "text",
      dataType: PhFC_Text,
      isShown: true,
      hasSecondField: false, 
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
        Operation: "remm",
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
  ],
};

export { meta };
