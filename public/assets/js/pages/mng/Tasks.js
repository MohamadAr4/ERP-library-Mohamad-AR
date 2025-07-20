let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus,
  aDept = [],
  aAction = [],
  aUser = [],
  Task_action_PhTable = [],
  Task_user_PhTable = [],
  aUnit = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'TaskactionPhTable',
      aColumns: initTaskActionPhTable(),
      height: 40,
      options: {widthType: PhTable_WIDTH_FIXED,
        addRowBtn: true}
    },
    {container: 'TaskuserPhTable',
      aColumns: initTaskuserPhTable(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Cpy/Task';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('Tasks', metta, options);
});

function getList() {
  getAction();
  getDept();
  getUser();
  getUnit();
}

function getDept() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/Departments/List',
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
          aDept[i] = {};
          aDept[i].id = response.data.List[i].id;
          aDept[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getAction() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/CodTaskAction/List',
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
          aAction[i] = {};
          aAction[i].id = response.data.List[i].id;
          aAction[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getUser() {
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
function getUnit() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/DepartmentUnit/List',
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
          aUnit[i] = {};
          aUnit[i].id = response.data.List[i].id;
          aUnit[i].name = response.data.List[i].name;
        }
      }
    }
  });
}


function getQFields() {
  let aQFields = [];
  let idx = 0;
   aQFields[idx++] = {
    label: getLabel('TaskId'),
    element: 'TaskId',
    field: 'taskId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Cpy/Task/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('PriorityId'),
    element: 'PriorityId',
    field: 'priorityId',
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
    aQFields[idx++] = {
    label: getLabel('CompPerc'),
    element: 'CompPerc',
    field: 'compPerc',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('PrivacyId'),
    element: 'PrivacyId',
    field: 'privacyId',
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('DeptId'),
    element: 'DeptId',
    field: 'deptId',
    component: PhFC_Select,
    defValue: '',
    options: aDept,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('UnitId'),
    element: 'UnitId',
    field: 'unitId',
    component: PhFC_Select,
    defValue: '',
    options: aUnit,
    aOpers: aSAOpers
  };  aQFields[idx++] = {
    label: getLabel('UserId'),
    element: 'UserId',
    field: 'userId',
    component: PhFC_Select,
    defValue: '',
    options: aUser,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('SDate'),
    element: 'SDate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('EDate'),
    element: 'EDate',
    field: 'edate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('RemindDate'),
    element: 'RemindDate',
    field: 'reminddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('ReminderId'),
    element: 'ReminderId',
    field: 'reminderId',
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
    aQFields[idx++] = {
    label: getLabel('RemindDays'),
    element: 'RemindDays',
    field: 'reminddays',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };

  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
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
    label: getLabel('TaskId'),
    element: 'fldTaskId',
    rElement: 'fldTaskName',
    field: 'taskId',
    rField: 'taskName',
    isRequired: false,
    defValue: 0,
    tableWidth: '25'
  };

  aFields[idx++] = {
    label: getLabel('PriorityId'),
    getLabel:true,
    element: 'fldPriorityId',
    field: 'priorityId',
    rField: 'priorityName',
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('StatusId'),
    getLabel:true,
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('CompPerc'),
    element: 'fldCompPerc',
    field: 'compPerc',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('PrivacyId'),
    getLabel:true,
    element: 'fldPrivacyId',
    field: 'privacyId',
    rField: 'privacyName',
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('DeptId'),
    element: 'fldDeptId',
    field: 'deptId',
    rField: 'deptName',
    isRequired: true,
    defValue: '',
    options: aDept,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('UnitId'),
    element: 'fldUnitId',
    field: 'unitId',
    rField: 'unitName',
    isRequired: true,
    defValue: '',
    options: aUnit,
    tableWidth: '150px'
  };
    aFields[idx++] = {
    label: getLabel('UserId'),
    element: 'fldUserId',
    field: 'userId',
    rField: 'userName',
    isRequired: true,
    defValue: '',
    options: aUser,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('SDate'),
    element: 'fldSDate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('EDate'),
    element: 'fldEDate',
    field: 'edate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('RemindDate'),
    element: 'fldRemindDate',
    field: 'reminddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('ReminderId'),
    getLabel:true,
    element: 'fldReminderId',
    field: 'reminderId',
    rField: 'reminderName',
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('RemindDays'),
    element: 'fldRemindDays',
    field: 'reminddays',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
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

function initTaskActionPhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow2',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteTaskactionPhTableRow
    }
  };
  aColumns[nIdx++] = {
    title: 'id',
    field: 'id',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'Task_Id',
    field: 'taskId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('ActionId'),
    field: 'actionId',
    datatype: 'integer',
    width: '250px',
    component: 'select',
    enabled: true,
    required: false,
    defValue: '',
    options: aAction
  };
  aColumns[nIdx++] = {
    title: getLabel('UserId'),
    field: 'userId',
    width: '250px',
    datatype: 'interger',
    component: 'input',
    required: false,
    enabled: true,
    defValue: "",
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Cpy/Users/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'describtion',
    width: '250px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteTaskactionPhTableRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function initTaskuserPhTable() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow2',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteTaskuserPhTableRow
    }
  };
  aColumns[nIdx++] = {
    title: 'id',
    field: 'id',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'Task_Id',
    field: 'taskId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Status.Name'),
    field: 'statusId',
    datatype: 'integer',
    width: '300px',
    component: 'select',
    enabled: true,
    required: false,
    defValue: '',
    options: aStatus
  };
  aColumns[nIdx++] = {
    title: getLabel('UserId'),
    field: 'userId',
    width: '300px',
    datatype: 'interger',
    component: 'input',
    required: false,
    enabled: true,
    defValue: "",
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Cpy/Users/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '450px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteTaskuserPhTableRow() {
  phForm.phTable.phT1.deleteRow(parseInt($(this).data('row')));
}

