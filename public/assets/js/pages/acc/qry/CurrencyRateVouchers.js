let phQForm;
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
  options.aUrl.Api = '/UC/Acc/CurrencyRateVouchers';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  phQForm = new PhQForm('CurrencyRateVouchers', options);
  showHeaderSpinner(false);
});

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
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'date', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aDOpers
        }, {
          label: 'USD', labelCol: 2,
          element: 'fldUsd', elementCol: 10,
          field: 'usd', componentType: PhFC_Number,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNOpers
        }, {
          label: 'EUR', labelCol: 2,
          element: 'fldEur', elementCol: 10,
          field: 'eur', componentType: PhFC_Number,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNOpers
        }, {componentType: PhFC_Empty}, {
          label: 'Rev.Acc', labelCol: 2,
          element: 'fldRevAcc', elementCol: 10,
          field: 'revaccId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Acc/Account/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Los.Acc', labelCol: 2,
          element: 'fldLosAcc', elementCol: 10,
          field: 'losAccId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/Acc/Account/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Close.Acc', labelCol: 2,
          element: 'fldAccClose', elementCol: 10,
          field: 'closeAccId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/Acc/CloseAccount/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Account', labelCol: 2,
          element: 'fldAccount', elementCol: 10,
          field: 'accId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/Acc/Account/Autocomplete', acParams: ''},
          aOpers: aSAOpers
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
          field: 'addTitel', componentType: PhFC_Text,
          isRequired: false, defValue: ''
        }]
    }
  };
  return card;
}
