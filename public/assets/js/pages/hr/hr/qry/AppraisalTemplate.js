let phQForm;
let aAppraisalTemp = [],
        aApprGroup = PhSettings.UsrCodes.EmpAppraisalGrp,
        aApprItem = PhSettings.UsrCodes.EmpAppraisalItem,
        aJob = PhSettings.UsrCodes.EmpJob,
        aSection = PhSettings.UsrCodes.EmpSection,
        aDepartment = PhSettings.UsrCodes.EmpDepartment,
        aSpec1 = PhSettings.UsrCodes.EmpSpecification1,
        aSpec2 = PhSettings.UsrCodes.EmpSpecification2,
        aSpec3 = PhSettings.UsrCodes.EmpSpecification3,
        aSpec4 = PhSettings.UsrCodes.EmpSpecification4,
        aLevel = PhSettings.UsrCodes.EmpLevel;
jQuery(document).ready(function () {
  let options = {};
  getAppraisalTemp();
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/AppraisalTemplates';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('AppraisalTemplate', options);
  showHeaderSpinner(false);
});

function getAppraisalTemp() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/AppraisalTemplatesMst/List',
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
          aAppraisalTemp[i] = {};
          aAppraisalTemp[i].id = response.data.List[i].id;
          aAppraisalTemp[i].name = response.data.List[i].name;
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
          field: 'tmpltNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'Templet', labelCol: 3,
          element: 'fldTempId', elementCol: 9,
          field: 'tmpltmId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aAppraisalTemp,
          aOpers: aSAOpers, hasHr: true
        }, {
          label: 'Appraisal.Group', labelCol: 3,
          element: 'fldApprgrpId', elementCol: 9,
          field: 'agrpId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApprGroup,
          aOpers: aSAOpers
        }, {
          label: 'Appraisal.Item', labelCol: 3,
          element: 'fldAppritmId', elementCol: 9,
          field: 'aitmId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApprItem,
          aOpers: aSAOpers
        }, {
          label: 'Points', labelCol: 3,
          element: 'fldPoint', elementCol: 9,
          field: 'tmpltPoint', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
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
          field: 'tmpltNum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Remark', labelCol: 8,
          element: 'disRemName', elementCol: 3,
          field: 'tmpltmRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Description', labelCol: 8,
          element: 'disDiscName', elementCol: 3,
          field: 'tmplttRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}

