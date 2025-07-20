/* global Highcharts, pieColors, FullCalendar */
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aAction = PhSettings.CpyCodes.CpyTaskAction,
        aUnit = [],
        aCalendar = [],
        Task_action_PhTable = [],
        Task_user_PhTable = [],
        aDepartments = [];
let calendar = '';
let aBlocks = [];
/****************/
let dataLine = {};
dataLine.title = "chartLine",
        dataLine.subtype = "line",
        dataLine.subtitle = "fix",
        dataLine.Ytitle = "quntity",
        dataLine.Xtitle = "month",
        dataLine.xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        dataLine.yAxis = ['1', '2', '3', '4', '5', '6', '7'],
        dataLine.series = [
          {
            name: 'قروض تأسيس',
            data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4]
          },
          {
            name: 'قروض تجديد',
            data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6]
          }
        ];
let dataColumn = {};
dataColumn.title = "chartColumn",
        dataColumn.subtype = "column",
        dataColumn.subtitle = "fix",
        dataColumn.Ytitle = "quntity",
        dataColumn.Xtitle = "month",
        dataColumn.xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        dataColumn.yAxis = ['1', '2', '3', '4', '5', '6', '7'],
        dataColumn.series = [
          {
            name: 'قروض تأسيس',
            data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4]
          },
          {
            name: 'قروض تجديد',
            data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6]
          }
        ];
let dataPie = {};
dataPie.title = "chartPie",
        dataPie.subtype = "pie",
        dataPie.subtitle = "fix",
        dataPie.Ytitle = "quntity",
        dataPie.Xtitle = "month",
        dataPie.xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        dataPie.yAxis = ['1', '2', '3', '4', '5', '6', '7'],
        dataPie.series = [
          {
            name: "نسبة القروض",
            data: [
              {name: "دمشق", y: 25},
              {name: "حلب", y: 20},
              {name: "حمص", y: 18},
              {name: "اللاذقية", y: 15},
              {name: "طرطوس", y: 12},
              {name: "المنطقة الشرقية", y: 10}
            ]
          }];
let dataexersize = [
  dataColumn,
  dataLine,
  dataPie
];
/********************/
jQuery(document).ready(function () {
  $('.swapIcon').on('click', function () {
    if ($(this).hasClass('bi-chevron-down')) {
      $(this).removeClass('bi-chevron-down');
      $(this).addClass('bi-chevron-up');
    } else {
      $(this).removeClass('bi-chevron-up');
      $(this).addClass('bi-chevron-down');
    }
  });
  $('#ph-modal-submit').click(function (e) {
    e.preventDefault();
    save();
  });
  $('#ph-modal-delete').click(function (e) {
    e.preventDefault();
    deleteTask();
  });
  getDashBoardBlocks();
  callTaskFunction();
});

/* Progressar */

function renderBlockProgress(dataprogress) {
  let vHtml = '';
  vHtml += `<div class="col-sm-3">`;
  vHtml += `<div class="card card-custom  shadow-primary">`;
  vHtml += `<div class="card-body ">`;
  vHtml += `<h6 class="card-title"> ${dataprogress.title} </h6>`;
  vHtml += `<div class="row">`;
  vHtml += `<label class="col-12 px-3 py-2"> ${dataprogress.label}</label>`;
  vHtml += `</div>`;
  vHtml += `<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 8px">`;
  vHtml += `<div class="progress-bar" style="width:25%"></div>`;
  vHtml += `</div>`;
  vHtml += `<div class="row  pt-2">`;
  vHtml += `<label class="col-6 text-start">${dataprogress.value1}</label>`;
  vHtml += `<label class="col-6 text-end">${dataprogress.value2} </label>`;
  vHtml += `</div>`;
  vHtml += `</div>`;
  vHtml += `</div>`;
  vHtml += `</div>`;
  $('#progressBar').append(vHtml);
}


