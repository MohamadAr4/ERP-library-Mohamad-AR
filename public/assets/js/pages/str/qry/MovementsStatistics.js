let phQForm;
let aSpecification1 = PhSettings.UsrCodes.StrSpecification1,
        aSpecification2 = PhSettings.UsrCodes.StrSpecification2,
        aSpecification3 = PhSettings.UsrCodes.StrSpecification3,
        aSpecification4 = PhSettings.UsrCodes.StrSpecification4,
        aSpecification5 = PhSettings.UsrCodes.StrSpecification5,
        aLocation1 = PhSettings.UsrCodes.StrLocation1,
        aLocation2 = PhSettings.UsrCodes.StrLocation2,
        aLocation3 = PhSettings.UsrCodes.StrLocation3;
let aStore = [];
let aGroup = [
  {id: 'storName', name: getLabel('Store')},
  {id: 'itemFname', name: getLabel('Item')},
  {id: 'spc1Name', name: getLabel('Specification.1')},
  {id: 'spc2Name', name: getLabel('Specification.2')},
  {id: 'spc3Name', name: getLabel('Specification.3')},
  {id: 'spc4Name', name: getLabel('Specification.4')},
  {id: 'spc5Name', name: getLabel('Specification.5')},
  {id: 'dYear', name: getLabel('Year')},
  {id: 'dMonth', name: getLabel('Month')},
  {id: 'dDayOfMonth', name: getLabel('Day Of Month')},
  {id: 'dDayOfYear', name: getLabel('Day Of Year')},
  {id: 'dDayOfWeek', name: getLabel('Day Of Week')},
  {id: 'dYearMonth', name: getLabel('Year Month')}
];

jQuery(document).ready(function () {
  let options = {};
  getList();
  options.type = "";
  options.cols = 3;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = condition();
  options.groupCard = group();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Str/TransactionsStatistics';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Statistics'};
  phQForm = new PhQForm('MovementsStatistics', options);
});

function acParams() {
  return {"storId": phQForm.getAutoCompleteFieldValue('fldStorId')};
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

function condition() {
  let card = {
    id: "Condition",
    cardCol: 8,
    order: 0,
    margin: PhConst_MarginStart,
    newRow: false,
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
          label: 'Date', labelCol: 2,
          element: 'fldDateId', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
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
        }]}
  };
  return card;
}

function group() {
  let card = {
    id: "Group",
    cardCol: 4,
    order: 1,
    margin: PhConst_MarginEnd,
    newRow: false,
    visible: true,
    header: {title: "Grouping", isToggle: true},
    body: {
      elementCols: 1,
      fields: {
        label: 'Group.by', labelCol: 2,
        element: 'Grp', elementCol: 10,
        field: 'grp', componentType: PhFC_Select,
        isRequired: true, groupCount: 1,
        defValue: ['storName', -1], options: aGroup
      }}};
  return card;
}

function printOption() {
  let card = {
    id: "PrintOptionCard",
    cardCol: 8,
    order: 2,
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
