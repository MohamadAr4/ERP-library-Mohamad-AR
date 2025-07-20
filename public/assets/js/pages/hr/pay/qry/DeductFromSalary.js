let phQForm;
let aType = PhSettings.UsrCodes.EmpChangeType,
        aSalaryType = PhSettings.UsrCodes.EmpAffectedSalary,
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
  options.aUrl.Api = '/UC/Emp/SubfromSalary';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('DeductFromSalary', options);
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
          label: 'sfsalNum', labelCol: 3,
          element: 'fldSfsalNum', elementCol: 9,
          field: 'sfsalNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'sfsalDdate', labelCol: 3,
          element: 'fldSfsalDdate', elementCol: 9,
          field: 'sfsalDdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers, hasHr: true
        }, {
          label: 'sfsalDocn', labelCol: 3,
          element: 'fldSfsalDocn', elementCol: 9,
          field: 'sfsalDocn', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'sfsalDocd', labelCol: 3,
          element: 'fldSfsalDocd', elementCol: 9,
          field: 'sfsalDocd', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Employee', labelCol: 3,
          element: 'fldEmpFname', elementCol: 9,
          field: 'empId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ]
        }, {
          label: 'sfsalempSal', labelCol: 3,
          element: 'fldSal', elementCol: 9,
          field: 'sfsalempSal', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'sfsalNmonth', labelCol: 3,
          element: 'fldNmonth', elementCol: 9,
          field: 'sfsalNmonth', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'sfsalNyear', labelCol: 3,
          element: 'fldNyear', elementCol: 9,
          field: 'sfsalNyear', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'codChngtypeName', labelCol: 3,
          element: 'fldTypeId', elementCol: 9,
          field: 'codChngtypeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aType,
          aOpers: aSAOpers
        }, {
          label: 'codAffsalName', labelCol: 3,
          element: 'fldSaltypId', elementCol: 9,
          field: 'codAffsalId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSalaryType,
          aOpers: aSAOpers
        }, {
          label: 'sfsalPerc', labelCol: 3,
          element: 'fldPerc', elementCol: 9,
          field: 'sfsalPerc', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'sfsalAmt', labelCol: 3,
          element: 'fldAmt', elementCol: 9,
          field: 'sfsalAmt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'sfsalNmin', labelCol: 3,
          element: 'fldNmin', elementCol: 9,
          field: 'sfsalNmin', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'sfsalNmax', labelCol: 3,
          element: 'fldNmax', elementCol: 9,
          field: 'sfsalNmax', componentType: PhFC_Number,
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
        }, {
          label: 'sfsalRem', labelCol: 3,
          element: 'fldRem', elementCol: 9,
          field: 'sfsalRem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNQOpers
        }, {
          label: 'sfsalempRem', labelCol: 3,
          element: 'fldSalRem', elementCol: 9,
          field: 'sfsalempRem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aNQOpers
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
          label: 'Num', labelCol: 10,
          element: 'disNum', elementCol: 2,
          field: 'sfsalNum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: ""
        }, {
          col: 2,
          label: 'Ddate', labelCol: 10,
          element: 'disDate', elementCol: 2,
          field: 'sfsalDdate', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'sfsalDocn', labelCol: 10,
          element: 'disDocn', elementCol: 2,
          field: 'sfsalDocn', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'sfsalDocd', labelCol: 10,
          element: 'disDocd', elementCol: 2,
          field: 'sfsalDocd', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'sfsalNmax', labelCol: 10,
          element: 'disNmin', elementCol: 2,
          field: 'sfsalNmax', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'sfsalNmonth', labelCol: 10,
          element: 'disNmonth', elementCol: 2,
          field: 'sfsalNmonth', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'sfsalNyear', labelCol: 10,
          element: 'disNyear', elementCol: 2,
          field: 'sfsalNyear', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'sfsalNmin', labelCol: 10,
          element: 'disNmax', elementCol: 2,
          field: 'sfsalNmin', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'sfsalempRem', labelCol: 10,
          element: 'disRem', elementCol: 2,
          field: 'sfsalempRem', componentType: PhFC_CheckBox,
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

