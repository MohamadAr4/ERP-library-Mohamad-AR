let aStatus = PhSettings.PhsCodes.PhsStatus,
  aPStatus = PhSettings.CpyCodes.CpyCodePeriodstatus,
  aSpecialStatus = PhSettings.PhsCodes.PhsSpecialStatus;
let aGroup = [];
let aSList = [];
let aPermGroup = [];
let aPermision = [];
let aTepmPermision = [];
let aSpecialList = [];
let aActions = [];
let oNewPermision = {};
oNewPermision.perm = [];
oNewPermision.child = [];
oNewPermision.child1 = [];
let oNewPermDash = {};
jQuery(document).ready(function () {
  $("#ph-new").click(function (e) {
    e.preventDefault();
    openNewGroup();
  });
  $('#ph-edit').click(function () {
    editGroup();
  });
  $('#ph-editAction').click(function () {
    editAction();
  });
  $('#ph-editDashboard').click(function () {
    editDashboard();
  });
  $('#ph-delete').click(function () {
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
        deleteGroup();
      } else if (result.dismiss === "cancel") {
      }
    });
  });
  $('#ph-modal-submit').click(function () {
    saveGroup();
  });
  $('#fldGroups').on('change', function () {
    addTrnData($('#fldGroups').val());
    getPermission();
  });
  $('#ph-submit').click(function () {
    savePermision();
  });
  $('#fldFilter').keyup(function () {
    filterPermission();
  });
  $('#ph-saveActions').click(function () {
    saveActions();
  });
  $('#ph-saveDashbord').click(function () {
    savePermDash();
  });
  getActions();
  getSpecialization();
  getPermissionGroups();
  getDashbord();
  showHeaderSpinner(false);
});
function getActions() {
  aActions = [];
  $.ajax({
    type: 'POST',
    async: true,
    url: PhSettings.apiURL + '/UC/Phs/Privileges/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        aActions = response.data.List;
        renderModalActions();
      }
    },
    error: function (response)
    {
    }
  });
}

function getPermissionGroups() {
  let vHtml = '';
  aPermGroup = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/PermissionGroupsSelect/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aPermGroup[aPermGroup.length] = response.data.List[i];
          vHtml += '<option value="' + aPermGroup[aPermGroup.length - 1].id + '">' + getLabel(aPermGroup[aPermGroup.length - 1].name) + '</option>';
        }
        $('#fldGroups').html(vHtml);
        renderPermissionGroupsSelect();
        addTrnData($('#fldGroups').val());
        getPermission();
      }
    },
    error: function (response)
    {
    }
  });
}

function renderPermissionGroupsSelect() {
  let vHtml = '';
  for (let i = 0; i < aPStatus.length; i++) {
    vHtml += '<option value="' + aPStatus[i].id + '">' + getLabel(aPStatus[i].name) + '</option>';
  }
  $('#fldPStatusId').html(vHtml);
  vHtml = '';
  for (let i = 0; i < aStatus.length; i++) {
    vHtml += '<option value="' + aStatus[i].id + '">' + getLabel(aStatus[i].name) + '</option>';
  }
  $('#fldStatusId').html(vHtml);
}

function openNewGroup() {
  $('#fldId').val('');
  $('#fldName').val('');
  $('#fldStatusId').val($('#fldStatusId option:first').val());
  $('#fldPStatusId').val($('#fldPStatusId option:first').val());
  $('#fldRem').val('');
  $('#groupModal').modal('show');
}

function saveGroup() {
  let method = 'POST';
  let url = '/New';
  let oData = {};
  oData.id = $('#fldId').val();
  oData.name = $('#fldName').val();
  oData.statusId = $('#fldStatusId').val();
  oData.pstatusId = $('#fldPStatusId').val();
  oData.rem = $('#fldRem').val();
  if (oData.id > 0) {
    method = 'PUT';
    url = '';
  }
  $.ajax({
    type: method,
    url: PhSettings.apiURL + '/UC/Cpy/PermissionGroups' + url,
    async: false,
    headers: PhSettings.Headers,
    data: JSON.stringify(oData),
    success: function (response) {
      if (response.status) {
        if (oData.id <= 0) {
          addTrnData(response.data.InsertedId);
          $('#fldGroups').append('<option value="' + response.data.InsertedId + '" selected>' + oData.name + '</option>');
        } else {
          addTrnData(oData.id);
        }
        getPermission();
        $('#groupModal').modal('hide');
      }
    },
    error: function (response)
    {
    }
  });
}

