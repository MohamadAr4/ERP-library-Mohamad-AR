let phForm;
let aClosAccount = [];
let aType = PhSettings.PhsCodes.PhsType;
let aStatus = PhSettings.PhsCodes.PhsStatus;
let aDBCR = PhSettings.PhsCodes.PhsDbcr;
jQuery(document).ready(function () {
  getCloseAccount();
  let options = {type: PhF_Type_Tree};
  let metta = {};
  let aURL = {};
  let QFields = [];
  aURL.Url = PhSettings.apiURL;
  aURL.CApi = '/CC/Acc/Account';
  aURL.Api = '/UC/Acc/Account';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Tree = {Method: 'GET', URL: '/Tree'};
  aURL.NewNum = {Method: 'GET', URL: '/NewNum/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: QFields, afterTreeNew: hideBtn};
  phForm = new PhForm('account', metta, options);
  showHeaderSpinner(false);
});

function getCloseAccount() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Acc/CloseAccount/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        showHeaderSpinner(false);
        for (let i = 0; i < response.data.List.length; i++) {
          aClosAccount[i] = {};
          aClosAccount[i].id = response.data.List[i].id;
          aClosAccount[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function hideBtn() {
  $("#" + phForm.options.btns.delete).addClass("d-none");
  $("#" + phForm.options.btns.attache).addClass("d-none");
  $("#fldNum").val();
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
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: ''
  };
  aFields[idx++] = {
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
    label: getLabel('Deb-Crd'),
    element: 'fldDBCRId',
    field: 'dbcrId',
    getLabel: true,
    isRequired: true,
    defValue: '1',
    options: aDBCR,
    tableWidth: 15
  };
  aFields[idx++] = {
    label: getLabel('Account'),
    element: 'fldCloseId',
    field: 'closeId',
    isRequired: true,
    defValue: 0,
    options: aClosAccount
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: ''
  };
  return aFields;
}
