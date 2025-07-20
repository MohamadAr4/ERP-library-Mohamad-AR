let aRequests = [];
let aCheckList = [];
let aMstChecklist = [];
let aLocalProducer = [];
let blockName = '';
let rId = '';
let nRequestId = 0;
jQuery(document).ready(function () {
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequests();
  });
  $('#fldReqId').change(function () {
    changeRequest();
  });
  $('#ph-new').on('click', function (e) {
    e.preventDefault();
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
        openNew();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
  $('#ph-submit').on('click', function (e) {
    e.preventDefault();
    saveLocalChecklist();
  });
  $('#UploadFile').off('click').on('click', function (e) {
    e.preventDefault();
    attacheSave();
  });
  $('#fld-File').change(function (e) {
    e.preventDefault();
    getAttache(e);
  });
});

function openNew() {
  aRequests = [];
  aCheckList = [];
  aMstChecklist = [];
  aLocalProducer = [];
  blockName = '';
  rId = '';
  $('#fldReqId').html('');
  $('#fldBorrowerId').val('');
  $('#fldBorrowerName').val('');
  $('#fldLenderId').val('');
  $('#fldLbranId').val('');
  $('#fldLoanLAmt').val('');
  $('#fldRDate').val('');
  $('#chickList-Itme').html('');
  openNewCheckList();
}

function openNewCheckList() {
  $('#fldId').val('');
  $('#fldExecOnName').val('');
  $('#fldExecOpen').val('');
  $('#fldExecDept').val('');
  $('#fldExecNum').val('');
  $('#fldAmt').val('');
  $('#fldRem').val('');
}

async function changeRequest() {
  await swal.fire({
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
      setRequestValue();
    } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      $('#fldReqId').val(nRequestId);
    }
  });
  nRequestId = $('#fldReqId').val();
}

function getBorrowRequests() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'borrowerId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldBorrowerId').val();
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequests = response.data.List;
        $.each(aRequests, function (i, aRequest) {
          $('#fldReqId').append($('<option>', {
            value: aRequest.id,
            text: aRequest.lnum
          }));
        });
        setRequestValue();
      } else {
        openNew();
      }
    }
  });
}

function setRequestValue() {
  let aRequest = aRequests.filter(function (el) {
    return el.id === $('#fldReqId').val();
  });
  $('#fldLenderId').val(aRequest[0].lenderName);
  $('#fldLbranId').val(aRequest[0].lbranName);
  $('#fldLoanLAmt').val(aRequest[0].lnum);
  $('#fldRDate').val(aRequest[0].rdate);
  getMstCheckList();
}

function getMstCheckList() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'id';
  aQData[0].dataType = '2';
  aQData[0].operation = 'IN';
  aQData[0].value1 = '';
  aQData[0].value2 = '';
  aQData[0].values = [];
  for (let i = 0; i < aCheckList.length; i++) {
    aQData[0].values[i] = aCheckList[i].checklistId;
  }
  $.ajax({
    type: 'GET',
    url: PhSettings.apiURL + '/CC/LRG/getMCheckList/' + PhSettings.MPrg.id,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        aMstChecklist = response.data.List;
        renderMstChecklist();
      }
    }
  });
}