/******** Calender *********/
function renderaCalendar() {

  let calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'ar',
    direction: 'rtl',
    initialDate: reverseString(currentDate()),
    headerToolbar: {
      left: 'custom1 today prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      locale: 'ar'
    }, buttonText: {
      today: "اليوم ",
      month: "الشهر",
      week: "الاسبوع",
      day: "اليوم",
      list: "لائحة"
    }, eventClick: function (info) {
      getinfo(info.event.id);
    }, titleFormat: {// will produce something like "Tuesday, September 18, 2018"
      month: 'numeric',
      year: 'numeric'
    },
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    selectable: true,
    events: aCalendar,
    customButtons: {
      custom1: {
        text: getLabel('Add Task'),
        icon: 'bi bi-plus-lg',
        click: openTaskModel
      },
      custom2: {
        text: 'custom 2',
        click: function () {
          alert('clicked custom button 2!');
        }
      }
    }
  });
  calendar.formatDate('2001-10-10', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });

  calendar.render();
}

function getinfo(id) {
  $('#ph-modal-delete').removeClass('d-none');

  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/Task/' + id,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        $('#fldId').val(response.data.Obj.id);
        $('#fldName').val(response.data.Obj.name);
        $('#fldUserName').val(response.data.Obj.userName);
        $('#fldPriorityId').val(response.data.Obj.priorityId);
        $('#fldStatusId').val(response.data.Obj.statusId);
        $('#fldPrivacyId').val(response.data.Obj.privacyId);
        $('#fldDeptId').val(response.data.Obj.deptId);
        $('#fldUnitId').val(response.data.Obj.unitId);
        $('#fldReminderId').val(response.data.Obj.reminderId);
        $('#fldCompPerc').val(response.data.Obj.compPerc);
        $('#fldRemindDays').val(response.data.Obj.reminddays);
        $('#fldRem').val(response.data.Obj.rem);
        $('#fldSDate').val(response.data.Obj.insDate);
        $('#fldRemindDate').val(response.data.Obj.reminddate);
        $('#fldEDate').val(response.data.Obj.edate);
        $('#taskModal').modal('show');
        Task_user_PhTable.setData(response.data.Obj.aList1);
        Task_action_PhTable.setData(response.data.Obj.aList);
      } else if (response.status && response.code === 204) {

      }
    }
  });
}

function getDepartments() {
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
          aDepartments[i] = {};
          aDepartments[i].id = response.data.List[i].id;
          aDepartments[i].name = response.data.List[i].name;
        }
      }
    },
    error: function (response) {
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

    },
    error: function (response) {
    }
  });
}

function renderSelect() {
  let vHtml = '';
  for (let i = 0; i < aStatus.length; i++) {
    vHtml += '<option value="' + aStatus[i].id + '">' + getLabel(aStatus[i].name) + '</option>';
  }
  $('#fldPriorityId').html(vHtml);
  $('#fldStatusId').html(vHtml);
  $('#fldPrivacyId').html(vHtml);
  $('#fldReminderId').html(vHtml);

  vHtml = '';
  for (let i = 0; i < aDepartments.length; i++) {
    vHtml += '<option value="' + aDepartments[i].id + '">' + aDepartments[i].name + '</option>';
  }
  $('#fldDeptId').html(vHtml);
  vHtml = '';
  for (let i = 0; i < aUnit.length; i++) {
    vHtml += '<option value="' + aUnit[i].id + '">' + aUnit[i].name + '</option>';
  }
  $('#fldUnitId').html(vHtml);
}

function openTaskModel() {
  let x = 0;
  $('#fldId').val(x);
  $('#fldName').val('');
  $('#fldUserName').val();
  $('#fldPriorityId').val($('#fldPriorityId option:first').val());
  $('#fldStatusId').val($('#fldStatusId option:first').val());
  $('#fldPrivacyId').val($('#fldPrivacyId option:first').val());
  $('#fldDeptId').val($('#fldDeptId option:first').val());
  $('#fldUnitId').val($('#fldDeptId option:first').val());
  $('#fldReminderId').val($('#fldReminderId option:first').val());
  $('#fldCompPerc').val('');
  $('#fldRemindDays').val('');
  $('#fldRem').val('');
  $('#fldSDate').val(currentDate());
  $('#fldRemindDate').val(currentDate());
  $('#fldEDate').val(currentDate());
  $('#ph-modal-delete').addClass('d-none');
  Task_user_PhTable.setData([]);
  Task_action_PhTable.setData([]);
  $('#taskModal').modal('show');
}

