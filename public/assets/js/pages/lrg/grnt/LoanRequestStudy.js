let aRequests = [];
let aRequest = [];
let aSize = [];
let aLoanAge = [];
let aSector = [];
let aProjectType = [];
let nRequestId = 0;
let aRequestsData = [];
let oBorrower = {};
let aFinancialListItem = [];
let aRequestFinancialList = [];
let sectorPhTable = [];
let historyPhTable = [];
let solvencyPhTable = [];
let aFinListItem = [];
let aTempFinListItem = [];
let aPointers = [];
let aRequestPointers = [];
let nMPointerId = 0;
let aRequestFStatus = [];
let aRequestStatus = [];
let aRequestWarranties = [];
let warrantiesPhTable = [];
let aAsste = PhSettings.UsrCodes.LrgAssets,
        aOwnType = PhSettings.UsrCodes.LrgOwnType,
        aReqStatus = PhSettings.CpyCodes.CpyCodeStatus,
        aDepartment = PhSettings.CpyCodes.CpyDepartmentUnit,
        aUnit = PhSettings.CpyCodes.CpyDepartmentUnit,
        aOpera = PhSettings.CpyCodes.CpyUnitOperations,
        aAreatype = PhSettings.UsrCodes.LrgAreatype,
        aInsurance = PhSettings.UsrCodes.LrgInsurance,
        aSecurType = PhSettings.UsrCodes.LrgSecurtype,
        aPeriodType = PhSettings.UsrCodes.LrgPeriodtype;
let blockName = '';
jQuery(document).ready(function () {
  $('.QFld').off('change').on('change', function () {
    disabledSecondQueryField($(this).attr('id'));
  });
  $('.card-collapses').off('click').on('click', function () {
    if ($("#" + $(this).data('icon')).hasClass("bi-chevron-up")) {
      $("#" + $(this).data('icon')).removeClass("bi-chevron-up");
      $("#" + $(this).data('icon')).addClass("bi-chevron-down");
    } else {
      $("#" + $(this).data('icon')).removeClass("bi-chevron-down");
      $("#" + $(this).data('icon')).addClass("bi-chevron-up");
    }
    $('#' + $(this).data('section')).animate({
      height: 'toggle'
    });
  });
  /*************/
  $('#fld-Request-borrowerName').off('focusout').on('focusout', function () {
//    getBorrowerInformaion();
    getRequestInformation();
  });
  $('#fld-Request-requestId').off('change').on('change', function () {
    changeRequest();
  });
  $('#ph-search-Request').off('click').on('click', function () {
    modeRequestQueryCard();
  });
  $('#ph-new-Request').off('click').on('click', function () {
    swal.fire({
      title: getLabel('The.Form.Will.be.Clear') + ' !!',
      text: getLabel('Are.You.Sure.?'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      }
    }).then(function (result) {
      if (result.value) {
        modeRequestEntryCard();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
  $('#ph-execute-Request').off('click').on('click', function () {
    requestSearch();
  });
  $('#ph-reset-Request').off('click').on('click', function () {
    showRequestReset();
  });
  $('#ph-toggle-Request').off('click').on('click', function () {
    showRequestQuery();
  });
  /***************/
  $('#ph-submit-Request-GeneralInfo').off('click').on('click', function () {
    saveRequestGeneralInfo();
  });
  $('#ph-submit-Request-Management').off('click').on('click', function () {
    saveRequestManagement();
  });
  $('#ph-submit-Request-Evaluation').off('click').on('click', function () {
    saveRequestEvaluation();
  });
  $('#ph-submit-Request-LoanInfo').off('click').on('click', function () {
    saveRequestLoanInfo();
  });
  $('#fld-Request-LoanInfo-gperc').change(function () {
    let nGAmt = parseFloat($('#fld-Request-LoanInfo-gamt').val());
    let nGPerc = parseFloat($('#fld-Request-LoanInfo-gperc').val());
    let nReqLamt = parseFloat($('#fld-Request-reqLamt').val());
    if (parseFloat(nGAmt) > parseFloat(nReqLamt)) {
      $('#fld-Request-LoanInfo-gamt').val(nReqLamt);
    } else {
      $('#fld-Request-LoanInfo-gamt').val(parseFloat(((nReqLamt * nGPerc) / 100)));
    }
  });
  $('#fld-Request-LoanInfo-gamt').change(function () {
    let nGAmt = parseFloat($('#fld-Request-LoanInfo-gamt').val());
    let nGPerc = parseFloat($('#fld-Request-LoanInfo-gperc').val());
    let nReqLamt = parseFloat($('#fld-Request-reqLamt').val());
    if (parseFloat(nGPerc) > parseFloat(100)) {
      $('#fld-Request-LoanInfo-gperc').val(100);
    } else {
      $('#fld-Request-LoanInfo-gperc').val(parseFloat(((nGAmt * 100) / nReqLamt)));
    }
  });
  $('#fld-Request-GeneralInfo-loanAge').off('focusout').on('focusout', function () {
    getRequestLonaAge();
  });
  /******** Pointers *******/
  $('#ph-execute-Request-Pointers').off('click').on('click', function (e) {
    e.preventDefault();
    getPointers();
  });
  $('#ph-submit-Request-Pointers').off('click').on('click', function (e) {
    e.preventDefault();
    saveRequestPointers();
  });
  $('#fld-Request-Pointers-id').off('change').on('change', function (e) {
    e.preventDefault();
    changePointer();
  });
  /***************/
  /******** Financial List *******/
  $('#ph-financial-submit').off('click').on('click', function () {
    saveRequestFinancialList();
  });
  $('#ph-execute-Request-Financial-List-Item').off('click').on('click', function (e) {
    e.preventDefault();
    calcFormula();
  });
  $('#ph-new-Request-Financial-List').off('click').on('click', function () {
    openNewFinancialList();
  });
  $('#fld-Request-Financial-List-listId').off('change').on('change', function () {
    getFinancialListItems();
  });
  /***************/
  /******** Warranties *******/
  $('#ph-warranties-submit').off('click').on('click', function () {
    saveRequestWarranties();
  });
  $('#ph-new-Request-Warranties').off('click').on('click', function () {
    openNewRequestWarranties();
  });
  $('#fld-Request-Warranties-assteId').off('change').on('change', function () {
    initWarrantiesPhTable();
  });
  /***************/
  /******** Status Modal *******/
  $('#ph-Request-changeStatus').off('click').on('click', function (e) {
    e.preventDefault();
    getRequestForwardStatus();
    getRequestStatus();
    $('#Request-ChangeStatsu-Modal').modal('show');
  });
  $('#ph-submit-Request-ChangeStatus').off('click').on('click', function () {
    swal.fire({
      title: getLabel('Request Status will be change') + ' !!',
      text: getLabel('Are.You.Sure.?'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      }
    }).then(function (result) {
      if (result.value) {
        saveRequestNewStatus();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
        $('#fld-Request-Pointers-id').val(aRequest[0].mpointerId);
      }
    });
  });
  /***************/
  /******** Attache Modal *******/
  $('.card-toolbar-attache').off('click').on('click', function (e) {
    e.preventDefault();
    blockName = $(this).data('block');
    $('#Request-Attache-Modal').modal('show');
    attacheResetModal();
  });
  $('#Request-UploadFile').off('click').on('click', function (e) {
    e.preventDefault();
    attacheSave();
  });
  $('#fld-Request-File').change(function (e) {
    e.preventDefault();
    getAttache(e);
  });
  /***************/
  getFinancialListItems();
  showHeaderSpinner(false);
});

function disabledSecondQueryField(fldId) {
  if ($('#' + fldId).val() === '<>' || $('#' + fldId).val() === '><') {
    $('#' + fldId + '-2').prop('disabled', false);
    $('#' + fldId + '-2').addClass('ph_datepicker');
    $('#' + fldId + '-3').addClass('datepicker-btn');
  } else {
    $('#' + fldId + '-2').prop('disabled', true);
    $('#' + fldId + '-2').removeClass('ph_datepicker');
    $('#' + fldId + '-3').removeClass('datepicker-btn');
    $('#' + fldId + '-2').val('');
  }
}

/****** Request Information *******/
function getBorrowerInformaion() {
  $.ajax({
    type: 'GET',
    url: PhSettings.apiURL + '/UC/Lrg/Borrowers/' + $('#fld-Request-borrowerId').val(),
    async: false,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        oBorrower = response.data.Obj;
      }
    }
  });
}

function getRequestInformation() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'borrowerId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fld-Request-borrowerId').val();
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequests = response.data.List;
        $('#fld-Request-requestId').html('');
        $.each(aRequests, function (i, aRequest) {
          $('#fld-Request-requestId').append($('<option>', {
            value: aRequest.id,
            text: aRequest.dnum
          }));
        });
        getRequestField();
      }
    }
  });
}

