let phQForm;
let aReport = [];
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
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Acc/ExecuteReport';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_ExecuteReport'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_ExecuteReport'};
  phQForm = new PhQForm('ExecuteReport', options);
});

function getList() {
  getReports();
  showHeaderSpinner(false);
}

function getReports() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Acc/Report/List',
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
          aReport[i] = {};
          aReport[i].id = response.data.List[i].id;
          aReport[i].name = response.data.List[i].name;
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
          label: 'Report', labelCol: 2,
          element: 'fldReport', elementCol: 10,
          field: 'repId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [''], options: aReport,
          aOpers: aSAOpers, hasHr: true
        }, {
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', '31-12-2023'],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Cost.Center', labelCol: 2,
          element: 'fldCostId', elementCol: 10,
          field: 'costId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Acc/CostActive/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Copm.Date', labelCol: 2,
          element: 'fldCompDate', elementCol: 10,
          field: 'compDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: [PhFOper_BT]
        }]
    }
  };
  return card;
}

function optionsCard() {
  let card = {
    id: "Options",
    cardCol: 2,
    order: 1,
    margin: PhConst_MarginStart,
    newRow: false,
    visible: true,
    header: {title: "Options", isToggle: true},
    body: {
      fields: [{
          col: 12,
          label: 'Zero.Balances', labelCol: 10,
          element: 'fldDispOpen', elementCol: 2,
          field: 'openBalances', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}

function printOption() {
  let card = {
    id: "PrintOptionCard",
    cardCol: 6,
    order: 1,
    margin: PhConst_MarginEnd,
    newRow: false,
    visible: true,
    header: {title: "Print.Options", isToggle: true},
    body: {
      fields: [{
          col: 12,
          label: 'Add.Title', labelCol: 2,
          element: 'ptnAddTitel', elementCol: 10,
          field: 'title', componentType: PhFC_Text,
          isRequired: false, defValue: ''
        }]
    }
  };
  return card;
}
