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
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Str/OverMaxLimit';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('OverMaxLimitsQuantities', options);
});

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
        }, {
          label: 'Spec.1', labelCol: 2,
          element: 'fldSpec1Id', elementCol: 10,
          field: 'spec1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification1,
          aOpers: aSAOpers
        }, {
          label: 'Spec.2', labelCol: 2,
          element: 'fldSpec2Id', elementCol: 10,
          field: 'spec2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification2,
          aOpers: aSAOpers
        }, {
          label: 'Spec.3', labelCol: 2,
          element: 'fldSpec3Id', elementCol: 10,
          field: 'spec3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification3,
          aOpers: aSAOpers
        }, {
          label: 'Spec.4', labelCol: 2,
          element: 'fldSpe42Id', elementCol: 10,
          field: 'spec4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification4,
          aOpers: aSAOpers
        }, {
          label: 'Spec.5', labelCol: 2,
          element: 'fldSpec5Id', elementCol: 10,
          field: 'spec5Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification5,
          aOpers: aSAOpers
        }, {
          label: 'Location.1', labelCol: 2,
          element: 'fldLocation1Id', elementCol: 10,
          field: 'location1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation1,
          aOpers: aSAOpers
        }, {
          label: 'Location.2', labelCol: 2,
          element: 'fldLocation2Id', elementCol: 10,
          field: 'location2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation2,
          aOpers: aSAOpers
        }, {
          label: 'Location.3', labelCol: 2,
          element: 'fldLocation3Id', elementCol: 10,
          field: 'location3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation1,
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
