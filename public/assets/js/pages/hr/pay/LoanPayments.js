let phForm;
let aLoan = [];
let oMounthAmount = {};
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/LoanPayments';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: openNewEmployee, afterEdit: checkSrcIdTSal, afterPagerClick: checkSrcIdTSal, beforSave: checkValue};
  phForm = new PhForm('LoanPayments', metta, options);
  $('#fldLoanId').change(function () {
    getMounthAmount();
  });
  $('#fldEmpName').focusout(function () {
    getEmployeeLoans();
  });
});

function getQueryData() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'empId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldEmpId').val();
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'edate';
  aQData[nIdx].dataType = PhFC_DatePicker;
  aQData[nIdx].operation = '>=';
  aQData[nIdx].value1 = currentDate();
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'bamt';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '!=';
  aQData[nIdx].value1 = '0';
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'statusId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = '1';
  aQData[nIdx].value2 = '';
  return aQData;
}

function openNewEmployee() {
  let aFields = getFields();
  $('#fldEmpId').val('');
  $('#fldEmpName').val('');
  $('#fldBAmt').val('');
  $('#fldLoanId').html('');
  for (let i = 0; i < aFields.length; i++) {
    $('#' + aFields[i].element).attr('disabled', false);
  }
  $('#fldEmpName').attr('disabled', false);
  $('#ph-submit').removeClass('d-none');
  $('#ph-delete').addClass('d-none');
}

function getEmployeeLoans() {
  showHeaderSpinner(true);
  aLoan = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Loans/Search/1/10',
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
        aLoan = response.data.List;
        renderLoan();
      }
    }
  });
  showHeaderSpinner(false);
}

function renderLoan() {
  let vHtml = '';
  for (let i = 0; i < aLoan.length; i++) {
    vHtml += '<option value="' + aLoan[i].id + '">' + aLoan[i].num + '</option>';
  }
  $('#fldLoanId').html(vHtml);
  getMounthAmount();
}

function getMounthAmount() {
  if (aLoan.length > 0) {
    oMounthAmount = aLoan.filter(function (el) {
      return el.id === $('#fldLoanId').val();
    });
    $('#fldAmt').val(oMounthAmount[0].mamt);
    $('#fldBAmt').val(oMounthAmount[0].bamt);
    $('#fldAmt').attr('max', oMounthAmount[0].bamt);
  } else {
    $('#fldAmt').val('');
    $('#fldBAmt').val('');
    $('#fldAmt').removeAttr('max');
  }
}

function checkSrcIdTSal() {
  let aFields = getFields();
  if ($('#fldSrcId').val() > 0 && ($('#fldTsalId').val() !== null || $('#fldTsalId').val() !== '')) {
    for (let i = 0; i < aFields.length; i++) {
      $('#' + aFields[i].element).attr('disabled', true);
    }
    $('#fldEmpName').attr('disabled', true);
    $('#ph-submit').addClass('d-none');
    $('#ph-delete').addClass('d-none');
  } else {
    for (let i = 0; i < aFields.length; i++) {
      $('#' + aFields[i].element).attr('disabled', false);
    }
    $('#fldEmpName').attr('disabled', false);
    $('#ph-submit').removeClass('d-none');
    $('#ph-delete').removeClass('d-none');
  }
  $('#fldEmpId').val(phForm.aResultData.empId);
  $('#fldEmpName').val(phForm.aResultData.empName);
  getEmployeeLoans();
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
    label: getLabel('Date'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Loan'),
    element: 'LoanId',
    field: 'loanId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Loan/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amount'),
    element: 'Amt',
    field: 'amt',
    component: PhFC_Number,
    defValue: '',
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
    element: 'fldSrcId',
    field: 'srcId',
    value: 0,
    alert: {
      isOk: alertCheck,
      message: getLabel('The.document.cannot.be.deleted.or.modified'),
      action: alertAction
    }
  };
  aFields[idx++] = {
    element: 'fldTsalId',
    field: 'tsalId',
    value: 0,
    alert: {
      isOk: alertCheck,
      message: getLabel('The.document.cannot.be.deleted.or.modified'),
      action: alertAction
    }
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Loan'),
    element: 'fldLoanId',
    rElement: 'fldLoanName',
    field: 'loanId',
    rField: 'loanNum',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Amount'),
    element: 'fldAmt',
    field: 'amt',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '700px'
  };
  return aFields;
}

function checkValue() {
  if (($('#fldSrcId').val() > 0 && $('#fldTsalId').val() !== null)) {
    phForm.validated = false;
  } else {
    if (Number($('#fldAmt').val()) <= Number(oMounthAmount[0].bamt)) {
      phForm.validated = true;
    } else {
      phForm.validated = false;
      showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Amount > Balance Amount'));
    }
  }
}

function alertCheck() {
  let isOk = false;
  if (parseInt($('#fldSrcId').val()) != 0 || $('#fldTsalId').val() != null) {
    isOk = true;
  }
  return isOk;
}

function alertAction() {
  $('#ph-submit').addClass('d-none');
  $('#ph-delete').addClass('d-none');
  phForm.saveValidated = false;
  phForm.deleteValidated = false;
}
