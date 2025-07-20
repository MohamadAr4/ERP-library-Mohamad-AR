let aBorrower = [], aRequest = [],
        requestId = '',
        aProd = [], aLenderBranche = [], aLenderBranches = [];
jQuery(document).ready(function () {
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
});
function getBorrowRequest() {
  let aQData = [];
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
  sendReguestId();
  showHeaderSpinner(false);
}

function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aRequest.length; i++) {
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].lnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}
function sendReguestId() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'reqId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldReqId').val();
  aQData[0].value2 = '';
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          console.log(111);
        }
      }
    }
  });
}


function getElemntFromReq() {
  let aEditField = aRequest.filter(function (el) {
    return el.id === $('#fldReqId').val();
  });
  $('#fldLenderId').val(aEditField[0].lenderId);
  $('#fldLenderName').val(aEditField[0].lenderName);
  $('#fldLbranId').val(aEditField[0].lbranId);
  $('#fldLbranName').val(aEditField[0].lbranName);
  $('#fldProdId').val(aEditField[0].prodId);
  $('#fldProdName').val(aEditField[0].prodName);
  $('#fldLnum').val(aEditField[0].lnum);
}