function renderMstChecklist() {
  let vHtml = "";
  vHtml += '<div class="card card-body mt-2">';
  vHtml += '  <form id="chickList-Form">';
  for (let i = 0; i < aMstChecklist.length; i++) {
    vHtml += '  <input id="fld-LocalCheckList-Id-' + aMstChecklist[i].id + '" type="hidden" value="0"/>';
    vHtml += '  <div class="row">';
    vHtml += '    <label for="" class="col-sm-12 form-label ph-label text-start ps-4 fs-5 fw-bold data-group-Id" data-label="">' + aMstChecklist[i].name + '</label>';
    vHtml += '  </div>';
    vHtml += '  <div class="row pt-2">';
    vHtml += '    <label for="fld-LocalCheckList-Rem-' + aMstChecklist[i].id + '" class="col-sm-1 form-label ph-label text-sm-end" data-label="">' + getLabel("Rem") + '</label>';
    vHtml += '    <div class="col-sm-5">';
    vHtml += '      <input id="fld-LocalCheckList-Rem-' + aMstChecklist[i].id + '" class="form-control form-control-sm"/>';
    vHtml += '    </div>';
    vHtml += '    <label for="fld-LocalCheckList-VDesc-' + aMstChecklist[i].id + '" class="col-sm-1 form-label ph-label text-sm-end" data-label="">' + getLabel("Desc") + '</label>';
    vHtml += '    <div class="col-sm-5">';
    vHtml += '      <input id="fld-LocalCheckList-VDesc-' + aMstChecklist[i].id + '" class="form-control form-control-sm"/>';
    vHtml += '    </div>';
    vHtml += '  </div>';
    vHtml += '  <div class="row p-0">';
    vHtml += '    <div class="col-sm-12 p-1">';
    vHtml += '      <hr class="text-black mt-0" style="border-top: 1px solid;">';
    vHtml += '    </div>';
    vHtml += '  </div>';
    let lastGrpId = 0;
    for (let j = 0; j < aMstChecklist[i].aList.length; j++) {
      (j === 0 ? lastGrpId = 0 : lastGrpId = 1);
      if (aMstChecklist[i].aList[j].groupId !== aMstChecklist[i].aList[j - lastGrpId].groupId || j === 0) {
        vHtml += '<div class="row">';
        vHtml += '  <label class="col-sm-12 form-label ph-label text-start ps-4 offset-1 fw-bold data-item-Id" data-label="" >' + aMstChecklist[i].aList[j].groupName + ' : </label>';
        vHtml += '</div>';
      }
      vHtml += '  <div class="row pt-1 ps-4">';
      vHtml += '    <input id="fld-CheckListItem-Id-' + aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId + '" type="hidden" value="0"/>';
      vHtml += '    <input id="fld-CheckListItem-rid-' + aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId + '" type="hidden" value=""/>';
      vHtml += '    <input id="fld-CheckListItem-blockname-' + aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId + '" type="hidden" value=""/>';
      vHtml += '    <label for="" class="col-sm-6 offset-1 form-label ph-label text-start ps-4">' + aMstChecklist[i].aList[j].itemName + ' : </label>';
      vHtml += '    <div class="col-sm-4 text-start">';
      if (parseInt(aMstChecklist[i].aList[j].ischeckId) === 1) {
        vHtml += '    <input id="fld-CheckListItem-' + aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId + '" class="form-check-input border-secondary" style="width:25px; height:25px; " type="checkbox">';
      } else {
        vHtml += '    <input id="fld-CheckListItem-' + aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId + '" class="form-control form-control-sm" type="text" value="" autocomplete="off" required="true" ' + (aMstChecklist[i].aList[j].isRequiredId === 1 ? ' required' : '') + '/>';
      }
      vHtml += '    </div>';
      if (parseInt(aMstChecklist[i].aList[j].isattachId) === 1) {
        vHtml += '   <div class="col-sm-1"> ';
        vHtml += '     <button id="fld-CheckListItem-attach-' + aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId + '" class="btn btn-sm btn-success toolbar-btn mx-1 attache-btn d-none" type="button" data-bs-title="Attache" title="' + getLabel('Attache') + '" data-id="' + aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId + '">';
        vHtml += '       <i class="bi bi-folder2-open"></i>';
        vHtml += '     </button>';
        vHtml += '   </div>';
      }
      vHtml += '  </div>';
    }
  }
  vHtml += '  </form>';
  vHtml += '</div>';
  $('#chickList-Itme').html(vHtml);
  $('.attache-btn').off('click').on('click', function (e) {
    e.preventDefault();
    let id = $(this).data('id');
    blockName = $('#fld-CheckListItem-blockname-' + id).val();
    rId = $('#fld-CheckListItem-rid-' + id).val();
    $('#Attache-Modal').modal('show');
    attacheResetModal();
  });
  getLocalChecklist();
}

