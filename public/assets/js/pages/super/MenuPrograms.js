let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aMprgId = PhSettings.PhsCodes.PhsMenuPrograms,
        aMenuId = PhSettings.PhsCodes.PhsMenus;

jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Phs/MenuPrograms';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('MenuPrograms', metta, options);
});

function getQFields() {
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
    label: getLabel('MenuId'),
    element: 'MenuId',
    field: 'menuId',
    component: PhFC_Select,
    defValue: '',
    getLabel: true,
    options: aMenuId,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Ord'),
    element: 'Ord',
    field: 'ord',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    component: PhFC_Select,
    defValue: '',
    getLabel: true,
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Apiurl'),
    element: 'Apiurl',
    field: 'apiurl',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Url'),
    element: 'Url',
    field: 'url',
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
    element: 'fldMprgId',
    field: 'mprgId',
    isRequired: true,
    Value: aMprgId
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '100'
  };
  aFields[idx++] = {
    label: getLabel('MenuId'),
    element: 'fldMenuId',
    field: 'menuId',
    rField: 'menuName',
    isRequired: true,
    defValue: '',
    getLabel: true,
    options: aMenuId,
    tableWidth: '100'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    isRequired: true,
    defValue: '',
    getLabel: true,
    options: aStatus,
    tableWidth: '100'
  };
  aFields[idx++] = {
    label: getLabel('Ord'),
    element: 'fldOrd',
    field: 'ord',
    isRequired: true,
    defValue: '',
    tableWidth: '100'
  };
  aFields[idx++] = {
    label: getLabel('Apiurl'),
    element: 'fldApiurl',
    field: 'apiurl',
    isRequired: true,
    defValue: '',
    tableWidth: '100'
  };
  aFields[idx++] = {
    label: getLabel('Url'),
    element: 'fldUrl',
    field: 'url',
    isRequired: true,
    defValue: '',
    tableWidth: '100'
  };
  aFields[idx++] = {
    label: getLabel('Icon'),
    element: 'fldIcon',
    field: 'icon',
    isRequired: true,
    defValue: '',
    tableWidth: '100'
  };
  return aFields;
}

