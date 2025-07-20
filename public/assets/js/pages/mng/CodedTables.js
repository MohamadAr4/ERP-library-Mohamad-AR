/* global swal */
let aSide = {};
let i = 0, j = 0;
let item = 0, item2 = 0;
let aData = [], oEData = [];
let aStatus = PhSettings.PhsCodes.PhsStatus;
jQuery(document).ready(function () {
  $("#ph-new").click(function (e) {
    e.preventDefault();
    swal.fire({
      title: getLabel('The.Form.Will.be.Clear') + ' !!',
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
        openNew();
      } else if (result.dismiss === "cancel") {
      }
    });
  });
  $("#ph-submit").click(function (e) {
    e.preventDefault();
    save();
  });
  openNew();
  getSelect();
  getSidebar();
  renderSide();
  showHeaderSpinner(false);
});

function getSelect() {
  let vHtml = '';
  for (var i = 0; i < aStatus.length; i++) {
    vHtml += '<option value="' + aStatus[i].id + '">' + getLabel(aStatus[i].name) + '</option>';
  }
  $('#fldStatusId').html(vHtml);
}

function active(element, vItem, vItem2) {
  $('.sid-Item').each(function () {
    $(this).removeClass('active');
    $('#' + $(this).data('perant')).removeClass('active');
  });

  $(element).addClass('active');
  $('#' + $(element).data('perant')).addClass('active');
  $('.side-icon').removeClass('bi-record-fill');
  $('.side-icon').addClass('bi-record');
  $('#side-icon-' + vItem + '-' + vItem2).removeClass('bi-record');
  $('#side-icon-' + vItem + '-' + vItem2).addClass('bi-record-fill');
  item = $(element).data('i');
  item2 = $(element).data('j');
}

function openNew() {
  $('#fldId').val(-1);
  $('#EntryForm')[0].reset();
}

function getSidebar() {
  let method = 'Get';
  let url = PhSettings.apiURL + '/UC/CodeGroups/public';
  $.ajax({
    type: method,
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    success: function (response) {
      aSide = response.data;
      renderSide();
    }
  });
}

function renderSide() {
  let vHtml = '';
  vHtml += '<ul class="sidebar-nav">';
  for (var item in aSide) {
    if (Object.keys(aSide[item]).length !== 0) {
      vHtml += '  <li class="nav-item">';
      vHtml += '    <a id="model' + item + '" href="javascript:;" class="nav-link d-flex align-items-center justify-content-between collapsed " data-bs-target="#codeTable' + item + '" data-bs-toggle="collapse"> ';
      vHtml += '      <span class="PhLabel">' + getLabel(item) + '</span>';
      vHtml += '      <i class="bi bi-chevron-down"></i>';
      vHtml += '    </a>';
      vHtml += '    <ul id="codeTable' + item + '"  class="nav-content collapse">';
      for (var item2 in aSide[item]) {
        vHtml += '    <li class="nav-item">';
        vHtml += '      <a class="nav-link sid-Item py-1" data-perant="model' + item + '" data-i="' + item + '" data-j="' + item2 + '">';
        vHtml += '        <i id="side-icon-' + item + '-' + item2 + '" class="bi bi-record side-icon"></i>';
        vHtml += '        <span>' + getLabel(aSide[item][item2].name) + '</span>';
        vHtml += '      </a>';
        vHtml += '    </li>';
      }
      vHtml += '    </ul>';
      vHtml += '  </li>';
    }
  }
  vHtml += '</ul>';
  $("#Details").html(vHtml);
  $('.sid-Item').click(function (e) {
    let vItem = $(this).data("i");
    let vItem2 = $(this).data("j");
    e.preventDefault();
    active(this, vItem, vItem2);
    getTableDate();
  });
}

function getTableDate() {
  let method = 'POST';
  let url = PhSettings.apiURL + '/UC/' + aSide[item][item2].pkg + '/' + aSide[item][item2].key + '/List';
  $.ajax({
    type: method,
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    success: function (response) {
      aData = response.data.List;
      openNew();
      renderBody();
    }
  });
}

function renderBody() {
  let vHtml = '';
  for (let index = 0; index < aData.length; index++) {
    vHtml += '<tr>';
    vHtml += '  <td style="width: 4%;">' + parseInt(index + 1) + '</td>';
    vHtml += '  <td style="width: 4%;">';
    vHtml += '    <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm edit-item" data-id="' + aData[index].id + '" data-index="' + index + '">';
    vHtml += '      <i class="bi bi-pencil"></i>';
    vHtml += '     </a>';
    vHtml += '   </td>';
    vHtml += '  <td>' + aData[index].name + '</td>';
    vHtml += '  <td>' + getLabel(aData[index].statusName) + '</td>';
    if (aData[index].rem === null) {
      vHtml += '<td></td>';
    } else {
      vHtml += '<td>' + aData[index].rem + '</td>';
    }
    vHtml += '  <td style="width: 4%;">';
    vHtml += '    <a href="javascript:;" class="btn btn-danger toolbar-btn btn-sm delete-item" data-id="' + aData[index].id + '">';
    vHtml += '      <i class="bi bi-trash"></i>';
    vHtml += '    </a>';
    vHtml += '  </td>';
    vHtml += '</tr>';
  }
  $("#tableData tbody").html(vHtml);
  $('.edit-item').click(function () {
    editData($(this).data('index'));
  });
  $('.delete-item').click(function () {
    deleteItem($(this).data('id'));
  });
}

function deleteItem(id) {
  let method = 'DELETE';
  let url = PhSettings.apiURL + '/UC/' + aSide[item][item2].pkg + '/' + aSide[item][item2].key + '/' + id;
  $.ajax({
    type: method,
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        openNew();
        getTableDate();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', getLabel(response.message));
      }
    },
    error: function (response) {
    }
  });
}

function editData(index) {
  $('#fldId').val(aData[index].id);
  $('#fldName').val(aData[index].name);
  $('#fldStatusId').val(aData[index].statusId);
  $('#fldRem').val(aData[index].rem);
}

function getDataForm() {
  oEData = {};
  oEData.id = $('#fldId').val();
  oEData.name = $('#fldName').val();
  oEData.statusId = $('#fldStatusId').val();
  oEData.rem = $('#fldRem').val();
  return oEData;
}

function save() {
  let method = 'POST';
  let url = PhSettings.apiURL + '/UC/' + aSide[item][item2].pkg + '/' + aSide[item][item2].key + '/New';
  if (parseInt($('#fldId').val()) > -1) {
    method = 'PUT';
    url = PhSettings.apiURL + '/UC/' + aSide[item][item2].pkg + '/' + aSide[item][item2].key + '/';
  }
  $.ajax({
    type: method,
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(getDataForm()),
    success: function (response) {
      if (response.status) {
        if (parseInt($('#fldId').val()) === 0) {
          showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel(response.message));
          openNew();
        } else if (parseInt($('#fldId').val()) > 0) {
          showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        }
        getTableDate();
      } else {
        if (parseInt($('#fldId').val()) === 0) {
          showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel(response.message));
        } else if (parseInt($('#fldId').val()) > 0) {
          showToast(getLabel('Failed.To.Update'), 'DANGER', getLabel(response.message));
        }
      }
    },
    error: function (response) {
    }
  });
}