function getData() {
  let OData = {};
  OData.id = $('#fldId').val();
  OData.userId = PhSettings.GUId.UId;
  OData.taskId = 0;
  OData.priorityId = $('#fldPriorityId').val();
  OData.statusId = $('#fldStatusId').val();
  OData.privacyId = $('#fldPrivacyId').val();
  OData.compPerc = $('#fldCompPerc').val();
  OData.reminderId = $('#fldReminderId').val();
  OData.deptId = $('#fldDeptId').val();
  OData.unitId = $('#fldUnitId').val();
  OData.sdate = $('#fldSDate').val();
  OData.edate = $('#fldEDate').val();
  OData.reminddate = $('#fldRemindDate').val();
  OData.reminddays = $('#fldRemindDays').val();
  OData.name = $('#fldName').val();
  OData.rem = $('#fldRem').val();

  OData.childs = {};
  OData.childs.child = {};
  OData.childs.child.aRows = Task_action_PhTable.getRows();
  OData.childs.child.forDelete = Task_action_PhTable.getDeleted();

  OData.childs.child1 = {};
  OData.childs.child1.aRows = Task_user_PhTable.getRows();
  OData.childs.child1.forDelete = Task_user_PhTable.getDeleted();

  return OData;
}

function save() {
  if (isValidForm('taskModalForm')) {
    if ($('#fldId').val() > 0) {
      $.ajax({
        type: 'PUT',
        async: false,
        url: PhSettings.apiURL + '/UC/Cpy/Task/',
        headers: PhSettings.Headers,
        data: JSON.stringify(getData()),
        success: function (response) {
          if (response.status && response.code === 200) {
            showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
            $('#taskModal').modal('hide');
            getTask();
            renderaCalendar();
          } else {

          }
        }
      });
    } else if (parseInt($('#fldId').val()) === 0) {
      $.ajax({
        type: 'POST',
        async: false,
        url: PhSettings.apiURL + '/UC/Cpy/Task/New',
        headers: PhSettings.Headers,
        data: JSON.stringify(getData()),
        success: function (response) {
          if (response.status && response.code === 200) {
            $('#taskModal').modal('hide');
            showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel(response.message));
            getTask();
            renderaCalendar();
          } else if (response.status && response.code === 204) {
            showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
          }
        }
      });
    }
  }

}

function getTask() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/Task/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aCalendar[i] = {};
          aCalendar[i].id = response.data.List[i].id;
          aCalendar[i].title = response.data.List[i].name;
          aCalendar[i].start = reverseString(response.data.List[i].sdate);
          aCalendar[i].end = reverseString(response.data.List[i].edate);
        }
        renderaCalendar();
      }
    },
    error: function (response) {
    }
  });
}

function deleteTask() {
  $.ajax({
    type: 'DELETE',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/Task/' + $('#fldId').val(),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        $('#taskModal').modal('hide');
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        getTask();
        renderaCalendar();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', getLabel(response.message));
      }
    },
    error: function (response) {
    }
  });
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
  Task_action_PhTable = new PhTable('TaskactionPhTable', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  Task_action_PhTable.setHeight(25);

}

function deleteTaskactionPhTableRow() {
  Task_action_PhTable.deleteRow(parseInt($(this).data('row')));
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
  Task_user_PhTable = new PhTable('TaskuserPhTable', aColumns, [], {widthType: PhTable_WIDTH_VARIABLE, addRowBtn: true});
  Task_user_PhTable.setHeight(25);
}

function deleteTaskuserPhTableRow() {
  Task_user_PhTable.deleteRow(parseInt($(this).data('row')));
}

function callTaskFunction() {
  renderaCalendar();
  getTask();
  getUnit();
  getDepartments();
  renderSelect();
  initTaskActionPhTable();
  initTaskuserPhTable();
}

/*********************/

/**** charts*******/