async function changeRequest() {
  await swal.fire({
    title: getLabel('The.Request.Will.be.Change') + ' !!',
    text: getLabel('Are.You.Sure.?'),
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
    cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
    reverseButtons: true,
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-info"
    }
  }).then(function (result) {
    if (result.value) {
      getRequestField();
    } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      $('#fld-Request-requestId').val(nRequestId);
    }
  });
  nRequestId = $('#fld-Request-requestId').val();
}

function getRequestField() {
  nRequestId = $('#fld-Request-requestId').val();
  aRequest = aRequests.filter(function (el) {
    return parseInt(el.id) === parseInt($('#fld-Request-requestId').val());
  });
  $('.card-toolbar-attache').removeClass('d-none');
  $('#fld-Request-borrowerName').attr('disabled', true);
  $('#fld-Request-id').val(aRequest[0].id);
  $('#fld-Request-lenderId').val(aRequest[0].lenderName);
  $('#fld-Request-lnum').val(aRequest[0].lnum);
  $('#fld-Request-ldate').val(aRequest[0].ldate);
  $('#fld-Request-lbranId').val(aRequest[0].lbranName);
  $('#fld-Request-rdate').val(aRequest[0].rdate);
  $('#fld-Request-ddate').val(aRequest[0].ddate);
  $('#fld-Request-prodId').val(aRequest[0].prodId);
  $('#fld-Request-prodName').val(aRequest[0].prodName);
  $('#fld-Request-reqLamt').val(aRequest[0].reqLamt);
  $('#fld-Request-reqGamt').val(aRequest[0].reqGamt);
  $('#fld-Request-reqGperc').val(aRequest[0].reqGperc);
  $('#fld-Request-Pointers-id').val(aRequest[0].mpointerId);
  nMPointerId = aRequest[0].mpointerId;
  callProductFunction();
  getRequestBlocksData(aRequest[0]);
  getPointers();
  getRequestFinancialLists();
  getRequestWarranties();
}

function modeRequestQueryCard() {
  $('#ph-search-Request').addClass('d-none');
  $('#Request-Entry').addClass('d-none');
  $('#Request-Query').removeClass('d-none');
  $('#ph-reset-Request').removeClass('d-none');
  $('#ph-execute-Request').removeClass('d-none');
  $('#ph-toggle-Request').addClass('d-none');
  $('.card-toolbar-attache').addClass('d-none');
  $('#ph-Request-changeStatus').addClass('d-none');
}

function modeRequestEntryCard() {
  $('#ph-search-Request').removeClass('d-none');
  $('#Request-Entry').removeClass('d-none');
  $('#Request-Query').addClass('d-none');
  $('#Request-Table').addClass('d-none');
  $('#ph-reset-Request').addClass('d-none');
  $('#ph-execute-Request').addClass('d-none');
  $('#ph-toggle-Request').addClass('d-none');
  $('.Request').addClass('d-none');
  $('.card-toolbar-attache').addClass('d-none');
  $('#ph-Request-changeStatus').addClass('d-none');
  $('#fld-Request-borrowerName').attr('disabled', false);
  $('.was-validated').removeClass('was-validated');
  $('.invalid').removeClass('invalid');
  resetRequest();
}

function showRequestExecuteTable() {
  $('#Request-Query').addClass('d-none');
  $('#Request-Table').removeClass('d-none');
  $('#ph-execute-Request').removeClass('d-none');
  $('#ph-toggle-Request').removeClass('d-none');
  modeHideRequestQuery();
}

function showRequestReset() {
  $('#Request-Query').removeClass('d-none');
  $('#Request-Table').addClass('d-none');
  $('#Request-Table').html('');
  resetRequestQueryForm();
}

function modeRequestEdit() {
  $('#ph-search-Request').removeClass('d-none');
  $('#Request-Entry').removeClass('d-none');
  $('#ph-reset-Request').addClass('d-none');
  $('#ph-execute-Request').addClass('d-none');
  $('#ph-toggle-Request').addClass('d-none');
  $('#Request-Query').addClass('d-none');
  $('#Request-Table').addClass('d-none');
  $('#Request-Table').html('');
  $('.card-toolbar-attache').removeClass('d-none');
  $('#fld-Request-borrowerName').attr('disabled', true);
  $('.was-validated').removeClass('was-validated');
  $('.invalid').removeClass('invalid');
  resetRequestQueryForm();
}

function showRequestQuery() {
  if ($('#ph-toggle-icon-Request').hasClass('bi-toggle-off')) {
    modeHideRequestQuery();
    $('#Request-Query').addClass('d-none');
  } else {
    modeShowRequestQuery();
    $('#Request-Query').removeClass('d-none');
  }
}

function modeHideRequestQuery() {
  $('#ph-toggle-Request').removeClass('btn-success');
  $('#ph-toggle-Request').addClass('btn-danger');
  $('#ph-toggle-icon-Request').removeClass('bi-toggle-off');
  $('#ph-toggle-icon-Request').addClass('bi-toggle-on');
}

function modeShowRequestQuery() {
  $('#ph-toggle-Request').addClass('btn-success');
  $('#ph-toggle-Request').removeClass('btn-danger');
  $('#ph-toggle-icon-Request').addClass('bi-toggle-off');
  $('#ph-toggle-icon-Request').removeClass('bi-toggle-on');
}

function resetRequestQueryForm() {
  $('#Request-Query-Form')[0].reset();
  $('.Request-QFld').each(function () {
    disabledSecondQueryField($(this).attr('id'));
  });
  modeShowRequestQuery();
}

function resetRequest() {
  $('#Request-Entry-Form')[0].reset();
  $('#fld-Request-requestId').html('');
  aSize = [];
  aSector = [];
  aLoanAge = [];
  oBorrower = {};
  aPointers = [];
  aRequestPointers = [];
  sectorPhTable.setData([]);
  historyPhTable.setData([]);
  solvencyPhTable.setData([]);
}

function getQueryRequestSearch() {
  let aQData = [];
  let nIdx = 0;
  $(".Request-QFld").each(function () {
    let element = $(this).attr('id');
    let fldName = element.split("-").slice(-1).join('');
    if ($("#qfld-Request-" + fldName + '-1').val() != '') {
      aQData[nIdx] = {};
      aQData[nIdx].dataType = $(this).data('datatype');
      aQData[nIdx].fieldName = fldName;
      aQData[nIdx].operation = $("#qfld-Request-" + fldName).val();
      aQData[nIdx].value1 = $("#qfld-Request-" + fldName + '-1').val();
      aQData[nIdx].value2 = '';
      if ($("#qfld-Request-" + fldName + '-2').val() != '' &&
              ($("#qfld-Request-" + fldName + '-1').val() == '<>' || $("#qfld-Request-" + fldName + '-1').val() == '><')) {
        aQData[nIdx].value2 = $("#qfld-Request-" + fldName + '-2').val();
      }
      nIdx++;
    }
  });
  return aQData;
}

function requestSearch() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getQueryRequestSearch()),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequestsData = response.data.List;
        showRequestExecuteTable();
        renderRequestTable();
      } else {
        showRequestExecuteTable();
        renderRequestQueryAlert();
      }
    }
  });
}

function renderRequestTable() {
  let vHtml = "";
  vHtml += '<div class="col-sm-12">';
  vHtml += '  <table class="table table-bordered table-striped table-details mt-2">';
  vHtml += '   <thead>';
  vHtml += '      <tr>';
  vHtml += '       <td></td>';
  vHtml += '       <td>' + getLabel('Borrower') + '</td>';
  vHtml += '       <td>' + getLabel('Loan.Request') + '</td>';
  vHtml += '       <td>' + getLabel('Lender') + '</td>';
  vHtml += '       <td>' + getLabel('Lnum') + '</td>';
  vHtml += '       <td>' + getLabel('LDate') + '</td>';
  vHtml += '       <td>' + getLabel('LbranId') + '</td>';
  vHtml += '       <td>' + getLabel('RDate') + '</td>';
  vHtml += '       <td>' + getLabel('Date') + '</td>';
  vHtml += '       <td>' + getLabel('ProdId') + '</td>';
  vHtml += '       <td>' + getLabel('ReqLAmt') + '</td>';
  vHtml += '       <td>' + getLabel('ReqGAmt') + '</td>';
  vHtml += '       <td>' + getLabel('ReqGPerc') + '</td>';
  vHtml += '     </tr>';
  vHtml += '    </thead>';
  vHtml += '   <tbody>';
  for (let i = 0; i < aRequestsData.length; i++) {
    vHtml += '   <tr>';
    vHtml += '     <td style="width: 35px;">';
    vHtml += '       <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm edit-request" data-id="' + aRequestsData[i].id + '" data-index="' + i + '">';
    vHtml += '         <i class="bi bi-pencil"></i>';
    vHtml += '       </a>';
    vHtml += '       </td>';
    vHtml += '     <td>' + aRequestsData[i].borrowerName + '</td>';
    vHtml += '     <td>' + aRequestsData[i].dnum + '</td>';
    vHtml += '     <td>' + aRequestsData[i].lbranName + '</td>';
    vHtml += '     <td>' + aRequestsData[i].lnum + '</td>';
    vHtml += '     <td>' + aRequestsData[i].ldate + '</td>';
    vHtml += '     <td>' + aRequestsData[i].lbranName + '</td>';
    vHtml += '     <td>' + aRequestsData[i].rdate + '</td>';
    vHtml += '     <td>' + aRequestsData[i].ddate + '</td>';
    vHtml += '     <td>' + aRequestsData[i].prodId + '</td>';
    vHtml += '     <td>' + aRequestsData[i].reqLamt + '</td>';
    vHtml += '     <td>' + aRequestsData[i].reqGamt + '</td>';
    vHtml += '     <td>' + aRequestsData[i].reqGperc + '</td>';
    vHtml += '  </tr>';
  }
  vHtml += '   </tbody>';
  vHtml += '  </table>';
  vHtml += '</div>';
  $('#Request-Table').html(vHtml);
  $('.edit-request').click(function (e) {
    e.preventDefault();
    doRequestGet($(this).data('id'));
  });
}

