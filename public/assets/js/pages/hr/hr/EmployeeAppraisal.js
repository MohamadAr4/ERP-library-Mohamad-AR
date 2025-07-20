let phForm;
let aAppraisalTemp = [];
let aApprisal = [];
let aAppraisalNot = [];
let aConsideration = [];
let aPunishment = [];
let oldEmpId = 0;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_FIXED,
        addRowBtn: true}
    }
  ];
  getAppraisalTemplates();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/AppraisalEmployeeMst';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterEdit: editEmployee, afterNew: editEmployee, beforSave: checkValues};
  phForm = new PhForm('AppraisalEmployee', metta, options);
  $('#fldEmpName').focusout(function () {
    changeEmployee();
  });
  $('#fldTdate,#fldFdate').change(function () {
    callFunctions();
  });
});

function callFunctions() {
  showHeaderSpinner(true);
  getEmployeeAppraisalNote();
  getEmployeeConsideration();
  getEmployeePunishment();
  renderTables();
  showHeaderSpinner(false);
}

async function changeEmployee() {
  if ((phForm.phTable.phT0.aRows.length > 0 || $('#fldEmpId').val() === '') && oldEmpId != $('#fldEmpId').val()) {
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
        if ($('#fldEmpId').val() !== '') {
          oldEmpId = $('#fldEmpId').val();
          getEmployeeAppraisalTemplates();
          callFunctions();
        } else {
          $('#fldApprId').val('');
          $('#fldApprName').val('');
          phForm.phTable.phT0.setData([]);
        }
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  } else {
    oldEmpId = $('#fldEmpId').val();
    getEmployeeAppraisalTemplates();
    callFunctions();
  }
}

function editEmployee() {
  if ($('#fldId').val() > 0) {
    $('#fldEmpName').attr("disabled", true);
  } else {
    $('#fldEmpName').attr("disabled", false);
  }
  callFunctions();
}

function getAppraisalTemplates() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/AppraisalTemplatesMst/List',
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
          aAppraisalTemp[i] = {};
          aAppraisalTemp[i].id = response.data.List[i].id;
          aAppraisalTemp[i].name = response.data.List[i].num + ' - ' + response.data.List[i].name;
        }
      }
    }
  });
}

function getEmployeeAppraisalTemplates() {
  showHeaderSpinner(true);
  if (!isNaN(parseInt($('#fldEmpId').val()))) {
    $.ajax({
      type: 'GET',
      async: false,
      url: PhSettings.apiURL + '/CC/HR/EmployeeAppraisalTemplate/' + parseInt($('#fldEmpId').val()),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      }, success: function (response) {
        if (response.status) {
          $('#fldApprId').val(response.data.Obj.id);
          $('#fldApprName').val(response.data.Obj.num + ' - ' + response.data.Obj.name);
          for (let i = 0; i < response.data.Obj.aList.length; i++) {
            aApprisal[i] = {};
            aApprisal[i].TrnId = response.data.Obj.aList[i].id;
            aApprisal[i].appGrpItemName = response.data.Obj.aList[i].apprgrpName + ' - ' + response.data.Obj.aList[i].appritmName;
            aApprisal[i].appPoints = response.data.Obj.aList[i].points;
          }
          drawPhTableData();
        }
      }
    });
  }
  showHeaderSpinner(false);
}

function getQueryData() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'empId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldEmpId').val();
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'ddate';
  aQData[nIdx].dataType = PhFC_DatePicker;
  aQData[nIdx].operation = '<>';
  aQData[nIdx].value1 = $('#fldFdate').val();
  aQData[nIdx].value2 = $('#fldTdate').val();
  return aQData;
}

function getEmployeeAppraisalNote() {
  aAppraisalNot = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/AppraisalNotes/Search/0/0',
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
        aAppraisalNot = response.data.List;
      }
    }
  });
}

function getEmployeeConsideration() {
  aConsideration = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/AdminConsiderationView/Search/0/0',
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
        aConsideration = response.data.List;
      }
    }
  });
}

function getEmployeePunishment() {
  aPunishment = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/AdminPunishmentView/Search/0/0',
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
        aPunishment = response.data.List;
      }
    }
  });
}

