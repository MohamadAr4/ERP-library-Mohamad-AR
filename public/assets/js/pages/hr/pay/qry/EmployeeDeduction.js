let phQForm;
let aTaxBrackets = [],
        aJob = PhSettings.UsrCodes.EmpJob,
        aStatus = PhSettings.PhsCodes.PhsStatus,
        aType = PhSettings.PhsCodes.PhsAmountType,
        aSection = PhSettings.UsrCodes.EmpSection,
        aDepartment = PhSettings.UsrCodes.EmpDepartment,
        aSpec1 = PhSettings.UsrCodes.EmpSpecification1,
        aSpec2 = PhSettings.UsrCodes.EmpSpecification2,
        aSpec3 = PhSettings.UsrCodes.EmpSpecification3,
        aSpec4 = PhSettings.UsrCodes.EmpSpecification4,
        aLevel = PhSettings.UsrCodes.EmpLevel,
        aAmount = PhSettings.PhsCodes.PhsAmountType,
        aTaxpay = PhSettings.UsrCodes.EmpTaxpay;

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
  options.aUrl.Api = '/UC/Emp/EmployeeDeduction';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('EmployeeDeduction', options);
});

function getList() {
  getTaxBrackets();
  showHeaderSpinner(false);
}

function getTaxBrackets() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/TaxBracketsMaster/List',
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
          aTaxBrackets[i] = {};
          aTaxBrackets[i].id = response.data.List[i].id;
          aTaxBrackets[i].name = response.data.List[i].num + ' - ' + response.data.List[i].name;
        }
      }
    }
  });
}

function conditon() {
  let card = {
    id: "Condition",
    cardCol: 9,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 2,
      fields: [{
          label: 'dedName', labelCol: 3,
          element: 'fldDedName', elementCol: 9,
          field: 'dedId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Deduction/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          label: 'Employee', labelCol: 3,
          element: 'fldEmpFname', elementCol: 9,
          field: 'empId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ]
        }, {
          label: 'S.date', labelCol: 3,
          element: 'fldSdate', elementCol: 9,
          field: 'startDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'E.date', labelCol: 3,
          element: 'fldEdate', elementCol: 9,
          field: 'startDate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Status', labelCol: 3,
          element: 'fldStatusId', elementCol: 9,
          field: 'statusId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aStatus,
          aOpers: aSAOpers
        }, {
          label: 'Amount.Type', labelCol: 3,
          element: 'fldAmttypeId', elementCol: 9,
          field: 'amttypeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aType,
          aOpers: aSAOpers
        }, {
          label: 'Amount', labelCol: 3,
          element: 'fldTrnamt', elementCol: 9,
          field: 'dedAmt', componentType: PhFC_Number,
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
    cardCol: 9,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{
          col: 3,
          label: 'dedNum', labelCol: 8,
          element: 'disDedNum', elementCol: 3,
          field: 'dedNum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'Employee', labelCol: 8,
          element: 'disEmpName', elementCol: 3,
          field: 'empId', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 3,
          label: 'amttypeName', labelCol: 8,
          element: 'disAmttypeName', elementCol: 3,
          field: 'amttypeName', componentType: PhFC_CheckBox,
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
        }, {
          col: 3,
          label: 'Rem', labelCol: 8,
          element: 'disRemName', elementCol: 3,
          field: 'rem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}
