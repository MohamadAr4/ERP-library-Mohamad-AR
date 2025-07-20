let phQForm;
let aBudget = [];
jQuery(document).ready(function () {
  let options = {};
  getList();
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Acc/BudgetsFollowup';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  options.aUrl.ExportCSV = {Method: 'POST', URL: '/CSV', Name: 'Acc_BudgetsFollowup'};
  options.aUrl.ExportXLSX = {Method: 'POST', URL: '/Excel', Name: 'Acc_BudgetsFollowup'};
  phQForm = new PhQForm('BudgetsFollowup', options);
});

function getList() {
  getBudget();
  showHeaderSpinner(false);
}

function getBudget() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Acc/BudgetMaster/List',
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
          aBudget[i] = {};
          aBudget[i].id = response.data.List[i].id;
          aBudget[i].name = response.data.List[i].num + ' - ' + response.data.List[i].name;
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
    newRow: false,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 2,
      fields: [{
          label: 'Budget', labelCol: 2,
          element: 'fldBudget', elementCol: 10,
          field: 'budId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [''], options: aBudget,
          aOpers: aSAOpers, hasHr: true
        }, {
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: true,
          defValue: ['01-01-2023', '31-12-2023'],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Cost.Center', labelCol: 2,
          element: 'fldCostId', elementCol: 10,
          field: 'costFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
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
