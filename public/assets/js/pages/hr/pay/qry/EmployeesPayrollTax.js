let phQForm;
let aMonth = [{"id": 1, "Name": "joj"}];
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
  options.aUrl.Api = '/CC/HR/EmployeesPayrollTax';
  options.aUrl.RUrl = {Method: 'POST', URL: ''};
  phQForm = new PhQForm('EmployeesPayrollTax', options);
  showHeaderSpinner(false);
});


function conditon() {
  let card = {
    id: "Condition",
    cardCol: 7,
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
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Year', labelCol: 3,
          element: 'fldYear', elementCol: 9,
          field: 'year', componentType: PhFC_Number,
          isRequired: false, hasSecondField: false,
          defValue: [PhSettings.Period.SDate.slice(6, 11)],
          aOpers: aNOpers
        }, {
          label: 'Month', labelCol: 3,
          element: 'fldMonth', elementCol: 9,
          field: 'month', componentType: PhFC_Number,
          isRequired: true, hasSecondField: true,
          defValue: [1, 12], min: 1, step: 1, max: 12,
          aOpers: [PhFOper_BT]
        }]
    }
  };
  return card;
}

function displayOption() {
  let card = {
    id: "DisplayOption",
    cardCol: 7,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{
          col: 2,
          label: 'Insurance', labelCol: 8,
          element: 'disInsurName', elementCol: 3,
          field: 'insurName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {
          col: 2,
          label: 'Tax', labelCol: 8,
          element: 'disTaxName', elementCol: 3,
          field: 'taxName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}