function renderRequestQueryAlert() {
  let vHtml = '';
  vHtml = '<h4 class="text-center text-danger">' + getLabel('There.are.no.results.matching.search.options') + '</h4>';
  $('#Request-Table').html(vHtml);
}

function doRequestGet(nId) {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/' + nId,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        let oData = response.data.Obj;
        modeRequestEdit();
        aRequest[0] = oData;
        $('#fld-Request-id').val(oData.id);
        $('#fld-Request-borrowerId').val(oData.borrowerId);
        $('#fld-Request-borrowerName').val(oData.borrowerName);
        $('#fld-Request-requestId').html('<option value="' + oData.id + '">' + oData.dnum + '</option>');
        $('#fld-Request-lenderId').val(oData.lenderName);
        $('#fld-Request-lnum').val(oData.lnum);
        $('#fld-Request-ldate').val(oData.ldate);
        $('#fld-Request-lbranId').val(oData.lbranName);
        $('#fld-Request-rdate').val(oData.rdate);
        $('#fld-Request-ddate').val(oData.ddate);
        $('#fld-Request-prodId').val(oData.prodId);
        $('#fld-Request-prodName').val(oData.prodName);
        $('#fld-Request-reqLamt').val(oData.reqLamt);
        $('#fld-Request-reqGamt').val(oData.reqGamt);
        $('#fld-Request-reqGperc').val(oData.reqGperc);
        $('#fld-Request-Pointers-id').val(oData.mpointerId);
        callProductFunction();
        getRequestBlocksData(oData);
        getPointers();
        getRequestFinancialLists();
        getRequestWarranties();
        getRequestForwardStatus();
        getRequestStatus();
      } else {
        showToast(getLabel('Failed.To.Get'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
      showToast(getLabel('Failed.To.Get'), 'DANGER', prepareErrorMessage(response.message));
    }
  });
}

function getRequestLonaAge() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'nstart';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '<=';
  aQData[nIdx].value1 = $('#fld-Request-GeneralInfo-loanAge').val();
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'nend';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '>=';
  aQData[nIdx].value1 = $('#fld-Request-GeneralInfo-loanAge').val();
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/CodeLoanAge/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        $('#fld-Request-GeneralInfo-loanAgeId').val(response.data.List[0].id);
        $('#fld-Request-GeneralInfo-loanAgeName').val(response.data.List[0].name);
      }
    }
  });
}
/****** Product *******/
function getProductId() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'prodId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fld-Request-prodId').val();
  aQData[nIdx].value2 = '';
  return aQData;
}

function callProductFunction() {
  getProductSize();
  getProductSectors();
  getProductAge();
  getProductProjectType();
  initSectorPhTable();
  initHistoryPhTable();
  initSolvencyPhTable();
}

function getProductSize() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ProductProjectSizes/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getProductId()),
    success: function (response) {
      if (response.status && response.code === 200) {
        aSize = response.data.List;
        $('#fld-Request-GeneralInfo-sizeId').html('');
        $.each(aSize, function (i, Size) {
          $('#fld-Request-GeneralInfo-sizeId').append($('<option>', {
            value: Size.sizeId,
            text: Size.sizeName
          }));
        });
      }
    }
  });
}

function getProductSectors() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ProductSectors/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getProductId()),
    success: function (response) {
      if (response.status && response.code === 200) {
        for (let i = 0; i < response.data.List.length; i++) {
          aSector[i] = {};
          aSector[i].id = response.data.List[i].sectorId;
          aSector[i].name = response.data.List[i].sectorName;
        }
      }
    }
  });
}

function getProductProjectType() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ProductProjectType/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getProductId()),
    success: function (response) {
      aProjectType = response.data.List;
      $('#fld-Request-GeneralInfo-projtypeId').html('');
      if (response.status && response.code === 200) {
        $.each(aProjectType, function (i, ProjectType) {
          $('#fld-Request-GeneralInfo-projtypeId').append($('<option>', {
            value: ProjectType.typeId,
            text: ProjectType.typeName
          }));
        });
      }
    }
  });
}

function initSectorPhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow1',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteSectorPhTableRow
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
    field: 'reqId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('Sector'),
    field: 'sectorId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aSector
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  sectorPhTable = new PhTable('sectorPhTable', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  sectorPhTable.setHeight(18);
}

function deleteSectorPhTableRow() {
  sectorPhTable.deleteRow(parseInt($(this).data('row')));
}

function getProductAge() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ProductProjectAge/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getProductId()),
    success: function (response) {
      if (response.status && response.code === 200) {
        aLoanAge = response.data.List;
        $('#fld-Request-GeneralInfo-ageId').html('');
        $.each(aLoanAge, function (i, LoanAge) {
          $('#fld-Request-GeneralInfo-ageId').append($('<option>', {
            value: LoanAge.ageId,
            text: LoanAge.ageName
          }));
        });
      }
    }
  });
}

function getRequestBlocksData(oData) {
  $('.Request').removeClass('d-none');
  $('.card-toolbar-attache').removeClass('d-none');
  $("#ph-Request-changeStatus").removeClass('d-none');
  $('.fld-Request-GeneralInfo').each(function () {
    for (let obj in oData) {
      $('#fld-Request-GeneralInfo-' + obj).val(oData[obj]);
    }
  });
  sectorPhTable.setData(oData.aList);
  $('#fld-Request-GeneralInfo-sizeId').val(oData.sizeId);
  $('#fld-Request-GeneralInfo-ageId').val(oData.ageId);
  $('.fld-Request-Management').each(function () {
    for (let obj in oData) {
      $('#fld-Request-Management-' + obj).val(oData[obj]);
    }
  });
  $('.fld-Request-Evaluation').each(function () {
    for (let obj in oData) {
      $('#fld-Request-Evaluation-' + obj).val(oData[obj]);
    }
  });
  $('.fld-Request-LoanInfo').each(function () {
    for (let obj in oData) {
      $('#fld-Request-LoanInfo-' + obj).val(oData[obj]);
    }
  });
  historyPhTable.setData(oData.aList1);
  solvencyPhTable.setData(oData.aList2);
}

