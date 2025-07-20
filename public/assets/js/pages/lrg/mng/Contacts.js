/* global swal */
let phTable1 = '';
let phTable2 = '';
let phTable3 = '';
let aData = [{'fld1': 'aaaaaaa', 'fld2': 'aaaaaaa',
    'fld3': 'aaaaaaa', 'fld4': 'aaaaaaa',
    'fld5': 'aaaaaaa', 'fld6': 'aaaaaaa',
    'fld7': 'aaaaaaa', 'fld8': 'aaaaaaa',
    'fld9': 'aaaaaaa', 'fld10': 'aaaaaaa',
    'fld11': 'aaaaaaa', 'fld12': 'aaaaaaa',
    'fld13': 'aaaaaaa', 'fld14': 'aaaaaaa',
    'fld15': 'aaaaaaa'},
  {'fld1': 'aaaaaaa', 'fld2': 'aaaaaaa',
    'fld3': 'aaaaaaa', 'fld4': 'aaaaaaa',
    'fld5': 'aaaaaaa', 'fld6': 'aaaaaaa',
    'fld7': 'aaaaaaa', 'fld8': 'aaaaaaa',
    'fld9': 'aaaaaaa', 'fld10': 'aaaaaaa',
    'fld11': 'aaaaaaa', 'fld12': 'aaaaaaa',
    'fld13': 'aaaaaaa', 'fld14': 'aaaaaaa',
    'fld15': 'aaaaaaa'},
  {'fld1': 'aaaaaaa', 'fld2': 'aaaaaaa',
    'fld3': 'aaaaaaa', 'fld4': 'aaaaaaa',
    'fld5': 'aaaaaaa', 'fld6': 'aaaaaaa',
    'fld7': 'aaaaaaa', 'fld8': 'aaaaaaa',
    'fld9': 'aaaaaaa', 'fld10': 'aaaaaaa',
    'fld11': 'aaaaaaa', 'fld12': 'aaaaaaa',
    'fld13': 'aaaaaaa', 'fld14': 'aaaaaaa',
    'fld15': 'aaaaaaa'}];
jQuery(document).ready(function () {
  jqReady();
  $('#fldTypeId').change(function () {
    changeField();
  });
  $('.collapses').click(function () {
    if ($("#" + $(this).data('icon')).hasClass("bi bi-chevron-up")) {
      $("#" + $(this).data('icon')).removeClass("bi bi-chevron-up");
      $("#" + $(this).data('icon')).addClass("bi bi-chevron-down");
    } else {
      $("#" + $(this).data('icon')).removeClass("bi bi-chevron-down");
      $("#" + $(this).data('icon')).addClass("bi bi-chevron-up");
    }
    $('#' + $(this).data('section')).animate({
      height: 'toggle'
    });
  });
});

function jqReady() {
  $('.collapses').each(function () {
    $('#' + $(this).data('section')).hide();
  });
  $('.cType').attr('disabled', true);
  initPhTableColumns1();
  initPhTableColumns2();
  initPhTableColumns3();
}

function changeField() {
  if (parseInt($('#fldTypeId').val()) === 1) {
    $('.pType').attr('disabled', false);
    $('.cType').attr("disabled", true);
    $('#partnerTab').addClass('disabled');
  } else if (parseInt($('#fldTypeId').val()) === 2) {
    $('.pType').attr('disabled', true);
    $('.cType').attr('disabled', false);
    $('#partnerTab').removeClass('disabled');
  }
}

function initPhTableColumns1() {
  var aColumns = [];
  var nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow
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
    title: getLabel('Type'),
    field: 'debc',
    datatype: 'decimal',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: [{id: 0, name: 'هاتف'}, {id: 1, name: 'جوال'}, {id: 2, name: 'فاكس'}, {id: 3, name: 'بريد الكتروني'}]
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'crdc',
    datatype: 'string',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Num'),
    field: 'crdc',
    datatype: 'string',
    width: '280px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Desc'),
    field: 'crdc',
    datatype: 'string',
    width: '500px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  phTable1 = new PhTable('phTable1', aColumns, [], {widthType: PhTable_WIDTH_FIXED, addRowBtn: true});
  phTable1.setHeight(30);
}

function deleteRow() {
  phTable.deleteRow(parseInt($(this).data('row')));
}

function initPhTableColumns2() {
  var aColumns = [];
  var nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow
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
    title: getLabel('Type'),
    field: 'debc',
    datatype: 'decimal',
    width: '120px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: [{id: 0, name: 'عمل'}, {id: 1, name: 'سكن'}]
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'crdc',
    datatype: 'string',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('City'),
    field: 'crdc',
    datatype: 'string',
    width: '150px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Street.Num'),
    field: 'crdc',
    datatype: 'string',
    width: '150px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Building.Num'),
    field: 'crdc',
    datatype: 'string',
    width: '150px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Address'),
    field: 'crdc',
    datatype: 'string',
    width: '420px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  phTable2 = new PhTable('phTable2', aColumns, [], {widthType: PhTable_WIDTH_FIXED, addRowBtn: true});
  phTable2.setHeight(30);
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function initPhTableColumns3() {
  var aColumns = [];
  var nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow
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
    title: getLabel('Type'),
    field: 'debc',
    datatype: 'decimal',
    width: '120px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: [{id: 0, name: 'عمل'}, {id: 1, name: 'سكن'}]
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'crdc',
    datatype: 'string',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('City'),
    field: 'crdc',
    datatype: 'string',
    width: '150px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Street.Num'),
    field: 'crdc',
    datatype: 'string',
    width: '150px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Building.Num'),
    field: 'crdc',
    datatype: 'string',
    width: '150px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Address'),
    field: 'crdc',
    datatype: 'string',
    width: '420px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  phTable3 = new PhTable('phTable3', aColumns, [], {widthType: PhTable_WIDTH_FIXED, addRowBtn: true});
  phTable3.setHeight(30);
}

function deleteRow() {
  phForm.phTable.phT1.deleteRow(parseInt($(this).data('row')));
}