function getDashBoardBlocks() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Phs/DashboardBlocks/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        aBlocks = response.data.List;
        getDataBlock();
      }
    },
    error: function (response) {
    }
  });
}

function getDataBlock() {
  let oBlock = {};
  for (let i = 0; i < aBlocks.length; i++) {
    oBlock = aBlocks[i];
    $.ajax({
      type: oBlock.method,
      async: false,
      url: PhSettings.apiURL + oBlock.url,
      headers: PhSettings.Headers,
      success: function (response) {
        if (response.status && response.code === 200) {
          renderBlock(oBlock);
          let vHtml = '';
          if (parseInt(oBlock.typeId) === DashBlockType_Table) {
            vHtml = '' + renderTable(oBlock, response.data.report);
            $(`#card-Body-${oBlock.id}`).append(vHtml);
          } else if (parseInt(oBlock.typeId) === DashBlockType_Chart) {
            $(`#chart-${oBlock.id}`).removeAttr("style");
            renderChar(oBlock, dataexersize[i - 1]);
          }
        }
      }, error: function (response) {
      }
    });
  }
}

function renderBlock(oBlock) {
  let vHtml = '';
  vHtml += `<div class="col-sm-${oBlock.col} mb-2">`;
  vHtml += `  <div class="card card-custom">`;
  vHtml += `    <div class="card-header pb-0">`;
  vHtml += `      <div class="col-sm-10 d-flex align-items-center justify-content-start justify-content-sm-start">`;
  vHtml += `        <h6>${getLabel(oBlock.title)}</h6>`;
  vHtml += `      </div>`;
  vHtml += `    </div>`;
  vHtml += `    <div id="card-Body-${oBlock.id}" class="card-body overflow-auto p-0" style="max-height: 40vh;">`;
  vHtml += `    </div>`;
  vHtml += `  </div>`;
  vHtml += `</div>`;
  $('#blocks').append(vHtml);
}

function getTableStyle(obj) {
  let vStyle = '';
  if (obj !== undefined) {
    Object.keys(obj).forEach(key => {
      vStyle += key + ':' + obj[key] + ' !important;';
    });
  }
  return vStyle;
}

function getTableAttribute(obj) {
  let vAttribute = '';
  if (obj !== undefined && obj !== null) {
    Object.keys(obj).forEach(key => {
      vAttribute += key + '=' + obj[key] + ' ';
    });
  }
  return vAttribute;
}

function renderTableHead(obj) {
  let vHtml = '';
  vHtml += '<thead class="bg-secondary-subtle" style="' + getTableStyle(obj.header.style) + ' position: sticky !important; top: 0 !important;">';
  for (let i = 0; i < obj.header.length; i++) {
    vHtml += '  <tr>';
    if (typeof obj.aEvents === "function") {
      vHtml += '<td></td>';
    }
    for (let j = 0; j < obj.header[i].cells.length; j++) {
      vHtml += ' <td style="' + getTableStyle(obj.header[i].cells[j].style) + '"  ' + getTableAttribute(obj.header[i].cells[j].attribute) + '>' + getLabel(obj.header[i].cells[j].name) + '</td>';
    }
    vHtml += '  </tr>';
  }
  vHtml += '</thead>';
  return vHtml;
}

function renderTableBody(obj) {
  let vHtml = '';
  vHtml += '<tbody>';
  for (let i = 0; i < obj.rows.length; i++) {
    vHtml += '<tr style="' + getTableStyle(obj.rows[i].style) + '">';
    if (typeof obj.aEvents === "function") {
      vHtml += ' <td style="width: 35px;">';
      if (obj.rows[i].obj.hasOwnProperty('actionRId')) {
        vHtml += '   <a href="javascript:;" class="btn btn-info toolbar-btn btn-sm action-item" data-index="' + i + '" data-bs-title="" title="">';
        vHtml += '    <i class="bi bi-lightning"></i>';
        vHtml += '   </a>';
      }
      vHtml += ' </td>';
    }
    for (let j = 0; j < obj.rows[i].cells.length; j++) {
      if (obj.rows[i].cells[j].value === null || obj.rows[i].cells[j].value === 'null') {
        vHtml += ' <td style="' + getTableStyle(obj.rows[i].cells[j].style) + '"> </td>';
      } else {
        vHtml += ' <td style="' + getTableStyle(obj.rows[i].cells[j].style) + '"  ' + getTableAttribute(obj.rows[i].cells[j].attribute) + '> ' + getLabel(obj.rows[i].cells[j].value) + '</td>';
      }
    }
    vHtml += '</tr>';
  }
  vHtml += '</tbody>';
  return vHtml;
}

