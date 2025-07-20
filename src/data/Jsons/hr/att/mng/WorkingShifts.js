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
  PhFC_Number,
  PhFC_Select,
} from "../../../../operation";
import BaseUrl from "../../../../contants";

function changeRows(event, eventIndex, inputs, setInput, rows, setRows) {
  const selectedValue = parseInt(event.target.value, 10); // Convert the value to a number
  let numberOfRows;

  switch (selectedValue) {
    case 1:
      numberOfRows = 1;
      break;
    case 2:
      numberOfRows = 7;
      break;
    case 3:
      numberOfRows = 30;
      break;
    default:
      // Default case or unexpected values, keep the current state or handle differently
      return;
  }

  // Generate an array of objects based on numberOfRows
  const newRows = Array.from({ length: numberOfRows }, (_, index) => ({
    id: index, day : index+1
  }));
  setRows(newRows);
}

let meta = {
  hasTable: true,
  hasParent: true,
  id: "", //page id
  Generals: {
    title: "",
  },
  URLS: {
    New: {
      URl: `${BaseUrl}UC/Emp/WorkGroups/New`,
      Method: "POST",
    },
    Update: {
      URl: `${BaseUrl}UC/Emp/WorkGroups/`,
      Method: "PUT",
    },
    Delete: {
      URl: `${BaseUrl}UC/Emp/WorkGroups/`,
      Method: "DELETE",
    },
    Search: {
      URl: `${BaseUrl}UC/Emp/WorkGroups/Search/`,
      Method: "POST",
    },
    Get: {
      URl: `${BaseUrl}UC/Emp/WorkGroups/`,
      Method: "GET",
    },
  },
  Fields: [
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
    {
      label: "Num",
      element: "fldNum",
      second_element: "fldNum-second", //if the field does not have second field this key must be removed
      rElement: "fldNumName",
      field: "num",
      rField: "",
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
        dataType: PhFC_Number,
        Operation: "1", //must be unique
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
        Operation: "2", //must be unique
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Type",
      element: "TypeId",
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
        options: "aType", //we need to remmember it
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: PhFC_Select,
        isRequired: true,
        callback: {
          onchange: changeRows,
        },
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
        Operation: "3", //must be unique
        options: "aType", // we need to remmeber it
        aOperations: [PhFOper_EQ],
        defOperationValue: PhFOper_EQ,
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
      defValue: "",
      isAutocomplete: false,
    },
    {
      title: "wgrpId",
      field: "wgrpId",
      visible: false,
      type: "hidden",
      component: "input",
      disable: false,
      defValue: "",
      isAutocomplete: false,
    },
    {
      title: "Days",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "day",
      isRequired: false,
      type: "number",
      datatype: "integer",
      width: "125px",
      required: true,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
    {
      title: "S.Hour",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "st1h",
      isRequired: false,
      type: "number",
      datatype: "integer",
      width: "125px",
      required: true,
      disable: false,
      isAutocomplete: false,
      defValue: "9",
    },
    {
      title: "S.Minute",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "st1m",
      isRequired: false,
      type: "number",
      datatype: "integer",
      width: "125px",
      required: false,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
    {
      title: "E.Hour",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "ed1h",
      isRequired: false,
      type: "number",
      datatype: "integer",
      width: "125px",
      required: true,
      disable: false,
      isAutocomplete: false,
      defValue: "17",
    },
    {
      title: "E.Minute",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "ed1m",
      isRequired: false,
      type: "number",
      datatype: "integer",
      width: "125px",
      required: false,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
    {
      title: "Add.Hour",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "addh",
      isRequired: false,
      type: "number",
      datatype: "integer",
      width: "125px",
      required: true,
      disable: false,
      isAutocomplete: false,
      defValue: "8",
    },
    {
      title: "Add.Minute",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "addm",
      isRequired: false,
      type: "text",
      datatype: "integer",
      width: "125px",
      required: true,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
  ],
};

export { meta };
