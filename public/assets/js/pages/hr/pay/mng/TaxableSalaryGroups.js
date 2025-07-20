let phForm;
let aYesNo = PhSettings.PhsCodes.PhsYesno;
let aTaxPay = PhSettings.UsrCodes.EmpTaxpay;
let aTaxBrackets = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getTaxBrackets();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/SalaryGroups';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('TaxableSalaryGroups', metta, options);
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
          aTaxBrackets[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
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
    label: getLabel('Gtameperc'),
    element: 'Gtameperc',
    field: 'gtameperc',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Gtamoperc1'),
    element: 'Gtamoperc1',
    field: 'gtamoperc1',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Gtamoperc2'),
    element: 'Gtamoperc2',
    field: 'gtamoperc2',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Gtamoperc3'),
    element: 'Gtamoperc3',
    field: 'gtamoperc3',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Dprice'),
    element: 'Dprice',
    field: 'dprice',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('absence'),
    element: 'Absence',
    field: 'Absence',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('delay'),
    element: 'Delay',
    field: 'delay',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };

  aQFields[idx++] = {
    label: getLabel('Nprice'),
    element: 'Nprice',
    field: 'nprice',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Wprice'),
    element: 'Wprice',
    field: 'wprice',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Vprice'),
    element: 'Vprice',
    field: 'vprice',
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
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '125px'
  };
  aFields[idx++] = {
    label: getLabel('TaxBrackets'),
    element: 'fldBrktId',
    field: 'brktId',
    rField: 'brktName',
    isRequired: true,
    defValue: '1',
    options: aTaxBrackets,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Gtameperc'),
    element: 'fldGtameperc',
    field: 'gtameperc',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Gtamoperc1'),
    element: 'fldGtamoperc1',
    field: 'gtamoperc1',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Gtamoperc2'),
    element: 'fldGtamoperc2',
    field: 'gtamoperc2',
    isRequired: true,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Gtamoperc3'),
    element: 'fldGtamoperc3',
    field: 'gtamoperc3',
    isRequired: true,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Dprice'),
    element: 'fldDprice',
    field: 'dprice',
    isRequired: true,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Absence'),
    element: 'fldAbsence',
    field: 'absence',
    isRequired: true,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Delay'),
    element: 'fldDelay',
    field: 'delay',
    isRequired: true,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Nprice'),
    element: 'fldNprice',
    field: 'nprice',
    isRequired: false,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Wprice'),
    element: 'fldWprice',
    field: 'wprice',
    isRequired: false,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Vprice'),
    element: 'fldVprice',
    field: 'vprice',
    isRequired: false,
    defValue: '0',
    tableWidth: '100px'
  };
  return aFields;
}
