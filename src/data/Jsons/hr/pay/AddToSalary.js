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
  PhFC_DatePicker,
  PhFC_Number,
  PhFC_Select,
} from "../../../operation";
import BaseUrl from "../../../contants";
import axios from "axios";

export const GetOptions = async (
  PhToken,
  userID,
  setNewOption,
  setInputs,
  inputs,
  rows,
  setRows,
  rowId
) => {
  try {
    const url = `${BaseUrl}UC/Emp/Employee/${userID}`;
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
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        const SalaryField = meta.Column.find((f) => f.field === "sal");
        const salay = response.data.data.Obj.basesal;
        updatedRows[rowId][SalaryField.field] = salay;
        return updatedRows;
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
  hasTable: true,
  hasParent: true,
  id: "", //page id
  Generals: {
    title: "",
  },
  URLS: {
    New: {
      URl: `${BaseUrl}UC/Emp/AddonSalary/New`,
      Method: "POST",
    },
    Update: {
      URl: `${BaseUrl}UC/Emp/AddonSalary/`,
      Method: "PUT",
    },
    Delete: {
      URl: `${BaseUrl}UC/Emp/AddonSalary/`,
      Method: "DELETE",
    },
    Search: {
      URl: `${BaseUrl}UC/Emp/AddonSalary/Search/`,
      Method: "POST",
    },
    Get: {
      URl: `${BaseUrl}UC/Emp/AddonSalary/`,
      Method: "GET",
    },
  },
  Fields: [
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
    {
      label: "Number",
      element: "Num",
      second_element: "Num-second",
      rElement: "NumName",
      field: "num",
      rField: "numName",
      type: "text",
      dataType: PhFC_Text,
      isShown: true,
      hasSecondField: true,
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
        divClass: "col-sm-2 px-0",
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
        Operation: "Numm", //must be unique
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
      label: "Date",
      element: "Ddate",
      second_element: "Ddate-second",
      rElement: "DdateName",
      field: "ddate",
      rField: "ddateName",
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
        isAutocomplete: true,
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
        Operation: "ddatea", //must be unique
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
      label: "Doc.Num",
      element: "Docn",
      second_element: "Docn-second",
      rElement: "DocnName",
      field: "docn",
      rField: "docnname",
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
        Operation: "DocNum",
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
      label: "Doc.Date",
      element: "Docd",
      second_element: "Docd-second",
      rElement: "DocdName",
      field: "docd",
      rField: "docdName",
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
        isAutocomplete: true,
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
        Operation: "ddaco", //must be unique
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
      label: "Type",
      element: "TypeId",
      rElement: "TypeName",
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
        Operation: "typee", //must be unique
        options: "type", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Salary.Type",
      element: "SaltypId",
      rElement: "SaltypName",
      field: "saltypId",
      rField: "saltypName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "SType", //we need to remmember it
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
        Operation: "STypee", //must be unique
        options: "SType", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "TaxBrackets",
      element: "BrktId",
      rElement: "BrktName",
      field: "brktId",
      rField: "brktName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "brk", //we need to remmember it
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
        Operation: "brkk", //must be unique
        options: "brk", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Year",
      element: "Nyear",
      second_element: "Nyear-second", //if the field does not have second field this key must be removed
      rElement: "NyearName",
      field: "nyear",
      rField: "nyearName",
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
        Operation: "yearr", //must be unique
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
      label: "Month",
      element: "nmonth",
      second_element: "nmonth-second", //if the field does not have second field this key must be removed
      rElement: "nmonthName",
      field: "nmonth",
      rField: "nmonthName",
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
        Operation: "monthh", //must be unique
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
      label: "Perc",
      element: "Perc",
      second_element: "Perc-second", //if the field does not have second field this key must be removed
      rElement: "PercName",
      field: "perc",
      rField: "percName",
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
        divClass: "col-sm-2 px-0",
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
        Operation: "percc", //must be unique
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
      label: "Amount",
      element: "Amt",
      second_element: "Amt-second", //if the field does not have second field this key must be removed
      rElement: "AmtName",
      field: "amt",
      rField: "amtName",
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
        divClass: "col-sm-2 px-0",
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
      label: "S.Min",
      element: "Nmin",
      second_element: "Nmin-second", //if the field does not have second field this key must be removed
      rElement: "NminName",
      field: "nmin",
      rField: "nminName",
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
        divClass: "col-sm-2 px-0",
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
        Operation: "nminn", //must be unique
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
      label: "S.Max",
      element: "Nmax",
      second_element: "Nmax-second", //if the field does not have second field this key must be removed
      rElement: "NmaxName",
      field: "nmax",
      rField: "nmaxName",
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
        divClass: "col-sm-2 px-0",
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
        Operation: "nmaxn", //must be unique
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
  Column: [
    {
      title: "id",
      field: "id",
      visible: false,
      type: "hidden",
      component: "input",
      disable: false,
      defValue: 0,
      isAutocomplete: false,
    },
    {
      title: "MstId",
      field: "brktId",
      visible: false,
      type: "hidden",
      component: "input",
      disable: false,
      defValue: 0,
      isAutocomplete: false,
    },
    {
      title: "Employee",
      field: "empId",
      rfield: "empName",
      inputClass:
        "form-control form-control-sm phcell ph-autocomplete ph-ac-accId accId cell-phTable-PhTable col-phTable-PhTable-9 ui-autocomplete-input",
      type: "text",
      isRequired: true,
      width: "300px",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      component: "input",
      isAutocomplete: true,
      disable: false,
      defValue: "",
      ajaxURL: "/UC/Emp/Employee/Autocomplete", //api url for the autoComplete
      callback: {
        onchange: GetOptions,
      },
    },
    {
      title: "Salary",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "sal",
      rfield: "sal",
      isRequired: false,
      type: "text",
      datatype: "integer",
      width: "150px",
      required: true,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
    {
      title: "Amount",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "amt",
      isRequired: false,
      type: "text",
      datatype: "integer",
      width: "150px",
      required: true,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
    {
      title: "Rem",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      rfield: "rem",
      field: "rem",
      isRequired: false,
      type: "text",
      datatype: "integer",
      width: "150px",
      required: false,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
  ],
};

export { meta };