function addTrnData(groupId) {
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/CC/Cpy/GroupPermission/' + groupId,
    async: false,
    headers: PhSettings.Headers,
    success: function (response) {
    },
    error: function (response)
    {
    }
  });
}

function editGroup() {
  let aEditGroups = aPermGroup.filter(function (el) {
    return el.id === $('#fldGroups').val();
  });
  $('#fldId').val(aEditGroups[0].id);
  $('#fldName').val(aEditGroups[0].name);
  $('#fldStatusId').val(aEditGroups[0].statusId);
  $('#fldPStatusId').val(aEditGroups[0].pstatusId);
  $('#fldRem').val(aEditGroups[0].rem);
  $('#groupModal').modal('show');
}

function editAction() {
  $('#actionModal').modal('show');
}

function editDashboard() {
  $('#dashbordModal').modal('show');
}

function deleteGroup() {
  let id = $('#fldGroups').val();
  $.ajax({
    type: 'DELETE',
    async: false,
    url: PhSettings.apiURL + '/CC/Cpy/GroupPermission/' + id,
    headers: PhSettings.Headers,
    success: function (response) {
      getPermissionGroups();
    },
    error: function (response)
    {
    }
  });
}

function getPermission() {
  aPermision = [];
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/PermissionGroups/' + $('#fldGroups').val(),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        aPermision = response.data.Obj.aList;
        aTepmPermision = aPermision;
        renderPermission();
      }
    },
    error: function (response)
    {
    }
  });
}

function renderPermission() {
  let vHtml = '';
  for (let i = 0; i < aPermision.length; i++) {
    aPermision[i].newOk = aPermision[i].ok;
    aPermision[i].fullName = getLabel(aPermision[i].menuName) + ' - ' + getLabel(aPermision[i].mprgName);
    vHtml += '<tr>';
    vHtml += '  <td>';
    vHtml += '    <input id="fldCheckPerm' + i + '" class="form-check-input border-secondary ok-check" type="checkbox"  data-index="' + i + '" ' + ((parseInt(aPermision[i].newOk) == 1) ? 'checked' : '') + '>';
    vHtml += '  </td>';
    vHtml += '  <td class="nav-link perm-Item" data-index="' + i + '">';
    vHtml += '  ' + aPermision[i].fullName;
    vHtml += '  </td>';
    vHtml += '</tr>';
  }
  $("#tablePermission tbody").html(vHtml);
  $('.ok-check').change(function () {
    permissionChange($(this).data('index'));
  });
  $('.perm-Item').click(function (e) {
    e.preventDefault();
    renderAction($(this).data('index'));
    renderSpecialization($(this).data('index'));
  });
  $('#fldCheckPerm').on('change', function () {
    if ($('#fldCheckPerm').is(':checked')) {
      $(".ok-check").attr("checked", "checked");
      permissionChangeAllSelect();
    } else {
      $(".ok-check").removeAttr("checked");
      permissionChangeAllNotSelect();
    }
  });
  addNewOk();
  renderAction();
  renderSpecialization();
}

function filterPermission() {
  aPermision = aTepmPermision.filter((el) => {
    return el.fullName.includes($('#fldFilter').val());
  });
  if ($('#fldFilter').val() === '') {
    aPermision = aTepmPermision;
  }
  renderPermission();
}

function addNewOk() {
  for (let i = 0; i < aPermision.length; i++) {
    for (let j = 0; j < aPermision[i].aList.length; j++) {
      aPermision[i].aList[j].newOk = aPermision[i].aList[j].ok;
    }
    for (let j = 0; j < aPermision[i].aList1.length; j++) {
      aPermision[i].aList1[j].newSlistId = aPermision[i].aList1[j].slistId;
      aPermision[i].aList1[j].newStatusId = aPermision[i].aList1[j].statusId;
    }
  }
}

