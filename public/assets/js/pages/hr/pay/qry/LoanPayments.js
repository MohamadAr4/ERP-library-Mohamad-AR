let phQForm;
let aJob = PhSettings.UsrCodes.EmpJob,
        aSection = PhSettings.UsrCodes.EmpSection,
        aDepartment = PhSettings.UsrCodes.EmpDepartment,
        aSpec1 = PhSettings.UsrCodes.EmpSpecification1,
        aSpec2 = PhSettings.UsrCodes.EmpSpecification2,
        aSpec3 = PhSettings.UsrCodes.EmpSpecification3,
        aSpec4 = PhSettings.UsrCodes.EmpSpecification4,
        aLevel = PhSettings.UsrCodes.EmpLevel,
        aYesNo = PhSettings.PhsCodes.PhsYesno,
        aSource = PhSettings.PhsCodes.PhsSource;
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
  options.aUrl.Api = '/UC/Emp/LoanPayments';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('LoanPayments', options);
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
          label: 'loanNum', labelCol: 3,
          element: 'fldNum', elementCol: 9,
          field: 'loanNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'loanDdate', labelCol: 3,
          element: 'fldDate', elementCol: 9,
          field: 'loanDdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers, hasHr: true
        }, {
          label: 'Employee', labelCol: 3,
          element: 'fldEmpFname', elementCol: 9,
          field: 'empId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          label: 'Pflg', labelCol: 3,
          element: 'fldPflgId', elementCol: 9,
          field: 'yesnoId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aYesNo,
          aOpers: aSAOpers
        }, {
          label: 'S.date', labelCol: 3,
          element: 'fldSdate', elementCol: 9,
          field: 'loanSdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'E.date', labelCol: 3,
          element: 'fldEdate', elementCol: 9,
          field: 'loanEdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'loanTamt', labelCol: 3,
          element: 'fldTamt', elementCol: 9,
          field: 'loanTamt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'loanMamt', labelCol: 3,
          element: 'fldMamt', elementCol: 9,
          field: 'loanMamt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'loanBamt', labelCol: 3,
          element: 'fldBamt', elementCol: 9,
          field: 'loanBamt', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'ploanSrcid', labelCol: 3,
          element: 'fldPloanSrcid', elementCol: 9,
          field: 'ploanSrcid', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSource,
          aOpers: aSAOpers
        }, {
          label: 'ploanNum', labelCol: 3,
          element: 'fldPnum', elementCol: 9,
          field: 'ploanNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'ploanAmt', labelCol: 3,
          element: 'fldPloanAmt', elementCol: 9,
          field: 'ploanAmt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'ploanDdate', labelCol: 3,
          element: 'fldPdate', elementCol: 9,
          field: 'ploanDdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'ploanRem', labelCol: 3,
          element: 'fldPrem', elementCol: 9,
          field: 'ploanRem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNQOpers
        }, {
          label: 'loanRem', labelCol: 3,
          element: 'fldRem', elementCol: 9,
          field: 'remName', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
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
          label: 'Level', labelCol: 3,
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
    cardCol: 12,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{
          col: 2,
          label: 'Ddate', labelCol: 10,
          element: 'disLoanDdate', elementCol: 2,
          field: 'loanDdate', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Status', labelCol: 10,
          element: 'disStatusName', elementCol: 2,
          field: 'statusNameDeprecatedLoan', componentType: PhFC_CheckBox,
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
          field: 'sdateName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'E.date', labelCol: 10,
          element: 'disEdateName', elementCol: 2,
          field: 'edateName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'ploanSrcid', labelCol: 10,
          element: 'disPloanSrcName', elementCol: 2,
          field: 'ploanSrcid', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'loanMamt', labelCol: 10,
          element: 'disLoanMamt', elementCol: 2,
          field: 'loanMamt', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'loanTamt', labelCol: 10,
          element: 'disLoanTamt', elementCol: 2,
          field: 'loanTamt', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'ploanRem', labelCol: 10,
          element: 'disPloanRem', elementCol: 2,
          field: 'ploanRem', componentType: PhFC_CheckBox,
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
        }, {
          col: 2,
          label: 'rem', labelCol: 10,
          element: 'disRemName', elementCol: 2,
          field: 'loanRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}
