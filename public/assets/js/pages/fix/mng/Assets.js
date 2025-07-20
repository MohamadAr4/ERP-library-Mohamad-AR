let phForm;
let aUnit = PhSettings.CpyCodes.CpyCodeUnit,
        aSpec1 = PhSettings.UsrCodes.FixSpecification1,
        aSpec2 = PhSettings.UsrCodes.FixSpecification2,
        aSpec3 = PhSettings.UsrCodes.FixSpecification3,
        aSpec4 = PhSettings.UsrCodes.FixSpecification4,
        aSpec5 = PhSettings.UsrCodes.FixSpecification5;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Fix/FixedsItems';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: ''};
  phForm = new PhForm('Items', metta, options);
  showHeaderSpinner(false);
});

function acParams() {
  return {systemId: SystemFIX};
}

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
    label: getLabel('Unit'),
    element: 'UnitId',
    field: 'unitId',
    component: PhFC_Select,
    defValue: '',
    options: aUnit,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 1',
    element: 'Spc1Id',
    field: 'spc1Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpec1,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 2',
    element: 'Spc2Id',
    field: 'spc2Id',
    component: PhFC_Select,
    defValue: -1,
    options: aSpec2,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 3',
    element: 'Spc3Id',
    field: 'spc3Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpec3,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 4',
    element: 'Spc4Id',
    field: 'spc4Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpec4,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification') + ' 5',
    element: 'Spc5Id',
    field: 'spc5Id',
    component: PhFC_Select,
    defValue: '',
    options: aSpec5,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Perc'),
    element: 'Perc',
    field: 'Perc',
    component: PhFC_Number,
    defValue: '',
    minValue: 1,
    step: 1,
    maxValue: 100,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Acc.Fixed'),
    element: 'AccFId',
    field: 'accFId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Acc/GrantedAccount/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Acc.Depreciation'),
    element: 'AccDId',
    field: 'accDId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Acc/GrantedAccount/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Acc.Total.Depreciation'),
    element: 'AccRId',
    field: 'accRId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Acc/GrantedAccount/Autocomplete',
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
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: false,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Unit'),
    element: 'fldUnitId',
    field: 'unitId',
    rField: 'unitName',
    isRequired: true,
    defValue: 0,
    options: aUnit,
    tableWidth: '80px'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + ' 1',
    element: 'fldSpc1Id',
    field: 'spc1Id',
    rField: 'spc1Name',
    isRequired: true,
    defValue: 0,
    options: aSpec1,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + ' 2',
    element: 'fldSpc2Id',
    field: 'spc2Id',
    rField: 'spc2Name',
    isRequired: true,
    defValue: 0,
    options: aSpec2,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + ' 3',
    element: 'fldSpc3Id',
    field: 'spc3Id',
    rField: 'spc3Name',
    isRequired: true,
    defValue: 0,
    options: aSpec3,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + ' 4',
    element: 'fldSpc4Id',
    field: 'spc4Id',
    rField: 'spc4Name',
    isRequired: true,
    defValue: 0,
    options: aSpec4,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Specification') + ' 5',
    element: 'fldSpc5Id',
    field: 'spc5Id',
    rField: 'spc5Name',
    isRequired: true,
    defValue: 0,
    options: aSpec5,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Perc') + '%',
    element: 'fldPerc',
    field: 'perc',
    isRequired: false,
    defValue: '',
    tableWidth: '80px'
  };
  aFields[idx++] = {
    label: getLabel('Acc.Fixed'),
    element: 'fldAccFId',
    rElement: 'fldAccFName',
    field: 'accFid',
    rField: 'accFname',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Acc.Depreciation'),
    element: 'fldAccDId',
    rElement: 'fldAccDName',
    field: 'accDid',
    rField: 'accDname',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Acc.Total.Depreciation'),
    element: 'fldAccRId',
    rElement: 'fldAccRName',
    field: 'accRid',
    rField: 'accRname',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
//  aFields[idx++] = {
//    label: getLabel('Reserved'),
//    element: 'fldAccRId',
//    rElement: 'fldAccRName',
//    field: 'accRid',
//    rField: 'accRname',
//    isRequired: true,
//    defValue: '',
//    tableWidth: '10'
//  };
//  aFields[idx++] = {
//    label: getLabel('Fixed'),
//    element: 'fldAccFId',
//    rElement: 'fldAccFName',
//    field: 'accFid',
//    rField: 'accFname',
//    isRequired: true,
//    defValue: '',
//    tableWidth: '10'
//  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '250px'
  };
  return aFields;
}

