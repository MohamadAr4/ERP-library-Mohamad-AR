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
  options.cols = 3;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.optionsCard = optionsCard();
  options.displayOptionCard = displayOption();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Str/InventoryDifferences';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  phQForm = new PhQForm('InventoryDifferences', options);
  $('#ph-commit').click(function () {
    doCommit();
  });
});

function acParams() {
  return {systemId: SystemInv};
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
    newRow: false,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 2,
      fields: [{
          label: 'Store', labelCol: 2,
          element: 'fldStorId', elementCol: 10,
          field: 'storId', componentType: PhFC_Select,
          isRequired: true, hasSecondField: false,
          defValue: "", options: aStore,
          aOpers: aSAOpers
        }, {
          label: 'Act.Num', labelCol: 4,
          element: 'fldActNum', elementCol: 8,
          field: 'mstNum', componentType: PhFC_Text,
          isRequired: true, hasSecondField: false,
          defValue: [''], aOpers: [PhFOper_EQ]
        }, {
          label: 'Item', labelCol: 2,
          element: 'fldItemId', elementCol: 10,
          field: 'itemId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Str/Items/Autocomplete', acParams: ''},
          aOpers: aSAOpers
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
        }
      ]}
  };
  return card;
}

function optionsCard() {
  let card = {
    id: "Options",
    cardCol: 4,
    order: 1,
    margin: PhConst_MarginStart,
    newRow: false,
    visible: true,
    header: {title: "Options", isToggle: true},
    body: {
      fields: [{col: 4,
          label: 'Diff.Negative', labelCol: 9,
          element: 'optDiffNegative', elementCol: 3,
          field: 'diffNegative', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 4,
          label: 'Diff.Positive', labelCol: 9,
          element: 'optDiffPositive', elementCol: 3,
          field: 'diffPositive', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 4,
          label: 'Without.Diff', labelCol: 9,
          element: 'optWithoutDiff', elementCol: 3,
          field: 'withoutDiff', componentType: PhFC_CheckBox,
          defValue: 0
        }, {
          col: 12,
          label: 'Date', labelCol: 3,
          element: 'OptDate', elementCol: 6,
          field: 'date', componentType: PhFC_DatePicker,
          isRequired: false, defValue: currentDate()
        }, {
          col: 12,
          label: 'Inbound.Account', labelCol: 3,
          element: 'OptInAccount', elementCol: 9,
          field: 'iAccId', componentType: PhFC_Autocomplete,
          isRequired: false, defValue: 0,
          autoComplete: {acUrl: '/UC/Acc/GrantedAccount/Autocomplete', acParams: 'acParams'}
        }, {
          col: 12,
          label: 'Outboud.Account', labelCol: 3,
          element: 'OptOutAccount', elementCol: 9,
          field: 'oAccId', componentType: PhFC_Autocomplete,
          isRequired: false, defValue: 0,
          autoComplete: {acUrl: '/UC/Acc/GrantedAccount/Autocomplete', acParams: 'acParams'}
        }, {
          col: 12,
          label: 'Rem', labelCol: 3,
          element: 'OptRem', elementCol: 9,
          field: 'rem', componentType: PhFC_Text,
          isRequired: false, defValue: ''
        }]}
  };
  return card;
}

function displayOption() {
  let card = {
    id: "DisplayOption",
    cardCol: 8,
    order: 2,
    margin: PhConst_MarginStart,
    newRow: false,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{col: 2,
          label: 'Store', labelCol: 9,
          element: 'disStore', elementCol: 3,
          field: 'storId', componentType: PhFC_CheckBox,
          defValue: 1
        }, {col: 9,
          label: 'Unit', labelCol: 9,
          element: 'disUnit', elementCol: 1,
          field: 'unitId', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.1', labelCol: 9,
          element: 'disSpecification1', elementCol: 3,
          field: 'spc1Id', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.2', labelCol: 8,
          element: 'disSpecification2', elementCol: 4,
          field: 'spc2Id', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.3', labelCol: 9,
          element: 'disSpecification3', elementCol: 3,
          field: 'spc3Id', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.4', labelCol: 9,
          element: 'disSpecification4', elementCol: 3,
          field: 'spc4Id', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.5', labelCol: 9,
          element: 'disSpecification5', elementCol: 3,
          field: 'spc5Id', componentType: PhFC_CheckBox,
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

function doCommit() {
  let invalid = true;
  let form = select('#InventoryDifferencesQryForm');
  form.classList.add('was-validated');
  $('#InventoryDifferencesfldActNum1').removeClass('invalid');
  $('#InventoryDifferencesOptDate').removeClass('invalid');
  $('#InventoryDifferencesOptInAccountName').removeClass('invalid');
  $('#InventoryDifferencesOptOutAccountName').removeClass('invalid');
  if ($('#InventoryDifferencesfldActNum1').val() === '') {
    $('#InventoryDifferencesfldActNum1').addClass('invalid');
    invalid = false;
  }
  if ($('#InventoryDifferencesOptDate').val() === '') {
    $('#InventoryDifferencesOptDate').addClass('invalid');
    invalid = false;
  }
  if ($('#InventoryDifferencesOptInAccount').val() <= 0 || $('#InventoryDifferencesOptInAccount').val() === '') {
    $('#InventoryDifferencesOptInAccountName').addClass('invalid');
    invalid = false;
  }
  if ($('#InventoryDifferencesOptOutAccount').val() <= 0 || $('#InventoryDifferencesOptOutAccount').val() === '') {
    $('#InventoryDifferencesOptOutAccountName').addClass('invalid');
    invalid = false;
  }
  if (invalid) {
    let method = 'POST';
    let url = PhSettings.apiURL + '/CC/Str/ExcuteInventoryDifferences';
    let form = select('#InventoryDifferencesQryForm');
    form.classList.remove('was-phF.validated');
    if (isValidForm('InventoryDifferencesQryForm')) {
      showHeaderSpinner(true);
      $.ajax({
        type: method,
        url: url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': PhSettings.Headers.Authorization,
          'periodId': PhSettings.Period.Id,
          'gId': PhSettings.GUId.GId,
          'vLang': PhSettings.display.vLang
        },
        data: JSON.stringify(phQForm.getQueryData()),
        success: function (response) {
          showHeaderSpinner(false);
        },
        error: function (response) {
          showHeaderSpinner(false);
        }
      });
    }
  }
}
