let phForm;
let nEditIndex = -1;
let nEditId = 0;
let aType = PhSettings.UsrCodes.LrgConcentrationType,
        aYesNo = PhSettings.PhsCodes.PhsYesno,
        aProjectType = PhSettings.UsrCodes.LrgProjectType,
        aCity = PhSettings.UsrCodes.LrgCity,
        aSector = PhSettings.UsrCodes.LrgSector,
        aReq = PhSettings.UsrCodes.LrgConcentrationReq,
        aConBorwer = PhSettings.UsrCodes.LrgConcentrationBorwer,
        aArea = PhSettings.UsrCodes.LrgAreatype,
        aGrnte = PhSettings.UsrCodes.LrgConcentrationGrnte,
        aRelgrp = PhSettings.UsrCodes.LrgConcentrationRelgrp,
        aConMst = [], aConcentration = [], aProduct = [], aLender = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  getList();
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/ConcentrationsMst';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: afterNew, afterGet: afterGet, afterPagerClick: afterGet};
  phForm = new PhForm('Concentrations', metta, options);
  $('#ph-Add-Trn').click(function () {
    saveTrnData();
  });
  $('#ph-New-Trn').click(function () {
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
        openTrnNew();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
  $('#ph-isdefault').click(function (e) {
    e.preventDefault();
    if ($('#fldId').val() > 0 && parseInt(aConMst.commitId) === 1) {
      swal.fire({
        title: getLabel('Set.As.Default.Concentrations') + ' !!',
        text: getLabel('Are.You.Sure.?'),
        icon: "warning",
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
          setAsDefault();
        } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
        }
      });
    }
  });
  $('#ph-iscommit').click(function (e) {
    if ($('#fldId').val() > 0) {
      e.preventDefault();
      swal.fire({
        title: getLabel('Commit this Concentrations') + ' !!',
        text: getLabel('Are.You.Sure.?'),
        icon: "warning",
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
          commitConcentration();
        } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
        }
      });
    }
  });
  $('#fldConPerc').change(function () {
    $('#fldConAmt').val(0);
  });
  $('#fldConAmt').change(function () {
    $('#fldConPerc').val(0);
    $('#fldConNMax').val(0);
  });
  renderSelect();
});

function getList() {
  getLender();
  getProduct();
}

function afterNew() {
  $('#concentrationsDiv').addClass('d-none');
  $('#ph-isdefault').addClass('d-none');
  $('#ph-iscommit').addClass('d-none');
}

function getLender() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Lenders/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        $.each(response.data.List, function (i, item) {
          $('#fldConLender').append($('<option>', {
            value: item.id,
            text: item.name
          }));
        });
      }
      showHeaderSpinner(false);
    }
  });
}

function getProduct() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Products/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        $.each(response.data.List, function (i, item) {
          $('#fldConProduct').append($('<option>', {
            value: item.id,
            text: item.name
          }));
        });
      }
      showHeaderSpinner(false);
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Number',
    field: 'num',
    component: PhFC_Text,
    defValue: '',
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
    label: getLabel('Ddate'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Commited'),
    element: 'CommitId',
    field: 'commitId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aYesNo,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Default'),
    element: 'IsdefaultId',
    field: 'isdefaultId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aYesNo,
    aOpers: aSAOpers
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
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '90px'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '200px'
  };
  aFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '90px'
  };
  aFields[idx++] = {
    label: getLabel('Commited'),
    element: 'fldCommitId',
    field: 'commitId',
    rField: 'commitName',
    getLabel: true,
    isRequired: true,
    defValue: '0',
    alert: {
      isOk: alertCommitCheck,
      message: getLabel('Commited Concentrations')
    },
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Default'),
    element: 'fldIsDefaultId',
    field: 'isdefaultId',
    rField: 'isdefaultName',
    getLabel: true,
    isRequired: true,
    defValue: '0',
    alert: {
      isOk: alertIsDefaultCheck,
      message: getLabel('This is the default Concentration')
    },
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '400px'
  };
  return aFields;
}

function afterGet() {
  openTrnNew();
  aConMst = phForm.aResultData;
  aConcentration = phForm.aResultData.aList;
  renderTrnTable();
  $('#concentrationsDiv').removeClass('d-none');
  if (parseInt(aConMst.commitId) === 1) {
    $('#ph-isdefault').removeClass('d-none');
    $('#ph-iscommit').addClass('d-none');
    $('#ph-Add-Trn').addClass('d-none');
    $('#ph-New-Trn').addClass('d-none');
  } else {
    $('#ph-isdefault').addClass('d-none');
    $('#ph-iscommit').removeClass('d-none');
    $('#ph-Add-Trn').removeClass('d-none');
    $('#ph-New-Trn').removeClass('d-none');
  }
}

function alertIsDefaultCheck() {
  let isOk = false;
  if (parseInt($('#fldIsDefaultId').val()) === 1) {
    isOk = true;
  }
  return isOk;
}

