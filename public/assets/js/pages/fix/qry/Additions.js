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
jQuery(document).ready(function () {
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.printOptionCard = printOption();
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Fix/Inbound';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('Additions', options);
  showHeaderSpinner(false);
});

function acParams() {
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
          componentType: PhFC_Empty
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
          element: 'fldFixSpec4Id', elementCol: 9,
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

function displayOption() {
  let card = {
    id: "DisplayOption",
    cardCol: 8,
    order: 1,
    margin: '',
    newRow: false,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{col: 2,
          label: 'Status', labelCol: 9,
          element: 'disStatus', elementCol: 3,
          field: 'statusName', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Fix.Spec.1', labelCol: 9,
          element: 'disFixSpec1', elementCol: 3,
          field: 'fixdSpc1Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Fix.Spec.2', labelCol: 9,
          element: 'disFixSpec2', elementCol: 3,
          field: 'fixdSpc2Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Fix.Spec.3', labelCol: 9,
          element: 'disFixSpec3', elementCol: 3,
          field: 'fixdSpc3Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Fix.Spec.4', labelCol: 9,
          element: 'disFixSpec4', elementCol: 3,
          field: 'fixdSpc4Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Fix.Spec.5', labelCol: 9,
          element: 'disFixSpec5', elementCol: 3,
          field: 'fixdSpc5Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.1', labelCol: 9,
          element: 'disSpec1', elementCol: 3,
          field: 'spc1Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.2', labelCol: 9,
          element: 'disSpec2', elementCol: 3,
          field: 'spc2Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.3', labelCol: 9,
          element: 'disSpec3', elementCol: 3,
          field: 'spc3Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.4', labelCol: 9,
          element: 'disSpec4', elementCol: 3,
          field: 'spc4Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.5', labelCol: 9,
          element: 'disSpec5', elementCol: 3,
          field: 'spc5Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Specification.6', labelCol: 9,
          element: 'disSpec6', elementCol: 3,
          field: 'trnSpc6', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Location.1', labelCol: 9,
          element: 'disLoc1', elementCol: 3,
          field: 'loc1Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Location.2', labelCol: 9,
          element: 'disLoc2', elementCol: 3,
          field: 'loc2Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 2,
          label: 'Location.3', labelCol: 9,
          element: 'disLoc3', elementCol: 3,
          field: 'loc3Name', componentType: PhFC_CheckBox,
          defValue: 0
        }]}
  };
  return card;
}

function printOption() {
  let card = {
    id: "PrintOptionCard",
    cardCol: 4,
    order: 2,
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