function getElementsValue() {
  let fldId = '';
  let oData = {};
  oData.id = $('#fldId').val();
  oData.reqId = $('#fldReqId').val();
  oData.execonname = $('#fldExecOnName').val();
  oData.execdept = $('#fldExecDept').val();
  oData.execopen = $('#fldExecOpen').val();
  oData.execnum = $('#fldExecNum').val();
  oData.amt = $('#fldAmt').val();
  oData.rem = $('#fldRem').val();
  oData.childs = {};
  oData.childs.child = {};
  oData.childs.child.aRows = [];
  for (let i = 0; i < aMstChecklist.length; i++) {
    oData.childs.child.aRows[i] = {};
    oData.childs.child.aRows[i].id = $('#fld-LocalCheckList-Id-' + aMstChecklist[i].id).val();
    oData.childs.child.aRows[i].procId = $('#fldId').val();
    oData.childs.child.aRows[i].checklistId = aMstChecklist[i].id;
    oData.childs.child.aRows[i].rem = $('#fld-LocalCheckList-Rem-' + aMstChecklist[i].id).val();
    oData.childs.child.aRows[i].vdesc = $('#fld-LocalCheckList-VDesc-' + aMstChecklist[i].id).val();
    oData.childs.child.aRows[i].childs = {};
    oData.childs.child.aRows[i].childs.child = {};
    oData.childs.child.aRows[i].childs.child.aRows = [];
    for (let j = 0; j < aMstChecklist[i].aList.length; j++) {
      fldId = aMstChecklist[i].aList[j].mstId + '-' + aMstChecklist[i].aList[j].groupId + '-' + aMstChecklist[i].aList[j].itemId;
      oData.childs.child.aRows[i].childs.child.aRows[j] = {};
      oData.childs.child.aRows[i].childs.child.aRows[j].id = $('#fld-CheckListItem-Id-' + fldId).val();
      oData.childs.child.aRows[i].childs.child.aRows[j].statusId = 2;
      oData.childs.child.aRows[i].childs.child.aRows[j].checkId = $('#fld-LocalCheckList-Id-' + aMstChecklist[i].id).val();
      oData.childs.child.aRows[i].childs.child.aRows[j].groupId = aMstChecklist[i].aList[j].groupId;
      oData.childs.child.aRows[i].childs.child.aRows[j].itemId = aMstChecklist[i].aList[j].itemId;
      oData.childs.child.aRows[i].childs.child.aRows[j].execdate = currentDate();
      oData.childs.child.aRows[i].childs.child.aRows[j].vvalue = $('#fld-CheckListItem-' + fldId).val();
      if ($('#fld-CheckListItem-' + fldId).attr('type') === 'checkbox') {
        oData.childs.child.aRows[i].childs.child.aRows[j].vvalue = 2;
        if ($('#fld-CheckListItem-' + fldId).prop('checked')) {
          oData.childs.child.aRows[i].childs.child.aRows[j].vvalue = 1;
        }
      }
      oData.childs.child.aRows[i].childs.child.aRows[j].rem = '';
    }

  }
  return oData;
}

function saveLocalChecklist() {
  let method = 'POST';
  let url = PhSettings.apiURL + '/UC/Lrg/ReqLocalProcedure/New';
  if ($('#fldId').val() > 0) {
    method = 'PUT';
    url = PhSettings.apiURL + '/UC/Lrg/ReqLocalProcedure/';
  }
  $.ajax({
    type: method,
    url: url,
    headers: PhSettings.Headers,
    data: JSON.stringify(getElementsValue()),
    success: function (response) {
      if (response.status) {
        if (parseInt($('#fldId').val()) === 0) {
          showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        }
        getLocalChecklist();
      } else {
        if (parseInt($('#fldId').val()) === 0) {
          showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Update'), 'DANGER', getLabel(response.message));
        }
      }
    },
    error: function (response) {
    }
  });
}

