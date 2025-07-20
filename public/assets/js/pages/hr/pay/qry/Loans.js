let phQForm;
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aJob = PhSettings.UsrCodes.EmpJob,
        aSection = PhSettings.UsrCodes.EmpSection,
        aDepartment = PhSettings.UsrCodes.EmpDepartment,
        aSpec1 = PhSettings.UsrCodes.EmpSpecification1,
        aSpec2 = PhSettings.UsrCodes.EmpSpecification2,
        aSpec3 = PhSettings.UsrCodes.EmpSpecification3,
        aSpec4 = PhSettings.UsrCodes.EmpSpecification4,
        aLevel = PhSettings.UsrCodes.EmpLevel,
        aYesNo = PhSettings.PhsCodes.PhsYesno;
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
  options.aUrl.Api = '/UC/Emp/Loans';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('Loans', options);
  showHeaderSpinner(false);
});

function conditon() {
  let card = {
    id: "Condition",
    cardCol: 12,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 3,
      fields: [{
          label: 'Num', labelCol: 4,
          element: 'fldNum', elementCol: 8,
          field: 'loanNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'Ddate', labelCol: 4,
          element: 'fldDate', elementCol: 8,
          field: 'loanDdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers, hasHr: true
        }, {
          label: 'Employee', labelCol: 4,
          element: 'fldEmpFname', elementCol: 8,
          field: 'empId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          label: 'Pflg', labelCol: 4,
          element: 'fldPflgId', elementCol: 8,
          field: 'yesnoId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aYesNo,
          aOpers: aSAOpers
        }, {
          label: 'S.date', labelCol: 4,
          element: 'fldSdate', elementCol: 8,
          field: 'loanSdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'E.date', labelCol: 4,
          element: 'fldEdate', elementCol: 8,
          field: 'loanEdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'loanTamt', labelCol: 4,
          element: 'fldTamt', elementCol: 8,
          field: 'loanTamt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'loanMamt', labelCol: 4,
          element: 'fldMamt', elementCol: 8,
          field: 'loanMamt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'loanBamt', labelCol: 4,
          element: 'fldBamt', elementCol: 8,
          field: 'loanBamt', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Status', labelCol: 4,
          element: 'fldStatusId', elementCol: 8,
          field: 'statusId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aStatus,
          aOpers: aSAOpers
        }, {
          label: 'loanRem', labelCol: 4,
          element: 'fldRem', elementCol: 8,
          field: 'loanRem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNQOpers
        }, {
          label: 'Job', labelCol: 4,
          element: 'fldJobId', elementCol: 8,
          field: 'jobId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aJob,
          aOpers: aSAOpers
        }, {
          label: 'Section', labelCol: 4,
          element: 'fldSectId', elementCol: 8,
          field: 'sectId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSection,
          aOpers: aSAOpers
        }, {
          label: 'Department', labelCol: 4,
          element: 'fldDeptId', elementCol: 8,
          field: 'deptId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDepartment,
          aOpers: aSAOpers
        }, {
          label: 'Level', labelCol: 4,
          element: 'fldLevelId', elementCol: 8,
          field: 'levelId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aLevel,
          aOpers: aSAOpers
        }, {
          label: 'Specification.1', labelCol: 4,
          element: 'fldSpc1Id', elementCol: 8,
          field: 'spc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec1,
          aOpers: aSAOpers
        }, {
          label: 'Specification.2', labelCol: 4,
          element: 'fldSpc2Id', elementCol: 8,
          field: 'spc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec2,
          aOpers: aSAOpers
        }, {
          label: 'Specification.3', labelCol: 4,
          element: 'fldSpc3Id', elementCol: 8,
          field: 'spc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec4,
          aOpers: aSAOpers
        }, {
          label: 'Specification.4', labelCol: 4,
          element: 'fldSpc4Id', elementCol: 8,
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
    cardCol: 12,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [
        {
          col: 2,
          label: 'Num', labelCol: 10,
          element: 'disLoanNum', elementCol: 2,
          field: 'loanNum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Status', labelCol: 10,
          element: 'disStatusName', elementCol: 2,
          field: 'statusName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Pflg', labelCol: 10,
          element: 'disPflgName', elementCol: 2,
          field: 'yesnoName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'S.date', labelCol: 10,
          element: 'disSdateName', elementCol: 2,
          field: 'loanSdate', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'E.date', labelCol: 10,
          element: 'disEdateName', elementCol: 2,
          field: 'loanEdate', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Job', labelCol: 10,
          element: 'disJobName', elementCol: 2,
          field: 'jobName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Section', labelCol: 10,
          element: 'disSectName', elementCol: 2,
          field: 'sectName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Department', labelCol: 10,
          element: 'disDeptName', elementCol: 2,
          field: 'deptName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Level', labelCol: 10,
          element: 'disLevelName', elementCol: 2,
          field: 'levelName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Specification.1', labelCol: 10,
          element: 'disSpc1Name', elementCol: 2,
          field: 'spc1Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Specification.2', labelCol: 10,
          element: 'disSpc2Name', elementCol: 2,
          field: 'spc2Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Specification.3', labelCol: 10,
          element: 'disSpc3Name', elementCol: 2,
          field: 'spc3Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Specification.4', labelCol: 10,
          element: 'disSpc4Name', elementCol: 2,
          field: 'spc4Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}
