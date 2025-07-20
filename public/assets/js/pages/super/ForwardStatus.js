let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus, aUsrStatus = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getUserStatus();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Cpy/UnitForwardStatus';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('ForwardStatus', metta, options);
});

function getUserStatus() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/UnitReceiveStatus/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aUsrStatus[i] = {};
          aUsrStatus[i].id = response.data.List[i].id;
          aUsrStatus[i].name = response.data.List[i].unitName + ' - ' + response.data.List[i].rstatusName;
        }
      }
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('UrstatusfId'),
    element: 'UrstatusfId',
    field: 'urstatusfId',
    component: PhFC_Select,
    defValue: '',
    options: aUsrStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('UrstatusrId'),
    element: 'UrstatusrId',
    field: 'urstatusrId',
    component: PhFC_Select,
    defValue: '',
    options: aUsrStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
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
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('UrstatusfId'),
    element: 'fldUrstatusfId',
    field: 'urstatusfId',
    rField: 'urstatusfName',
    isRequired: true,
    defValue: '',
    options: aUsrStatus,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('UrstatusrId'),
    element: 'fldUrstatusrId',
    field: 'urstatusrId',
    rField: 'urstatusrName',
    isRequired: true,
    defValue: '',
    options: aUsrStatus,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aStatus,
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

