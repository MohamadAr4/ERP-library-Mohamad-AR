let phForm;
let status_id = 1409;
let loanPeriod;
let lastValue = 0;
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aInstallmentStatus = PhSettings.UsrCodes.LrgInstallmentStatus,
        aInstallmentType = [],
        aBorrower = [],
        aCost = [],
        // aPeriodicInstallment = PhSettings.UsrCodes.LrgPeriodicInstallment,
        aperiod = [],
        aRequest = [];
let nDateId = "";
let dDate = '';
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_FIXED,
        addRowBtn: false}
    }
  ];

  getBorrower();

  getInstallmentType();
//  filterLabel();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/ReqLoanInstallment';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable,afterEdit:afterEdit,  afterGet: afterGet, afterPagerClick: pagerClick};
  phForm = new PhForm('LoanExecution', metta, options);
  $('#fldInstalls').change(function () {
    changePeriod();
  });
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
  $('#fldReqId').change(function () {
    getcost();
  });
  $('#fldPeriodId').change(function (e) {
    e.preventDefault();
    onChangeDate();
  });
  $('#fldDdate').change(function (e) {
    e.preventDefault();
    onChangeDate();
  });
});

function getReqId() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'ReqId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldReqId').val();
  aQData[nIdx].value2 = '';
  return aQData;
}

function getcost() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ReqLoanInstallment/Search/0/0',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, data: JSON.stringify(getReqId()),
    success: function (response) {
      if (response.status && response.code === 200) {
        aCost = response.data.List;
        getElemntFromReq();
      }
    }
  });
}

function getQueryData() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'borrowerId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldBorrowerId').val();
  aQData[nIdx].value2 = '';

  nIdx++;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'Status_Id';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = status_id;
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

function getInstallmentType() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/CodInstallment/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aInstallmentType[i] = {};
          aInstallmentType[i].id = response.data.List[i].id;
          aInstallmentType[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getBorrowRequest() {
  aRequest = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
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
        getcost();
      }
    }
  });
}

function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aRequest.length; i++) {
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].lnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}

function getElemntFromReq() {

  let aEditField = aCost.filter(function (el) {
    return el.reqId === $('#fldReqId').val();
  });
  $('#fldLAmt').val(aEditField[0].lamt);
  $('#fldGAmt').val(aEditField[0].gamt);
  $('#fldGPerc').val(aEditField[0].gperc);

  let aEditType = aRequest.filter(function (el) {
    return el.id === $('#fldReqId').val();
  });
  $('#fldIntrument').val(aEditType[0].gInstall);
  loanPeriod = aEditType[0].loanPeriodId;
  if (parseInt(aEditType[0].statusId) === status_id) {
    $('#fldTypeId').val(aInstallmentType[4].id);
    $('#fldTypeId').attr('disabled', true);
    //initNumberMasks();
  }
  getperiod();
}

function getperiod() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'id';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = loanPeriod;
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/CodePeriodicInstallment/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        for (let i = 0; i < response.data.List.length; i++) {
          aperiod = response.data.List;
        }
        renderselect();
      }
    }
  });
}

