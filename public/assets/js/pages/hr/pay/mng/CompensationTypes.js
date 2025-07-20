let phForm;
let aType = PhSettings.PhsCodes.PhsAmountType;
let aYesNo = PhSettings.PhsCodes.PhsYesno;
let aCompensationType = PhSettings.UsrCodes.EmpComtype;
let aTaxBrackets = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getTaxBrackets();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/Compensation';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('CompensationTypes', metta, options);
  $('#fldTypeId').change(function () {
    setAmount();
  });
  $('#fldComtypeId').val(2);
  setAmount();
});

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

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('comtypeName'),
    element: 'ComtypeId',
    field: 'comtypeId',
    component: PhFC_Select,
    defValue: '',
    options: aCompensationType,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Isded'),
    element: 'IsdedId',
    field: 'isdedId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aYesNo,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('TaxBrackets'),
    element: 'BrktId',
    field: 'brktId',
    component: PhFC_Select,
    defValue: '',
    options: aTaxBrackets,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Type'),
    element: 'TypeId',
    field: 'typeId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aType,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('trnAmt'),
    element: 'Pamt',
    field: 'pamt',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  return aQFields;
}

function getFields() {
  let aFields = [];
  let idx = 0;
  aFields[idx++] = {
    element: 'fldId',
    field: 'id',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('comtypeName'),
    element: 'fldComtypeId',
    field: 'comtypeId',
    rField: 'comtypeName',
    isRequired: true,
    defValue: 2,
    options: aCompensationType,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('TaxBrackets'),
    element: 'fldBrktId',
    field: 'brktId',
    rField: 'brktName',
    isRequired: true,
    defValue: 1,
    options: aTaxBrackets,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Isded'),
    element: 'fldIsdedId',
    field: 'isdedId',
    rField: 'isdedName',
    getLabel: true,
    isRequired: true,
    defValue: 1,
    options: aYesNo,
    tableWidth: '12'
  };
  aFields[idx++] = {
    label: getLabel('Amount.Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    getLabel: true,
    isRequired: true,
    defValue: 1,
    options: aType,
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('trnAmt'),
    element: 'fldPamt',
    field: 'pamt',
    isRequired: false,
    defValue: '',
    tableWidth: '8'
  };
  return aFields;
}
function setAmount() {
  let aT = $('#fldPamt').val();
  if (aT === 1) {
    $('#labelAmt').html(getLabel("amt"));
  } else {
    $('#fldPamt').html(getLabel("Amount"));
  }
}