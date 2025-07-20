let phQForm;
let aStore = [];
let aStatus = PhSettings.UsrCodes.FixStatus,
        aSpecification1 = PhSettings.UsrCodes.FixSpecification1,
        aSpecification2 = PhSettings.UsrCodes.FixSpecification2,
        aSpecification3 = PhSettings.UsrCodes.FixSpecification3,
        aSpecification4 = PhSettings.UsrCodes.FixSpecification4,
        aSpecification5 = PhSettings.UsrCodes.FixSpecification5,
        aLocation1 = PhSettings.UsrCodes.FixLocation1,
        aLocation2 = PhSettings.UsrCodes.FixLocation2,
        aLocation3 = PhSettings.UsrCodes.FixLocation3;
let aGroup = [
  {id: 'fixdName', name: getLabel('Asset.Name')},
  {id: 'fixdNum', name: getLabel('Asset.Number')},
  {id: 'fixdSpc1Name', name: getLabel('Fix.Spec.1')},
  {id: 'fixdSpc2Name', name: getLabel('Fix.Spec.2')},
  {id: 'fixdSpc3Name', name: getLabel('Fix.Spec.3')},
  {id: 'fixdSpc4Name', name: getLabel('Fix.Spec.4')},
  {id: 'fixdSpc5Name', name: getLabel('Fix.Spec.5')},
  {id: 'statusName', name: getLabel('Fix.Status')},
  {id: 'loc1Name', name: getLabel('Location.1')},
  {id: 'loc2Name', name: getLabel('Location.2')},
  {id: 'loc3Name', name: getLabel('Location.3')},
  {id: 'spc1Name', name: getLabel('Specification.1')},
  {id: 'spc2Name', name: getLabel('Specification.2')},
  {id: 'spc3Name', name: getLabel('Specification.3')},
  {id: 'spc4Name', name: getLabel('Specification.4')},
  {id: 'spc5Name', name: getLabel('Specification.5')}];

jQuery(document).ready(function () {
  initAggregation();
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.groupCard = group();
  options.aggregationCard = aggregation();
  options.printOptionCard = printOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Fix/TransactionStatistics';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Statistics'};
  phQForm = new PhQForm('MovementsStatistics', options);
  showHeaderSpinner(false);
});

function acParams() {
}

function initAggregation() {
  let nIdx = 0;
  aAggregation[nIdx++] = {
    "id": "0",
    "filed": "trnPrice",
    "name": "Price",
    "Aggrs": [PhAggregate_Min, PhAggregate_Max]
  };
  aAggregation[nIdx++] = {
    "id": "1",
    "filed": "trnQnt",
    "name": "Qnt",
    "Aggrs": [PhAggregate_Sum, PhAggregate_Avg, PhAggregate_Min, PhAggregate_Max]
  };
  aAggregation[nIdx++] = {
    "id": "2",
    "filed": "trnAmt",
    "name": "Amount",
    "Aggrs": [PhAggregate_Sum, PhAggregate_Avg, PhAggregate_Min, PhAggregate_Max]
  };
}

function conditon() {
  let card = {
    id: "Conditon",
    cardCol: 12,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 3,
      fields: [{
          label: 'Date', labelCol: 3,
          element: 'fldDate', elementCol: 9,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Number', labelCol: 3,
          element: 'fldNum', elementCol: 9,
          field: 'mstNum', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Serial', labelCol: 3,
          element: 'fldTrn', elementCol: 9,
          field: 'trnId', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Asset', labelCol: 3,
          element: 'fldAsset', elementCol: 9,
          field: 'fixdFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Fix.Status', labelCol: 3,
          element: 'fldStatusId', elementCol: 9,
          field: 'statusId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aStatus,
          aOpers: aSAOpers
        }, {
          label: 'S.Date', labelCol: 3,
          element: 'fldSDateId', elementCol: 9,
          field: 'trnSdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'E.Date', labelCol: 3,
          element: 'fldEDateId', elementCol: 9,
          field: 'trnEdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Fix.Spec.1', labelCol: 3,
          element: 'fldFixSpec1Id', elementCol: 9,
          field: 'fixdSpc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification1,
          aOpers: aSAOpers
        }, {
          label: 'Fix.Spec.2', labelCol: 3,
          element: 'fldFixSpec2Id', elementCol: 9,
          field: 'fixdSpc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification2,
          aOpers: aSAOpers
        }, {
          label: 'Fix.Spec.3', labelCol: 3,
          element: 'fldFixSpec3Id', elementCol: 9,
          field: 'fixdSpc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification3,
          aOpers: aSAOpers
        }, {
          label: 'Fix.Spec.4', labelCol: 3,
          element: 'fldFixSpec1Id', elementCol: 9,
          field: 'fixdSpc4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification4,
          aOpers: aSAOpers
        }, {
          label: 'Fix.Spec.5', labelCol: 3,
          element: 'fldFixSpec5Id', elementCol: 9,
          field: 'fixdSpc5Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification5,
          aOpers: aSAOpers
        }, {
          label: 'Spec.1', labelCol: 3,
          element: 'fldSpec1Id', elementCol: 9,
          field: 'spc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification1,
          aOpers: aSAOpers
        }, {
          label: 'Spec.2', labelCol: 3,
          element: 'fldSpec2Id', elementCol: 9,
          field: 'spc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification2,
          aOpers: aSAOpers
        }, {
          label: 'Spec.3', labelCol: 3,
          element: 'fldSpec3Id', elementCol: 9,
          field: 'spc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification3,
          aOpers: aSAOpers
        }, {
          label: 'Spec.4', labelCol: 3,
          element: 'fldSpec4Id', elementCol: 9,
          field: 'spc4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification4,
          aOpers: aSAOpers
        }, {
          label: 'Spec.5', labelCol: 3,
          element: 'fldSpec5Id', elementCol: 9,
          field: 'spc5Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aSpecification5,
          aOpers: aSAOpers
        }, {
          label: 'Spec.6', labelCol: 3,
          element: 'fldSpec', elementCol: 9,
          field: 'trnSpc6', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTOpers
        }, {
          label: 'Location.1', labelCol: 3,
          element: 'fldLocation1Id', elementCol: 9,
          field: 'loc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation1,
          aOpers: aSAOpers
        }, {
          label: 'Location.2', labelCol: 3,
          element: 'fldLocation2Id', elementCol: 9,
          field: 'loc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation2,
          aOpers: aSAOpers
        }, {
          label: 'Location.3', labelCol: 3,
          element: 'fldLocation3Id', elementCol: 9,
          field: 'loc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [1], options: aLocation1,
          aOpers: aSAOpers
        }
      ]}
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
        isRequired: false, groupCount: 2, options: aGroup,
        defValue: ['fixdName', 'fixdNum']
      }}};
  return card;
}

function aggregation() {
  let card = {
    id: "Aggregation",
    cardCol: 4,
    order: 2,
    margin: PhConst_MarginEnd,
    newRow: false,
    visible: true,
    header: {title: "Aggregation", isToggle: true},
    body: {
      elementCols: 1,
      fields: {
        label: 'Aggregation', labelCol: 2,
        element: 'Aggr', elementCol: 10,
        field: 'Aggr', componentType: PhFC_Select,
        isRequired: true, aggregationCount: 5,
        options: aAggregation, defValue: ['trnAmt']
      }}};
  return card;
}

function printOption() {
  let card = {
    id: "PrintOptionCard",
    cardCol: 4,
    order: 3,
    margin: '',
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
