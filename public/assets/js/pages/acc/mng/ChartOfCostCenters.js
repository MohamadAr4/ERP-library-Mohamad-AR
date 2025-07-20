let phForm;
let aType = PhSettings.PhsCodes.PhsType;
let aStatus = PhSettings.PhsCodes.PhsStatus;
jQuery(document).ready(function () {
  let options = {type: PhF_Type_Tree};
  let metta = {};
  let aURL = {};
  let QFields = [];
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Acc/CostCenters';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Tree = {Method: 'GET', URL: '/Tree'};
  aURL.NewNum = {Method: 'GET', URL: '/NewNum/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: QFields, afterTreeNew: hideBtn};
  phForm = new PhForm('costCenter', metta, options);
  showHeaderSpinner(false);
});

function hideBtn() {
  $("#" + phForm.options.btns.delete).addClass("d-none");
  $("#" + phForm.options.btns.attache).addClass("d-none");
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
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    getLabel: true,
    isRequired: true,
    defValue: '1',
    options: aStatus,
    tableWidth: 15
  };
  aFields[idx++] = {
    element: 'fldTypeId',
    field: 'typeId',
    getLabel: true,
    isRequired: true,
    defValue: '1',
    options: aType,
    tableWidth: 15
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 20
  };
  return aFields;
}