function saveRequestGeneralInfo() {
  let oData = {};
  oData["id"] = $("#fld-Request-GeneralInfo-id").val();
  oData["loanAgeId"] = $("#fld-Request-GeneralInfo-loanAgeId").val();
  $(".fld-Request-GeneralInfo").each(function () {
    let element = $(this).attr('id');
    let fldName = element.split("-").slice(-1).join('');
    oData[fldName] = $("#fld-Request-GeneralInfo-" + fldName).val();
  });
  oData.childs = {};
  oData.childs.child = {};
  oData.childs.child.aRows = sectorPhTable.getRows();
  oData.childs.child.forDelete = sectorPhTable.getDeleted();
  if (isValidForm('Request-GeneralInfo-Form')) {
    $.ajax({
      type: 'PUT',
      async: false,
      url: PhSettings.apiURL + '/UC/Lrg/RequestGeneralInformation/',
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status && response.code === 200) {
          showToast(getLabel('Added.Successfully') + ' - ' + getLabel('Request-GeneralInfo'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Add') + ' - ' + getLabel('Request-GeneralInfo'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    });
  }
}

function saveRequestManagement() {
  let oData = {};
  oData["id"] = $("#fld-Request-Management-id").val();
  $(".fld-Request-Management").each(function () {
    let element = $(this).attr('id');
    let fldName = element.split("-").slice(-1).join('');
    oData[fldName] = $("#fld-Request-Management-" + fldName).val();
  });
  if (isValidForm('Request-Management-Form')) {
    $.ajax({
      type: 'PUT',
      async: false,
      url: PhSettings.apiURL + '/UC/Lrg/RequestManagement/',
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status && response.code === 200) {
          showToast(getLabel('Added.Successfully') + ' - ' + getLabel('Request-Management'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Add') + ' - ' + getLabel('Request-Management'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    });
  }
}

function saveRequestEvaluation() {
  let oData = {};
  oData["id"] = $("#fld-Request-Evaluation-id").val();
  $(".fld-Request-Evaluation").each(function () {
    let element = $(this).attr('id');
    let fldName = element.split("-").slice(-1).join('');
    oData[fldName] = $("#fld-Request-Evaluation-" + fldName).val();
  });
  oData.childs = {};
  oData.childs.child = {};
  oData.childs.child.aRows = historyPhTable.getRows();
  oData.childs.child.forDelete = historyPhTable.getDeleted();
  oData.childs.child1 = {};
  oData.childs.child1.aRows = solvencyPhTable.getRows();
  oData.childs.child1.forDelete = solvencyPhTable.getDeleted();
  if (isValidForm('Request-Evaluation-Form')) {
    $.ajax({
      type: 'PUT',
      async: false,
      url: PhSettings.apiURL + '/UC/Lrg/RequestEvaluation/',
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status && response.code === 200) {
          showToast(getLabel('Added.Successfully') + ' - ' + getLabel('Request-Evaluation'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Add') + ' - ' + getLabel('Request-Evaluation'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    });
  }
}

function saveRequestLoanInfo() {
  let oData = {};
  oData["id"] = $("#fld-Request-LoanInfo-id").val();
  $(".fld-Request-LoanInfo").each(function () {
    let element = $(this).attr('id');
    let fldName = element.split("-").slice(-1).join('');
    oData[fldName] = $("#fld-Request-LoanInfo-" + fldName).val();
  });
  if (isValidForm('Request-LoanInfo-Form')) {
    $.ajax({
      type: 'PUT',
      async: false,
      url: PhSettings.apiURL + '/UC/Lrg/RequestLoanInformation/',
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status && response.code === 200) {
          showToast(getLabel('Added.Successfully') + ' - ' + getLabel('Request-Loan-Info'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Add') + ' - ' + getLabel('Request-Loan-Info'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    });
  }
}

function initHistoryPhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow2',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteHistoryPhTableRow
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
    field: 'reqId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('Lender'),
    field: 'lenderId',
    rfield: 'lenderName',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 0,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Lrg/Lenders/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Period'),
    field: 'period',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Lates'),
    field: 'lates',
    width: '150px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Failure'),
    field: 'failure',
    width: '150px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  historyPhTable = new PhTable('historyPhTable', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  historyPhTable.setHeight(25);
}

function deleteHistoryPhTableRow() {
  historyPhTable.deleteRow(parseInt($(this).data('row')));
}

function initSolvencyPhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow3',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteSolvencyPhTable
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
    field: 'reqId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('Owner'),
    field: 'ownerId',
    rfield: 'ownerName',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 0,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Lrg/Borrowers/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Asset'),
    field: 'assteId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aAsste
  };
  aColumns[nIdx++] = {
    title: getLabel('OwnType'),
    field: 'owntypeId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aOwnType
  };
  aColumns[nIdx++] = {
    title: getLabel('OwnPerc'),
    field: 'ownperc',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Value'),
    field: 'val',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'descr',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  solvencyPhTable = new PhTable('solvencyPhTable', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  solvencyPhTable.setHeight(25);
}

function deleteSolvencyPhTable() {
  solvencyPhTable.deleteRow(parseInt($(this).data('row')));
}

/****** Pointers *******/
function getPointers() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/getPointers/' + $('#fld-Request-Pointers-id').val(),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        aPointers = response.data.Obj;
        renderPointers();
        getRequestPointers();
      }
    }
  });
}

function renderPointers() {
  let vHtml = '';
  for (let i = 0; i < aPointers.length; i++) {
    vHtml += '<div class="row pb-1">';
    vHtml += '  <label for="fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid + '" class="col-sm-3 form-label ps-2 ph-label start">' + aPointers[i].ptrtablename + '</label>';
    if (aPointers[i].tblkindid === 1) { // SELECT
      vHtml += '<div class="col-sm-5">';
      vHtml += '  <select id="fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid + '" class="form-select form-select-sm fld-Request-MstPointers-List" data-id="">';
      for (let j = 0; j < aPointers[i].options.length; j++) {
        vHtml += '  <option value="' + aPointers[i].options[j].itemId + '"> ' + aPointers[i].options[j].itemName + '</option>';
      }
      vHtml += '  </select>';
      vHtml += '</div>';
    } else if (aPointers[i].tblkindid === 2) { // DATE
      vHtml += '<div class="col-sm-2">';
      vHtml += '  <div class="input-group date">';
      vHtml += '    <input id="fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid + '" class="form-control form-control-sm ph_datepicker fld-Request-MstPointers-List" type="text" value="" data-id="" required="true" />';
      vHtml += '    <div class="input-group-append input-group-sm datepicker-btn">';
      vHtml += '      <span class="input-group-text">';
      vHtml += '        <i class="bi bi-calendar4-event"></i>';
      vHtml += '      </span>';
      vHtml += '    </div>';
      vHtml += '  </div>';
      vHtml += '</div>';
      vHtml += '<div class="col-sm-3">';
      vHtml += '</div>';
    } else if (aPointers[i].tblkindid === 3 || aPointers[i].tblkindid === 4) { // NUMBER
      vHtml += '<div class="col-sm-2">';
      vHtml += '  <input id="fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid + '" class="form-control form-control-sm fld-Request-MstPointers-List" type="number" min="" max="" value="" data-id="" autocomplete="off" required="true" />';
      vHtml += '</div>';
      vHtml += '<div class="col-sm-3">';
      vHtml += '</div>';
    } else if (aPointers[i].tblkindid === 5) { // TEXT
      vHtml += '<div class="col-sm-5">';
      vHtml += '  <input id="fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid + '" class="form-control form-control-sm fld-Request-MstPointers-List" type="text" value="" data-id="" autocomplete="off" required="true" />';
      vHtml += '</div>';
    }
    vHtml += '  <label for="fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid + '-rem" class="col-sm-1 form-label ps-2 ph-label text-center">' + getLabel('rem') + '</label>';
    vHtml += '  <div class="col-sm-3">';
    vHtml += '    <input id="fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid + '-rem" class="form-control form-control-sm fld-Request-MstPointers-List" type="text" value="" autocomplete="off" required="true" />';
    vHtml += '  </div>';
    vHtml += '</div>';
  }
  $('#RequestPointersTable').html(vHtml);
  initPhTApp();
}

function getRequestPointers() {
  aRequestPointers = [];
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'reqId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fld-Request-id').val();
  aQData[0].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/RequestPointers/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequestPointers = response.data.List;
        setRequestPointers();
      }
    }
  });
}

function setRequestPointers() {
  for (let i = 0; i < aRequestPointers.length; i++) {
    $('#fld-Request-MstPointers-' + aRequestPointers[i].tableId + '-' + aRequestPointers[i].typeId).data('id', aRequestPointers[i].id);
    if (aPointers[i].tblkindid == 1) {
      $('#fld-Request-MstPointers-' + aRequestPointers[i].tableId + '-' + aRequestPointers[i].typeId).val(aRequestPointers[i].itemId);
    } else if (aPointers[i].tblkindid == 2) {
      $('#fld-Request-MstPointers-' + aRequestPointers[i].tableId + '-' + aRequestPointers[i].typeId).val(aRequestPointers[i].ddate);
    } else if (aPointers[i].tblkindid == 3 || aRequestPointers[i].tblkindid == 4) {
      $('#fld-Request-MstPointers-' + aRequestPointers[i].tableId + '-' + aRequestPointers[i].typeId).val(aRequestPointers[i].nvalue);
    } else if (aPointers[i].tblkindid == 5) {
      $('#fld-Request-MstPointers-' + aRequestPointers[i].tableId + '-' + aRequestPointers[i].typeId).val(aRequestPointers[i].vvalue);
    }
  }
}

function saveRequestPointers() {
  let oData = {};
  oData.id = $('#fld-Request-id').val();
  oData.mpointerId = $('#fld-Request-Pointers-id').val();
  oData.childs = {};
  oData.childs.child = {};
  oData.childs.child.aRows = [];
  for (let i = 0; i < aPointers.length; i++) {
    oData.childs.child.aRows[i] = {};
    oData.childs.child.aRows[i].id = 0;
    if (aRequestPointers.length > 0) {
      oData.childs.child.aRows[i].id = $('#fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid).data('id');
    }
    oData.childs.child.aRows[i].reqId = oData.id;
    oData.childs.child.aRows[i].tableId = aPointers[i].ptrtableid;
    oData.childs.child.aRows[i].typeId = aPointers[i].typeid;
    oData.childs.child.aRows[i].itemId = 0;
    oData.childs.child.aRows[i].ddate = '';
    oData.childs.child.aRows[i].nvalue = '';
    oData.childs.child.aRows[i].vvalue = '';
    oData.childs.child.aRows[i].rem = '';
    if (aPointers[i].tblkindid === 1) {
      oData.childs.child.aRows[i].itemId = $('#fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid).val();
    } else if (aPointers[i].tblkindid === 2) {
      oData.childs.child.aRows[i].ddate = $('#fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid).val();
    } else if (aPointers[i].tblkindid === 3 || aPointers[i].tblkindid === 4) {
      oData.childs.child.aRows[i].nvalue = $('#fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid).val();
    } else if (aPointers[i].tblkindid === 5) {
      oData.childs.child.aRows[i].vvalue = $('#fld-Request-MstPointers-' + aPointers[i].ptrtableid + '-' + aPointers[i].typeid).val();
    }
  }
  $.ajax({
    type: 'PUT',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/RequestMstPointers/',
    headers: PhSettings.Headers,
    data: JSON.stringify(oData),
    success: function (response) {
      if (response.status && response.code === 200) {
        showToast(getLabel('Added.Successfully') + ' - ' + getLabel('Pointers'), 'SUCCESS', getLabel(response.message));
        getRequestPointers();
      } else {
        showToast(getLabel('Failed.To.Add') + ' - ' + getLabel('Pointers'), 'DANGER', prepareErrorMessage(response.message));
      }
    }
  });
}

async function changePointer() {
  if (aRequestPointers.length > 0 && parseInt($('#fld-Request-Pointers-id').val()) !== parseInt(aRequest[0].mpointerId)) {
    await swal.fire({
      title: getLabel('The.Pointer.Will.be.Delete') + ' !!',
      text: getLabel('Are.You.Sure.?'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      }
    }).then(function (result) {
      if (result.value) {
        deleteRequestPointers();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
        $('#fld-Request-Pointers-id').val(aRequest[0].mpointerId);
      }
    });
  } else {
  }
}

function deleteRequestPointers() {
  $.ajax({
    type: 'DELETE',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/deleteRequestPointers/' + parseInt($('#fld-Request-requestId').val()),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        showToast(getLabel('Deleted.Successfully') + ' - ' + getLabel('Pointers'), 'SUCCESS', getLabel(response.message));
        getPointers();
      } else {
        showToast(getLabel('Failed.To.Delete') + ' - ' + getLabel('Pointers'), 'DANGER', prepareErrorMessage(response.message));
      }
    }
  });
}
/****** FinancialList *******/
function openNewFinancialList() {
  aFinListItem = [];
  aTempFinListItem = [];
  $('#fld-Request-Financial-List-id').val(0);
  $('#fld-Request-Financial-List-ddate').val(currentDate());
  $('#fld-Request-Financial-List-name').val('');
  $('#fld-Request-Financial-List-fyear').val('');
  $('#fld-Request-Financial-List-rem').val('');
  $('#fld-Request-Financial-List-listId').val($('#fld-Request-Financial-List-listId option:first').val());
  $('#financial-Modal').modal('show');
  $('#fld-Request-Financial-List-listId').attr('disabled', false);
  getFinancialListItems();
}

function modeEditFinancialList() {
  aTempFinListItem = [];
  $('#ph-delete-Request-Financial-List').removeClass('d-none');
  $('#ph-attache-Request-Financial-List').removeClass('d-none');
  $('#fld-Request-Financial-List-listId').attr('disabled', true);
  $('#financial-Modal').modal('show');
  setFinancialListItem();
}

function getFinancialListItems() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'flistId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fld-Request-Financial-List-listId').val();
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/FinancialListItems/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aFinancialListItem = response.data.List;
        renderFinancialListItem();
      }
    }
  });
}

