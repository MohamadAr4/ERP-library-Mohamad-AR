let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Str/Stores';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: ''};
  phForm = new PhForm('Store', metta, options);
  showHeaderSpinner(false);
});

function acParams() {
  return {systemId: SystemInv};
}

function getaQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    component: PhFC_Select,
    defValue: -1,
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Account'),
    element: 'Acc',
    field: 'accId',
    component: PhFC_Autocomplete,
    dataType: PhFDT_String,
    defValue: '',
    autoCompleteApi: '/Acc/GrantedAccount/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Cost.Center'),
    element: 'Cost',
    field: 'costId',
    component: PhFC_Autocomplete,
    dataType: PhFDT_String,
    defValue: '',
    autoCompleteApi: '/Acc/CostActive/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Cost.Account'),
    element: 'CstAcc',
    field: 'cstAccId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/Acc/GrantedAccount/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Revenue.Account'),
    element: 'RevAcc',
    field: 'revAccId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/Acc/GrantedAccount/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Employee'),
    element: 'Emp',
    field: 'empId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: aTOpers
  };
  return aQFields;
}

function getFields() {
  let aFields = [];
  let idx = 0;
  aFields[idx++] = {
    element: 'fldId',
    field: 'id',
    isRequired: false,
    defValue: 0
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: 15
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    getLabel: true,
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    isRequired: true,
    defValue: 1,
    options: aStatus,
    tableWidth: 15
  };
  aFields[idx++] = {
    label: getLabel('Account'),
    element: 'fldAccId',
    rElement: 'fldAccName',
    field: 'accId',
    rField: 'accName',
    isRequired: true,
    defValue: '',
    tableWidth: 25
  };
  aFields[idx++] = {
    label: getLabel('Cost Center'),
    element: 'fldCostId',
    rElement: 'fldCostName',
    field: 'costId',
    rField: 'costName',
    isRequired: true,
    defValue: '',
    tableWidth: 25
  };
  aFields[idx++] = {
    label: getLabel('Cost.Account'),
    element: 'fldCstAccId',
    rElement: 'fldCstAccName',
    field: 'cstAccId',
    rField: 'cstAccName',
    isRequired: true,
    defValue: '',
    tableWidth: 20
  };
  aFields[idx++] = {
    label: getLabel('Revenue.Account'),
    element: 'fldRevAccId',
    rElement: 'fldRevAccName',
    field: 'revAccId',
    rField: 'revAccName',
    isRequired: true,
    defValue: '',
    tableWidth: 20
  };
  aFields[idx++] = {
    label: getLabel('Employee'),
    element: 'fldEmpId',
    rElement: 'fldEmpName',
    field: 'empId',
    rField: 'empName',
    isRequired: true,
    defValue: '',
    tableWidth: '20'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: 50
  };
  return aFields;
}

