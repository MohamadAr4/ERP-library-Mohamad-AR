let phForm;
let aAge = PhSettings.UsrCodes.LrgCodeAge,
        aDatatype = PhSettings.UsrCodes.LrgFinanceDataType;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/AgeFinanceDataType';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('AgeFinDataType', metta, options);
});

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('AgeId'),
    element: 'AgeId',
    field: 'ageId',
    component: PhFC_Select,
    defValue: '',
    options: aAge,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('DatatypeId'),
    element: 'DatatypeId',
    field: 'datatypeId',
    component: PhFC_Select,
    defValue: '',
    options: aDatatype,
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
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('AgeId'),
    element: 'fldAgeId',
    field: 'ageId',
    rField: 'ageName',
    isRequired: true,
    defValue: '',
    options: aAge,
    tableWidth: '200px'
  };
  aFields[idx++] = {
    label: getLabel('DatatypeId'),
    element: 'fldDatatypeId',
    field: 'datatypeId',
    rField: 'datatypeName',
    isRequired: true,
    defValue: '',
    options: aDatatype,
    tableWidth: '200px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '500px'
  };
  return aFields;
}
