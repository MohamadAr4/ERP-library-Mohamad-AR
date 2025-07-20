let phQForm;
let aDocument = PhSettings.CpyCodes.CpyCodeDocument;
let aBankDocument = PhSettings.UsrCodes.AccDocument;
let aOrder = [
  {id: 'mstNum', name: getLabel('Number')},
  {id: 'mstDate', name: getLabel('Date')},
  {id: 'mstPnum', name: getLabel('Print.Number')},
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
  options.displayOptionCard = displayOption();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Acc/DailyJournal';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_DailyJournal'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_DailyJournal'};
  phQForm = new PhQForm('Daily', options);
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
          isRequired: true, hasSecondField: true,
          defValue: ['01-01-2023', '31-12-2023'],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Number', labelCol: 3,
          element: 'fldNumber', elementCol: 9,
          field: 'mstNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Document', labelCol: 2,
          element: 'fldDocId', elementCol: 10,
          field: 'docId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDocument,
          aOpers: aSAOpers
        }, {
          label: 'his.Date', labelCol: 3,
          element: 'fldDocDate', elementCol: 9,
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
          label: 'Rem', labelCol: 3,
          element: 'fldRem', elementCol: 9,
          field: 'mstRem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTOpers
        }, {
          label: 'Bank.Doc', labelCol: 2,
          element: 'fldTrnDocId', elementCol: 10,
          field: 'tdocId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aBankDocument,
          aOpers: aSAOpers
        }, {
          label: 'her.Date', labelCol: 3,
          element: 'fldTrnDocDate', elementCol: 9,
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
        }, {
          componentType: PhFC_Empty
        }, {
          label: 'ins.User', labelCol: 2,
          element: 'fldInsUser', elementCol: 10,
          field: 'insUser', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Cpy/Users/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'ins.Date', labelCol: 3,
          element: 'fldinsDate', elementCol: 9,
          field: 'insDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'upd.User', labelCol: 2,
          element: 'fldUpdUser', elementCol: 10,
          field: 'updUser', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Cpy/Users/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'upd.Date', labelCol: 3,
          element: 'fldupdDate', elementCol: 9,
          field: 'updDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
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
    margin: PhConst_MarginStart,
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

function displayOption() {
  let card = {
    id: "DisplayOption",
    cardCol: 4,
    order: 1,
    margin: PhConst_MarginEnd,
    newRow: true,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{
          col: 4,
          label: 'Cost.Center', labelCol: 8,
          element: 'OptCostFname', elementCol: 3,
          field: 'costFname', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'Remark', labelCol: 8,
          element: 'OptRem', elementCol: 3,
          field: 'mstRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'Description', labelCol: 8,
          element: 'OptDesc', elementCol: 3,
          field: 'trnRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'Document', labelCol: 8,
          element: 'OptdocName', elementCol: 3,
          field: 'docName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'his.Num', labelCol: 8,
          element: 'OptMstDocn', elementCol: 3,
          field: 'mstDocn', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'his.Date', labelCol: 8,
          element: 'OptmstDocd', elementCol: 3,
          field: 'mstDocd', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'Bank.Doc', labelCol: 8,
          element: 'OptTdocName', elementCol: 3,
          field: 'tdocName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'her.num', labelCol: 8,
          element: 'OptTDocn', elementCol: 3,
          field: 'trnDocn', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'her.Date', labelCol: 8,
          element: 'OptTDocd', elementCol: 3,
          field: 'trnDocd', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'ins.User', labelCol: 8,
          element: 'optInsUser', elementCol: 3,
          field: 'insUser', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 4,
          label: 'upd.User', labelCol: 8,
          element: 'OptUpdUser', elementCol: 3,
          field: 'updUser', componentType: PhFC_CheckBox,
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
    order: 2,
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

function goToDailyJournal(index) {
  let nMstId = phQForm.aData.rows[index].obj.actionRId;
  $.redirect("/app/acc/DailyJournal", {nId: nMstId}, 'POST', '_BLANK');
}