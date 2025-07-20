let approveRequest = 1;
let rejectRequest = 2;
let aMFields = [];
let aRequestType = [
  {id: 0, name: getLabel('Leaves'), aCode: PhSettings.UsrCodes.EmpLeave, urlSearch: '/UC/Emp/LeaveRequest/Search/0/0', urlApprove: '/CC/HR/ApproveLeaveRequest', urlReject: '/CC/HR/RejectLeaveRequest'},
  {id: 1, name: getLabel('Missions'), aCode: PhSettings.UsrCodes.EmpMission, urlSearch: '/UC/Emp/MissionsRequest/Search/0/0', urlApprove: '/CC/HR/ApproveMissionRequest', urlReject: '/CC/HR/RejectMissionRequest'},
  {id: 2, name: getLabel('Overtimes'), aCode: PhSettings.UsrCodes.EmpOvertime, urlSearch: '/UC/Emp/OvertimeRequest/Search/0/0', urlApprove: '/CC/HR/ApproveOvertimeRequest', urlReject: '/CC/HR/RejectOvertimeRequest'}],
        aType = [];
jQuery(document).ready(function () {
  $('#ph-reset').click(function (e) {
    e.preventDefault();
    openNew();
  });
  $('#fldRTypeId').change(function (e) {
    e.preventDefault();
    openNew();
    getType();
  });
  $('#ph-execute').click(function (e) {
    e.preventDefault();
    doSearch();
  });
  $('.FFld').change(function (e) {
    e.preventDefault();
    showSecondField($(this).attr('id'));
  });
  jqReady();
});

function jqReady() {
  $('#ph-reset').removeClass('d-none');
  getRequestType();
  getType();
  getaMFields();
  getOperations();
  showHeaderSpinner(false);
}

function getRequestType() {
  let vHtml = '';
  for (let i = 0; i < aRequestType.length; i++) {
    vHtml += '<option value="' + aRequestType[i].id + '">' + aRequestType[i].name + '</option>';
  }
  $('#fldRTypeId').html(vHtml);
}

function getType() {
  let vHtml = "";
  let nTypeId = $('#fldRTypeId').val();
  vHtml += '<option value=""></option>';
  for (let i = 0; i < aRequestType[nTypeId].aCode.length; i++) {
    aType[i] = {};
    aType[i].id = aRequestType[nTypeId].aCode[i].id;
    aType[i].name = aRequestType[nTypeId].aCode[i].name;
    vHtml += '<option value="' + aType[i].id + '">' + aType[i].name + '</option>';
  }
  $('#fldTypeId1').html(vHtml);
}

function getaMFields() {
  let idx = 0;
  aMFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNumber',
    field: 'num',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aMFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    aOpers: aDOpers
  };
  aMFields[idx++] = {
    label: getLabel('Employee'),
    element: 'fldEmpId',
    rElement: 'fldEmpName',
    field: 'empId',
    rField: 'empName',
    component: PhFC_Autocomplete,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    component: PhFC_Select,
    aOpers: aSAOpers
  };
}

function getOperations() {
  let vHtml = '';
  for (let i = 0; i < aMFields.length; i++) {
    vHtml = '';
    for (let j = 0; j < aMFields[i].aOpers.length; j++) {
      vHtml += '<option value="' + PhFOperations[aMFields[i].aOpers[j]].sign + '">' + PhFOperations[aMFields[i].aOpers[j]].sign + '</option>';
    }
    $('#' + aMFields[i].element).html(vHtml);
    $('#' + aMFields[i].element).val($('#' + aMFields[i].element + ':first').val());
  }
}

function showSecondField(fldId) {
  if ($('#' + fldId).val() === '<>' || $('#' + fldId).val() === '><') {
    $('#' + fldId + '2').removeClass('d-none');
    $('#' + fldId + '3').removeClass('d-none');
    $('#' + fldId + '2').val('');
  } else {
    $('#' + fldId + '2').addClass('d-none');
    $('#' + fldId + '3').addClass('d-none');
    $('#' + fldId + '2').val('');
  }
}

function openNew() {
  for (let i = 0; i < aMFields.length; i++) {
    $('#' + aMFields[i].element).val($('#' + aMFields[i].element + ' :first').val());
    $('#' + aMFields[i].element + '1').val('');
    $('#' + aMFields[i].element + '2').val('');
    $('#' + aMFields[i].element + '2').addClass('d-none');
    $('#' + aMFields[i].element + '3').addClass('d-none');
    if (aMFields[i].hasOwnProperty('rElement')) {
      $('#' + aMFields[i].rElement + '1').val('');
    }
  }
  $('#ApproveRequestsTable').addClass('d-none');
}

