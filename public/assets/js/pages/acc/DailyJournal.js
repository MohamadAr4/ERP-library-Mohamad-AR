let phForm;
let aCurn = [];
let aDoc = PhSettings.UsrCodes.AccDocument;
let aDocument = PhSettings.CpyCodes.CpyCodeDocument;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  getCurn();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Acc/Master';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterNew: renderPhRow, beforSave: checkDate, beforEdit: removeClass, beforPagerClick: removeClass};
  phForm = new PhForm('Daily', metta, options);
  renderPhRow();
  let isRtl = true;
  $('.ph_date').datepicker({
    isRTL: isRtl,
    dateFormat: 'dd-mm-yy',
    maxDate: new Date(),
    timepicker: true,
    changeMonth: true,
    changeYear: true,
    showOtherMonths: true,
    selectOtherMonths: true
  });
  $('.datepicker-btn').off('click').on('click', function () {
    $(this).prev('.ph_date').datepicker('show');
  });
  $('#fldDocId').change(function () {
    if ($('#fldDocId').val() > 0) {
      $("#fldDocNum").attr("required", true);
      $("#fldDocDate").attr("required", true);
    } else {
      $("#fldDocNum").attr("required", false);
      $("#fldDocDate").attr("required", false);
      $("#fldDocNum").removeClass("invalid");
      $("#fldDocDate").removeClass("invalid");
    }
  });
  if ($('#fldActionId').val() !== '' && $('#fldActionId').val() > 0) {
    phForm.doGetData($('#fldActionId').val(), 0, PhF_Action_New);
  }
});

function getCurn() {
  let nIndex = 0;
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Mng/Currency/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          if (response.data.List[i].statusId === '1') {
            aCurn[nIndex] = {};
            aCurn[nIndex].id = response.data.List[i].id;
            aCurn[nIndex].name = response.data.List[i].code;
            aCurn[nIndex].rate = response.data.List[i].rate;
            nIndex++;
          }
        }
      }
    },
    error: function (response) {
    }
  });
}

function renderPhRow() {
  for (let i = 0; i < 2; i++) {
    phForm.phTable.phT0.addEmptyRow();
  }
  phForm.phTable.phT0.render();
  removeClass();
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Print.Number'),
    element: 'PNum',
    field: 'pnum',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'mdate',
    field: 'mdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Document'),
    element: 'Document',
    field: 'docId',
    component: PhFC_Select,
    defValue: -1,
    options: aDocument,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('his.Num'),
    element: 'DocNum',
    field: 'docn',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('his.Date'),
    element: 'docDate',
    field: 'docD',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Vhr.MRem'),
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
    defValue: 0
  };
  aFields[idx++] = {
    element: 'fldPeriod',
    field: 'periodId',
    isRequired: false,
    value: PhSettings.Period.Id
  };
  aFields[idx++] = {
    element: 'fldSrcId',
    field: 'srcId',
    isRequired: false,
    value: 0,
    alert: {
      isOk: alertCheck,
      message: getLabel('The document cannot be deleted or modified'),
      action: alertAction
    }
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '75px'
  };
  aFields[idx++] = {
    label: getLabel('Print.Number'),
    element: 'fldPNum',
    field: 'pnum',
    isRequired: false,
    defvalue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
    field: 'mdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Document'),
    element: 'fldDocId',
    field: 'docId',
    rField: 'docName',
    isRequired: true,
    defValue: '1',
    options: aDocument,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('his.Num'),
    element: 'fldDocNum',
    field: 'docn',
    isRequired: true,
    defValue: '',
    tableWidth: '75px'
  };
  aFields[idx++] = {
    label: getLabel('his.Date'),
    element: 'fldDocDate',
    field: 'docd',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '200px'
  };
  return aFields;
}

function initPhTableColumns() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow
    }
  };
  aColumns[nIdx++] = {
    title: 'id',
    field: 'id',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'MstId',
    field: 'mstId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'rId',
    field: 'rid',
    visible: false,
    component: 'input',
    defValue: 0,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: 'ord',
    field: 'ord',
    visible: false,
    component: 'input',
    defValue: 0,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: 'srem',
    field: 'srem',
    visible: false,
    component: 'input',
    defValue: '',
    enabled: true
  };
  aColumns[nIdx++] = {
    title: 'accrId',
    field: 'accRid',
    visible: false,
    component: 'input',
    defValue: 0,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('Debit'),
    field: 'debc',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeDebitC
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Credit'),
    field: 'crdc',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeCreditC
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Account'),
    field: 'accId',
    rfield: 'accName',
    width: '300px',
    aggregate: balance,
    component: 'input',
    enabled: true,
    required: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Acc/AccActive/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '300px',
    component: 'input',
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('Bank.Doc'),
    field: 'tdocId',
    datatype: 'integer',
    width: '250px',
    component: 'select',
    enabled: true,
    required: true,
    options: aDoc,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('her.Num'),
    field: 'tdocn',
    datatype: 'integer',
    width: '125px',
    component: 'input',
    required: false,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('her.Date'),
    field: 'tdocd',
    width: '150px',
    datatype: 'date',
    component: 'input',
    componentType: 'date',
    required: false,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('Cost.Center'),
    field: 'costId',
    rfield: 'costName',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 0,
    defLabel: '-',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Acc/CostActive/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Currency'),
    field: 'curnId',
    datatype: 'integer',
    width: '100px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aCurn,
    defValue: 1,
    callback: {'event': 'change',
      'callback': onChangeCurrency
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Rate'),
    field: 'curnRate',
    datatype: 'decimal',
    width: '90px',
    aggregate: balanceC,
    component: 'input',
    enabled: false,
    required: true,
    defValue: 1,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeRate
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Local.Debit'),
    field: 'deb',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeDebit
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Local.Credit'),
    field: 'crd',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeCredit
    }
  };
  return aColumns;
}

