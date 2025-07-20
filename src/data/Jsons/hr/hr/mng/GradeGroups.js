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
} from "../../../../operation";
import { PhFC_Number, PhFC_Text } from "../../../../operation";
import BaseUrl from "../../../../contants";
import axios from "axios";

const afterGet = (response, setAfterGetMessage) => {
  console.log(response.List[0].isdefaultId === "1");
  if ((response.List[0].isdefaultId === "1") === true) {
    setAfterGetMessage("defalut");
  } else {
    setAfterGetMessage("");
  }
};

const setDefault = async (insertedId, PhToken) => {
  try {
    const url = `${BaseUrl}CC/HR/SetDefaultGrade/${insertedId}`;
    const headers = {
      periodId: 2022,
      Accept: "application/json",
      Authorization: `Bearer ${PhToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.put(url,{}, {
      headers: headers,
    });
    console.log(response);
    if (response.data.status === true) {
      return true;
    } else {
      return false;
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
};

let meta = {
  hasTable: true,
  hasParent: true,
  errorMessage: "min salary must be <= max salary",
  afterGetMessage: "Default",
  hasSpecialButton: true,
  callBack: {
    afterGet: afterGet,
    setDefaultTemplete: setDefault,
  },
  Generals: {
    title: "دليل المواد",
  },
  URLS: {
    New: { URl: `${BaseUrl}UC/Emp/GradeTemplatesMst/New`, Method: "POST" },
    Update: { URl: `${BaseUrl}UC/Emp/GradeTemplatesMst/`, Method: "PUT" },
    Delete: { URl: `${BaseUrl}UC/Emp/GradeTemplatesMst/`, Method: "DELETE" },
    Search: {
      URl: `${BaseUrl}UC/Emp/GradeTemplatesMst/Search/`,
      Method: "POST",
    },
    Get: { URl: `${BaseUrl}UC/Emp/GradeTemplatesMst/`, Method: "GET" },
  },
  Fields: [
    {
      label: "Number",
      element: "Num",
      rElement: "NumName",
      field: "num",
      rField: "num",
      type: "text",
      dataType: PhFC_Number,
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
        Operation: "num",
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
      rElement: "Name",
      field: "name",
      rField: "name",
      type: "text",
      dataType: PhFC_Text,
      isForm: true,
      isShown: true,
      Form: {
        labelClass: "col-sm-1 form-label ph-label text-start text-sm-end",
        inputClass: "form-control form-control-sm",
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
        dataType: PhFC_Text,
        Operation: "name",
        options: "name",
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
      element: "fldRem",
      rElement: "rem",
      field: "rem",
      rField: "rem",
      type: "text",
      dataType: PhFC_Text,
      isForm: true,
      isShown: true,
      Form: {
        labelClass: "col-sm-1 form-label ph-label text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
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
        dataType: PhFC_Text,
        Operation: "rem",
        options: "rem",
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
      title: "MstId",
      field: "gradId",
      visible: false,
      type: "hidden",
      component: "input",
      disable: false,
      defValue: 0,
      isAutocomplete: false,
    },
    {
      title: "Work.group",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-select form-select-sm  appritmId cell-phTable-PhTable col-phTable-PhTable-5",
      type: "select",
      isRequired: true,
      field: "grpId",
      rfield: "grpName",
      datatype: "integer",
      options: "workGroup",
      width: "225px",
      component: "input",
      disable: false,
      required: true,
      defValue: "",
      classes: "text-start",
      isAutocomplete: false,
    },
    {
      title: "Grad.Degree",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-select form-select-sm  appritmId cell-phTable-PhTable col-phTable-PhTable-5",
      type: "select",
      isRequired: true,
      field: "degreeId",
      rfield: "degreeName",
      datatype: "integer",
      options: "GradDegree",
      width: "225px",
      component: "input",
      disable: false,
      required: true,
      defValue: "",
      classes: "text-start",
      isAutocomplete: false,
      disable: false,
    },
    {
      title: "Months",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm  appritmId cell-phTable-PhTable col-phTable-PhTable-5",
      type: "text",
      isRequired: true,
      field: "days",
      rfield: "daysName",
      datatype: "integer",
      width: "225px",
      component: "input",
      disable: false,
      defValue: "",
      classes: "text-start",
      isAutocomplete: false,
      disable: false,
    },
    {
      title: "Min.Salary",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm  appritmId cell-phTable-PhTable col-phTable-PhTable-5",
      type: "text",
      isRequired: true,
      field: "minsal",
      rfield: "minsalName",
      datatype: "integer",
      width: "225px",
      component: "input",
      disable: false,
      defValue: "",
      classes: "text-start",
      isAutocomplete: false,
      disable: false,
    },
    {
      title: "Max.Salary",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm  appritmId cell-phTable-PhTable col-phTable-PhTable-5",
      type: "text",
      isRequired: true,
      field: "maxsal",
      rfield: "maxsalName",
      datatype: "integer",
      width: "225px",
      component: "input",
      disable: false,
      defValue: "",
      classes: "text-start",
      isAutocomplete: false,
      disable: false,
    },
    {
      title: "Rem",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm  appritmId cell-phTable-PhTable col-phTable-PhTable-5",
      type: "text",
      isRequired: false,
      field: "trem",
      rfield: "tremName",
      datatype: "integer",
      width: "225px",
      component: "input",
      disable: false,
      defValue: "",
      classes: "text-start",
      isAutocomplete: false,
      disable: false,
    },
  ],
};

export { meta };
