let phQForm;
let aReport = [];
jQuery(document).ready(function () {
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Acc/TotalAccount';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_TotalAccount'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_TotalAccount'};
  phQForm = new PhQForm('Totals', options);
  showHeaderSpinner(false);
});

function conditon() {
  let card = {
    id: "Conditon",
    cardCol: 8,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: false,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 2,
      fields: [{
          label: 'Total.Account', labelCol: 3,
          element: 'fldReport', elementCol: 9,
          field: 'totId', componentType: PhFC_Autocomplete,
          isRequired: true, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Acc/AccTotal/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          label: 'Cost.Center', labelCol: 2,
          element: 'fldCostId', elementCol: 10,
          field: 'costFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', '31-12-2023'],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Copm.Date', labelCol: 2,
          element: 'fldCompDate', elementCol: 10,
          field: 'compDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: true,
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
    cardCol: 4,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: false,
    visible: true,
    header: {title: "Options", isToggle: true},
    body: {
      fields: [{
          col: 6,
          label: 'With.Comp', labelCol: 8,
          element: 'fldWithComp', elementCol: 2,
          field: 'withComp', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}

function printOption() {
  let card = {
    id: "PrintOptionCard",
    cardCol: 8,
    order: 1,
    margin: PhConst_MarginAuto,
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