function permissionChange(index) {
  if (aPermision[index].newOk == 1) {
    aPermision[index].newOk = 0;
  } else {
    aPermision[index].newOk = 1;
  }
}

function permissionChangeAllSelect() {
  for (var i = 0; i < aPermision.length; i++) {
    aPermision[i].newOk = 1;
  }
}

function permissionChangeAllNotSelect() {
  for (var i = 0; i < aPermision.length; i++) {
    aPermision[i].newOk = 0;
  }
}

function renderAction(index = 0) {
  let vHtml = '';
  for (let i = 0; i < aPermision[index].aList.length; i++) {
    vHtml += '<tr>';
    vHtml += '  <td style="width:10px;">';
    vHtml += '    <input id="fldCheckAction' + i + '"class="form-check-input border-secondary option privItem" type="checkbox" data-index="' + i + '"' + (parseInt(aPermision[index].aList[i].newOk) === 1 ? 'checked' : '') + '></td>';
    vHtml += '  </td>';
    vHtml += '  <td class="nav-link">' + getLabel(aPermision[index].aList[i].PrivName) + ' </td>';
    vHtml += '</tr>';
  }
  $("#tableDataActions tbody").html(vHtml);
  $('.privItem').change(function () {
    actionChange(index, $(this).data('index'));
  });
  $('#fldCheckAction').on('change', function () {
    if ($('#fldCheckAction').is(':checked')) {
      $(".privItem").attr("checked", "checked");
      actionChangeAllChecked(index);
    } else {
      $(".privItem").removeAttr("checked");
      actionChangeAllNotChecked(index);
    }
  });
}

function actionChange(index, actionIndex) {
  if (parseInt(aPermision[index].aList[actionIndex].newOk) === 1) {
    aPermision[index].aList[actionIndex].newOk = 0;
  } else {
    aPermision[index].aList[actionIndex].newOk = 1;
  }
}

function getSpecialization() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/Speciallists/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        aSList = response.data.List;
      }
    },
    error: function (response)
    {
    }
  });
}

function renderSpecialization(index = 0) {
  let vHtml = '';
  let k = 0;
  for (let i = 0; i < aPermision[index].aList1.length; i++) {
    aSpecialList = [];
    k = 0;
    for (let j = 0; j < aSList.length; j++) {
      if (aPermision[index].aList1[i].sprvId == aSList[j].sprvId) {
        aSpecialList[k] = {};
        aSpecialList[k].id = aSList[j].id;
        aSpecialList[k].name = aSList[j].name;
        k++;
      }
    }
    vHtml += ' <tr>';
    vHtml += '   <td class="py-1">';
    vHtml += '     <div class="row">';
    vHtml += '       <label for="Groups" class="col-sm-3 form-label ph-label text-center text-sm-end " data-label="' + aPermision[index].aList1[i].sprvName + '">' + getLabel(aPermision[index].aList1[i].sprvName) + '</label> ';
    vHtml += '         <div class="col-sm-3 pe-0">';
    vHtml += '            <select id="fldStatus' + i + '" class="form-select form-select-sm status-select" data-index="' + i + '" required="true">';
    for (let j = 0; j < aSpecialStatus.length; j++) {
      vHtml += '            <option value="' + aSpecialStatus[j].id + '" ' + (aPermision[index].aList1[i].newStatusId == aSpecialStatus[j].id ? 'selected' : '') + '>' + getLabel(aSpecialStatus[j].name) + '</option>  ';
    }
    vHtml += '            </select>';
    vHtml += '          </div>';
    vHtml += '          <div class="col-sm-6 ps-0"> ';
    vHtml += '            <select id="fldSpecial' + i + '" class="form-select form-select-sm special-select" data-index="' + i + '" required="true">';
    for (let j = 0; j < aSpecialList.length; j++) {
      vHtml += '              <option value="' + aSpecialList[j].id + '" ' + (aPermision[index].aList1[i].newSlistId == aSpecialList[j].id ? 'selected' : '') + '>' + getLabel(aSpecialList[j].name) + '</option>  ';
    }
    vHtml += '            </select>';
    vHtml += '          </div> ';
    vHtml += '        </div>';
    vHtml += '    </td>';
    vHtml += '  </tr>';
  }
  $("#tableDataSpecialization tbody").html(vHtml);
  $('.status-select').change(function (e) {
    e.preventDefault();
    statusChange(index, $(this).data('index'));
  });
  $('.special-select').change(function (e) {
    e.preventDefault();
    specialChange(index, $(this).data('index'));
  });
}