function renderFinancialListItem() {
  let vHtml = '';
  let attr = '';
  let hr = '';
  for (let i = 0; i < aFinancialListItem.length; i++) {
    attr = '';
    hr = '';
    if (parseInt(aFinancialListItem[i].vtypeId) === 1) {
      attr = 'disabled';
      hr = '<hr class="text-black col-sm-8 my-1" style="border-top: 1px solid;">';
    }
    vHtml += '<div class="row pb-1">' + hr + '</div>';
    vHtml += '<div class="row pb-1">';
    vHtml += '  <label for="" class="col-sm-8 form-label ph-label ps-3">';
    vHtml += '    ' + aFinancialListItem[i].kindName + ' - ' + aFinancialListItem[i].grpName + ' - ' + aFinancialListItem[i].itmName;
    vHtml += '  </label>';
    vHtml += '  <div class="col-sm-3">';
    vHtml += '    <input id="financial-item-' + aFinancialListItem[i].id + '" class="form-control form-control-sm financial-item pt-1" type="text" value="0" data-id="' + aFinancialListItem[i].id + '" autocomplete="off" ' + attr + '/>';
    vHtml += '  </div>';
    vHtml += '</div>';
  }
  $('#RequestFinancialListItem').html(vHtml);
}

function getRequestFinancialLists() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'reqId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fld-Request-id').val();
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ReqFinancialList/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequestFinancialList = response.data.List;
        renderRequestFinancialLists();
      }
    }
  });
}

function renderRequestFinancialLists() {
  let vHtml = '';
  vHtml += '<table class="table table-bordered table-details table-striped" style="white-space: nowrap;">';
  vHtml += '  <thead style="position: sticky !important; top: 0 !important;">';
  vHtml += '    <tr>';
  vHtml += '      <td> </td>';
  vHtml += '      <td>' + getLabel('Financial.List') + '</td>';
  vHtml += '      <td style="width:20%;">' + getLabel('Name') + '</td>';
  vHtml += '      <td style="width:10%;">' + getLabel('Year') + '</td>';
  vHtml += '      <td style="width:10%;">' + getLabel('Date') + '</td>';
  vHtml += '      <td style="width:35%;">' + getLabel('Rem') + '</td>';
  vHtml += '      <td> </td>';
  vHtml += '    </tr>';
  vHtml += '  </thead>';
  vHtml += '  <tbody>';
  for (let i = 0; i < aRequestFinancialList.length; i++) {
    vHtml += '  <tr id="table-row-' + i + '" class="trow">';
    vHtml += '    <td style="width: 35px;">';
    vHtml += '      <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm edit-financial" data-id="' + aRequestFinancialList[i].id + '" data-bs-title="Edit" title="' + getLabel("Edit") + '"  data-index="' + i + '">';
    vHtml += '        <i class="bi bi-pencil"></i>';
    vHtml += '      </a>';
    vHtml += '    </td>';
    vHtml += '    <td>' + aRequestFinancialList[i].listName + '</td>';
    vHtml += '    <td>' + aRequestFinancialList[i].name + '</td>';
    vHtml += '    <td>' + aRequestFinancialList[i].fyear + '</td>';
    vHtml += '    <td>' + aRequestFinancialList[i].ddate + '</td>';
    vHtml += '    <td>' + aRequestFinancialList[i].rem + '</td>';
    vHtml += '    <td style="width: 35px;">';
    vHtml += '      <a href="javascript:;" class="btn btn-danger btn-sm delete-financial" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + i + '" data-id="' + aRequestFinancialList[i].id + '">';
    vHtml += '        <i class="bi bi-trash"></i>';
    vHtml += '      </a>';
    vHtml += '    </td>';
    vHtml += '  </tr>';
  }
  vHtml += '  </tbody>';
  vHtml += '</table>';
  $('#RequestFinancialListTable').html(vHtml);
  $('.edit-financial').off('click').on('click', function () {
    getFinancialList($(this).data('id'));
  });
  $('.delete-financial').off('click').on('click', function () {
    let nId = $(this).data('id');
    swal.fire({
      title: getLabel('Delete.Financial.List!!'),
      text: getLabel('Are.you.sure.?'),
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      }
    }).then(function (result) {
      if (result.value) {
        deleteFinancialList(nId);
      } else if (result.dismiss === "cancel") {
      }
    });
  });
}

