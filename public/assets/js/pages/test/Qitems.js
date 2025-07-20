jQuery(document).ready(function () {
  var options = {cols: 1, type: PhF_Query_2};
  var idx = 0;
  var metta = {};
  var aURL = {};
  var QFields = [];

  aURL.Url = 'http://Eng-Radwan:9090/ERP/api';
  aURL.Api = '/Acc/CostCenters';
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Get = {Method: 'GET', URL: '/'};

  options.grouping = {
    groups: [
      {value: 1, label: getLabel('DStr.Store')},
      {value: 2, label: getLabel('DStr.Item')},
      {value: 3, label: getLabel('DStr.Center')},
      {value: 4, label: getLabel('DStr.Account')},
      {value: 5, label: getLabel('DStr.Trt')},
      {value: 6, label: getLabel('DStr.Num')},
      {value: 7, label: getLabel('DStr.Date')},
      {value: 8, label: getLabel('DStr.Doc')},
      {value: 9, label: getLabel('DStr.DocN')}],
    groubName: 'Group',
    groubNumber: 5,
    groupsSelected: [0, -1, -1, -1, -1]
  };

  options.value = {
    values: [
      {value: 'nCount', label: getLabel('Count')},
      {value: 'nSumQnt', label: getLabel('Sum Qnt')},
      {value: 'nItems', label: getLabel('Count Items')},
      {value: 'nTotal', label: getLabel('Sum Total')}],
    valueName: 'Value',
    valueNumber: 5,
    valueSelected: [1, 1],
    valueType: PhFC_CheckBox
  };

  options.reportOption = [{
      type: PhFC_CheckBox,
      options: [
        {value: 1, label: 'All', selected: true, field: 'select'}
      ]
    },
    {
      type: PhFC_Radio,
      field: 'rido',
      options: [
        {value: 0, label: 'All', selected: false},
        {value: 1, label: 'Head', selected: true},
        {value: 2, label: 'Active', selected: false}
      ]
    },
    {
      type: PhFC_Select,
      field: 'select',
      label: 'Select',
      options: [
        {value: 0, label: 'All', selected: true},
        {value: 1, label: 'Head', selected: false},
        {value: 2, label: 'Active', selected: false}
      ]
    }
  ];

  options.displayOption = [{
      type: PhFC_CheckBox,
      options: [
        {value: 1, label: 'All', selected: true, field: 'check'}
      ]
    },
    {
      type: PhFC_Radio,
      field: 'rido',
      options: [
        {value: 0, label: 'All', selected: false},
        {value: 1, label: 'Head', selected: true},
        {value: 2, label: 'Active', selected: false}
      ]
    },
    {
      type: PhFC_Select,
      field: 'select',
      label: 'Select',
      options: [
        {value: 0, label: 'All', selected: true},
        {value: 1, label: 'Head', selected: false},
        {value: 2, label: 'Active', selected: false}
      ]
    }
  ];

  idx = 0;
  QFields[idx++] = {
    label: getLabel('Item Number'),
    field: 'Num',
    dbName: 'num',
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
    field: 'Name',
    dbName: 'name',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: [PhFOper_EQ, PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED, PhFOper_BT]
  };
  QFields[idx++] = {
    label: getLabel('Status'),
    field: 'Status',
    dbName: 'status_id',
    component: PhFC_Select,
    dataType: PhFDT_Number,
    defValue: -1,
    aOpers: [PhFOper_EQ, PhFOper_NE],
    options: PhSettings.Codes.Status
  };
  QFields[idx++] = {
    label: getLabel('Type'),
    field: 'Type',
    dbName: 'type_id',
    component: PhFC_Select,
    dataType: PhFDT_Number,
    defValue: -1,
    aOpers: [PhFOper_EQ, PhFOper_NE],
    options: PhSettings.Codes.Type
  };
  QFields[idx++] = {
    label: getLabel('Rem'),
    field: 'Rem',
    dbName: 'rem',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: [PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED]
  };

  metta = {aURL: aURL, QFields: QFields};
  PhQForm = new PhQForm('qFixItem', metta, options);
});