function statusChange(index, stautIndex) {
  aPermision[index].aList1[stautIndex].newStatusId = $('#fldStatus' + stautIndex).val();
}

function specialChange(index, specialIndex) {
  aPermision[index].aList1[specialIndex].newSlistId = $('#fldSpecial' + specialIndex).val();
}

function getChangeData() {
  let nPermIndex = 0;
  let nActionIndex = 0;
  let nSpecIndex = 0;
  oNewPermision.perm = [];
  oNewPermision.child = [];
  oNewPermision.child1 = [];
  for (let i = 0; i < aPermision.length; i++) {
    if (parseInt(aPermision[i].ok) !== parseInt(aPermision[i].newOk)) {
      oNewPermision.perm[nPermIndex] = {};
      oNewPermision.perm[nPermIndex].id = aPermision[i].id;
      oNewPermision.perm[nPermIndex].ok = aPermision[i].newOk;
      nPermIndex++;
    }
    for (let j = 0; j < aPermision[i].aList.length; j++) {
      if (parseInt(aPermision[i].aList[j].ok) !== parseInt(aPermision[i].aList[j].newOk)) {
        oNewPermision.child[nActionIndex] = {};
        oNewPermision.child[nActionIndex].id = aPermision[i].aList[j].id;
        oNewPermision.child[nActionIndex].ok = aPermision[i].aList[j].newOk;
        nActionIndex++;
      }
    }
    for (let k = 0; k < aPermision[i].aList1.length; k++) {
      if (parseInt(aPermision[i].aList1[k].statusId) !== parseInt(aPermision[i].aList1[k].newStatusId) ||
        parseInt(aPermision[i].aList1[k].slistId) !== parseInt(aPermision[i].aList1[k].newSlistId)) {
        oNewPermision.child1[nSpecIndex] = {};
        oNewPermision.child1[nSpecIndex].id = aPermision[i].aList1[k].id;
        oNewPermision.child1[nSpecIndex].statusId = aPermision[i].aList1[k].newStatusId;
        oNewPermision.child1[nSpecIndex].slistId = aPermision[i].aList1[k].newSlistId;
        nSpecIndex++;
      }
    }
  }
  return oNewPermision;
}

function savePermision() {
  $.ajax({
    type: 'PUT',
    async: false,
    url: PhSettings.apiURL + '/CC/Cpy/GroupPermission/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(getChangeData()),
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        getPermission();
      } else {
        showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response)
    {
    }
  });
}

function renderModalActions() {
  $('#fldCheckAllAction').val(2);
  let vHtml = '';
  for (let i = 0; i < aActions.length; i++) {
    aActions[i].newOk = aActions[i].ok;
    vHtml += '<tr>';
    vHtml += '  <td width="25%">';
    vHtml += '    <select id="fldAction' + i + '" class="form-select form-select-sm ok-Actions" data-index="' + i + '">';
    vHtml += '      <option value="0">منع</option>';
    vHtml += '      <option value="1">منح</option>';
    vHtml += '      <option value="2" selected>عدم تغيير</option>';
    vHtml += '     </select>';
    vHtml += '  </td>';
    vHtml += '  <td class="nav-link action-Item" data-index="' + i + '">';
    vHtml += '  ' + aActions[i].name;
    vHtml += '  </td>';
    vHtml += '</tr>';
  }
  $("#tableAction tbody").html(vHtml);
  $('#fldCheckAllAction').on('change', function () {
    if (parseInt($('#fldCheckAllAction').val()) === 0) {
      $(".ok-Actions").val(0);
      actionsChangeAllNotSelect();
    } else if (parseInt($('#fldCheckAllAction').val()) === 1) {
      $(".ok-Actions").val(1);
      actionsChangeallSelect();
    } else {
      $(".ok-Actions").val(2);
    }
  });
}