function saveRequestFinancialList() {
  let oData = {};
  calcFormula();
  oData["reqId"] = parseInt($("#fld-Request-id").val());
  oData["id"] = $("#fld-Request-Financial-List-id").val();
  $(".fld-Request-Financial-List").each(function () {
    let element = $(this).attr('id');
    let fldName = element.split("-").slice(-1).join('');
    oData[fldName] = $("#fld-Request-Financial-List-" + fldName).val();
  });
  oData.childs = {};
  oData.childs.child = {};
  oData.childs.child.aRows = [];
  for (let i = 0; i < aFinListItem.length; i++) {
    oData.childs.child.aRows[i] = {};
    oData.childs.child.aRows[i].id = parseInt(aFinListItem[i].id);
    oData.childs.child.aRows[i].flistId = parseInt($('#fld-Request-Financial-List-id').val());
    oData.childs.child.aRows[i].fitmId = parseInt(aFinListItem[i].fitmId);
    oData.childs.child.aRows[i].val = parseFloat(aFinListItem[i].val);
  }
  if (isValidForm('Request-Financial-List-Form')) {
    let method = 'POST';
    let url = PhSettings.apiURL + '/UC/Lrg/ReqFinancialList/New';
    let vSuccessMessage = 'Added.Successfully';
    let vFailedMessage = 'Failed.To.Add';
    if ($('#fld-Request-Financial-List-id').val() > 0) {
      method = 'PUT';
      url = PhSettings.apiURL + '/UC/Lrg/ReqFinancialList/';
      vSuccessMessage = 'Updated.Successfully';
      vFailedMessage = 'Failed.To.Update';
    }
    $.ajax({
      type: method,
      async: false,
      url: url,
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status && response.code === 200) {
          showToast(getLabel(vSuccessMessage) + ' - ' + getLabel('Financial-Lists'), 'SUCCESS', getLabel(response.message));
          getRequestFinancialLists();
          $('#financial-Modal').modal('hide');
        } else {
          showToast(getLabel(vFailedMessage) + ' - ' + getLabel('Financial-Lists'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    });
  }
}

function getFinancialList(nId) {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ReqFinancialList/' + nId,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        $('.fld-Request-Financial-List').each(function () {
          aFinListItem = response.data.Obj.aList;
          for (let obj in response.data.Obj) {
            $('#fld-Request-Financial-List-' + obj).val(response.data.Obj[obj]);
          }
        });
        getFinancialListItems();
        modeEditFinancialList();
      }
    }
  });
}

function deleteFinancialList(nId) {
  $.ajax({
    type: 'DELETE',
    url: PhSettings.apiURL + '/UC/Lrg/ReqFinancialList/' + nId,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        getRequestFinancialLists();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
    }
  });
}

function calcFormula() {
  let formula = '';
  let nIdx = 0;
  aFinListItem = [];
  $('.financial-item').removeClass('invalid');
  for (let i = 0; i < aFinancialListItem.length; i++) {
    formula = '';
    for (let j = 0; j < aFinancialListItem[i].aList.length; j++) {
      if (parseInt(aFinancialListItem[i].aList[j].rflitmId) === 0 && parseInt(aFinancialListItem[i].aList[j].formulaId) === 0) {
        if (aFinancialListItem[i].aList[j].val > 0) {
          formula += aFinancialListItem[i].aList[j].val;
        } else {
          formula += '(' + aFinancialListItem[i].aList[j].val + ')';
        }
      } else if (parseInt(aFinancialListItem[i].aList[j].rflitmId) === 0 && parseInt(aFinancialListItem[i].aList[j].formulaId) !== 0) {
        formula += aFinancialListItem[i].aList[j].formulaName;
      } else if (parseInt(aFinancialListItem[i].aList[j].rflitmId) > 0 && parseInt(aFinancialListItem[i].aList[j].formulaId) === 0) {
        if (parseFloat($('#financial-item-' + aFinancialListItem[i].aList[j].rflitmId).val()) > 0) {
          formula += $('#financial-item-' + aFinancialListItem[i].aList[j].rflitmId).val();
        } else {
          formula += '(' + $('#financial-item-' + aFinancialListItem[i].aList[j].rflitmId).val() + ')';
        }
      }
    }
    if (formula !== '') {
      $('#financial-item-' + aFinancialListItem[i].id).val(eval(formula));
      if (isNaN($('#financial-item-' + aFinancialListItem[i].id).val())) {
        $('#financial-item-' + aFinancialListItem[i].id).addClass('invalid');
      }
    }
  }
  if (aTempFinListItem.length > 0) {
    $(".financial-item").each(function () {
      aFinListItem[nIdx] = {};
      aFinListItem[nIdx].id = aTempFinListItem[nIdx].id;
      aFinListItem[nIdx].fitmId = $(this).data('id');
      aFinListItem[nIdx].val = $(this).val();
      nIdx++;
    });
  } else {
    $(".financial-item").each(function () {
      aFinListItem[nIdx] = {};
      aFinListItem[nIdx].id = 0;
      aFinListItem[nIdx].fitmId = $(this).data('id');
      aFinListItem[nIdx].val = $(this).val();
      nIdx++;
    });
  }
}

function setFinancialListItem() {
  aTempFinListItem = aFinListItem;
  for (let i = 0; i < aFinListItem.length; i++) {
    $('#financial-item-' + aFinListItem[i].fitmId).val(aFinListItem[i].val);
  }
}
/****** Warranties *******/
function openNewRequestWarranties() {
  $('#fld-Request-Warranties-id').val(0);
  $('#fld-Request-Warranties-num').val('');
  $('#fld-Request-Warranties-assteId').val($('#fld-Request-Warranties-assteId option:first').val());
  $('#fld-Request-Warranties-ownerId').val('');
  $('#fld-Request-Warranties-ownerName').val('');
  $('#fld-Request-Warranties-owner').val('');
  $('#fld-Request-Warranties-owntypeId').val($('#fld-Request-Warranties-owntypeId option:first').val());
  $('#fld-Request-Warranties-ownperc').val('');
  $('#fld-Request-Warranties-estimateval').val('');
  $('#fld-Request-Warranties-mortgagenum').val('');
  $('#fld-Request-Warranties-mortgageId').val($('#fld-Request-Warranties-mortgageId option:first').val());
  $('#fld-Request-Warranties-mortgageval').val('');
  $('#fld-Request-Warranties-descr').val('');
  $('#fld-Request-Warranties-rem').val('');
  $('#ph-attache-Request-Warranties').addClass('d-none');
  $('#fld-Request-Warranties-assteId').attr('disabled', false);
  $('#warranties-Modal').modal('show');
  initWarrantiesPhTable();
}

function modeEditRequestWarranties() {
  $('#ph-attache-Request-Warranties').removeClass('d-none');
  $('#fld-Request-Warranties-assteId').attr('disabled', true);
  $('#warranties-Modal').modal('show');
}

function getRequestWarranties() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'reqId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fld-Request-id').val();
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ReqWarranties/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequestWarranties = response.data.List;
        renderRequestWarranties();
      }
    }
  });
}

function renderRequestWarranties() {
  let vHtml = '';
  vHtml += '<table class="table table-bordered table-details table-striped" style="white-space: nowrap;">';
  vHtml += '  <thead style="position: sticky !important; top: 0 !important;">';
  vHtml += '    <tr>';
  vHtml += '      <td></td>';
  vHtml += '      <td>' + getLabel('Number') + '</td>';
  vHtml += '      <td>' + getLabel('Assets.Type') + '</td>';
  vHtml += '      <td>' + getLabel('owner') + '</td>';
  vHtml += '      <td>' + getLabel('owner') + '</td>';
  vHtml += '      <td>' + getLabel('OwnType') + '</td>';
  vHtml += '      <td>' + getLabel('ownperc') + '</td>';
  vHtml += '      <td>' + getLabel('estimateval') + '</td>';
  vHtml += '      <td>' + getLabel('mortgagenum') + '</td>';
  vHtml += '      <td>' + getLabel('mortgageId') + '</td>';
  vHtml += '      <td>' + getLabel('mortgageval') + '</td>';
  vHtml += '      <td>' + getLabel('descr') + '</td>';
  vHtml += '      <td>' + getLabel('rem') + '</td>';
  vHtml += '      <td></td>';
  vHtml += '    </tr>';
  vHtml += '  </thead>';
  vHtml += '  <tbody>';
  for (let i = 0; i < aRequestWarranties.length; i++) {
    vHtml += '  <tr id="table-row-' + i + '" class="trow">';
    vHtml += '    <td style="width: 35px;">';
    vHtml += '      <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm edit-warrantie" data-id="' + aRequestWarranties[i].id + '" data-bs-title="Edit" title="' + getLabel("Edit") + '"  data-index="' + i + '">';
    vHtml += '        <i class="bi bi-pencil"></i>';
    vHtml += '      </a>';
    vHtml += '    <td>' + aRequestWarranties[i].num + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].assteName + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].ownerName + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].owner + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].owntypeName + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].ownperc + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].estimateval + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].mortgagenum + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].mortgageName + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].mortgageval + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].descr + '</td>';
    vHtml += '    <td>' + aRequestWarranties[i].rem + '</td>';
    vHtml += '    <td style="width: 35px;">';
    vHtml += '      <a href="javascript:;" class="btn btn-danger btn-sm delete-warrantie" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + i + '" data-id="' + aRequestWarranties[i].id + '">';
    vHtml += '        <i class="bi bi-trash"></i>';
    vHtml += '      </a>';
    vHtml += '    </td>';
    vHtml += '  </tr>';
  }
  vHtml += '  </tbody>';
  vHtml += '</table>';
  $('#RequestWarrantiesTable').html(vHtml);
  $('.edit-warrantie').off('click').on('click', function () {
    getRequestWarrantie($(this).data('id'));
  });
  $('.delete-warrantie').off('click').on('click', function () {
    let nId = $(this).data('id');
    swal.fire({
      title: getLabel('Delete.Warranties!!'),
      text: getLabel('Are.you.sure.?'),
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      }
    }).then(function (result) {
      if (result.value) {
        deleteRequestWarranties(nId);
      } else if (result.dismiss === "cancel") {
      }
    });
  });
}

