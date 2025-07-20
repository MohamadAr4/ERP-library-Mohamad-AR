let phQForm;
let aStore = [];
let aUnit = PhSettings.CpyCodes.CpyCodeUnit,
        aStatus = PhSettings.PhsCodes.Status,
        aSpecification1 = PhSettings.UsrCodes.StrSpecification1,
        aSpecification2 = PhSettings.UsrCodes.StrSpecification2,
        aSpecification3 = PhSettings.UsrCodes.StrSpecification3,
        aSpecification4 = PhSettings.UsrCodes.StrSpecification4,
        aSpecification5 = PhSettings.UsrCodes.StrSpecification5,
        aLocation1 = PhSettings.UsrCodes.StrLocation1,
        aLocation2 = PhSettings.UsrCodes.StrLocation2,
        aLocation3 = PhSettings.UsrCodes.StrLocation3;
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
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Str/StoreItems';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('InventoryQuantities', options);
  showHeaderSpinner(false);
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
          label: 'Item', labelCol: 2,
          element: 'fldItemId', elementCol: 10,
          field: 'itemFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Unit', labelCol: 2,
          element: 'fldUnitId', elementCol: 10,
          field: 'unitId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aUnit,
          aOpers: aSAOpers
        },
        {
          label: 'Spec.1', labelCol: 2,
          element: 'fldSpec1Id', elementCol: 10,
          field: 'spc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification1,
          aOpers: aSAOpers
        }, {
          label: 'Spec.2', labelCol: 2,
          element: 'fldSpec2Id', elementCol: 10,
          field: 'spc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification2,
          aOpers: aSAOpers
        }, {
          label: 'Spec.3', labelCol: 2,
          element: 'fldSpec3Id', elementCol: 10,
          field: 'spc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification3,
          aOpers: aSAOpers
        }, {
          label: 'Spec.4', labelCol: 2,
          element: 'fldSpe42Id', elementCol: 10,
          field: 'spc4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification4,
          aOpers: aSAOpers
        }, {
          label: 'Spec.5', labelCol: 2,
          element: 'fldSpec5Id', elementCol: 10,
          field: 'spc5Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification5,
          aOpers: aSAOpers
        }, {
          label: 'Location.1', labelCol: 2,
          element: 'fldLocation1Id', elementCol: 10,
          field: 'loc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation1,
          aOpers: aSAOpers
        }, {
          label: 'Location.2', labelCol: 2,
          element: 'fldLocation2Id', elementCol: 10,
          field: 'loc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation2,
          aOpers: aSAOpers
        }, {
          label: 'Location.3', labelCol: 2,
          element: 'fldLocation3Id', elementCol: 10,
          field: 'loc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation1,
          aOpers: aSAOpers
        }
//      ,{
//          label: 'Zero.Balance', labelCol: 2,
//          element: 'fldZeroBalance', elementCol: 10,
//          field: 'date', componentType: PhFC_Number,
//          isRequired: false, hasSecondField: true,
//          defValue: ['', ''],
//          aOpers: aNOpers
//        }
      ]}
  };
  return card;
}

function displayOption() {
  let card = {
    id: "DisplayOption",
    cardCol: 4,
    order: 3,
    margin: PhConst_MarginStart,
    newRow: false,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{col: 3,
          label: 'Store', labelCol: 9,
          element: 'disStore', elementCol: 3,
          field: 'storName', componentType: PhFC_CheckBox,
          defValue: 1
        }, {col: 9,
          label: 'Unit', labelCol: 9,
          element: 'disUnit', elementCol: 1,
          field: 'unitName', componentType: PhFC_CheckBox,
          defValue: 1
        }, {col: 3,
          label: 'Specification.1', labelCol: 9,
          element: 'disSpecification1', elementCol: 3,
          field: 'spc1Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.2', labelCol: 9,
          element: 'disSpecification2', elementCol: 3,
          field: 'spc2Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.3', labelCol: 9,
          element: 'disSpecification3', elementCol: 3,
          field: 'spc3Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.4', labelCol: 9,
          element: 'disSpecification4', elementCol: 3,
          field: 'spc4Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.5', labelCol: 9,
          element: 'disSpecification5', elementCol: 3,
          field: 'spc5Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Location.1', labelCol: 9,
          element: 'disLoc1', elementCol: 3,
          field: 'loc1name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Location.2', labelCol: 9,
          element: 'disLoc2', elementCol: 3,
          field: 'loc2name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Location.3', labelCol: 9,
          element: 'disLoc3', elementCol: 3,
          field: 'loc3name', componentType: PhFC_CheckBox,
          defValue: 0
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
