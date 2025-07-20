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
  options.aUrl.Api = '/CC/Acc/BankJournalAudit';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_BankJournalAudit'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_BankJournalAudit'};
  phQForm = new PhQForm('BankJournalAudit', options);
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
          label: 'BankNumber', labelCol: 3,
          element: 'fldBankId', elementCol: 9,
          field: 'bankFname', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Acc/BankDoc/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        },
        {
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: true,
          defValue: ['01-01-2023', '31-12-2023'],
          aOpers: [PhFOper_BT]
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
