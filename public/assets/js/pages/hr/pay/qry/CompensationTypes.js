let phQForm;
let aTaxBrackets = [],
        aCompensationType = PhSettings.UsrCodes.EmpComtype,
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
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/Compensation';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('CompensationTypes', options);
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
    cardCol: 8,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 2,
      fields: [{
          label: 'compName', labelCol: 3,
          element: 'fldCompFname', elementCol: 9,
          field: 'compId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Compensation/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ], hasHr: true
        }, {
          componentType: PhFC_Empty
        }, {
          label: 'comtypeName', labelCol: 3,
          element: 'fldComtypeId', elementCol: 9,
          field: 'comtypeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aCompensationType,
          aOpers: aSAOpers, hasHr: false
        }, {
          label: 'taxbrktName', labelCol: 3,
          element: 'fldBrktId', elementCol: 9,
          field: 'taxbrktId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aTaxBrackets,
          aOpers: aSAOpers
        }, {
          label: 'Amount.Type', labelCol: 3,
          element: 'fldAmt', elementCol: 9,
          field: 'amttypeId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aAmount,
          aOpers: aSAOpers
        }, {
          label: 'compPamt', labelCol: 3,
          element: 'fldCompPamt', elementCol: 9,
          field: 'compPamt', componentType: PhFC_Number,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }]
    }
  };
  return card;
}

