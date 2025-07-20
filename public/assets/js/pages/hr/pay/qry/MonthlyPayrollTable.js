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
  options.aUrl.Api = '/CC/HR/SalariesCalculation';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('MonthlyPayrollTable', options);
  showHeaderSpinner(false);
  $('#ph-execute-form-2').click(function () {
    phQForm.doSearch(PhSettings.apiURL + '/UC/Emp/SalariesCalculation/Query');
  });
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
          componentType: PhFC_Empty
        }, {
          label: 'Year', labelCol: 3,
          element: 'fldYear', elementCol: 9,
          field: 'salYear', componentType: PhFC_Number,
          isRequired: false, hasSecondField: false,
          defValue: [PhSettings.Period.SDate.slice(6, 11)],
          aOpers: aNOpers
        }, {
          label: 'Month', labelCol: 3,
          element: 'fldMonth', elementCol: 9,
          field: 'salMonth', componentType: PhFC_Number,
          isRequired: true, hasSecondField: true,
          defValue: [1, 12], min: 1, step: 1, max: 12,
          aOpers: [PhFOper_BT]
        }, {
          label: 'Bank.Status', labelCol: 3,
          element: 'fldBankstatusId', elementCol: 9,
          field: 'bankstatusId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aBankstatus,
          aOpers: aSAOpers
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

function doCommit() {
  let invalid = true;
  let form = select('#ClosingAccountsQryForm');
  form.classList.add('was-validated');
  $('#ClosingAccountsOptCloseAccountName').removeClass('invalid');
  $('#ClosingAccountsOptCloseCostName').removeClass('invalid');
  if ($('#ClosingAccountsOptCloseAccountName').val() <= 0 || $('#ClosingAccountsOptCloseAccountName').val() === '') {
    $('#ClosingAccountsOptCloseAccountName').addClass('invalid');
    invalid = false;
  }
  if ($('#ClosingAccountsOptCloseCostName').val() <= 0 || $('#ClosingAccountsOptCloseCostName').val() === '') {
    $('#ClosingAccountsOptCloseCostName').addClass('invalid');
    invalid = false;
  }
  if (invalid) {
    let method = 'POST';
    let url = PhSettings.apiURL + '/UC/Acc/ClosingAccounts';
    form.classList.remove('was-phF.validated');
    if (isValidForm('ClosingAccountsQryForm')) {
      showHeaderSpinner(true);
      $.ajax({
        type: method,
        url: url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': PhSettings.Headers.Authorization,
          'periodId': PhSettings.Period.Id,
          'gId': PhSettings.GUId.GId,
          'vLang': PhSettings.display.vLang
        },
        data: JSON.stringify(phQForm.getQueryData()),
        success: function (response) {
          showHeaderSpinner(false);
        },
        error: function (response) {
          showHeaderSpinner(false);
        }
      });
    }
  }
}
