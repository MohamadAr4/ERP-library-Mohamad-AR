let phQForm;
let aDeggre = PhSettings.UsrCodes.EmpGraddegree,
        aJob = PhSettings.UsrCodes.EmpJob,
        aApprGroup = PhSettings.UsrCodes.EmpGradgrp,
        aYesNo = PhSettings.PhsCodes.PhsYesno,
        aGradeGroups = [];
jQuery(document).ready(function () {
  let options = {};
  getGradeGroups();
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/GradeTemplates';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('GradeGroups', options);
  showHeaderSpinner(false);
});

function getGradeGroups() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/GradeTemplatesMst/List',
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
          aGradeGroups[i] = {};
          aGradeGroups[i].id = response.data.List[i].id;
          aGradeGroups[i].name = response.data.List[i].name;
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
          label: 'Number', labelCol: 3,
          element: 'fldNumber', elementCol: 9,
          field: 'grdNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'Templet', labelCol: 3,
          element: 'fldTempId', elementCol: 9,
          field: 'grdmId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aGradeGroups,
          aOpers: aSAOpers, hasHr: true
        }, {
          label: 'Work.group', labelCol: 3,
          element: 'fldApprgrpId', elementCol: 9,
          field: 'grpId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApprGroup,
          aOpers: aSAOpers
        }, {
          label: 'Grad.Degree', labelCol: 3,
          element: 'fldDegreeId', elementCol: 9,
          field: 'degreeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDeggre,
          aOpers: aSAOpers
        }, {
          label: 'isdefaultName', labelCol: 3,
          element: 'fldDefId', elementCol: 9,
          field: 'isdefaultId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aYesNo,
          aOpers: aSAOpers
        }, {
          label: 'Days', labelCol: 3,
          element: 'fldDays', elementCol: 9,
          field: 'grdDays', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Min.Salary', labelCol: 3,
          element: 'fldMinsal', elementCol: 9,
          field: 'grdMinsal', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: [''],
          aOpers: aNOpers
        }, {
          label: 'Max.Salary', labelCol: 3,
          element: 'fldMaxsal', elementCol: 9,
          field: 'grdMaxsal', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: [''],
          aOpers: aNOpers
        }]
    }
  };
  return card;
}


function displayOption() {
  let card = {
    id: "DisplayOption",
    cardCol: 8,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{
          col: 2,
          label: 'Number', labelCol: 8,
          element: 'disNumber', elementCol: 3,
          field: 'grdNum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'isdefaultName', labelCol: 8,
          element: 'disDefName', elementCol: 3,
          field: 'isdefaultName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 1
        }, {
          col: 3,
          label: 'Remark', labelCol: 8,
          element: 'disRemName', elementCol: 3,
          field: 'grdRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'Description', labelCol: 8,
          element: 'disDiscName', elementCol: 3,
          field: 'grdTrem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}
