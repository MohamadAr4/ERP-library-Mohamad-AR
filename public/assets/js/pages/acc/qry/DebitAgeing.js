let phQForm;
let aDays = PhSettings.PhsCodes.PhsAgeDays;
let aAccountKind = PhSettings.PhsCodes.PhsDbcr;

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
  options.aUrl.Api = '/CC/Acc/DebitAgeing';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_DebitAgeing'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_DebitAgeing'};
  phQForm = new PhQForm('DebitAgeing', options);
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
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: false,
          defValue: [currentDate()],
          aOpers: [PhFOper_LE]
        }, {
          label: 'Account', labelCol: 3,
          element: 'fldAccount', elementCol: 9,
          field: 'accFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Days', labelCol: 2,
          element: 'fldDays', elementCol: 10,
          field: 'days', componentType: PhFC_Select,
          isRequired: true, hasSecondField: false,
          defValue: [-1], options: aDays,
          aOpers: aSAOpers
        }, {
          label: 'acc.Kind', labelCol: 3,
          element: 'fldKind', elementCol: 9,
          field: 'dbcrId', componentType: PhFC_Select,
          isRequired: true, hasSecondField: false,
          defValue: [-1], options: aAccountKind,
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
          field: 'title', componentType: PhFC_Text,
          isRequired: false, defValue: ''
        }]
    }
  };
  return card;
}
