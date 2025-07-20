let phQForm;
let aType = PhSettings.PhsCodes.PhsAmountType;
jQuery(document).ready(function () {
  let options = {};
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/Deduction';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('DeductionTypes', options);
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
          label: 'dedName', labelCol: 3,
          element: 'fldDedName', elementCol: 9,
          field: 'dedId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Deduction/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          componentType: PhFC_Empty
        }, {
          label: 'Amount.Type', labelCol: 3,
          element: 'fldAmttypeId', elementCol: 9,
          field: 'amttypeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aType,
          aOpers: aSAOpers
        }, {
          label: 'dedAmt', labelCol: 3,
          element: 'fldDedAmt', elementCol: 9,
          field: 'dedAmt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }]
    }
  };
  return card;
}

