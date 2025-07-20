let phForm;
let aSystem = PhSettings.PhsCodes.PhsSystem;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter};
  let metta = {};
  let aURL = {};
  removeAcc();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Acc/GrantAccount';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: ''};
  phForm = new PhForm('accClosing', metta, options);
  showHeaderSpinner(false);
});

function removeAcc() {
  aSystem = aSystem.filter(function (el) {
    return parseInt(el.id) !== parseInt(SystemACC);
  });
}

function acParams() {
  return {systemId: parseInt($('#fldSystemId').val())};
}

function getaQFields() {
  let idx = 0;
  let aQFields = [];
  aQFields[idx++] = {
    label: getLabel('System'),
    element: 'SystemId',
    field: 'systemId',
    getLabel: true,
    component: PhFC_Select,
    defValue: -1,
    options: aSystem,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Account'),
    element: 'Acc',
    field: 'accId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/Acc/AccActive/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Remark'),
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
  let idx = 0;
  let aFields = [];
  aFields[idx++] = {
    element: 'fldId',
    field: 'id',
    isRequired: false,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('System'),
    element: 'fldSystemId',
    field: 'systemId',
    rField: 'systemName',
    getLabel: true,
    isRequired: true,
    defValue: '1',
    options: aSystem,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Account'),
    element: 'fldAccId',
    rElement: 'fldAccName',
    field: 'accId',
    rField: 'accName',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Remark'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tablewidth: ''
  };
  return aFields;
}