function doSearch() {
  let nTypeId = $('#fldRTypeId').val();
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + aRequestType[nTypeId].urlSearch,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(getQueryData()),
    success: function (response) {
      showHeaderSpinner(false);
      if (response.status && parseInt(response.code) === 200 && response.data.List !== []) {
        aData = response.data.List;
        $('#ApproveRequestsTable').removeClass('d-none');
        drawTable();
      } else {
        let vHtml = '<h4 class="text-center text-danger">' + getLabel('There.are.no.results.matching.search.options') + '</h4>';
        $('#ApproveRequestsTable').removeClass('d-none');
        $('#ApproveRequestsFilterTable').html(vHtml);
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
}

function getQueryData() {
  let aQData = [];
  let idx = 0;
  for (let i = 0; i < aMFields.length; i++) {
    let field = aMFields[i];
    if ($("#" + field.element + '1').val() !== '' && $("#" + field.element + '1').val() !== null) {
      aQData[idx] = {};
      aQData[idx].fieldName = field.field;
      aQData[idx].operation = $("#" + field.element).val();
      aQData[idx].dataType = field.component;
      aQData[idx].value1 = $("#" + field.element + '1').val();
      aQData[idx].value2 = '';
      if (($("#" + field.element).val() === '<>' || $("#" + field.element).val() === '><') &&
              ($("#" + field.element + '2').val() !== '' && $("#" + field.element + '2').val() !== null)) {
        aQData[idx].value2 = $("#" + field.element + '2').val();
      }
      idx++;
    }
  }
  aQData[idx] = {};
  aQData[idx].fieldName = 'approveId';
  aQData[idx].operation = '=';
  aQData[idx].dataType = PhFC_Select;
  aQData[idx].value1 = 0;
  aQData[idx].value2 = '';
  return aQData;
}

function drawTable() {
  let vHtml = '';
  vHtml += '<table id="dataTable" class="table table-bordered table-striped text-center">';
  vHtml += '  <thead class="bg-secondary text-light">';
  vHtml += '    <tr>';
  vHtml += '      <td style="width: 2%;">' + getLabel('#') + '</td>';
  vHtml += '      <td style="width: 2%;"></td>';
  for (let i = 0; i < aMFields.length; i++) {
    vHtml += '      <td>' + aMFields[i].label + '</td>';
  }
  vHtml += '      <td style="width: 2%;"></td>';
  vHtml += '    </tr>';
  vHtml += '  </thead>';
  vHtml += '  <tbody>';
  vHtml += renderTableBody();
  vHtml += '  </tbody>';
  vHtml += '</table> ';
  $('#ApproveRequestsFilterTable').html(vHtml);
  $('.app-request').click(function () {
    let nIndex = parseInt($(this).data('index'));
    showSwal('Request.will.be.approved', 'Are.You.Sure.?', approveRequest, nIndex);
  });
  $('.rej-request').click(function () {
    let nIndex = parseInt($(this).data('index'));
    showSwal('Request.will.be.rejected', 'Are.You.Sure.?', rejectRequest, nIndex);
  });
}

function renderTableBody() {
  let vHtml = '';
  for (let index = 0; index < aData.length; index++) {
    vHtml += '<tr>';
    vHtml += ' <td>' + parseInt(index + 1) + '</td>';
    vHtml += ' <td style="width: 2%;">';
    vHtml += '   <a href="javascript:;" class="btn btn-info btn-sm app-request" data-bs-toggle = "tooltip" title="' + getLabel('Approve') + '" data-id="' + aData[index].id + '" data-index="' + index + '">';
    vHtml += '    <i class="bi bi-check2-square"></i>';
    vHtml += '   </a>';
    vHtml += ' </td>';
    for (let i = 0; i < aMFields.length; i++) {
      if (aData[index].hasOwnProperty(aMFields[i].field) && aMFields[i].hasOwnProperty('label')) {
        if (aMFields[i].hasOwnProperty('rField')) {
          vHtml += ' <td>' + aData[index][aMFields[i].rField] + '</td>';
        } else {
          vHtml += ' <td>' + aData[index][aMFields[i].field] + '</td>';
        }
      }
    }
    vHtml += ' <td style="width: 2%;">';
    vHtml += '   <a href="javascript:;" class="btn btn-danger btn-sm rej-request" data-bs-toggle = "tooltip" title="' + getLabel('Reject') + '" data-id="" data-index="' + index + '">';
    vHtml += '    <i class="bi bi-x-square"></i>';
    vHtml += '   </a>';
    vHtml += ' </td>';
    vHtml += '</tr>';
  }
  return vHtml;
}

function saveApprove(index) {
  let nTypeId = $('#fldRTypeId').val();
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + aRequestType[nTypeId].urlApprove + '/' + aData[index].id,
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
        showToast(getLabel('Approved.Successfully'), 'SUCCESS', getLabel(response.message));
        doSearch();
      } else {
        showToast(getLabel('Failed.To.Approv'), 'DANGER', getLabel(response.message));
      }
    }
  });
  showHeaderSpinner(false);
}

function saveReject(index) {
  let nTypeId = $('#fldRTypeId').val();
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + aRequestType[nTypeId].urlReject + '/' + aData[index].id,
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
        showToast(getLabel('Rejected.Successfully'), 'SUCCESS', getLabel(response.message));
        doSearch();
      } else {
        showToast(getLabel('Failed.To.Reject'), 'DANGER', getLabel(response.message));
      }
    }
  });
  showHeaderSpinner(false);
}

function showSwal(vTitle, vText, nType, nIndex) {
  swal.fire({
    title: getLabel(vTitle) + ' !!',
    text: getLabel(vText),
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
      if (nType === approveRequest) {
        saveApprove(nIndex);
      } else if (nType === rejectRequest) {
        saveReject(nIndex);
      }
    } else if (result.dismiss === "cancel") {
    }
  });
}