function saveActions() {
  let aNewAction = [];
  let nIdx = 0;
  $('.ok-Actions').each(function () {
    if ($(this).val() != 2) {
      aNewAction[nIdx] = {};
      aNewAction[nIdx].id = aActions[$(this).data('index')].id;
      aNewAction[nIdx].newOk = $(this).val();
      nIdx++;
    }
  });
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/CC/Cpy/GroupPermission/action/' + $('#fldGroups').val(),
    async: false,
    headers: PhSettings.Headers,
    data: JSON.stringify(aNewAction),
    success: function (response) {
      if (response.status) {
        $('#actionModal').modal('hide');
      }
    },
    error: function (response)
    {
    }
  });
}

function actionChangeAllChecked(index) {
  for (var i = 0; i < aPermision[index].aList.length; i++) {
    aPermision[index].aList[i].newOk = 1;
  }
}

function actionChangeAllNotChecked(index) {
  for (var i = 0; i < aPermision[index].aList.length; i++) {
    aPermision[index].aList[i].newOk = 0;
  }
}

function actionsChangeallSelect() {
  for (var i = 0; i < aActions.length; i++) {
    aActions[i].newOk = 1;
  }
}

function actionsChangeAllNotSelect() {
  for (var i = 0; i < aActions.length; i++) {
    aActions[i].newOk = 0;
  }
}

function getDashbord() {
  aDashbord = [];
  $.ajax({
    type: 'POST',
    async: true,
    url: PhSettings.apiURL + '/UC/Cpy/DashboardPermission/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        aDashbord = response.data.List;
        renderModalDashbord();
      }
    },
    error: function (response)
    {
    }
  });
}

function renderModalDashbord() {
  let vHtml = '';
  for (let i = 0; i < aDashbord.length; i++) {
    aDashbord[i].newOk = aDashbord[i].ok;
    vHtml += '<tr>';
    vHtml += '  <td width="25%">';
    vHtml += '    <input id="fldCheckDashbord' + i + '" class="form-check-input border-secondary px-6 ok-check-dash" type="checkbox" data-index="' + i + '"' + (parseInt(aDashbord[i].newOk) === 1 ? 'checked' : '') + '>';
    vHtml += '  </td>';
    vHtml += '  <td class="nav-link" data-index="' + i + '">';
    vHtml += '  ' + aDashbord[i].dashboardName;
    vHtml += '  </td>';
    vHtml += '</tr>';
  }
  $("#tableDashbord tbody").html(vHtml);
  $('.ok-check-dash').change(function () {
    permDashChange($(this).data('index'));
  });
  $('#fldCheckDashbord').on('change', function () {
    if ($('#fldCheckDashbord').is(':checked')) {
      $(".ok-check-dash").attr("checked", "checked");
      permDashSelect();
    } else {
      $(".ok-check-dash").removeAttr("checked");
      perDashNotSelect();
    }
  });
}

function permDashChange(index) {
  if (aDashbord[index].newOk == 1) {
    aDashbord[index].newOk = 0;
  } else {
    aDashbord[index].newOk = 1;
  }
}

function getPermDash() {
  console.log(aDashbord);
  let nPermIndex = 0;
  oNewPermDash.perm = [];
  for (let i = 0; i < aDashbord.length; i++) {
    if (parseInt(aDashbord[i].ok) !== parseInt(aDashbord[i].newOk)) {
      oNewPermDash.perm[nPermIndex] = {};
      oNewPermDash.perm[nPermIndex].id = aDashbord[i].id;
      oNewPermDash.perm[nPermIndex].ok = aDashbord[i].newOk;
      nPermIndex++;
    }
  }
  return oNewPermDash;
}

function savePermDash() {
  $.ajax({
    type: 'PUT',
    async: false,
    url: PhSettings.apiURL + '/CC/Cpy/DashboardPermission/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(getPermDash()),
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        getPermission();
      } else {
        showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response)
    {
    }
  });
}

function permDashSelect() {
  for (var i = 0; i < aDashbord.length; i++) {
    aDashbord[i].newOk = 1;
  }
}

function perDashNotSelect() {
  for (var i = 0; i < aDashbord.length; i++) {
    aDashbord[i].newOk = 0;
  }
}