function balance() {
  let nValue = 0;
  if (phForm) {
    nValue = phForm.phTable.phT0.getSum("debc") - phForm.phTable.phT0.getSum("crdc");
  }
  return nValue;
}

function balanceC() {
  let nValue = 0;
  if (phForm) {
    nValue = phForm.phTable.phT0.getSum("deb") - phForm.phTable.phT0.getSum("crd");
  }
  return nValue;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function onChangeDebitC() {
  let nRow = $(this).data('row');
  changeDebitC(nRow);
}

function onChangeCreditC() {
  let nRow = $(this).data('row');
  changeCreditC(nRow);
}

function onChangeCurrency() {
  let nRate = 1;
  let nRow = $(this).data('row');
  let nId = parseInt($(this).val());
  if (nId !== '') {
    $.ajax({
      type: 'GET',
      url: PhSettings.apiURL + '/UC/Mng/Currency/' + nId,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      }, success: function (response) {
        if (response.status) {
          nRate = response.data.Obj.rate;
          if (nId === 1) {
//            phForm.phTable.phT0.disableField(nRow, 'deb');
//            phForm.phTable.phT0.disableField(nRow, 'crd');
          } else {
//            phForm.phTable.phT0.enableField(nRow, 'crd');
//            phForm.phTable.phT0.enableField(nRow, 'deb');
          }
          changeRate(nRow, nRate);
        }
      }
    });
  }
}

function onChangeRate() {
  let nRow = $(this).data('row');
  let nRate = parseFloat($(this).val());
  changeRate(nRow, nRate);
}

function onChangeDebit() {
  let nRow = $(this).data('row');
  console.log('OnChange Debit');
}

function onChangeCredit() {
  let nRow = $(this).data('row');
  console.log('OnChange Credit');
}

function changeDebitC(nRow) {
  console.log('OnChange DebitC');
  let nDebitC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'debc'));
  let nRate = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'curnRate'));
  let nDebit = parseFloat(nDebitC * nRate);
  phForm.phTable.phT0.setFieldValue(nRow, 'deb', nDebit);
  if (nDebit > 0 && !isNaN(nDebit)) {
    phForm.phTable.phT0.setFieldValue(nRow, 'crd', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'crdc', 0);
  } else {
    phForm.phTable.phT0.setFieldValue(nRow, 'deb', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'debc', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'crd', '');
    phForm.phTable.phT0.setFieldValue(nRow, 'crdc', '');
  }
}

function changeCreditC(nRow) {
  console.log('OnChange CreditC');
  let nCreditC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'crdc'));
  let nRate = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'curnRate'));
  let nCredit = parseFloat(nCreditC * nRate);
  phForm.phTable.phT0.setFieldValue(nRow, 'crd', nCredit);
  if (nCredit > 0 && !isNaN(nCredit)) {
    phForm.phTable.phT0.setFieldValue(nRow, 'deb', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'debc', 0);
  } else {
    phForm.phTable.phT0.setFieldValue(nRow, 'deb', '');
    phForm.phTable.phT0.setFieldValue(nRow, 'debc', '');
    phForm.phTable.phT0.setFieldValue(nRow, 'crd', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'crdc', 0);
  }
}

function changeRate(nRow, nRate) {
  phForm.phTable.phT0.setFieldValue(nRow, 'curnRate', nRate);
  let nDebitC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'debc'));
  if (nDebitC > 0) {
    let nDebit = parseFloat(nDebitC * nRate);
    phForm.phTable.phT0.setFieldValue(nRow, 'deb', nDebit);
    phForm.phTable.phT0.setFieldValue(nRow, 'crd', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'crdc', 0);
  } else {
    let nCreditC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'crdc'));
    if (nCreditC > 0) {
      let nCredit = parseFloat(nCreditC * nRate);
      phForm.phTable.phT0.setFieldValue(nRow, 'crd', nCredit);
      phForm.phTable.phT0.setFieldValue(nRow, 'deb', 0);
      phForm.phTable.phT0.setFieldValue(nRow, 'debc', 0);
    }
  }
}

function checkDate() {
  let dDate = $('#fldDate').val();
  let dCDate = currentDate();
  let nSumCrd = 0;
  let nSumDeb = 0;
  for (let i = 0; i < phForm.phTable.phT0.getRowCount(); i++) {
    if (!phForm.phTable.phT0.aRows[i].isDeleted) {
      nSumCrd += parseFloat(phForm.phTable.phT0.getFieldValue(i, 'crd'));
      nSumDeb += parseFloat(phForm.phTable.phT0.getFieldValue(i, 'deb'));
    }
  }
  if (process(dDate) <= process(dCDate)) {
    $('#fldDate').removeClass('invalid');
    phForm.validated = true;
  } else {
    $('#fldDate').addClass('invalid');
    phForm.validated = false;
    showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Date.Greater.Than.Current.Date'));
    return 0;
  }
  if (nSumCrd === nSumDeb) {
    phForm.validated = true;
  } else {
    showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('DailyJournal.Not.Balanced'));
    phForm.validated = false;
  }
}

function removeClass() {
  $('#fldDate').removeClass('invalid');
}

function alertCheck() {
  let isOk = false;
  if (parseInt($('#fldSrcId').val()) != 0) {
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