function getRequestWarrantie(nId) {
  let listName = '';
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ReqWarranties/' + nId,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        $('.fld-Request-Warranties').each(function () {
          for (let obj in response.data.Obj) {
            $('#fld-Request-Warranties-' + obj).val(response.data.Obj[obj]);
          }
        });
        if (parseInt($('#fld-Request-Warranties-assteId').val()) === 1
                || parseInt($('#fld-Request-Warranties-assteId').val()) === 0
                || parseInt($('#fld-Request-Warranties-assteId').val()) === 2
                || parseInt($('#fld-Request-Warranties-assteId').val()) === 3) {
          listName = 'aList2';
        } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 4) {
          listName = 'aList4';
        } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 5) {
          listName = 'aList';
        } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 6) {
          listName = 'aList1';
        } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 7) {
          listName = 'aList3';
        }
        initWarrantiesPhTable();
        warrantiesPhTable.setData(response.data.Obj[listName]);
        modeEditRequestWarranties();
      }
    }
  });
}

function saveRequestWarranties() {
  let oData = {};
  let childName = '';
  calcFormula();
  oData["reqId"] = parseInt($("#fld-Request-id").val());
  oData["id"] = $("#fld-Request-Warranties-id").val();
  $(".fld-Request-Warranties").each(function () {
    let element = $(this).attr('id');
    let fldName = element.split("-").slice(-1).join('');
    oData[fldName] = $("#fld-Request-Warranties-" + fldName).val();
  });
  if (parseInt($('#fld-Request-Warranties-assteId').val()) === 1
          || parseInt($('#fld-Request-Warranties-assteId').val()) === 0
          || parseInt($('#fld-Request-Warranties-assteId').val()) === 2
          || parseInt($('#fld-Request-Warranties-assteId').val()) === 3) {
    childName = 'child3';
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 4) {
    childName = 'child5';
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 5) {
    childName = 'child1';
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 6) {
    childName = 'child2';
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 7) {
    childName = 'child4';
  }
  oData.childs = {};
  oData.childs[childName] = {};
  oData.childs[childName].aRows = warrantiesPhTable.getRows();
  oData.childs[childName].forDelete = warrantiesPhTable.getDeleted();
  if (isValidForm('Request-Warranties-Form')) {
    let method = 'POST';
    let url = PhSettings.apiURL + '/UC/Lrg/ReqWarranties/New';
    let vSuccessMessage = 'Added.Successfully';
    let vFailedMessage = 'Failed.To.Add';
    if ($('#fld-Request-Warranties-id').val() > 0) {
      method = 'PUT';
      url = PhSettings.apiURL + '/UC/Lrg/ReqWarranties/';
      vSuccessMessage = 'Updated.Successfully';
      vFailedMessage = 'Failed.To.Update';
    }
    $.ajax({
      type: method,
      async: false,
      url: url,
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status && response.code === 200) {
          showToast(getLabel(vSuccessMessage) + ' - ' + getLabel('Request Warranties'), 'SUCCESS', getLabel(response.message));
          getRequestWarranties();
          $('#warranties-Modal').modal('hide');
        } else {
          showToast(getLabel(vFailedMessage) + ' - ' + getLabel('Request Warranties'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    });
  }
}

function deleteRequestWarranties(nId) {
  $.ajax({
    type: 'DELETE',
    url: PhSettings.apiURL + '/UC/Lrg/ReqWarranties/' + nId,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully') + ' - ' + getLabel('Warranties'), 'SUCCESS', getLabel(response.message));
        getRequestWarranties();
      } else {
        showToast(getLabel('Failed.To.Delete') + ' - ' + getLabel('Warranties'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
    }
  });
}

function initWarrantiesPhTable() {
  if (parseInt($('#fld-Request-Warranties-assteId').val()) === 1
          || parseInt($('#fld-Request-Warranties-assteId').val()) === 0
          || parseInt($('#fld-Request-Warranties-assteId').val()) === 2
          || parseInt($('#fld-Request-Warranties-assteId').val()) === 3) {
    initRealestatePhTable();
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 4) {
    initMachinePhTable();
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 5) {
    initVehiclePhTable();
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 6) {
    initSecuritiesPhTable();
  } else if (parseInt($('#fld-Request-Warranties-assteId').val()) === 7) {
    initPersonalPhTable();
  }
  warrantiesPhTable.setData([]);
}

function initRealestatePhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow3',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteWarrantiesPhTable
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
    field: 'warntyId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-Warranties-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('Number'),
    field: 'num',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('AreaType'),
    field: 'areatypeId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aAreatype
  };
  aColumns[nIdx++] = {
    title: getLabel('EstimateVal'),
    field: 'estimateval',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('estReservVal'),
    field: 'estreservval',
    datatype: 'decimal',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('AreaSize'),
    field: 'areasize',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Warr.Area'),
    field: 'area',
    datatype: 'decimal',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  warrantiesPhTable = new PhTable('Warranties-Realestate', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  warrantiesPhTable.setHeight(25);
}

function initMachinePhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow3',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteWarrantiesPhTable
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
    field: 'warntyId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-Warranties-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('Number'),
    field: 'num',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'name',
    datatype: 'string',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Source'),
    field: 'source',
    datatype: 'string',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('EstimateVal'),
    field: 'estimateval',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('estReservVal'),
    field: 'estreservval',
    datatype: 'decimal',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  warrantiesPhTable = new PhTable('Warranties-Realestate', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  warrantiesPhTable.setHeight(25);
}

function initVehiclePhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow3',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteWarrantiesPhTable
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
    field: 'warntyId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-Warranties-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('Number'),
    field: 'num',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Brand'),
    field: 'brand',
    datatype: 'string',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Insurance Type'),
    field: 'insuranceId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aInsurance
  };
  aColumns[nIdx++] = {
    title: getLabel('Insurance Number'),
    field: 'insurance',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('EstimateVal'),
    field: 'estimateval',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Licence'),
    field: 'licence',
    datatype: 'string',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('ChNum'),
    field: 'chnum',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  warrantiesPhTable = new PhTable('Warranties-Realestate', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  warrantiesPhTable.setHeight(25);
}

function initSecuritiesPhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow3',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteWarrantiesPhTable
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
    field: 'warntyId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-Warranties-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('SecurType'),
    field: 'securtypeId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aSecurType
  };
  aColumns[nIdx++] = {
    title: getLabel('EstimateVal'),
    field: 'estimateval',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Source'),
    field: 'source',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  warrantiesPhTable = new PhTable('Warranties-Realestate', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  warrantiesPhTable.setHeight(25);
}

function initPersonalPhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow3',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteWarrantiesPhTable
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
    field: 'warntyId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: $('#fld-Request-Warranties-id').val()
  };
  aColumns[nIdx++] = {
    title: getLabel('Borrower'),
    field: 'borrowerId',
    rfield: 'borrowerName',
    datatype: 'integer',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Lrg/Borrowers/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('PeriodType'),
    field: 'periodtypeId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aPeriodType
  };
  aColumns[nIdx++] = {
    title: getLabel('Period'),
    field: 'period',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('value'),
    field: 'val',
    datatype: 'decimal',
    width: '150px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('S.Date'),
    field: 'sdate',
    datatype: 'date',
    width: '150px',
    component: 'input',
    componentType: 'date',
    enabled: true,
    required: true,
    defValue: currentDate()
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  warrantiesPhTable = new PhTable('Warranties-Realestate', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  warrantiesPhTable.setHeight(25);
}

function deleteWarrantiesPhTable() {
  warrantiesPhTable.deleteRow(parseInt($(this).data('row')));
}

/****** Status Modal *******/
function getRequestForwardStatus() {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/getNextStatus/' + $('#fld-Request-id').val(),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequestFStatus = response.data.Obj;
        setRequestStatusValue();
      } else {
      }
    }
  });
}

function getRequestStatus() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'reqId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fld-Request-id').val();
  aQData[0].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/RequestStatus/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequestStatus = response.data.List;
        renderRequestStatus();
      }
    }
  });
}

