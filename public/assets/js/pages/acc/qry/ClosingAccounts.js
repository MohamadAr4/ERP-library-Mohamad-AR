let phQForm;
let aAccClose = [];
jQuery(document).ready(function () {
  let options = {};
  getList();
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.optionsCard = optionsCard();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Acc/ClosingAccounts';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_ClosingAccounts'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_ClosingAccounts'};
  phQForm = new PhQForm('ClosingAccounts', options);
  $('#ph-commit').click(function () {
    doCommit();
  });
});

function getList() {
  getCloseAccount();
  showHeaderSpinner(false);
}

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
        for (let i = 0; i < response.data.List.length; i++) {
          aAccClose[i] = {};
          aAccClose[i].id = response.data.List[i].id;
          aAccClose[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function conditon() {
  let card = {
    id: "Conditon",
    cardCol: 8,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 2,
      fields: [{
          label: 'Close.Account', labelCol: 3,
          element: 'fldAccClose', elementCol: 9,
          field: 'closeId', componentType: PhFC_Select,
          isRequired: true, hasSecondField: false,
          defValue: [''], options: aAccClose,
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          componentType: PhFC_Empty
        }, {
          label: 'Date', labelCol: 3,
          element: 'fldDate', elementCol: 9,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: false,
          defValue: [currentDate()],
          aOpers: [PhFOper_LE]
        }, {
          label: 'Number', labelCol: 3,
          element: 'fldNumber', elementCol: 9,
          field: 'mstNum', componentType: PhFC_Number,
          isRequired: true, hasSecondField: false,
          defValue: [999999],
          aOpers: [PhFOper_LE]
        }]
    }
  };
  return card;
}

function optionsCard() {
  let card = {
    id: "Options",
    cardCol: 8,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: false,
    visible: true,
    header: {title: "Options", isToggle: true},
    body: {
      fields: [{
          col: 6,
          label: 'Close.Account', labelCol: 3,
          element: 'OptCloseAccount', elementCol: 9,
          field: 'caccId', componentType: PhFC_Autocomplete,
          isRequired: false, defValue: 0,
          autoComplete: {acUrl: '/UC/Acc/AccActive/Autocomplete', acParams: ''}
        }, {
          col: 6,
          label: 'Close.Cost.Center', labelCol: 3,
          element: 'OptCloseCost', elementCol: 9,
          field: 'costId', componentType: PhFC_Autocomplete,
          isRequired: false, defValue: 0,
          autoComplete: {acUrl: '/UC/Acc/CostActive/Autocomplete', acParams: ''}
        }, {
          col: 6,
          label: 'Date', labelCol: 3,
          element: 'OptDate', elementCol: 6,
          field: 'date', componentType: PhFC_DatePicker,
          isRequired: false, defValue: currentDate()
        }, {
          col: 6,
          label: 'Rem', labelCol: 3,
          element: 'OptRem', elementCol: 9,
          field: 'rem', componentType: PhFC_Text,
          isRequired: false, defValue: ''
        }]
    }
  };
  return card;
}

function doCommit() {
  let invalid = true;
  let form = select('#ClosingAccountsQryForm');
  form.classList.add('was-validated');
  $('#ClosingAccountsOptCloseAccountName').removeClass('invalid');
  $('#ClosingAccountsOptCloseCostName').removeClass('invalid');
  if ($('#ClosingAccountsOptCloseAccountName').val() <= 0 || $('#ClosingAccountsOptCloseAccountName').val() === '') {
    $('#ClosingAccountsOptCloseAccountName').addClass('invalid');
    invalid = false;
  }
  if ($('#ClosingAccountsOptCloseCostName').val() <= 0 || $('#ClosingAccountsOptCloseCostName').val() === '') {
    $('#ClosingAccountsOptCloseCostName').addClass('invalid');
    invalid = false;
  }
  if (invalid) {
    let method = 'POST';
    let url = PhSettings.apiURL + '/UC/Acc/ClosingAccounts';
    form.classList.remove('was-phF.validated');
    if (isValidForm('ClosingAccountsQryForm')) {
      showHeaderSpinner(true);
      $.ajax({
        type: method,
        url: url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': PhSettings.Headers.Authorization,
          'periodId': PhSettings.Period.Id,
          'gId': PhSettings.GUId.GId,
          'vLang': PhSettings.display.vLang
        },
        data: JSON.stringify(phQForm.getQueryData()),
        success: function (response) {
          showHeaderSpinner(false);
        },
        error: function (response) {
          showHeaderSpinner(false);
        }
      });
    }
  }
}