let phForm;
let aStore = [],
        aTrnType = PhSettings.UsrCodes.StrTransactionType;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Str/DefaultAccounts';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: ''};
  phForm = new PhForm('DefaultAccounts', metta, options);
});

function getList() {
  getStore();
  getTrnType();
  showHeaderSpinner(false);
}

function getStore() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Str/Stores/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aStore[i] = {};
          aStore[i].id = response.data.List[i].id;
          aStore[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getTrnType() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Str/CodTranstype/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aTrnType[i] = {};
          aTrnType[i].id = response.data.List[i].id;
          aTrnType[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getaQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Store'),
    element: 'StorId',
    field: 'storId',
    component: PhFC_Select,
    defValue: -1,
    options: aStore,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Transaction'),
    element: 'TrnTypeId',
    field: 'trnTypId',
    component: PhFC_Select,
    defValue: -1,
    options: aTrnType,
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
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
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
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Store'),
    element: 'fldStorId',
    field: 'storId',
    rField: 'storName',
    isRequired: true,
    defValue: 0,
    options: aStore,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Transaction'),
    element: 'fldTrntypId',
    field: 'trntypId',
    rField: 'trntypName',
    isRequired: true,
    defValue: 100,
    options: aTrnType,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Cost.Account'),
    element: 'fldCstAccId',
    rElement: 'fldCstAccName',
    field: 'cstaccId',
    rField: 'cstaccName',
    isRequired: true,
    defValue: '',
    tableWidth: 20
  };
  aFields[idx++] = {
    label: getLabel('Revenue.Account'),
    element: 'fldRevAccId',
    rElement: 'fldRevAccName',
    field: 'revaccId',
    rField: 'revaccName',
    isRequired: true,
    defValue: '',
    tableWidth: 20
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