function setRequestStatusValue() {
  let vHtml = '';
  $('#fld-Request-ChangeStatus-reqId').val(aRequest[0].dnum);
  $('#fld-Request-ChangeStatus-oStatusId').val(aRequest[0].deptName + ' - ' + aRequest[0].unitName + ' - ' + aRequest[0].statusName);
  $('#fld-Request-ChangeStatus-nStatusId').html('');
  for (let i = 0; i < aRequestFStatus.length; i++) {
    vHtml += '<option data-index="' + i + '">';
    vHtml += '  ' + aRequestFStatus[i].f_dept_name + ' - ' + aRequestFStatus[i].f_unit_name + ' - ' + aRequestFStatus[i].f_cstatus_name;
    vHtml += '</option>';
  }
  $('#fld-Request-ChangeStatus-nStatusId').html(vHtml);
}

function renderRequestStatus() {
  let vHtml = '';
  vHtml += '<table class="table table-bordered table-striped text-center">';
  vHtml += '  <thead class="bg-secondary-subtle" style="position: sticky !important; top: 0 !important;">';
  vHtml += '    <tr>';
  vHtml += '      <td style="width: 10%">' + getLabel('Date') + '</td>';
  vHtml += '      <td>' + getLabel('Status') + '</td>';
  vHtml += '      <td>' + getLabel('Remark') + '</td>';
  vHtml += '    </tr>';
  vHtml += '  </thead>';
  vHtml += '  <tbody>';
  for (let i = 0; i < aRequestStatus.length; i++) {
    vHtml += '  <tr>';
    vHtml += '    <td>' + aRequestStatus[i].nstatusDate + '</td>';
    vHtml += '    <td>' + aRequestStatus[i].ndeptName + ' - ' + aRequestStatus[i].nunitName + ' - ' + aRequestStatus[i].nstatusName + '</td>';
    vHtml += '    <td>' + aRequestStatus[i].rem + '</td>';
    vHtml += '  </tr>';

  }
  vHtml += '  </tbody>';
  vHtml += '</table>';
  $('#Request-ChangeStatus-Table').html(vHtml);
}

function saveRequestNewStatus() {
  let oData = {};
  let index = $('#fld-Request-ChangeStatus-nStatusId').find(':selected').data('index');
  oData.reqId = aRequest[0].id;
  oData.odeptId = aRequest[0].deptId;
  oData.ounitId = aRequest[0].unitId;
  oData.ooperId = 0;
  oData.ostatusId = aRequest[0].statusId;
  oData.ostatusDate = aRequest[0].statusDate;
  oData.ouserId = aRequest[0].userId;
  oData.ndeptId = aRequestFStatus[index].f_dept_id;
  oData.nunitId = aRequestFStatus[index].f_unit_id;
  oData.noperId = 0;
  oData.nstatusId = aRequestFStatus[index].f_cstatus_id;
  oData.nstatusDate = currentDate();
  oData.nuserId = PhSettings.GUId.UId;
  oData.ndays = aRequestFStatus[index].f_days;
  oData.rem = $('#fld-Request-ChangeStatus-rem').val();
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/UC/Lrg/RequestStatus/New',
    async: false,
    headers: PhSettings.Headers,
    data: JSON.stringify(oData),
    success: function (response) {
      if (response.status && response.code === 200) {
        showToast(getLabel('Added.Successfully') + ' - ' + getLabel('Request-GeneralInfo'), 'SUCCESS', getLabel(response.message));
        location.reload();
      } else {
        showToast(getLabel('Failed.To.Add') + ' - ' + getLabel('Request-GeneralInfo'), 'DANGER', prepareErrorMessage(response.message));
      }
    }
  });
}

/****** Attache Modal *******/
function attacheResetModal() {
  $('#Request-Attache-Form')[0].reset();
  $('#fld-Request-Attache-File').val('');
  $('#fld-Request-ONameFile').val('');
  $('#fld-Request-File').removeClass('invalid');
  $('#fld-Request-NNameFile').removeClass('invalid');
  attacheSearch();
}

function attacheSearch() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'rid';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = parseInt($('#fld-' + blockName + '-id').val());
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'MPrgId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = PhSettings.MPrg.id;
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'blockName';
  aQData[nIdx].dataType = PhFC_Text;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = blockName;
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search/0/0",
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      showHeaderSpinner(false);
      if (response.status) {
        attachRenderTable(response.data.List);
      } else {
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
}

function attachRenderTable(data) {
  let vHtml = '';
  vHtml += '<table class="table table-bordered table-striped table-details mt-2">';
  vHtml += '  <thead>';
  vHtml += '    <tr>';
  vHtml += '      <td style="width: 5%;"></td>';
  vHtml += '      <td style="width: 5%;">#</td>';
  vHtml += '      <td style="width: 5%;"></td>';
  vHtml += '      <td>' + getLabel('Basic.Name') + '</td>';
  vHtml += '      <td>' + getLabel('Name') + '</td>';
  vHtml += '    </tr>';
  vHtml += '  </thead>';
  vHtml += '  <tbody>';
  if (data !== undefined && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      vHtml += '  <tr>';
      vHtml += '    <td>';
      vHtml += '      <a class="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">';
      vHtml += '        <i class="bi bi-three-dots-vertical nav-item"></i>';
      vHtml += '      </a>';
      vHtml += '      <ul class="dropdown-menu">';
      vHtml += '        <li id="fileAttach0">';
      vHtml += '          <a class="dropdown-item download-item" href="javascript:;" data-index="' + i + '">' + getLabel('Download') + '</a>';
      vHtml += '        </li>';
      vHtml += '        <li>';
      vHtml += '          <a class="dropdown-item delete-item" href="javascript:;" data-index="' + i + '">' + getLabel('Delete') + '</a>';
      vHtml += '        </li>';
      vHtml += '      </ul>';
      vHtml += '    </td>';
      vHtml += '    <td>' + parseInt(i + 1) + '</td>';
      vHtml += '    <td> <i class="' + returnIconFile(data[i].ext) + ' fs-5"></i> </td>';
      vHtml += '    <td>' + data[i].oname + '</td>';
      vHtml += '    <td>' + data[i].name + '.' + data[i].ext + '</td>';
      vHtml += '  </tr>';
    }
  }
  vHtml += '  </tbody>';
  vHtml += '</table>';
  $('#Request-Attache-Table').html(vHtml);
  $('.download-item').click(function (e) {
    e.preventDefault();
    let index = $(this).data('index');
    attacheDownload(data[index].id);
  });
  $('.delete-item').click(function (e) {
    e.preventDefault();
    let index = $(this).data('index');
    attacheDelete(data[index].id);
  });
}

getAttache = function (e) {
  base64Encoder(e.target.files[0]);
  $('#fld-Request-ONameFile').val(e.target.files[0].name);
};

base64Encoder = function (blob) {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    $('#fld-Request-Attache-File').val(reader.result);
  };
};

function attacheSave() {
  if ($('#fld-Request-NNameFile').val().trim() !== ''
          && $('#fld-Request-Attache-File').val() !== '') {
    $('#fld-Request-File').removeClass('invalid');
    $('#fld-Request-NNameFile').removeClass('invalid');
    showHeaderSpinner(true);
    $.ajax({
      type: 'POST',
      async: false,
      url: PhSettings.apiURL + '/CC/attached/new',
      headers: PhSettings.Headers,
      data: JSON.stringify({
        rid: $('#fld-' + blockName + '-id').val(),
        file: $('#fld-Request-Attache-File').val(),
        oldName: $('#fld-Request-ONameFile').val(),
        newName: $('#fld-Request-NNameFile').val(),
        blockName: blockName,
        MPrg: PhSettings.MPrg
      }),
      success: function (response) {
        showHeaderSpinner(false);
        if (response.status) {
          attacheResetModal();
          showToast(getLabel('Added.Successfully') + ' - ' + getLabel(blockName), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Add') + ' - ' + getLabel(blockName), 'DANGER', prepareErrorMessage(response.message));
        }
      },
      error: function (response) {
        showHeaderSpinner(false);
      }
    });
  } else {
    $('#fld-Request-File').addClass('invalid');
    $('#fld-Request-NNameFile').addClass('invalid');
  }
}

function attacheDelete(nId) {
  showHeaderSpinner(true);
  $.ajax({
    type: 'DELETE',
    async: false,
    url: PhSettings.apiURL + '/CC/attached/' + nId,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully') + ' - ' + getLabel(blockName), 'SUCCESS', getLabel(response.message));
        attacheResetModal();
      } else {
        showToast(getLabel('Failed.To.Delete') + ' - ' + getLabel(blockName), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
  showHeaderSpinner(false);
}

function attacheDownload(nId) {
  showHeaderSpinner(true);
  $.ajax({
    type: 'Get',
    async: false,
    url: PhSettings.apiURL + '/CC/attached/' + nId,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        downloadFile(response.data.vFile, response.data.ftype, response.data.name + '.' + response.data.ext);
      } else {
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
  showHeaderSpinner(false);
}