function alertCommitCheck() {
  let isOk = false;
  if (parseInt($('#fldCommitId').val()) === 1) {
    isOk = true;
  }
  return isOk;
}

function setAsDefault() {
  $.ajax({
    type: 'PUT',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/SetDefaultConcent/' + parseInt($('#fldId').val()),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        phForm.doGetData($('#fldId').val(), '');
      }
    }
  });
}

function commitConcentration() {
  $.ajax({
    type: 'PUT',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/commitConcent/' + parseInt($('#fldId').val()),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        phForm.doGetData($('#fldId').val(), '');
      }
    }
  });
}

function openTrnNew() {
  nEditIndex = -1;
  nEditId = 0;
  $("#concentrationsForm")[0].reset();
}

function renderSelect() {
  $.each(aType, function (i, item) {
    $('#fldConType').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aProjectType, function (i, item) {
    $('#fldConActv').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aCity, function (i, item) {
    $('#fldConCity').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aSector, function (i, item) {
    $('#fldConSector').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aArea, function (i, item) {
    $('#fldConArea').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aConBorwer, function (i, item) {
    $('#fldConBorrower').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aReq, function (i, item) {
    $('#fldConReq').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aYesNo, function (i, item) {
    $('#fldReqamtId').append($('<option>', {
      value: item.id,
      text: getLabel(item.name)
    }));
  });
  $.each(aGrnte, function (i, item) {
    $('#fldGrnteId').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
  $.each(aRelgrp, function (i, item) {
    $('#fldRelgrpId').append($('<option>', {
      value: item.id,
      text: item.name
    }));
  });
}

function getConcentration() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'mstId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = phForm.aResultData.id;
  aQData[nIdx].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ConcentrationsTrn/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aConMst = phForm.aResultData;
        aConcentration = response.data.List;
        renderTrnTable();
      } else {
        $('#fldConConcent').html('');
        $('#concentrationsTable tbody').html('');
      }
      showHeaderSpinner(false);
    }
  });
}

function openTrnNew() {
  nEditId = 0;
  aConMst = [];
  aConcentration = [];
  $("#fldConId").val('');
  $('.trow').removeClass('table-active');
  $('.was-validated').removeClass('was-validated');
  $('.invalid').removeClass('invalid');
  $("#concentrationsForm")[0].reset();
}

function saveTrnData() {
  let method = 'POST';
  let url = 'New';
  let oData = {};
  if (nEditId > 0) {
    method = 'PUT';
    url = '';
  }
  oData.id = nEditId;
  oData.mstId = $('#fldId').val();
  oData.name = $('#fldConConcent').find(':selected').data('index');
  oData.typeId = $('#fldConType').val();
  oData.actvId = $('#fldConActv').val();
  oData.cityId = $('#fldConCity').val();
  oData.sectorId = $('#fldConSector').val();
  oData.prodId = $('#fldConProduct').val();
  oData.lenderId = $('#fldConLender').val();
  oData.areaId = $('#fldConArea').val();
  oData.borrowerId = $('#fldConBorrower').val();
  oData.reqId = $('#fldConReq').val();
  oData.relgrpId = $('#fldRelgrpId').val();
//  oData.grnteId = $('#fldGrnteId').val();
  oData.grnteId = 0;
  oData.reqamtId = $('#fldReqamtId').val();
  oData.perc = $('#fldConPerc').val();
  oData.amt = $('#fldConAmt').val();
  oData.notifperc = $('#fldNotifperc').val();
  oData.nmax = $('#fldConNMax').val();
  oData.concentId = $('#fldConConcent').val();
  oData.rem = $('#fldConRem').val();
  if (isValidForm('concentrationsForm') && parseInt($('#fldCommitId').val()) === 2) {
    $.ajax({
      type: method,
      async: false,
      url: PhSettings.apiURL + '/UC/Lrg/ConcentrationsTrn/' + url,
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status) {
          if (nEditId == 0) {
            showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel(response.message));
          } else {
            showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
          }
          openTrnNew();
          getConcentration();
        } else {
          if (nEditId == 0) {
            showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
          } else {
            showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
          }
        }
      },
      error: function (response) {
        if (nEditId == 0) {
          showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
        } else {
          showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    });
  }
}

function renderTrnTable() {
  let vHtml = '';
  let vSelectHtml = '';
  if (aConcentration.length === 0) {
    vSelectHtml = '<option value="0" data-index="-">-</option>';
  }
  for (let i = 0; i < aConcentration.length; i++) {
    let concentrationName = aConcentration[i].typeName + ' / ' + aConcentration[i].actvName + ' / '
            + aConcentration[i].cityName + ' / ' + aConcentration[i].sectorName + ' / '
            + aConcentration[i].prodName + ' / ' + aConcentration[i].lenderName;
    vSelectHtml += '<option value="' + aConcentration[i].id + '" data-index="' + (i + 1) + '">' + concentrationName + '</option>';
    vHtml += '<tr id="table-row-' + i + '" class="trow">';
    vHtml += '  <td>' + (parseInt(i) + 1) + '</td>';
    vHtml += '  <td style="width: 35px;">';
    if (parseInt(aConMst.commitId) === 2) {
      vHtml += '    <a href="javascript:;" class="btn btn-sm btn-primary edit-item" data-id="' + aConcentration[i].id + '" data-index="' + i + '" title="' + getLabel("Edit") + '" data-bs-title="' + getLabel("Edit") + '" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus">';
      vHtml += '      <i class="bi bi-pencil"></i>';
      vHtml += '    </a>';
    }
    vHtml += '  </td>';
    vHtml += '  <td>' + aConcentration[i].typeName + '</td>';
    vHtml += '  <td>' + aConcentration[i].actvName + '</td>';
    vHtml += '  <td>' + aConcentration[i].cityName + ' </td>';
    vHtml += '  <td>' + aConcentration[i].sectorName + '</td>';
    vHtml += '  <td>' + aConcentration[i].prodName + ' </td>';
    vHtml += '  <td>' + aConcentration[i].lenderName + '</td>';
    vHtml += '  <td>' + aConcentration[i].areaName + '</td>';
    vHtml += '  <td>' + aConcentration[i].borrowerName + '</td>';
    vHtml += '  <td>' + aConcentration[i].reqName + '</td>';
    vHtml += '  <td>' + aConcentration[i].relgrpName + '</td>';
    vHtml += '  <td>' + aConcentration[i].grnteName + '</td>';
    vHtml += '  <td>' + aConcentration[i].reqamtName + '</td>';
    vHtml += '  <td>' + aConcentration[i].perc + '</td>';
    vHtml += '  <td>' + aConcentration[i].amt + '</td>';
    vHtml += '  <td>' + aConcentration[i].notifperc + '</td>';
    vHtml += '  <td>' + aConcentration[i].nmax + '</td>';
    vHtml += '  <td>' + aConcentration[i].name + '</td>';
    vHtml += '  <td>' + (aConcentration[i].rem != null ? aConcentration[i].rem : '') + '</td>';
    vHtml += '  <td style="width: 35px;">';
    if (parseInt(aConMst.commitId) === 2) {
      vHtml += '    <a href="javascript:;" class="btn btn-sm btn-danger delete-item" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + i + '" data-id="' + aConcentration[i].id + '"  title="' + getLabel("Delete") + '" data-bs-title="' + getLabel("Delete") + '" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus">';
      vHtml += '      <i class="bi bi-trash"></i>';
      vHtml += '    </a>';
    }
    vHtml += '  </td>';
    vHtml += '</tr>';
  }
  $('#fldConConcent').html(vSelectHtml);
  $('#concentrationsTable tbody').html(vHtml);
  $('.edit-item').click(function () {
    let nIdx = $(this).data('index');
    $('.trow').removeClass('table-active');
    $('#table-row-' + nIdx).addClass('table-active');
    nEditIndex = nIdx;
    editTrnRow(nIdx);
  });
  $('.delete-item').click(function () {
    let nIdx = $(this).data('index');
    swal.fire({
      title: getLabel('Delete.!!'),
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
        deleteTrnRow(nIdx);
      } else if (result.dismiss === "cancel") {
      }
    });
  });
}

function editTrnRow(nIdx) {
  nEditId = aConcentration[nIdx].id;
  $('#fldConName').val(aConcentration[nIdx].name);
  $('#fldConType').val(aConcentration[nIdx].typeId);
  $('#fldConActv').val(aConcentration[nIdx].actvId);
  $('#fldConCity').val(aConcentration[nIdx].cityId);
  $('#fldConSector').val(aConcentration[nIdx].sectorId);
  $('#fldConProduct').val(aConcentration[nIdx].prodId);
  $('#fldConLender').val(aConcentration[nIdx].lenderId);
  $('#fldConArea').val(aConcentration[nIdx].areaId);
  $('#fldConBorrower').val(aConcentration[nIdx].borrowerId);
  $('#fldConReq').val(aConcentration[nIdx].reqId);
  $('#fldRelgrpId').val(aConcentration[nIdx].relgrpId);
  $('#fldGrnteId').val(aConcentration[nIdx].grnteId);
  $('#fldReqamtId').val(aConcentration[nIdx].reqamtId);
  $('#fldConPerc').val(aConcentration[nIdx].perc);
  $('#fldConAmt').val(aConcentration[nIdx].amt);
  $('#fldNotifperc').val(aConcentration[nIdx].notifperc);
  $('#fldConNMax').val(aConcentration[nIdx].nmax);
  $('#fldConRem').val(aConcentration[nIdx].rem);
  $('#fldConConcent').val(aConcentration[nIdx].concentId);
}

function deleteTrnRow(nIdx) {
  $.ajax({
    type: "DELETE",
    url: PhSettings.apiURL + '/UC/Lrg/ConcentrationsTrn/' + aConcentration[nIdx].id,
    headers: PhSettings.Headers,
    success: function (response) {
      showHeaderSpinner(false);
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        openTrnNew();
        getConcentration();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
    }
  }
  );
}
