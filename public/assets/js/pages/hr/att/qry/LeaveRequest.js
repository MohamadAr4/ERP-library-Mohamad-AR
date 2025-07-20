let phQForm;
let aType = PhSettings.UsrCodes.EmpLeave;
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
  options.aUrl.Api = '/UC/Emp/LeaveRequest';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('LeaveRequest', options);
  showHeaderSpinner(false);
});

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
          label: 'Date', labelCol: 3,
          element: 'fldDate', elementCol: 9,
          field: 'reqDdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', currentDate()],
          aOpers: [PhFOper_BT], hasHr: true
        }, {
          label: 'Number', labelCol: 3,
          element: 'fldNumber', elementCol: 9,
          field: 'reqNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'Employee', labelCol: 3,
          element: 'fldEmpFname', elementCol: 9,
          field: 'empName', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          componentType: PhFC_Empty
        }, {
          label: 'Type', labelCol: 3,
          element: 'fldTypeId', elementCol: 9,
          field: 'typeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aType,
          aOpers: aSAOpers
        }, {
          label: 'Status', labelCol: 3,
          element: 'fldApproveId', elementCol: 9,
          field: 'approveId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aApprove,
          aOpers: aSAOpers
        }, {
          label: 'S.Date', labelCol: 3,
          element: 'fldStartDate', elementCol: 9,
          field: 'reqSdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', ''],
          aOpers: aDOpers
        }, {
          label: 'E.Date', labelCol: 3,
          element: 'fldEndDate', elementCol: 9,
          field: 'reqEdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', ''],
          aOpers: aDOpers
        }, {
          label: 'S.Hour', labelCol: 3,
          element: 'fldShour', elementCol: 9,
          field: 'reqShour', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'E.Hour', labelCol: 3,
          element: 'fldEhour', elementCol: 9,
          field: 'reqEhour', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Job', labelCol: 3,
          element: 'fldJobId', elementCol: 9,
          field: 'jobId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aJob,
          aOpers: aSAOpers
        }, {
          label: 'Section', labelCol: 3,
          element: 'fldSectId', elementCol: 9,
          field: 'sectId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSection,
          aOpers: aSAOpers
        }, {
          label: 'Department', labelCol: 3,
          element: 'fldDeptId', elementCol: 9,
          field: 'deptId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDepartment,
          aOpers: aSAOpers
        }, {
          label: 'Emp.Level', labelCol: 3,
          element: 'fldLevelId', elementCol: 9,
          field: 'levelId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aLevel,
          aOpers: aSAOpers
        }, {
          label: 'Specification.1', labelCol: 3,
          element: 'fldSpc1Id', elementCol: 9,
          field: 'spc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec1,
          aOpers: aSAOpers
        }, {
          label: 'Specification.2', labelCol: 3,
          element: 'fldSpc2Id', elementCol: 9,
          field: 'spc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec2,
          aOpers: aSAOpers
        }, {
          label: 'Specification.3', labelCol: 3,
          element: 'fldSpc3Id', elementCol: 9,
          field: 'spc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec3,
          aOpers: aSAOpers
        }, {
          label: 'Specification.4', labelCol: 3,
          element: 'fldSpc4Id', elementCol: 9,
          field: 'spc4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec4,
          aOpers: aSAOpers
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
          field: 'deptName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'Emp.Level', labelCol: 8,
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
        }, {
          col: 3,
          label: 'Specification.3', labelCol: 8,
          element: 'disSpc3Name', elementCol: 3,
          field: 'spc3Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
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