function renderselect() {
  let vHtml = '';
  for (let i = 0; i < aperiod.length; i++) {
    vHtml += '<option value="' + aperiod[i].id + '">' + aperiod[i].name + '</option>';
  }
  $('#fldPeriodId').html(vHtml);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('IdentificationNum'),
    element: 'fldIdentificationNum',
    field: 'loanNum',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
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
    label: getLabel('Type'),
    element: 'TypeId',
    field: 'typeId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aInstallmentType,
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
    label: getLabel('LAmt'),
    element: 'LAmt',
    field: 'lamt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('GAmt'),
    element: 'GAmt',
    field: 'gamt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('GPerc'),
    element: 'GPerc',
    field: 'gperc',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('PeriodId'),
    element: 'PeriodId',
    field: 'periodId',
    component: PhFC_Select,
    getLabel: true,
    defValue: '',
    options: aperiod,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Installs'),
    element: 'Installs',
    field: 'installs',
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
    label: getLabel('IdentificationNum'),
    element: 'fldIdentificationNum',
    field: 'loanNum',
    isRequired: true,
    defvalue: '',
    tableWidth: '100px'
  },
    aFields[idx++] = {
    element: 'fldStatus',
    field: 'statusId',
    isRequired: true,
    defValue: '1'
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
    label: getLabel('Lnum'),
    element: 'fldReqId',
    rElement: 'fldReqName',
    field: 'reqId',
    rField: 'reqName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aInstallmentType,
    tableWidth: 10
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
    label: getLabel('LAmt'),
    element: 'fldLAmt',
    field: 'lamt',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('GAmt'),
    element: 'fldGAmt',
    field: 'gamt',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('GPerc'),
    element: 'fldGPerc',
    field: 'gperc',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('PeriodId'),
    element:'fldPeriodId',
    field: 'periodId',
    rField: 'periodName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aperiod,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Installs'),
    element: 'fldInstalls',
    field: 'installs',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    element: 'fldloanInstall',
    field: 'loanInstall',
    isRequired: false,
    defValue: ''
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

function initPhTableColumns() {
  var aColumns = [];
  var nIdx = 0;
//  aColumns[nIdx++] = {
//    title: '<i class="icon flaticon-delete p-0"></i>',
//    field: 'delrow',
//    width: '35px',
//    component: 'button',
//    enabled: true,
//    classes: 'btn-danger',
//    format: '<i class="bi bi-trash p-1"></i>',
//    callback: {'event': 'click',
//      'callback': ""
//    }
//  };
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
    field: 'instId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'pInterset',
    field: 'pinterset',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'QStatus',
    field: 'statusId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 1
  };
  aColumns[nIdx++] = {
    title: 'pAmt',
    field: 'pamt',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Num'),
    field: 'num',
    width: '150px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: false,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('DueDates'),
    field: 'duedate',
    datatype: 'date',
    width: '250px',
    component: 'input',
    componentType: 'date',
    enabled: true,
    required: true,
    defValue: currentDate()
  };
  aColumns[nIdx++] = {
    title: getLabel('Installment.capital'),
    field: 'amt',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: 0,
    callback: {'event': 'change',
      'callback': onChangeInstallment
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Installment.interest'),
    field: 'interset',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: 0,
    callback: {'event': 'change',
      'callback': onChangeInstallment
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Installment.value'),
    field: 'sumins',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: false,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '400px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

 function afterGet() {
  let aInfoRequest=[];
  let vHtml = '';
  let ReqId= "";
  aInfoRequest=phForm.aResultData;
    vHtml += '<option value="' + aInfoRequest.periodId + '">' + aInfoRequest.periodName + '</option>';
    ReqId += '<option value="' + aInfoRequest.reqId + '">' + aInfoRequest.reqName + '</option>';
  $('#fldPeriodId').html(vHtml);
  $('#fldReqId').html(ReqId);
  $('#fldBorrowerName').attr('disabled',true);
  $('#fldReqId').attr('disabled',true);
  $('#fldTypeId').attr('disabled',true);
  $('#fldPeriodId').attr('disabled',true);
}

function onChangeInstallment() {
  let nRow = $(this).data('row');
  let nInscapital = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'amt'));
  let nInsinterest = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'interset'));
  let nInsvalue = phForm.phTable.phT0.getFieldValue(nRow, 'sumins');
  if (isNaN(nInscapital)) {
    phForm.phTable.phT0.disableField(nRow, 'sumins');
    phForm.phTable.phT0.setFieldValue(nRow, 'amt', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'interset', 0);

  } else {
    phForm.phTable.phT0.disableField(nRow, 'sumins');
    phForm.phTable.phT0.setFieldValue(nRow, 'sumins', nInscapital + nInsinterest);
    phForm.phTable.phT0.disableField(nRow, 'sumins');
    lastValue = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'sumins'));
    $('#fldloanInstall').val(lastValue);
  }
}