function renderTables() {
  let vHtml = '';
  if (aConsideration.length !== 0 || aPunishment.length !== 0 || aAppraisalNot.length !== 0) {
    vHtml += '<table class="table table-bordered table-striped text-center">';
    vHtml += '  <thead class="bg-secondary-subtle" style="position: sticky !important; top: 0 !important;">';
    vHtml += '    <tr>';
    vHtml += '      <td style="width: 10%">' + getLabel('Date') + '</td>';
    vHtml += '      <td style="width: 20%">' + getLabel('Type') + '</td>';
    vHtml += '      <td style="width: 27%">' + getLabel('Appraisal.Group.Item') + '</td>';
    vHtml += '      <td style="width: 5%">' + getLabel('Points') + '</td>';
    vHtml += '      <td style="width: 5%"></td>';
    vHtml += '      <td>' + getLabel('Rem') + '</td>';
    vHtml += '    </tr>';
    vHtml += '  </thead>';
    vHtml += '  <tbody>';
    for (let i = 0; i < aConsideration.length; i++) {
      vHtml += '    <tr>';
      vHtml += '      <td>' + aConsideration[i].ddate + '</td>';
      vHtml += '      <td>' + getLabel('ADM.Consid') + ' - ' + aConsideration[i].consName + '</td>';
      vHtml += '      <td>' + aConsideration[i].grpName + ' - ' + aConsideration[i].itmName + '</td>';
      vHtml += '      <td>' + aConsideration[i].trnPoints + '</td>';
      vHtml += '      <td>' + getLabel('Positive') + '</td>';
      if (aConsideration[i].mstRem === null) {
        aConsideration[i].mstRem = '';
      }
      vHtml += '      <td>' + aConsideration[i].mstRem + '</td>';
      vHtml += '    </tr>';
    }
    for (let i = 0; i < aPunishment.length; i++) {
      vHtml += '    <tr>';
      vHtml += '      <td>' + aPunishment[i].ddate + '</td>';
      vHtml += '      <td>' + getLabel('ADM.Punish') + ' - ' + aPunishment[i].punName + '</td>';
      vHtml += '      <td>' + aPunishment[i].grpName + ' - ' + aPunishment[i].itmName + '</td>';
      vHtml += '      <td>' + aPunishment[i].trnPoints + '  </td>';
      vHtml += '      <td>' + getLabel('Negative') + ' </td>';
      if (aPunishment[i].mstRem === null) {
        aPunishment[i].mstRem = '';
      }
      vHtml += '      <td> ' + aPunishment[i].mstRem + '  </td>';
      vHtml += '    </tr>';
    }
    for (let i = 0; i < aAppraisalNot.length; i++) {
      vHtml += '    <tr>';
      vHtml += '      <td>' + aAppraisalNot[i].ddate + '</td>';
      vHtml += '      <td>' + getLabel('appraisal.note') + '</td>';
      vHtml += '      <td>' + aAppraisalNot[i].apprgrpName + ' - ' + aAppraisalNot[i].appritmName + '</td>';
      vHtml += '      <td>' + aAppraisalNot[i].points + '</td>';
      vHtml += '      <td>' + getLabel(aAppraisalNot[i].typeName) + '</td>';
      if (aAppraisalNot[i].rem === null) {
        aAppraisalNot[i].rem = '';
      }
      vHtml += '      <td>' + aAppraisalNot[i].rem + '</td>';
      vHtml += '    </tr>';
    }
    vHtml += '  </tbody>';
    vHtml += '</table>';
  }
  $('#notTable').html(vHtml);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'Date',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Employee'),
    element: 'EmpId',
    field: 'empId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Appraisal.Temp'),
    element: 'fldApprId',
    field: 'apprId',
    component: PhFC_Select,
    defValue: '',
    options: aAppraisalTemp,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('From.Date'),
    element: 'Fdate',
    field: 'fdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('To.Date'),
    element: 'Tdate',
    field: 'tdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
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
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Employee'),
    element: 'fldEmpId',
    rElement: 'fldEmpName',
    field: 'empId',
    rField: 'empName',
    isRequired: false,
    defValue: '',
    tableWidth: '25'
  };
  aFields[idx++] = {
    label: getLabel('Appraisal.Temp'),
    element: 'fldApprId',
    rElement: 'fldApprName',
    field: 'apprId',
    rField: 'apprName',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('From.Date'),
    element: 'fldFdate',
    field: 'fdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('To.Date'),
    element: 'fldTdate',
    field: 'tdate',
    isRequired: true,
    defValue: formatDate(addDaysToDate(stringToDate(currentDate()), 90), 'dd-mm-yyyy'),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '40'
  };
  return aFields;
}

function initPhTableColumns() {
  var aColumns = [];
  var nIdx = 0;
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
    field: 'aempId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'tapprId',
    field: 'tapprId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Appraisal.Group.Item'),
    field: 'tapprName',
    isSent: false,
    width: '350px',
    required: false,
    component: 'input',
    enabled: false,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Appraisal.Points'),
    field: 'appPoints',
    datatype: 'integer',
    component: 'input',
    width: '125px',
    isSent: false,
    required: false,
    enabled: false,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Points'),
    field: 'points',
    datatype: 'integer',
    component: 'input',
    width: '125px',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    rfield: 'rem',
    datatype: 'string',
    width: '275px',
    required: false,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function drawPhTableData() {
  let nRow = '';
  phForm.phTable.phT0.setData([]);
  for (let i = 0; i < aApprisal.length; i++) {
    phForm.phTable.phT0.addEmptyRow();
    nRow = parseInt(phForm.phTable.phT0.getRowCount()) - 1;
    phForm.phTable.phT0.setFieldValue(nRow, 'tapprId', aApprisal[i].TrnId);
    phForm.phTable.phT0.setFieldValue(nRow, 'tapprName', aApprisal[i].appGrpItemName);
    phForm.phTable.phT0.setFieldValue(nRow, 'appPoints', aApprisal[i].appPoints);
    phForm.phTable.phT0.setFieldValue(nRow, 'points', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'rem', '');
    phForm.phTable.phT0.render();
  }
}

function checkValues() {
  for (let i = 0; i < phForm.phTable.phT0.getRowCount(); i++) {
    let nPoints = parseInt(phForm.phTable.phT0.getFieldValue(i, 'points'));
    let nAppPoints = parseInt(phForm.phTable.phT0.getFieldValue(i, 'appPoints'));
    if (nPoints <= nAppPoints && nPoints >= 0) {
      phForm.phTable.phT0.removeClass(i, '5', 'invalid');
    } else {
      phForm.validated = false;
      phForm.phTable.phT0.addClass(i, '5', 'invalid');
      showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Point.Grater.Than.Appraisal.Point'));
      break;
    }
  }
}