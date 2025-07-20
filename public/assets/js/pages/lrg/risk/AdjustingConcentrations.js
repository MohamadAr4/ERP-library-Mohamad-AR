let phForm;
let aRequestQury = [],
        aExpense = PhSettings.UsrCodes.LrgCodeExpensesType,
        aDocpay = PhSettings.UsrCodes.LrgCodeDocumentPayment,
        aSuit = PhSettings.UsrCodes.LrgCodeSuitsType,
        aDocexp = PhSettings.UsrCodes.LrgCodeDocumentExpenses;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/SuitExpenses';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterEdit: getBorrowRequest};
  phForm = new PhForm('AdjustingConcentrations', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
});

function getBorrowRequest() {
  let aQData = [];
  aRequest = [];
  aQData[0] = {};
  aQData[0].fieldName = 'borrowerId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldBorrowerId').val();
  aQData[0].value2 = '';
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequest = response.data.List;
        renderRequest();
      }
    }
  });
  showHeaderSpinner(false);
}

function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aRequest.length; i++) {
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].dnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('MstLSuit'),
    element: 'MstId',
    field: 'mstId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Lrg/MstLSuit/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Num'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Expense'),
    element: 'ExpenseId',
    field: 'expenseId',
    component: PhFC_Select,
    defValue: '',
    options: aExpense,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Docpay'),
    element: 'DocpayId',
    field: 'docpayId',
    component: PhFC_Select,
    defValue: '',
    options: aDocpay,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Docexp'),
    element: 'DocexpId',
    field: 'docexpId',
    component: PhFC_Select,
    defValue: '',
    options: aDocexp,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amt'),
    element: 'Amt',
    field: 'amt',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Docnum'),
    element: 'Docnum',
    field: 'docnum',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('DDatee'),
    element: 'DDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
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
    label: getLabel('MstLSuit'),
    element: 'fldMstId',
    rElement: 'fldMstName',
    field: 'mstId',
    rField: 'mstName',
    isRequired: true,
    defValue: '',
    tableWidth: '25'
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: false,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('Expense'),
    element: 'fldExpenseId',
    field: 'expenseId',
    rField: 'expenseName',
    isRequired: true,
    defValue: '',
    options: aExpense,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Docpay'),
    element: 'fldDocpayId',
    field: 'docpayId',
    rField: 'docpayName',
    isRequired: true,
    defValue: '',
    options: aDocpay,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Docexp'),
    element: 'fldDocexpId',
    field: 'docexpId',
    rField: 'docexpName',
    isRequired: true,
    defValue: '',
    options: aDocexp,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Amt'),
    element: 'fldAmt',
    field: 'amt',
    isRequired: false,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('Docnum'),
    element: 'fldDocnum',
    field: 'docnum',
    isRequired: false,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('DDate'),
    element: 'fldDDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: ''
  };
  return aFields;
}