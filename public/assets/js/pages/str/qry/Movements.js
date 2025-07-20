let phQForm;
let aStore = [];
let aTrnType = PhSettings.UsrCodes.StrCodeTransaction;
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
  options.aUrl.Api = '/CC/Str/Movements';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  phQForm = new PhQForm('Movements', options);
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
    url: PhSettings.apiURL + '/Str/Stores/List',
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
          label: 'Store', labelCol: 2,
          element: 'fldStorId', elementCol: 10,
          field: 'storId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aStore,
          aOpers: aSAOpers
        }, {
          label: 'Tran.Type', labelCol: 2,
          element: 'fldTranTypeId', elementCol: 10,
          field: 'tranTypeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aTrnType,
          aOpers: aSAOpers
        }, {
          label: 'Date', labelCol: 2,
          element: 'fldDateId', elementCol: 10,
          field: 'date', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['1-1-2023', '31-12-2023'],
          aOpers: aDOpers
        }, {
          label: 'Number', labelCol: 2,
          element: 'fldNumberId', elementCol: 10,
          field: 'num', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: [0, 99999],
          aOpers: aNOpers
        }, {
          label: 'Account', labelCol: 2,
          element: 'fldAccId', elementCol: 10,
          field: 'accId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Acc/Account/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }]}
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
      fields: [{col: 12,
          label: 'Add.Title', labelCol: 2,
          element: 'prtAdd', elementCol: 10,
          field: 'title', componentType: PhFC_Text,
          isRequired: false, defValue: ''
        }]}
  };
  return card;
}
