import PhFOperations, {
  PhAggregate,
  PhAggregate_None,
  PhAggregate_Count,
  PhAggregate_Sum,
  PhAggregate_Avg,
  PhAggregate_Min,
  PhAggregate_Max,
  PhAggregate_StdDev,
  PhAggregate_Var,
  PhAggregate_Median,
  PhFOper_EQ,
  PhFOper_NE,
  PhFOper_ST,
  PhFOper_ED,
  PhFOper_CT,
  PhFOper_NST,
  PhFOper_NED,
  PhFOper_NCT,
  PhFOper_GT,
  PhFOper_GE,
  PhFOper_LT,
  PhFOper_LE,
  PhFOper_BT,
  PhFOper_NB,
} from "../../../../operation";
import OrderBy from "./components/QueryForm/OrederBy/OrderBy";

let aOrder = [
  { id: "mstNum", name: "Number" },
  { id: "mstDate", name: "Date" },
  { id: "tdocId", name: "Bank.Doc" },
  { id: "trnDocn", name: "her.Num" },
  { id: "trnDocd", name: "her.Date" },
];

let PhFOrderOperations = [
  {sign: '1', label: 'ASC'},
  {sign: '-1', label: 'DESC'}
];
//list of the groupBy
//each object must have id and name
let aGroup = [
  { id: "fixdName", name: "Asset.Name" },
  { id: "fixdNum", name: "Asset.Number" },
  { id: "fixdSpc1Name", name: "Fix.Spec.1" },
  { id: "fixdSpc2Name", name: "Fix.Spec.2" },
  { id: "fixdSpc3Name", name: "Fix.Spec.3" },
  { id: "fixdSpc4Name", name: "Fix.Spec.4" },
  { id: "fixdSpc5Name", name: "Fix.Spec.5" },
  { id: "statusName", name: "Fix.Status" },
  { id: "loc1Name", name: "Location.1" },
  { id: "loc2Name", name: "Location.2" },
  { id: "loc3Name", name: "Location.3" },
  { id: "spc1Name", name: "Specification.1" },
  { id: "spc2Name", name: "Specification.2" },
  { id: "spc3Name", name: "Specification.3" },
  { id: "spc4Name", name: "Specification.4" },
  { id: "spc5Name", name: "Specification.5" },
];
//array of Aggregation
//each one must have id / field / name / aPhAggregation
let aAggregation = [
  {
    id: "0",
    filed: "totFamtDeprication",
    name: "totFamtDeprication",
    aPhAggregate: [PhAggregate_Sum, PhAggregate_Avg],
  },
  {
    id: "1",
    filed: "trnAmt",
    name: "Amount",
    aPhAggregate: [PhAggregate_Sum, PhAggregate_Avg],
  },
  {
    id: "2",
    filed: "totAmt",
    name: "trnBookqnt",
    aPhAggregate: [PhAggregate_Max, PhAggregate_Avg],
  },
];
//here the main Json
let meta = {
  //firt of all Genernals which contains the title of the page
  Generals: {
    title: "دليل المواد",
  },
  //here we have some condition for the drawing
  //if the page has Filter
  isFilter: true,
  //if it has PrintOption
  isPrintOption: true,
  //if it has DisplayOption
  isDisplayOPtion: true,
  //if it has Aggregation
  isAggregate: false,
  //if it has GroupBy
  isGroupBy: false,
  //if it has OrderBy
  isOrdreBy: false,
  //here we have the Urls that i may use 
  URLS: {
    New: { URl: "", Method: "POST" },
    Update: { URl: "", Method: "PUT" },
    Delete: { URl: "", Method: "DELETE" },
    //in this case we need the Search because it QueryPage
    Search: {
      URl: "http://localhost:9090/smb/api/UC/Str/StoreItems/Query",
      Method: "POST",
    },
    Get: { URl: "", Method: "GET" },
  },
  //here we have the Fields Array (which i render in the Filter)
  Fields: [
    //each object in this array represent one Field
    {
      label: "Store", //the label of the Filed
      element: "fldStorId",//the key that i will store data in for example (fldStore:12)
      rElement: "fldStoreName",//the key that i will store the label of the AutoComplete for example (fldStoreName : الحساب 0000-0000)
      field: "storId",//the key that i will use to prepare the data for making the Api call (same in dataBase)
      rField: "store",//the key that i will use when i make search Api the key of the data that i want to display in rField
      type: "select", //the type of the Field 
      dataType: 0,//the data type of the Field 
      isForm: false,//if this Field allow to display this Field in the EntyBlock
      isShown: true,//if this Field is Shown (this value i can change when i click in the filter button and make the check box checked or not)
      isQuery: true,//if this Field allow to display in QueryBlock
      //if the field isQuery then i have to make Query object which includes the property of the field 
      Query: {
        
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",//label calss name to make the style dynamic
        
        inputClass: "form-select form-select-sm",//input calss name to make the style dynamic
        
        isRequired: false,//if the field is Required or not
        value1: "",//the value 1 
        value2: "",//the value 2
        defValue: "",//the defalut value of the field
        isAutocomplete: false,//if the field is autoComplete
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 1,//the data type of the field in the query
        Operation: "Store",//this for store the operation option that i selected (must be unique)
        options: "store",//make the value of the property (field)
        aOperations: [PhFOper_EQ, PhFOper_NE],//the operations of the field
        tableWidth: "10",//tabel width
      },
    },
    {
      label: "Item",
      element: "fldItemId",
      rElement: "fldNameName",
      field: "itemFname",
      rField: "name",
      type: "text",
      dataType: 0,
      isForm: true,
      isShown: true,
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm col-sm-2",
        autocomplete: false,
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Item",
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
        tableWidth: "15",
      },
    },
    {
      label: "Unit",
      element: "fldUnitId",
      rElement: "fldUnitName",
      field: "unitId",
      rField: "unitName",
      type: "select",
      dataType: 1,
      isForm: true,
      isShown: true,
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        autocomplete: false,
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Unit",
        options: "unit",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Specification" + "1",
      element: "fldSpc1Id",
      rElement: "fldSpc1Name",
      field: "spc1Id",
      rField: "spc1Name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Specification1",
        options: "sec1",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Specification" + "2",
      element: "fldSpc2Id",
      rElement: "fldSpc2Name",
      field: "spc2Id",
      rField: "spc2Name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Specification2",
        options: "sec2",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Specification" + "3",
      element: "fldSpc3Id",
      rElement: "fldSpc3Name",
      field: "spc3Id",
      rField: "spc3Name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Specification3",
        options: "sec3",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Specification" + "4",
      element: "fldSpc4Id",
      rElement: "fldSpc4Name",
      field: "spc4Id",
      rField: "spc4Name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Specification4",
        options: "sec4",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Specification" + "5",
      element: "fldSpc5Id",
      rElement: "fldSpc5Name",
      field: "spc5Id",
      rField: "spc5Name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        autocomplete: false,
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Specification5",
        options: "sec5",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Location.1",
      element: "disLoc1",
      rElement: "disLoc1",
      field: "loc1name",
      rField: "loc1name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Location1",
        options: "loc1name",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Location.2",
      element: "disLoc2",
      rElement: "disLoc2",
      field: "loc2name",
      rField: "loc2name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Location2",
        options: "loc2name",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
    {
      label: "Location.3",
      element: "disLoc3",
      rElement: "disLoc3",
      field: "loc3name",
      rField: "loc3name",
      type: "select",
      dataType: 1,
      isQuery: true,
      isShown: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        isRequired: false,
        value1: "",
        value2: "",
        defValue: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: 0,
        Operation: "Location3",
        options: "loc3name",
        aOperations: [PhFOper_EQ, PhFOper_NE],
        tableWidth: "10",
      },
    },
  ],
  DisplayOption: [
    {
      col: 3,
      label: "Store",
      element: "disStore",
      field: "storName",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: true,
      defValue: true,
      dataType: 5,
    },
    {
      col: 9,
      label: "Unit",
      element: "disUnit",
      field: "unitName",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: true,
      defValue: true,
      dataType: 5,
    },
    {
      col: 3,
      label: "Specification.1",
      element: "disSpecification1",
      field: "spc1Name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
    {
      col: 3,
      label: "Specification.2",
      element: "disSpecification2",
      field: "spc2Name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
    {
      col: 3,
      label: "Specification.3",
      element: "disSpecification3",
      field: "spc3Name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
    {
      col: 3,
      label: "Specification.4",
      element: "disSpecification4",
      field: "spc4Name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
    {
      col: 3,
      label: "Specification.5",
      element: "disSpecification5",
      field: "spc5Name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
    {
      col: 3,
      label: "Location.1",
      element: "disLoc1",
      field: "loc1name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
    {
      col: 3,
      label: "Location.2",
      element: "disLoc2",
      field: "loc2name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
    {
      col: 3,
      label: "Location.3",
      element: "disLoc3",
      field: "loc3name",
      labelClass: "col-sm-9 form-label ph-label text-start pt-2",
      class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
      type: "checkbox",
      value: "",
      checked: false,
      defValue: false,
      dataType: 5,
    },
  ],
  PrintOptions: [
    {
      id: "InventoryQuantitiesprtAdd",
      labelClass: "col-sm-2 form-label ph-label text-start text-sm-center pt-2",
      class: "form-control form-control-sm",
      type: "text",
      label: "Add.Title",
      element: "prtAdd",
      field: "title",
      isRequired: false,
      defValue: "",
    },
  ],
  Aggregation: [
    {
      id: "Aggregation",
      Fields: [
        {
          label: "Aggregation",
          labelCol: 2,
          element: "Aggr",
          elementCol: 10,
          field: "Aggr",
          type: "select",
          isRequired: true,
          aggregationCount: 1,
          Operation: "",
          options: [
            {
              id: "0",
              filed: "totFamtDeprication",
              name: "totFamtDeprication",
              aPhAggregate: [PhAggregate_Sum, PhAggregate_Avg],
            },
            {
              id: "1",
              filed: "trnAmt",
              name: "Amount",
              aPhAggregate: [PhAggregate_Sum, PhAggregate_Avg],
            },
            {
              id: "2",
              filed: "totAmt",
              name: "trnBookqnt",
              aPhAggregate: [PhAggregate_Sum, PhAggregate_Max],
            },
          ],
          defValue: ["totFamtDeprication"],
        },
      ],
    },
  ],
  GroupBy: [
    {
      id: "Group",
      cardCol: 4,
      order: 1,
      newRow: false,
      visible: true,
      header: { title: "Grouping", isToggle: true },
      body: {
        elementCols: 1,
        fields: {
          label: "Group.by",
          labelCol: 2,
          element: "Grp",
          elementCol: 10,
          field: "grp",
          type: 1,
          options: aGroup,
          isRequired: false,
          groupCount: 3,
          defValue: ["fixdName", "fixdNum", "statusName"],
        },
      },
    },
  ],
  OrderBy: [
    { label: "Order.by",
     element: "Ord",
     field: "ord",
     isRequired: false,
     orderCount: 5,
     options: aOrder,
     aOpers: PhFOrderOperations,
     defValue: ["mstDate"],}
   ],
};

export { meta, aAggregation };
