let phForm;
let  aDepartments = PhSettings.CpyCodes.CpyDepartments,
        aDepartmentUnit = PhSettings.CpyCodes.CpyDepartmentUnit,
        aUser = [];
aDeptUnit = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Cpy/UserUnits';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterEdit: filterDeptUnit};
  phForm = new PhForm('UserUnits', metta, options);
  renderDept();
  $('#fldDeptId').change(function () {
    filterDeptUnit();
  });
});

function getList() {
  getUsers();
  filterLabel();
}

function getUsers() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/Users/List',
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
          aUser[i] = {};
          aUser[i].id = response.data.List[i].id;
          aUser[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function filterLabel() {
  aDepartments = aDepartments.filter(function (el) {
    return el.id != "0";
  });
  aDepartmentUnit = aDepartmentUnit.filter(function (el) {
    return el.id != "0";
  });
}

function renderDept() {
  let vHtml = '';
  for (var i = 0; i < aDepartments.length; i++) {
    vHtml += '<option value="' + aDepartments[i].id + '">' + getLabel(aDepartments[i].name) + '</option>';
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
    vHtml += '<option value="' + aDeptUnit[i].id + '">' + getLabel(aDeptUnit[i].name) + '</option>';
  }
  $('#fldUnitId').html(vHtml);
}


function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('UserId'),
    element: 'UserId',
    field: 'userId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Cpy/Users/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('DeptId'),
    element: 'DeptId',
    field: 'deptId',
    component: PhFC_Select,
    defValue: '',
    options: aDepartments,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('UnitId'),
    element: 'UnitId',
    field: 'unitId',
    component: PhFC_Select,
    defValue: '',
    options: aDeptUnit,
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
    label: getLabel('UserId'),
    element: 'fldUserId',
    rElement: 'fldUserName',
    field: 'userId',
    rField: 'userName',
    isRequired: true,
    defValue: '',
    options: aUser,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('DeptId'),
    element: 'fldDeptId',
    field: 'deptId',
    rField: 'deptName',
    isRequired: true,
    defValue: 1,
    options: aDepartments,
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('UnitId'),
    element: 'fldUnitId',
    field: 'unitId',
    rField: 'unitName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aDepartmentUnit,
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
