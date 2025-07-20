let phQForm;
jQuery(document).ready(function () {
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.optionsCard = optionsCard();
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/CC/Fix/CompareActual';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  phQForm = new PhQForm('CompareActualQTYs', options);
  showHeaderSpinner(false);
});

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
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'mstDate', componentType: PhFC_DatePicker,
          isRequired: true, hasSecondField: false,
          defValue: [currentDate()],
          aOpers: [PhFOper_LE]
        }, {
          label: 'Act.Num', labelCol: 4,
          element: 'fldActNum', elementCol: 8,
          field: 'mstNum', componentType: PhFC_Text,
          isRequired: true, hasSecondField: false,
          defValue: [''], aOpers: [PhFOper_EQ]
        }, {
          label: 'Asset', labelCol: 2,
          element: 'fldAsset', elementCol: 10,
          field: 'fixdFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
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
        }]}
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
      fields: [
        {col: 3,
          label: 'Location.1', labelCol: 9,
          element: 'disLoc1', elementCol: 2,
          field: 'loc1Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Location.2', labelCol: 9,
          element: 'disLoc2', elementCol: 2,
          field: 'loc2Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Location.3', labelCol: 9,
          element: 'disLoc3', elementCol: 2,
          field: 'loc3Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Fix.Status', labelCol: 9,
          element: 'disStatus', elementCol: 2,
          field: 'statusName', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Fix.Spec.1', labelCol: 9,
          element: 'disFixSpec1', elementCol: 2,
          field: 'fixdSpc1Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Fix.Spec.2', labelCol: 9,
          element: 'disFixSpec2', elementCol: 2,
          field: 'fixdSpc2Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Fix.Spec.3', labelCol: 9,
          element: 'disFixSpec3', elementCol: 2,
          field: 'fixdSpc3Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Fix.Spec.4', labelCol: 9,
          element: 'disFixSpec4', elementCol: 2,
          field: 'fixdSpc4Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Fix.Spec.5', labelCol: 9,
          element: 'disFixSpec5', elementCol: 2,
          field: 'fixdSpc5Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.1', labelCol: 9,
          element: 'disSpec1', elementCol: 2,
          field: 'spc1Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.2', labelCol: 9,
          element: 'disSpec2', elementCol: 2,
          field: 'spc2Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.3', labelCol: 9,
          element: 'disSpec3', elementCol: 2,
          field: 'spc3Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.4', labelCol: 9,
          element: 'disSpec4', elementCol: 2,
          field: 'spc4Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.5', labelCol: 9,
          element: 'disSpec5', elementCol: 2,
          field: 'spc5Name', componentType: PhFC_CheckBox,
          defValue: 0
        }, {col: 3,
          label: 'Specification.6', labelCol: 9,
          element: 'disSpec6', elementCol: 2,
          field: 'trnIspc6', componentType: PhFC_CheckBox,
          defValue: 0
        }]}
  };
  return card;
}

function printOption() {
  let card = {
    id: "PrintOptionCard",
    cardCol: 8,
    order: 1,
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
