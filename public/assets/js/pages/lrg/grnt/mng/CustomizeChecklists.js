let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aDepartments = PhSettings.CpyCodes.CpyDepartments,
        aDepartmentUnit = PhSettings.CpyCodes.CpyDepartmentUnit,
        aMenuPrograms = PhSettings.PhsCodes.PhsMenuPrograms,
        aCodeMchecklist = PhSettings.UsrCodes.LrgMchecklist,
        aYesno = PhSettings.PhsCodes.PhsYesno,
        aPointerTrn = [];
let aMenuProgramsActive = [];
let aDept = [];
let aCodeChecklist = [];
jQuery(document).ready(function () {
  getMenuPrograms();
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  filterMchecklistq();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/UnitChkList';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterEdit: filterDept};
  phForm = new PhForm('CheckList', metta, options);

  $('#fldMPrgId').change(function () {
    filterDept();
  });
  filterDept();
  getCodeChecklist();
  console.log(aMenuPrograms);
});

function filterMchecklistq() {
  aCodeMchecklist = aCodeMchecklist.filter(function (el) {
    return el.id != 0;
  });
}


function getMenuPrograms() {
  let j = 0;
  for (var i = 0, max = aMenuPrograms.length; i < max; i++) {
    if (aMenuPrograms[i].statusId == 1) {
      aMenuProgramsActive[j] = aMenuPrograms[i];
      j++;
    }
  }
  console.log(aMenuProgramsActive);
}

function getCodeChecklist() {
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/UC/Lrg/ProgDepartmentChecklist/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    success: function (response) {
      aCodeChecklist = response.data.List;
      filterDept();
    }
  });
}

function filterDept() {
  let j = 0;
  aDept = [];
  for (var i = 0; i < aCodeChecklist.length; i++) {
    if (aCodeChecklist[i].mprgId == $('#fldMPrgId').val()) {
      aDept[j] = aCodeChecklist[i];
      j++;
    }
  }
  renderDept();
}

function renderDept() {
  let vHtml = '';
  for (var i = 0; i < aDept.length; i++) {
    vHtml += '<option value="' + aDept[i].deptId + '">' + getLabel(aDept[i].deptName) + '</option>';
  }
  $('#fldDeptId').html(vHtml);
  filterDeptUnit();
}

function filterDeptUnit() {
  let j = 0;
  aDeptUnit = [];
  for (var i = 0; i < aDepartmentUnit.length; i++) {
    if (aDepartmentUnit[i].deptId == $('#fldDeptId').val()) {
      aDeptUnit[j] = aDepartmentUnit[i];
      j++;
    }
  }
  renderDeptUnit();
}

function renderDeptUnit() {
  let vHtml = '';
  for (var i = 0; i < aDeptUnit.length; i++) {
    vHtml += '<option value="' + aDeptUnit[i].deptId + '">' + getLabel(aDeptUnit[i].name) + '</option>';
  }
  $('#fldDeptUnit').html(vHtml);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Menu.Programs'),
    element: 'fldMPrgId',
    field: 'mprgId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aMenuProgramsActive,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Department'),
    element: 'fldDeptId',
    field: 'deptId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aDepartments,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Department.Unit'),
    element: 'fldDeptUnit',
    field: 'unitId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aDepartmentUnit,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Check.List'),
    element: 'fldCheckListId',
    field: 'checklistId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aCodeMchecklist,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Nord'),
    element: 'fldNord',
    field: 'nord',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Ndays'),
    element: 'fldNdays',
    field: 'ndays',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: 'statusId',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Is.Update'),
    element: 'fldIsupdateId',
    field: 'isupdateId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aYesno,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Remarks'),
    element: 'fldRem',
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
    label: getLabel('Menu.Programs'),
    element: 'fldMPrgId',
    field: 'mprgId',
    rField: 'mprgName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aMenuProgramsActive,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Department'),
    element: 'fldDeptId',
    field: 'deptId',
    rField: 'deptName',
    isRequired: true,
    defValue: '',
    options: aDepartments,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Department.Unit'),
    element: 'fldDeptUnit',
    field: 'unitId',
    rField: 'unitName',
    isRequired: true,
    defValue: '',
    options: aDepartmentUnit,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Check.List'),
    element: 'fldCheckListId',
    field: 'checklistId',
    rField: 'checklistName',
    isRequired: true,
    defValue: '',
    options: aCodeMchecklist,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Is.Update'),
    element: 'fldIsupdateId',
    field: 'isupdateId',
    rField: 'isupdateName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aYesno,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Nord'),
    element: 'fldNord',
    field: 'nord',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('ndays'),
    element: 'fldNdays',
    field: 'ndays',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  return aFields;
}

