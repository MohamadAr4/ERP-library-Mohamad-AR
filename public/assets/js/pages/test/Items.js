var phForm;
jQuery(document).ready(function () {
  var options = {cols: 1, mode: PhF_Mode_Query, type: PhF_Type_Form};
  var idx = 0;
  var metta = {};
  var aURL = {};
  var QFields = [];
  var aFields = [];

  aURL.Url = 'http://Eng-Radwan:9090/ERP/api';
  aURL.Api = '/Acc/Mng/CostCenters';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};

  idx = 0;
  QFields[idx++] = {
    label: getLabel('Item Number'),
    element: 'Num',
    field: 'num',
    component: PhFC_Number,
    dataType: PhFDT_Number,
    defValue: '',
    minValue: '0',
    step: '0.1',
    maxValue: '9999999999999',
    aOpers: [PhFOper_EQ, PhFOper_NE, PhFOper_GT, PhFOper_GE, PhFOper_LT, PhFOper_LE, PhFOper_BT, PhFOper_NB]
  };
  QFields[idx++] = {
    label: getLabel('Item Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: [PhFOper_EQ, PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED, PhFOper_BT]
  };
  QFields[idx++] = {
    label: getLabel('Status'),
    element: 'Status',
    field: 'status_id',
    component: PhFC_Select,
    dataType: PhFDT_Number,
    defValue: -1,
    aOpers: [PhFOper_EQ, PhFOper_NE],
    options: PhSettings.Codes.Status
  };
  QFields[idx++] = {
    label: getLabel('Type'),
    element: 'Type',
    field: 'type_id',
    component: PhFC_Select,
    dataType: PhFDT_Number,
    defValue: -1,
    aOpers: [PhFOper_EQ, PhFOper_NE],
    options: PhSettings.Codes.Type
  };
  QFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: [PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED]
  };
  // QFields[idx++] = {
  //   label: getLabel('Date'),
  //   element: 'Date',
  //   component: PhFC_DatePicker,
  //   dataType: PhFDT_Date,
  //   defValue: currentDate(),
  //   aOpers: [PhFOper_EQ, PhFOper_NE, PhFOper_GT, PhFOper_GE, PhFOper_LT, PhFOper_LE, PhFOper_BT, PhFOper_NB]
  // };
  // QFields[idx++] = {
  //   label: getLabel('CostName'),
  //   element: 'Cost',
  //   component: PhFC_Autocomplete,
  //   dataType: PhFDT_String,
  //   defValue: '',
  //   aOpers: [PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED],
  //   autoCompleteApi: '/Acc/Account/AutocompleteActives'
  // };
  idx = 0;
  aFields[idx++] = {
    element: 'fldId',
    field: 'id',
    isRequired: false,
    defValue: '0'
  };
  aFields[idx++] = {
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: ''
  };
  aFields[idx++] = {
    element: 'fldStatusId',
    getLabel: true,
    field: 'statusId',
    isRequired: true,
    defValue: '1',
    options: []
  };
  aFields[idx++] = {
    element: 'fldTypeId',
    field: 'typeId',
    isRequired: true,
    defValue: '1'
  };
  aFields[idx++] = {
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: ''
  };
  metta = {aURL: aURL, QFields: QFields, aFields: aFields, phTable: ''};
  phForm = new PhForm('fixItem', metta, options);
});