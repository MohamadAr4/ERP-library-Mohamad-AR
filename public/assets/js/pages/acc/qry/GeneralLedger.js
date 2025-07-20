let phQForm;
let aDocument = PhSettings.CpyCodes.CpyCodeDocument;
let aBankDocument = PhSettings.UsrCodes.AccDocument;
let aOrder = [
  {id: 'mstNum', name: getLabel('Number')},
  {id: 'mstDate', name: getLabel('Date')},
  {id: 'tdocId', name: getLabel('Bank.Doc')},
  {id: 'trnDocn', name: getLabel('her.Num')},
  {id: 'trnDocd', name: getLabel('her.Date')}];
jQuery(document).ready(function () {
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = goToDailyJournal;
  options.aUrl = {};
  options.conditonCard = conditon();
  options.orderCard = order();
  options.optionsCard = optionsCard();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Acc/GeneralLedger';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_GeneralLedger'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_GeneralLedger'};
  phQForm = new PhQForm('GeneralLedger', options);
  if ($('#fldAccId').val() !== '' && $('#fldSDate').val() !== '' && $('#fldEDate').val() !== '') {
    $('#GeneralLedgerfldAccount1').val($('#fldAccId').val());
    $('#GeneralLedgerfldAccount1Name').val($('#fldAccName').val());
    $('#GeneralLedgerfldDate1').val($('#fldSDate').val());
    $('#GeneralLedgerfldDate2').val($('#fldEDate').val());
    phQForm.doSearch();
  }
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
          label: 'Account', labelCol: 2,
          element: 'fldAccount', elementCol: 10,
          field: 'accId', componentType: PhFC_Autocomplete,
          isRequired: true, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Acc/AccActive/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          label: 'Cost.Center', labelCol: 2,
          element: 'fldCostId', elementCol: 10,
          field: 'costId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Acc/CostActive/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: true,
          defValue: ['01-01-2023', '31-12-2023'],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Number', labelCol: 2,
          element: 'fldNumber', elementCol: 10,
          field: 'mstNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Rem', labelCol: 2,
          element: 'fldRem', elementCol: 10,
          field: 'mstRem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTOpers
        }, {
          label: 'Description', labelCol: 2,
          element: 'fldTrnRem', elementCol: 10,
          field: 'trnRem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTOpers
        }, {
          label: 'Document', labelCol: 2,
          element: 'fldDocId', elementCol: 10,
          field: 'docId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDocument,
          aOpers: aSAOpers
        }, {
          componentType: PhFC_Empty
        }, {
          label: 'his.Date', labelCol: 2,
          element: 'fldDocDate', elementCol: 10,
          field: 'mstDocd', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aDNBOpers
        }, {
          label: 'his.Num', labelCol: 2,
          element: 'fldNumDoc', elementCol: 10,
          field: 'mstDocn', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNNBQOpers
        }, {
          label: 'Bank.Doc', labelCol: 2,
          element: 'fldTrnDocId', elementCol: 10,
          field: 'tdocId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aBankDocument,
          aOpers: aSAOpers
        }, {
          componentType: PhFC_Empty
        }, {
          label: 'her.Date', labelCol: 2,
          element: 'fldTrnDocDate', elementCol: 10,
          field: 'trnDocd', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aDNBOpers
        }, {
          label: 'her.Num', labelCol: 2,
          element: 'fldTrnNumDoc', elementCol: 10,
          field: 'trnDocn', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNNBQOpers
        }]
    }
  };
  return card;
}

function order() {
  let card = {
    id: "Order",
    cardCol: 4,
    order: 1,
    margin: PhConst_MarginEnd,
    newRow: false,
    visible: true,
    header: {title: "Ordering", isToggle: true},
    body: {
      elementCols: 1,
      fields: {
        label: 'Order.by', labelCol: 2,
        element: 'Ord', elementCol: 9,
        field: 'ord', componentType: PhFC_Select,
        isRequired: false, orderCount: 5, options: aOrder,
        aOpers: PhFOrderOperations, defValue: ['mstDate']
      }}};
  return card;
}

function optionsCard() {
  let card = {
    id: "Options",
    cardCol: 8,
    order: 2,
    margin: PhConst_MarginStart,
    newRow: false,
    visible: true,
    header: {title: "Options", isToggle: true},
    body: {
      fields: [{
          col: 2,
          label: 'Open.Balances', labelCol: 8,
          element: 'OptOpen', elementCol: 2,
          field: 'openBalances', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 1
        }, {
          col: 2,
          label: 'Currency', labelCol: 8,
          element: 'OptCurrency', elementCol: 2,
          field: 'currency', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Cost.Center', labelCol: 8,
          element: 'OptCenters', elementCol: 2,
          field: 'costCenters', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Remark', labelCol: 8,
          element: 'OptRem', elementCol: 2,
          field: 'mstRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Description', labelCol: 8,
          element: 'OptDesc', elementCol: 2,
          field: 'trnRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 1
        }]
    }
  };
  return card;
}

function printOption() {
  let card = {
    id: "PrintOptionCard",
    cardCol: 4,
    order: 3,
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

function goToDailyJournal(index) {
  let nMstId = phQForm.aData.rows[index].obj.actionRId;
  $.redirect("/app/acc/DailyJournal", {nId: nMstId}, 'POST', '_BLANK');
}
