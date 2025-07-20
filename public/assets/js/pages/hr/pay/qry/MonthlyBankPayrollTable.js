let phQForm;
let aLevel = PhSettings.UsrCodes.EmpLevel,
        aSection = PhSettings.UsrCodes.EmpSection,
        aJob = PhSettings.UsrCodes.EmpJob,
        aBankstatus = PhSettings.PhsCodes.PhsYesno,
        aDepartment = PhSettings.UsrCodes.EmpDepartment,
        aSpec1 = PhSettings.UsrCodes.EmpSpecification1,
        aSpec2 = PhSettings.UsrCodes.EmpSpecification2,
        aSpec3 = PhSettings.UsrCodes.EmpSpecification3,
        aSpec4 = PhSettings.UsrCodes.EmpSpecification4;
jQuery(document).ready(function () {
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/MonthlyBankPayrollTable';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('MonthlyBankPayrollTable', options);
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
          label: 'Employee', labelCol: 3,
          element: 'fldEmpId', elementCol: 9,
          field: 'empId', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''], hasHr: true,
          aOpers: aTAOpers
        }, {
          label: 'Date', labelCol: 3,
          element: 'fldDate', elementCol: 9,
          field: 'date', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['01-01-2023', currentDate()],
          aOpers: [PhFOper_BT], hasHr: true
        }, {
          label: 'Year', labelCol: 3,
          element: 'fldYear', elementCol: 9,
          field: 'salYear', componentType: PhFC_Number,
          isRequired: false, hasSecondField: false,
          defValue: [PhSettings.Period.SDate.slice(6, 11)],
          aOpers: aDNBOpers
        }, {
          label: 'Month', labelCol: 3,
          element: 'fldMonth', elementCol: 9,
          field: 'salMonth', componentType: PhFC_Number,
          isRequired: true, hasSecondField: true,
          defValue: [1, 12], min: 1, step: 1, max: 12,
          aOpers: [PhFOper_BT]
        }, {
          label: 'Department', labelCol: 3,
          element: 'fldDeptId', elementCol: 9,
          field: 'deptId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDepartment,
          aOpers: aSAOpers
        }, {
          label: 'Section', labelCol: 3,
          element: 'fldSectId', elementCol: 9,
          field: 'sectId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSection,
          aOpers: aSAOpers
        }, {
          label: 'Emp.Level', labelCol: 3,
          element: 'fldLevelId', elementCol: 9,
          field: 'levelId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aLevel,
          aOpers: aSAOpers
        }, {
          label: 'Job', labelCol: 3,
          element: 'fldJobId', elementCol: 9,
          field: 'jobId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aJob,
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