function afterEdit(){
  let nInscapital = '';
  let nInsinterest = '';
//  let nRow = parseInt(phForm.phTable.phT0.getRowCount());
    nInscapital = parseFloat(phForm.phTable.phT0.getFieldValue(0, 'amt'));
    nInsinterest = parseFloat(phForm.phTable.phT0.getFieldValue(0, 'interset'));
//  let nInsvalue = parseFloat(phForm.phTable.phT0.getFieldValue(0, 'sumins'));
    phForm.phTable.phT0.setFieldValue(0, 'rem', nInscapital+nInsinterest);
//   nInsinterest = parseFloat(phForm.phTable.phT0.getFieldValue(0, 'interset'));
// // phForm.phTable.phT0.setFieldValue(0, 'sumIns',100);
////  for (let i = 0; i < nRow; i++) {
////    nInscapital = parseFloat(phForm.phTable.phT0.getFieldValue(i, 'amt'));
////    nInsinterest = parseFloat(phForm.phTable.phT0.getFieldValue(i, 'interset'));
////    phForm.phTable.phT0.setFieldValue(i, 'sumIns', (nInscapital + nInsinterest));
////  }
//console.log(nInscapital);
//console.log(nInsinterest);
//console.log(nInsvalue);
}

function pagerClick(){
  afterGet();
  afterEdit();
}
function deleteRow() {
  phForm.phTable.phT.deleteRow(parseInt($(this).data('row')));
}

async function changePeriod() {
  if (phForm.phTable.phT0.aRows.length > 0) {
    await swal.fire({
      title: getLabel('The.Table.Will.be.Clear') + ' !!',
      text: getLabel('Are.You.Sure.?'),
      icon: "warning",
      async: true,
      showCancelButton: true,
      confirmButtonText: "<i class='flaticon2-check-mark'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='flaticon2-cross'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-default"
      }
    }).then(function (result) {
      if (result.value) {
        phForm.phTable.phT0.setData([]);
        drawData(parseInt($('#fldInstalls').val()));
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  } else {
    drawData(parseInt($('#fldInstalls').val()));
  }
}

function onChange(i = 0) {
  let nDays = '';
  let dDate = '';
  let nDate = $('#fldDdate').val();
  let nPeriod = $('#fldPeriodId').val();
  if (nPeriod == 1) {
    nDays = 30 * (i + 1);
    dDate = addDaysToDate(stringToDate(nDate), nDays);
    dDate = formatDate(dDate, 'dd-mm-yyyy');
  } else if (nPeriod == 2) {
    nDays = 90 * (i + 1);
    dDate = addDaysToDate(stringToDate(nDate), nDays);
    dDate = formatDate(dDate, 'dd-mm-yyyy');
  } else if (nPeriod == 3) {
    nDays = 180 * (i + 1);
    dDate = addDaysToDate(stringToDate(nDate), nDays);
    dDate = formatDate(dDate, 'dd-mm-yyyy');
  } else if (nPeriod == 4) {
    nDays = 360 * (i + 1);
    dDate = addDaysToDate(stringToDate(nDate), nDays);
    dDate = formatDate(dDate, 'dd-mm-yyyy');
  }
  return dDate;
}

function drawData(nInstalls) {
  let nRow = '';
  for (let i = 0; i < nInstalls; i++) {
    phForm.phTable.phT0.addEmptyRow();
    nRow = parseInt(phForm.phTable.phT0.getRowCount()) - 1;
    phForm.phTable.phT0.setFieldValue(nRow, 'statusId', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'num', i + 1);
    phForm.phTable.phT0.setFieldValue(nRow, 'duedate', onChange(i));
    phForm.phTable.phT0.setFieldValue(nRow, 'amt', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'interset', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'pamt', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'pinterset', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'rem', '');
  }
  phForm.phTable.phT0.render();

}

function onChangeDate() {
  for (let i = 0; i < parseInt(phForm.phTable.phT0.getRowCount()); i++) {
    phForm.phTable.phT0.setFieldValue(i, 'duedate', onChange(i));
  }
}
