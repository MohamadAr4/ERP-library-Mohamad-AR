let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Cpy/Periods';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: ''};
  phForm = new PhForm('WorkPeriods', metta, options);
  showHeaderSpinner(false);
});

function getaQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
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
    label: getLabel('SDate'),
    element: 'SDate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('EDate'),
    element: 'EDate',
    field: 'edate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: -1,
    options: aStatus,
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
    isRequired: false,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: 10
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
    label: getLabel('SDate'),
    element: 'fldSDate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('EDate'),
    element: 'fldEDate',
    field: 'edate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: 1,
    options: aStatus,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 15
  };
  return aFields;
}


