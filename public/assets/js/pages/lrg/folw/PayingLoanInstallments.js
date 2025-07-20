let phForm;
let aBorrower = [],
        aRequest = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getBorrower();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/LoanInstallmentPayment';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('PayingLoanInstallments', metta, options);
  $('#fldBorrowerName').focusout(function () {
    $('.showw').removeClass('d-none');
    getBorrowRequest();
  });
  $('#fldAmt').keyup(function () {
    getSaveReq();
  });
});

function getQueryData() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'borrowerId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldBorrowerId').val();
  aQData[nIdx].value2 = '';
  return aQData;
}

function getBorrower() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Borrowers/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aBorrower[i] = {};
          aBorrower[i].id = response.data.List[i].id;
          aBorrower[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getBorrowRequest() {
  showHeaderSpinner(true);
  aRequest = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ShortRequest/Search/1/10',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, data: JSON.stringify(getQueryData()),
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
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].lnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}

function getSaveReq() {
  let oData = {};
  oData.req_id = $('#fldReqId').val();
  oData.amt = $('#fldAmt').val().toString();
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/loanPayment/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, data: JSON.stringify(oData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aResponse = response.data.Obj;
        $('#fldStatusId').val(response.data.Obj.status_id);
        $('#fldModAmt').val(response.data.Obj.remainingAmount);
        $('#fldGamt').val(response.data.Obj.gamt);
        $('#fldPayment').val(response.data.Obj.PaymentsUntilNow);
        renderResponse();
      }
    }
  });
  showHeaderSpinner(false);
}

function renderResponse() {
  let vHtml = '';
  let amtTotal = '';
  let interset = '';
  for (let i = 0; i < aResponse.Inst.length; i++) {
    vHtml += '<tr>';
    vHtml += '  <td>';
    vHtml += '  </td>';
    vHtml += '  <td>' + aResponse.Inst[i].duedate + '</td>';
    vHtml += '  <td>' + aResponse.Inst[i].amt + '</td>';
    vHtml += '  <td>' + aResponse.Inst[i].interset + '</td>';
    vHtml += '  <td>' + aResponse.Inst[i].pinterset + '</td>';
    vHtml += '  <td>' + aResponse.Inst[i].pamt + '</td>';
    vHtml += '</tr>';
    amtTotal += aResponse.Inst[i].amt;
    interset += aResponse.Inst[i].interset;
  }
  vHtml += '<tr>';
  vHtml += '  <td> </td>';
  vHtml += '  <td></td>';
  vHtml += '  <td>' + amtTotal + '</td>';
  vHtml += '  <td>' + interset + '</td>';
  vHtml += '  <td></td>';
  vHtml += '  <td></td>';
  vHtml += '</tr>';
  $("#tableData tbody").html(vHtml);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'ReqId',
    field: 'reqId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Lrg/Borrowers/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amt'),
    element: 'Amt',
    field: 'amt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Interset'),
    element: 'Interset',
    field: 'interset',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Pamt'),
    element: 'Pamt',
    field: 'pamt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Pinterset'),
    element: 'Pinterset',
    field: 'pinterset',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
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
    label: getLabel('Borrower'),
    element: 'fldBorrowerId',
    rElement: 'fldBorrowerName',
    field: 'borrowerId',
    rField: 'borrowerName',
    isRequired: true,
    defValue: '',
    options: aBorrower,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'fldReqId',
    rElement: 'fldReqName',
    field: 'reqId',
    rField: 'reqName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Amt'),
    element: 'fldAmt',
    field: 'amt',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Interset'),
    element: 'fldInterset',
    field: 'interset',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Pamt'),
    element: 'fldPamt',
    field: 'pamt',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Pinterset'),
    element: 'fldPinterset',
    field: 'pinterset',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  return aFields;
}