let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aUnitId = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getUnit();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Cpy/UnitOperations';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('UnitOperations', metta, options);
});

function getUnit() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/DepartmentUnit/List',
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
          aUnitId[i] = {};
          aUnitId[i].id = response.data.List[i].id;
          aUnitId[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
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
    label: getLabel('UnitId'),
    element: 'UnitId',
    field: 'unitId',
    component: PhFC_Select,
    defValue: '',
    options: aUnitId,
    aOpers: aSAOpers
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
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    isRequired: true,
    defValue: '',
    getLabel: true,
    options: aStatus,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('UnitId'),
    element: 'fldUnitId',
    field: 'unitId',
    rField: 'unitName',
    isRequired: true,
    defValue: '',
    options: aUnitId,
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
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  return aFields;
}

