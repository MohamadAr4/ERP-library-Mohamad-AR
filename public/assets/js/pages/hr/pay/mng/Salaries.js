let phForm;
let phTableComp;
let aSection = PhSettings.UsrCodes.EmpSection,
        aStatus = PhSettings.PhsCodes.PhsYesno;
let aSalaryGroup = [];
let aSalaryAccreditor = [];
let aEmpData = [];
let nEmpCard = 0, nSalaryDiv = 1;
jQuery(document).ready(function () {
  $('#ph-execute').click(function (e) {
    e.preventDefault();
    getEmployee();
  });
  $('#ph-reset').click(function (e) {
    e.preventDefault();
    toggleCard(nEmpCard);
    resetForm();
  });
  $('#ph-submit').click(function (e) {
    e.preventDefault();
    doSaveEmployee();
  });
  $('#fldBankStatusId').change(function () {
    if ($('#fldBankStatusId').val() == 1) {
      $("#fldBankAcc").attr("required", true);
      $("#fldBankName").attr("required", true);
    } else {
      $("#fldBankAcc").attr("required", false);
      $("#fldBankName").attr("required", false);
      $("#fldBankAcc").removeClass("invalid");
      $("#fldBankName").removeClass("invalid");
    }
  });
  openNew();
});

function openNew() {
  getSalaryGroup();
  getSalaryAccreditor();
  renderSelect();
  getEmployee();
  showHeaderSpinner(false);
  toggleCard(nEmpCard);
  $('#ph-reset').removeClass('d-none');
}

function resetForm() {
  $('#fldINum').val('');
  $('#fldIDate').val(currentDate());
  $('#fldBankAcc').val('');
  $('#fldBankName').val('');
  $('#fldBankStatusId').val(2);
  $('#fldAcrId').val($("#fldAcrIdoption:first").val());
  $('#fldSalGrpId').val($("#fldSalGrpIdoption:first").val());
  $('#fldBasSalary').val();
  $('#fldInsSalary').val();
  $('#fldTaxSalary').val();
}

function getSalaryGroup() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/SalaryGroups/List',
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
          aSalaryGroup[i] = {};
          aSalaryGroup[i].id = response.data.List[i].id;
          aSalaryGroup[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getSalaryAccreditor() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Accredited/List',
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
          aSalaryAccreditor[i] = {};
          aSalaryAccreditor[i].id = response.data.List[i].id;
          aSalaryAccreditor[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function renderSelect() {
  let vHtml = '';
  vHtml += '<option value=""></option>';
  for (var i = 0; i < aStatus.length; i++) {
    vHtml += '<option value="' + aStatus[i].id + '">' + getLabel(aStatus[i].name) + '</option>';
  }
  $('#fldQStatusId').html(vHtml);
  vHtml = '';
  for (var i = 0; i < aStatus.length; i++) {
    vHtml += '<option value="' + aStatus[i].id + '">' + getLabel(aStatus[i].name) + '</option>';
  }
  $('#fldBankStatusId').html(vHtml);
  vHtml = '';
  vHtml += '<option value=""></option>';
  for (var i = 0; i < aSection.length; i++) {
    vHtml += '<option value="' + aSection[i].id + '">' + getLabel(aSection[i].name) + '</option>';
  }
  $('#fldQSectionId').html(vHtml);
  vHtml = '';
  for (var i = 0; i < aSalaryAccreditor.length; i++) {
    vHtml += '<option value="' + aSalaryAccreditor[i].id + '">' + getLabel(aSalaryAccreditor[i].name) + '</option>';
  }
  $('#fldAcrId').html(vHtml);
  vHtml = '';
  for (var i = 0; i < aSalaryGroup.length; i++) {
    vHtml += '<option value="' + aSalaryGroup[i].id + '">' + getLabel(aSalaryGroup[i].name) + '</option>';
  }
  $('#fldSalGrpId').html(vHtml);
}

function toggleCard(nType) {
  if (nType === nEmpCard) {
    $('#empCard').removeClass('d-none');
    $('#cardData').addClass('d-none');
    $('#salaryDiv').addClass('d-none');
  } else if (nType === nSalaryDiv) {
    $('#empCard').addClass('d-none');
    $('#cardData').removeClass('d-none');
    $('#salaryDiv').removeClass('d-none');
  }
}

function getQueryDate() {
  let nIdx = 0;
  let aQData = [];
  if ($('#fldQNum').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'num';
    aQData[nIdx].dataType = PhFC_Number;
    aQData[nIdx].operation = '%';
    aQData[nIdx].value1 = $('#fldQNum').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#fldQName').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'name';
    aQData[nIdx].dataType = PhFC_Text;
    aQData[nIdx].operation = '%';
    aQData[nIdx].value1 = $('#fldQName').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#fldQStatusId').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'bankstatusId';
    aQData[nIdx].dataType = PhFC_Select;
    aQData[nIdx].operation = '=';
    aQData[nIdx].value1 = $('#fldQStatusId').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#fldQSectionId').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'sectId';
    aQData[nIdx].dataType = PhFC_Select;
    aQData[nIdx].operation = '=';
    aQData[nIdx].value1 = $('#fldQSectionId').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  return aQData;
}

function getEmployee() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Employee/Search/0/0',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(getQueryDate()),
    success: function (response) {
      aEmpData = response.data.List;
      toggleCard(nEmpCard);
      renderTableBody();
    }
  });
}

