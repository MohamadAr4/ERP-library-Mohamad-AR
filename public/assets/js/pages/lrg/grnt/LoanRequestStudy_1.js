/* global swal */
let toogle_1 = 1; // new
let toogle_2 = 2; // search
let toogle_3 = 3; // execute
let toogle_4 = 4; // edit
let phTable = '';
let perantId = '';
let cardId = '';
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
  $('#ph-search').click(function () {
    toogle(toogle_2);
  });
  $('#ph-new').click(function () {
    swal.fire({
      title: getLabel('The Form Will Clear !!'),
      text: getLabel('Are you sure ?'),
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
        toogle(toogle_1);
        $('.collapse').removeClass('show');
      } else if (result.dismiss === "cancel") {
      }
    });
  });
  $('#ph-execute').click(function () {
    toogle(toogle_3);
    drawTable();
  });
  $('#ph-submit').click(function () {
    toogle(toogle_4);
    getData();
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
  $('.sid-Item').click(function () {
    hide();
    $(this).addClass('active');
    $('#' + $(this).data('perant')).addClass('active');
    $('#' + $(this).data('card')).removeClass('d-none');
  });

  initPhTableColumns();
});

function hide() {
  $('.sid-Item').each(function () {
    $(this).removeClass('active');
    $('#' + $(this).data('card')).addClass('d-none');
    $('#' + $(this).data('perant')).removeClass('active');
  });
}

function toogle(toogle) {
  if (toogle === toogle_1) {
    $('#orderCard').removeClass("d-none");
    $('#side-menu').addClass("d-none");
    $('#queryCard').addClass("d-none");
    $('#ph-execute').addClass("d-none");
    $('#ph-search').removeClass("d-none");
    $('#ph-reset').addClass("d-none");
    $('#ph-submit').removeClass("d-none");
    $('#tableCard').addClass("d-none");
    hide();
  } else if (toogle === toogle_2) {
    $('#orderCard').addClass("d-none");
    $('#side-menu').addClass("d-none");
    $('#queryCard').removeClass("d-none");
    $('#ph-execute').removeClass("d-none");
    $('#ph-search').addClass("d-none");
    $('#ph-reset').removeClass("d-none");
    $('#ph-submit').addClass("d-none");
    $('#tableCard').addClass("d-none");
    hide();
  } else if (toogle === toogle_3) {
    $('#orderCard').addClass("d-none");
    $('#side-menu').addClass("d-none");
    $('#queryCard').removeClass("d-none");
    $('#ph-execute').removeClass("d-none");
    $('#ph-search').addClass("d-none");
    $('#ph-reset').removeClass("d-none");
    $('#ph-submit').addClass("d-none");
    $('#tableCard').removeClass("d-none");
  } else if (toogle === toogle_4) {
    $('#orderCard').removeClass("d-none");
    $('#side-menu').removeClass("d-none");
    $('#queryCard').addClass("d-none");
    $('#ph-execute').addClass("d-none");
    $('#ph-search').removeClass("d-none");
    $('#ph-reset').addClass("d-none");
    $('#ph-submit').addClass("d-none");
    $('#tableCard').addClass("d-none");
  }
}

function drawTable() {
  let vHtml = '';
  for (let i = 0; i < aData.length; i++) {
    vHtml += '<tr>';
    vHtml += ' <td>' + parseInt(i + 1) + '</td>';
    vHtml += ' <td>';
    vHtml += '   <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm edit-item" data-id="" data-index="">';
    vHtml += '    <i class="bi bi-pencil"></i>';
    vHtml += '   </a>';
    vHtml += ' </td>';
    for (var j = 1; j <= 15; j++) {
      vHtml += ' <td>' + aData[i]['fld' + j] + ' </td>';
    }
    vHtml += '</tr>';
  }
  $("#tableQuery tbody").html(vHtml);
  $('.edit-item').click(function () {
    toogle(toogle_4);
    getData();
  });
}

function getData() {
  for (var i = 1; i < 16; i++) {
    $('#fld' + i).val(aData[0]['fld' + i]);
  }
}

function initPhTableColumns() {
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
    title: getLabel('المحافظة'),
    field: 'debc',
    datatype: 'decimal',
    width: '120px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: [{id: 0, name: 'دمشق'}, {id: 1, name: 'ريف دمشق'}, {id: 2, name: 'حلب'}]
  };
  aColumns[nIdx++] = {
    title: getLabel('مدينة'),
    field: 'crdc',
    datatype: 'decimal',
    width: '130px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('منطقة'),
    field: 'crdc',
    datatype: 'decimal',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('شارع(حي)'),
    field: 'crdc',
    datatype: 'decimal',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('رقم'),
    field: 'crdc',
    datatype: 'decimal',
    width: '120px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('بناء رقم'),
    field: 'crdc',
    datatype: 'decimal',
    width: '130px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: ''
  };
  phTable = new PhTable('add1-phTable', aColumns, [], {widthType: PhTable_WIDTH_FIXED, addRowBtn: true});
  phTable.setHeight(20);
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}