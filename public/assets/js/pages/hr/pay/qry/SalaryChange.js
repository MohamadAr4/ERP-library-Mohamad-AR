let phQForm;
let aType = PhSettings.UsrCodes.EmpChangeType,
        aSalaryType = PhSettings.UsrCodes.EmpAffectedSalary,
        aAfectedType = PhSettings.UsrCodes.EmpAffected,
        aTaxBracket = [],
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
  getList();
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/ChangeSalary';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('SalaryChange', options);
});
function getList() {
  getTaxBracket();
  showHeaderSpinner(false);
}
function getTaxBracket() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/ChangesalaryBracketsMst/List',
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
          aTaxBracket[i] = {};
          aTaxBracket[i].id = response.data.List[i].id;
          aTaxBracket[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

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
          label: 'Num', labelCol: 3,
          element: 'fldNumber', elementCol: 9,
          field: 'csalNum', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers, hasHr: true
        }, {
          label: 'Ddate', labelCol: 3,
          element: 'fldDate', elementCol: 9,
          field: 'csalDdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers, hasHr: true
        }, {
          label: 'csalDocn', labelCol: 3,
          element: 'fldDocn', elementCol: 9,
          field: 'csalDocn', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'csalDocd', labelCol: 3,
          element: 'fldDocd', elementCol: 9,
          field: 'csalDocd', componentType: PhFC_DatePicker,
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
          label: 'csalempOsal', labelCol: 3,
          element: 'fldOsal', elementCol: 9,
          field: 'csalempOsal', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'csalempChnge', labelCol: 3,
          element: 'fldSalChnge', elementCol: 9,
          field: 'csalempChnge', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'csalempNsal', labelCol: 3,
          element: 'fldNsal', elementCol: 9,
          field: 'csalempNsal', componentType: PhFC_Number,
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
          label: 'taxbrktName', labelCol: 3,
          element: 'fldBrktId', elementCol: 9,
          field: 'taxbrktId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aTaxBracket,
          aOpers: aSAOpers
        }, {
          label: 'csalPerc', labelCol: 3,
          element: 'fldPerc', elementCol: 9,
          field: 'csalPerc', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'csalAmt', labelCol: 3,
          element: 'fldAmt', elementCol: 9,
          field: 'csalAmt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'csalNmin', labelCol: 3,
          element: 'fldNmin', elementCol: 9,
          field: 'csalNmin', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'csalNmax', labelCol: 3,
          element: 'fldNmax', elementCol: 9,
          field: 'csalNmax', componentType: PhFC_Number,
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
          label: 'csalRem', labelCol: 3,
          element: 'fldCsalRem', elementCol: 9,
          field: 'csalRem', componentType: PhFC_Text,
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
          col: 3,
          label: 'csalNum', labelCol: 8,
          element: 'disNumName', elementCol: 3,
          field: 'csalNum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalDdate', labelCol: 8,
          element: 'disDateName', elementCol: 3,
          field: 'csalDdate', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalDocn', labelCol: 8,
          element: 'disDocnName', elementCol: 3,
          field: 'csalDocn', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalDocd', labelCol: 8,
          element: 'disDocdName', elementCol: 3,
          field: 'csalDocd', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalempRem', labelCol: 8,
          element: 'disDocdRemName', elementCol: 3,
          field: 'csalempRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalempChnge', labelCol: 8,
          element: 'disChangName', elementCol: 3,
          field: 'csalempChnge', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'taxbrktName', labelCol: 8,
          element: 'disBrktName', elementCol: 3,
          field: 'taxbrktName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalPerc', labelCol: 8,
          element: 'disPercName', elementCol: 3,
          field: 'csalPerc', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalAmt', labelCol: 8,
          element: 'disAmtName', elementCol: 3,
          field: 'csalAmt', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalNmin', labelCol: 8,
          element: 'disNminName', elementCol: 3,
          field: 'csalNmin', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'csalNmax', labelCol: 8,
          element: 'disNmaxName', elementCol: 3,
          field: 'csalNmax', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
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
        }, {
          col: 3,
          label: 'csalRem', labelCol: 8,
          element: 'disRemName', elementCol: 3,
          field: 'csalRem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}

