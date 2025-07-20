let phQForm;
let aType = PhSettings.UsrCodes.EmpHistory,
  aApp=[],
   aApprGroup = PhSettings.UsrCodes.EmpAppraisalGrp,
        aApprItem = PhSettings.UsrCodes.EmpAppraisalItem;
aApprove = PhSettings.PhsCodes.PhsApproveStatus,
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
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/ApplicationFormDetails';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('ApplicationFormDetails', options);
  //getAppraisalTemp(),
  showHeaderSpinner(false);
});
function getAppraisalTemp() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/AppraisalTemplatesMst',
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
          aApp[i] = {};
          aApp[i].id = response.data.List[i].id;
          aApp[i].name = response.data.List[i].name;

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
          label: 'Date', labelCol: 2,
          element: 'fldDate', elementCol: 10,
          field: 'date', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', currentDate()],
          aOpers: [PhFOper_BT], hasHr: true
        },
        {
          label: 'Number', labelCol: 2,
          element: 'fldNumber', elementCol: 10,
          field: 'num', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
         aOpers: aTAOpers, hasHr: true
        },
       
        {
          label: 'Employee', labelCol: 2,
          element: 'fldEmpFname', elementCol: 10,
          field: 'empFname', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        },
         {
          label: 'Appraisal.Temp', labelCol: 2,
          element: 'fldApprtem', elementCol: 10,
          field: 'apprtem', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApp,
          aOpers: aSAOpers
        },
         {
          label: 'Appraisal.Group', labelCol: 2,
          element: 'fldApprgrpId', elementCol: 10,
          field: 'apprgrpId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApprGroup,
          aOpers: aSAOpers
        },
         {
          label: 'Appraisal.Item', labelCol: 2,
          element: 'fldAppritmId', elementCol: 10,
          field: 'appritmId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApprItem,
          aOpers: aSAOpers
        },
        {
          label: 'Status', labelCol: 2,
          element: 'fldApproveId', elementCol: 10,
          field: 'approveId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApprove,
          aOpers: aSAOpers
        },
          {
          label: 'Job', labelCol: 2,
          element: 'fldJobId', elementCol: 10,
          field: 'jobId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aJob,
          aOpers: aSAOpers},
        {
          label: 'Section', labelCol: 2,
          element: 'fldSectId', elementCol: 10,
          field: 'sectId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSection,
          aOpers: aSAOpers
        },
        {
          label: 'Department', labelCol: 2,
          element: 'fldDeptId', elementCol: 10,
          field: 'deptId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDepartment,
          aOpers: aSAOpers
        },
        {
          label: 'Specification.1', labelCol: 2,
          element: 'fldSpc1Id', elementCol: 10,
          field: 'spc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec1,
          aOpers: aSAOpers
        },
        {
          label: 'Specification.2', labelCol: 2,
          element: 'fldSpc2Id', elementCol: 10,
          field: 'spc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec2,
          aOpers: aSAOpers
        }, {
          label: 'Specification.3', labelCol: 2,
          element: 'fldSpc3Id', elementCol: 10,
          field: 'spc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec3,
          aOpers: aSAOpers
        }, {
          label: 'Specification.4', labelCol: 2,
          element: 'fldSpc4Id', elementCol: 10,
          field: 'spc4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec4,
          aOpers: aSAOpers
        },
        {
          label: 'Level', labelCol: 2,
          element: 'fldLevelId', elementCol: 10,
          field: 'levelId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aLevel,
          aOpers: aSAOpers
        }
      ]
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
          col: 3,
          label: 'Job', labelCol: 8,
          element: 'disJobName', elementCol: 3,
          field: 'jobName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'Section', labelCol: 8,
          element: 'disSectName', elementCol: 3,
          field: 'sectName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'Department', labelCol: 8,
          element: 'disDeptName', elementCol: 3,
          field: 'DeptName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        },
        {
          col: 3,
          label: 'Level', labelCol: 8,
          element: 'disLevelName', elementCol: 3,
          field: 'levelName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'Specification.1', labelCol: 8,
          element: 'disSpc1Name', elementCol: 3,
          field: 'spc1Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'Specification.2', labelCol: 8,
          element: 'disSpc2Name', elementCol: 3,
          field: 'spc2Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        },
        {
          col: 3,
          label: 'Specification.3', labelCol: 8,
          element: 'disSpc3Name', elementCol: 3,
          field: 'spc3Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        },
        {
          col: 3,
          label: 'Specification.4', labelCol: 8,
          element: 'disSpc4Name', elementCol: 3,
          field: 'spc4Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}
