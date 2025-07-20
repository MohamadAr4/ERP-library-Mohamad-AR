let phForm;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/Recruitment';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('Recruitment', metta, options);
  showHeaderSpinner(false);
});

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Code'),
    element: 'Code',
    field: 'code',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Date'),
    element: 'Sdate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Time'),
    element: 'Stime',
    field: 'stime',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('E.Date'),
    element: 'Edate',
    field: 'edate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('E.Time'),
    element: 'Etime',
    field: 'etime',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Geninfo'),
    element: 'Geninfo',
    field: 'geninfo',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Pospurp'),
    element: 'Pospurp',
    field: 'pospurp',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Essenfunc'),
    element: 'Essenfunc',
    field: 'essenfunc',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Minreq'),
    element: 'Minreq',
    field: 'minreq',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Prefqlfy'),
    element: 'Prefqlfy',
    field: 'prefqlfy',
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
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Code'),
    element: 'fldCode',
    field: 'code',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '25'
  };
  aFields[idx++] = {
    label: getLabel('S.Date'),
    element: 'fldSdate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('S.Time'),
    element: 'fldStime',
    field: 'stime',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('E.Date'),
    element: 'fldEdate',
    field: 'edate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('E.Time'),
    element: 'fldEtime',
    field: 'etime',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Geninfo'),
    element: 'fldGeninfo',
    field: 'geninfo',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Pospurp'),
    element: 'fldPospurp',
    field: 'pospurp',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Essenfunc'),
    element: 'fldEssenfunc',
    field: 'essenfunc',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Minreq'),
    element: 'fldMinreq',
    field: 'minreq',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Prefqlfy'),
    element: 'fldPrefqlfy',
    field: 'prefqlfy',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  return aFields;
}

