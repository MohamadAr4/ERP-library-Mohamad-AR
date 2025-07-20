let phQForm;
let aStore = [], aTrnType = PhSettings.UsrCodes.StrTransactionType;
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
  options.aUrl.Api = '/CC/Str/ItemMovementsCard';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  phQForm = new PhQForm('ItemMovments', options);
});

function acParams() {
}

function getList() {
  getStore();
  showHeaderSpinner(false);
}

function getStore() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Str/Stores/List',
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
          aStore[i] = {};
          aStore[i].id = response.data.List[i].id;
          aStore[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

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
          label: 'Store', labelCol: 2,
          element: 'fldStorId', elementCol: 10,
          field: 'storId', componentType: PhFC_Select,
          isRequired: true, hasSecondField: false,
          defValue: [1], options: aStore,
          aOpers: [PhFOper_EQ]
        }, {
          label: 'Item', labelCol: 2,
          element: 'fldItemId', elementCol: 10,
          field: 'itemId', componentType: PhFC_Autocomplete,
          isRequired: true, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Str/Items/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ]
        }, {
          label: 'Date', labelCol: 2,
          element: 'fldDateId', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: true,
          defValue: ['1-1-2023', '31-12-2023'],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Number', labelCol: 2,
          element: 'fldNumberId', elementCol: 10,
          field: 'mstNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Tran.Type', labelCol: 2,
          element: 'fldTranTypeId', elementCol: 10,
          field: 'trntypId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aTrnType,
          aOpers: aSAOpers
        }, {
          label: 'Account', labelCol: 2,
          element: 'fldAccountId', elementCol: 10,
          field: 'accFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTOpers
        }]}
  };
  return card;
}

function optionsCard() {
  let card = {
    id: "Options",
    cardCol: 4,
    order: 3,
    margin: PhConst_MarginStart,
    newRow: false,
    visible: true,
    header: {title: "Options", isToggle: true},
    body: {
      fields: [{col: 12,
          label: 'Open.Balances', labelCol: 11,
          element: 'optOpenBalance', elementCol: 1,
          field: 'openBalance', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0,
          options: []
        }]}
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
      fields: [{col: 12,
          label: 'Add.Title', labelCol: 2,
          element: 'prtAdd', elementCol: 10,
          field: 'title', componentType: PhFC_Text,
          isRequired: false, defValue: ''
        }]}
  };
  return card;
}