function renderTableFooter(obj) {
  let vHtml = '';
  vHtml += '<tfoot class="bg-secondary-subtle" style="' + getTableStyle(obj.Footers.style) + ' position: sticky !important; bottom: 0 !important;">';
  for (let i = 0; i < obj.Footers.length; i++) {
    vHtml += '  <tr>';
    if (typeof obj.aEvents === "function") {
      vHtml += '<td></td>';
    }
    for (let j = 0; j < obj.Footers[i].cells.length; j++) {
      vHtml += '<td style="' + getTableStyle(obj.Footers[i].cells[j].style) + '"  ' + getTableAttribute(obj.Footers[i].cells[j].attribute) + '>' + getLabel(obj.Footers[i].cells[j].value) + '</td>';
    }
    vHtml += '  </tr>';
  }
  vHtml += '</tfoot>';
  return vHtml;
}

function renderTable(block, dataBlock) {
  let vHtml = '';
  vHtml += ' <table id="' + block.name + 'TableData" class="table table-bordered table-striped text-center" style="min-width: max-content; white-space: nowrap;">';
  vHtml += '' + renderTableHead(dataBlock);
  vHtml += '' + renderTableBody(dataBlock);
  if (dataBlock.hasOwnProperty('Footers')) {
    vHtml += '' + renderTableFooter(dataBlock);
  }
  vHtml += '</table>';
  return vHtml;
}

function renderChar(block, dataBlock) {
  if (dataBlock.subtype === 'line') {
    renderCharLine(block, dataBlock);
  } else if (dataBlock.subtype === 'column') {
    renderCharColumn(block, dataBlock);
  } else if (dataBlock.subtype === 'pie') {
    renderCharPie(block, dataBlock);
  }
}

function renderCharLine(block, datas) {
  Highcharts.chart('card-Body-' + block.id, {
    credits: '',
    chart: {
      type: 'line'
    },
    title: {
      text: datas.title
    },
    subtitle: {
      text: datas.subtitle
    },
    xAxis: {
      title: {
        text: datas.Xtitle
      },
      categories: datas.xAxis
    },
    yAxis: {
      title: {
        text: datas.Ytitle
      },
      categories: datas.yAxis
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: datas.series
  });
}

function renderCharColumn(block, datas) {
  Highcharts.chart('card-Body-' + block.id, {
    credits: '',
    chart: {
      type: "column"
    },
    title: {
      text: datas.title
    },
    subtitle: {
      text: datas.subtitle
    },
    xAxis: {
      categories: datas.xAxis,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: datas.Ytitle
      }},
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr>'
              + '<td style="color:{series.color};padding:0">{series.name}: </td>'
              + '<td style="padding:0"><b>{point.y:.1f}</b></td>'
              + '</tr>',
      footerFormat: "", //<table><tr><td>Footer test</td></tr></table>",
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: datas.series
  });
}

function renderCharPie(block, datas) {
  Highcharts.chart('card-Body-' + block.id, {
    credits: '',
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: true,
      type: "pie"
    },
    title: {
      text: datas.title,
      align: "center"
    },
    tooltip: {
      pointFormat: ""
    },
    accessibility: {
      point: {
        valueSuffix: ""
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors,
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
          distance: -50,
          filter: {
            property: "percentage",
            operator: ">",
            value: 4
          }}}
    },
    series: datas.series
  });
}

var pieColors = (function () {
  var colors = [],
          base = Highcharts.getOptions().colors[0],
          i;
  for (i = 0; i < 10; i += 1) {
// Start out with a darkened base color (negative brighten), and end
// up with a much brighter color
    colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
  }
  return colors;
}());