function getLocalChecklist() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'reqId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldReqId').val();
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/UC/Lrg/ReqLocalProcedure/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aLocalProducer = response.data.List[0];
        setLocalChecklistValue();
        showAttachBtn();
      } else {
        openNewCheckList();
      }
    },
    error: function (response) {
    }
  });
}

function setLocalChecklistValue() {
  let fldId = '';
  $('#fldId').val(aLocalProducer.id);
  $('#fldExecOnName').val(aLocalProducer.execonname);
  $('#fldExecOpen').val(aLocalProducer.execopen);
  $('#fldExecDept').val(aLocalProducer.execdept);
  $('#fldExecNum').val(aLocalProducer.execnum);
  $('#fldAmt').val(aLocalProducer.amt);
  $('#fldRem').val(aLocalProducer.rem);
  for (let i = 0; i < aLocalProducer.aList.length; i++) {
    $('#fld-LocalCheckList-Id-' + aLocalProducer.aList[i].checklistId).val(aLocalProducer.aList[i].id);
    $('#fld-LocalCheckList-Rem-' + aLocalProducer.aList[i].checklistId).val(aLocalProducer.aList[i].rem);
    $('#fld-LocalCheckList-VDesc-' + aLocalProducer.aList[i].checklistId).val(aLocalProducer.aList[i].vdesc);
    for (let j = 0; j < aLocalProducer.aList[i].aList.length; j++) {
      fldId = aLocalProducer.aList[i].checklistId + '-' + aLocalProducer.aList[i].aList[j].groupId + '-' + aLocalProducer.aList[i].aList[j].itemId;
      $('#fld-ChistItem-attacheckListItem-Id-' + fldId).val(aLocalProducer.aList[i].aList[j].id);
      $('#fld-CheckListItem-rid-' + fldId).val(aLocalProducer.aList[i].aList[j].id);
      $('#fld-CheckListItem-blockname-' + fldId).val(aLocalProducer.aList[i].id + '/' + aLocalProducer.aList[i].aList[j].id);
      $('#fld-CheckListItem-' + fldId).val(aLocalProducer.aList[i].aList[j].vvalue);
      if ($('#fld-CheckListItem-' + fldId).attr('type') === 'checkbox') {
        if (parseInt(aLocalProducer.aList[i].aList[j].vvalue) === 1) {
          $('#fld-CheckListItem-' + fldId).attr('checked', true);
        }
      }
    }
  }
}

function showAttachBtn() {
  if (!jQuery.isEmptyObject(aLocalProducer)) {
    $('.attache-btn').removeClass('d-none');
  } else {
    $('.attache-btn').addClass('d-none');
  }
}
/******************/
function attacheResetModal() {
  $('#Attache-Form')[0].reset();
  $('#fld-Attache-File').val('');
  $('#fld-ONameFile').val('');
  $('#fld-File').removeClass('invalid');
  $('#fld-NNameFile').removeClass('invalid');
  attacheSearch();
}

function attacheSearch() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'rid';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = rId;
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
  $('#Attache-Table').html(vHtml);
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
  $('#fld-ONameFile').val(e.target.files[0].name);
};

base64Encoder = function (blob) {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    $('#fld-Attache-File').val(reader.result);
  };
};

function attacheSave() {
  if ($('#fld-NNameFile').val().trim() !== ''
          && $('#fld-Attache-File').val() !== '') {
    $('#fld-File').removeClass('invalid');
    $('#fld-NNameFile').removeClass('invalid');
    showHeaderSpinner(true);
    $.ajax({
      type: 'POST',
      async: false,
      url: PhSettings.apiURL + '/CC/attached/new',
      headers: PhSettings.Headers,
      data: JSON.stringify({
        rid: rId,
        file: $('#fld-Attache-File').val(),
        oldName: $('#fld-ONameFile').val(),
        newName: $('#fld-NNameFile').val(),
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
    $('#fld-File').addClass('invalid');
    $('#fld-NNameFile').addClass('invalid');
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