function renderTableBody() {
  let vHtml = '';
  if (aEmpData !== undefined) {
    for (let index = 0; index < aEmpData.length; index++) {
      vHtml += '<tr>';
      vHtml += '  <td>';
      vHtml += '    <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm salary-item" data-index="' + index + '">';
      vHtml += '      <i class="bi bi-pencil"></i>';
      vHtml += '    </a>';
      vHtml += '  </td>';
      vHtml += '  <td>' + aEmpData[index].num + '</td>';
      vHtml += '  <td>' + aEmpData[index].name + '</td>';
      vHtml += '  <td>' + aEmpData[index].father + '</td>';
      vHtml += '  <td>' + aEmpData[index].mother + '</td>';
      vHtml += '  <td>' + aEmpData[index].basesal + '</td>';
      vHtml += '  <td>' + aEmpData[index].bankstatusName + '</td>';
      if (aEmpData[index].bankacc === null) {
        aEmpData[index].bankacc = '';
      }
      vHtml += '  <td>' + aEmpData[index].bankacc + '</td>';
      if (aEmpData[index].bankname === null) {
        aEmpData[index].bankname = '';
      }
      vHtml += '  <td>' + aEmpData[index].bankname + '</td>';
      vHtml += '</tr>';
    }
  }
  $("#tableData tbody").html(vHtml);
  $('.salary-item').click(function (e) {
    e.preventDefault();
    editSalaryData($(this).data('index'));
  });
}

function editSalaryData(index) {
  $('#fldEmpId').val(aEmpData[index].id);
  $('#fldEmpName').val(aEmpData[index].num + ' - ' + aEmpData[index].name);
  $('#fldINum').val(aEmpData[index].inum);
  $('#fldIDate').val(aEmpData[index].idate);
  $('#fldBankAcc').val(aEmpData[index].bankacc);
  $('#fldBankName').val(aEmpData[index].bankname);
  $('#fldBankStatusId').val(aEmpData[index].bankstatusId);
  $('#fldAcrId').val(aEmpData[index].acrId);
  $('#fldSalGrpId').val(aEmpData[index].sgrpId);
  $('#fldBasSalary').val(aEmpData[index].basesal);
  $('#fldInsSalary').val(aEmpData[index].insursal);
  $('#fldTaxSalary').val(aEmpData[index].financesal);
  toggleCard(nSalaryDiv);
  $('#cardHeader').html(getLabel('Salary'));
}

function getEntryData() {
  let aData = {};
  aData.id = $('#fldEmpId').val();
  aData.inum = $('#fldINum').val();
  aData.idate = $('#fldIDate').val();
  aData.bankacc = $('#fldBankAcc').val();
  aData.bankname = $('#fldBankName').val();
  aData.bankstatusId = $('#fldBankStatusId').val();
  aData.acrId = $('#fldAcrId').val();
  aData.sgrpId = $('#fldSalGrpId').val();
  aData.basesal = $('#fldBasSalary').val();
  aData.insursal = $('#fldInsSalary').val();
  aData.financesal = $('#fldTaxSalary').val();
  return aData;
}

function doSaveEmployee() {
  if ($('#fldEmpId').val() > 0) {
    showHeaderSpinner(true);
    let form = select('#salatyForm');
    form.classList.remove('was-phF.validated');
    if (isValidForm('salatyForm')) {
      $.ajax({
        type: 'PUT',
        async: false,
        url: PhSettings.apiURL + '/UC/Emp/EmployeeSalary/',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': PhSettings.Headers.Authorization,
          'periodId': PhSettings.Period.Id,
          'gId': PhSettings.GUId.GId,
          'vLang': PhSettings.display.vLang
        },
        data: JSON.stringify(getEntryData()),
        success: function (response) {
          if (response.status && response.code === 200) {
            showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
            $('#fldEmpId').val('');
          } else {
            showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
          }
        },
        error: function (response) {
        }
      });
    } else {
      form.classList.add('was-phF.validated');
    }
    showHeaderSpinner(false);
  }
}
