let phForm;
let aUnit = PhSettings.CpyCodes.CpyCodeUnit;
let aStatus = PhSettings.PhsCodes.PhsStatus;
let aSpc1 = PhSettings.UsrCodes.StrSpecification1;
let aSpc2 = PhSettings.UsrCodes.StrSpecification2;
let aSpc3 = PhSettings.UsrCodes.StrSpecification3;
let aSpc4 = PhSettings.UsrCodes.StrSpecification4;
let aSpc5 = PhSettings.UsrCodes.StrSpecification5;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Str/Items';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: ''};
  phForm = new PhForm('Items', metta, options);
  showHeaderSpinner(false);
//  $('#fldName').focusout(function () {
//    let text = ($('#fldName').val()).replaceAll("  ", "");
//    console.log(text);
//  });
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
    label: getLabel('Unit'),
    element: 'UnitId',
    field: 'unitId',
    component: PhFC_Select,
    defValue: -1,
    options: aUnit,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 1',
    element: 'Spc1Id',
    field: 'spc1Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpc1,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 2',
    element: 'Spc2Id',
    field: 'spc2Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpc2,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 3',
    element: 'Spc3Id',
    field: 'spc3Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpc3,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 4',
    element: 'Spc4Id',
    field: 'spc4Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpc4,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 5',
    element: 'Spc5Id',
    field: 'spc5Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpc5,
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
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
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
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Unit'),
    element: 'fldUnitId',
    field: 'unitId',
    rField: 'unitName',
    isRequired: true,
    defValue: 1,
    options: aUnit,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + '1',
    element: 'fldSpc1Id',
    field: 'spc1Id',
    rField: 'spc1Name',
    isRequired: true,
    defValue: 0,
    options: aSpc1,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + '2',
    element: 'fldSpc2Id',
    field: 'spc2Id',
    rField: 'spc2Name',
    isRequired: true,
    defValue: 0,
    options: aSpc2,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + '3',
    element: 'fldSpc3Id',
    field: 'spc3Id',
    rField: 'spc3Name',
    isRequired: true,
    defValue: 0,
    options: aSpc3,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + '4',
    element: 'fldSpc4Id',
    field: 'spc4Id',
    rField: 'spc4Name',
    isRequired: true,
    defValue: 0,
    options: aSpc4,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + '5',
    element: 'fldSpc5Id',
    field: 'spc5Id',
    rField: 'spc5Name',
    isRequired: true,
    defValue: 0,
    options: aSpc5,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  return aFields;
}

