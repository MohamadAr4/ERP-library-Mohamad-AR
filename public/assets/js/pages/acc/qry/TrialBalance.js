let phQForm;
let aDocument = PhSettings.CpyCodes.CpyCodeDocument;
let aDebCrd = PhSettings.PhsCodes.PhsDbcr;
let aAccounts = [{id: 0, name: 'All'}, {id: 1, name: 'Head'}, {id: 2, name: 'Active'}];
let aAccTrans = [
  {id: 0, name: 'All'}, {id: 1, name: 'Acc.HasTrans'},
  {id: 2, name: 'Acc.Not.HasTrans'}];
let aBalance = [{id: 0, name: 'All'}, {id: 1, name: 'Has.Balance'}, {id: 2, name: 'Has.Not.Balance'}];
let aDigits = PhSettings.PhsCodes.PhsDigits;
jQuery(document).ready(function () {
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = goToGeneralLedger;
  options.aUrl = {};
  options.conditonCard = conditon();
  options.optionsCard = optionsCard();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Acc/TrialBalance';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_TrialBalance'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_TrialBalance'};
  phQForm = new PhQForm('TrialBalance', options);
  showHeaderSpinner(false);
});

function conditon() {
  let card = {
    id: "Condition",
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
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', currentDate()],
          aOpers: [PhFOper_BT], hasHr: true
        }, {
          label: 'Number', labelCol: 2,
          element: 'fldNumber', elementCol: 10,
          field: 'mstNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'Account', labelCol: 2,
          element: 'fldAccount', elementCol: 10,
          field: 'accFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Cost.Center', labelCol: 2,
          element: 'fldCost', elementCol: 10,
          field: 'costFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Document', labelCol: 2,
          element: 'fldDocId', elementCol: 10,
          field: 'docId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDocument,
          aOpers: aSAOpers
        }, {
          label: 'his.Date', labelCol: 2,
          element: 'fldDocDate', elementCol: 10,
          field: 'mstDocd', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: [PhFOper_EQ]
        }, {
          label: 'his.Num', labelCol: 2,
          element: 'fldNumDoc', elementCol: 10,
          field: 'mstDocn', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNOpers
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
    newRow: true,
    visible: true,
    header: {title: "Options", isToggle: true},
    body: {
      fields: [{
          col: 4,
          label: 'Accounts', labelCol: 3,
          element: 'OptAccs', elementCol: 9,
          field: 'typeId', componentType: PhFC_Select,
          isRequired: true, defValue: 0,
          options: aAccounts
        }, {
          col: 4,
          label: 'Acc.Trans', labelCol: 3,
          element: 'OptTrans', elementCol: 9,
          field: 'trans', componentType: PhFC_Select,
          isRequired: true, defValue: 0,
          options: aAccTrans
        }, {
          col: 4,
          label: 'Acc.Rep.Digits', labelCol: 3,
          element: 'OptDigits', elementCol: 9,
          field: 'digits', componentType: PhFC_Select,
          isRequired: true, defValue: 0,
          options: aDigits
        }, {
          col: 4,
          label: 'Balance', labelCol: 3,
          element: 'OptBalance', elementCol: 9,
          field: 'balance', componentType: PhFC_Select,
          isRequired: true, defValue: 0,
          options: aBalance
        }, {
          col: 2,
          label: 'Open.Balances', labelCol: 8,
          element: 'OptOpenBalances', elementCol: 2,
          field: 'dispOpenBalances', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Totals', labelCol: 8,
          element: 'OptTotals', elementCol: 2,
          field: 'dispTotals', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 1
        }, {
          col: 2,
          label: 'Balances', labelCol: 8,
          element: 'OptBalances', elementCol: 2,
          field: 'dispBalances', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 1
        },
        {
          col: 2,
          label: 'Cost.Center', labelCol: 8,
          element: 'OptCenters', elementCol: 2,
          field: 'dispCostCenter', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }
      ]
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

function goToGeneralLedger(index) {
  let nAccId = phQForm.aData.rows[index].obj.actionRId;
  let vAccName = phQForm.aData.rows[index].cells[0].value + ' - ' + phQForm.aData.rows[index].cells[2].value;
  $.redirect("/app/acc/qry/GeneralLedger", {nAccId: nAccId, vAccName: vAccName, dSDate: $('#TrialBalancefldDate1').val(), dEDate: $('#TrialBalancefldDate2').val()}, 'POST', '_BLANK');
}



