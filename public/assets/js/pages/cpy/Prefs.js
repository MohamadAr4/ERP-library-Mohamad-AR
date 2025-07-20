/* global PhSettings, PhTabulatorLocale, swal, KTUtil, PhUtility */
let table;
jQuery(document).ready(function () {
  $('#ph_add').on('click', function () {
    openNew();
  });
  $('#ph_submit').on('click', function () {
    save();
  });
  $('.ph_export').on('click', function () {
    let type = parseInt($(this).data('type'));
    let fileName = $(this).data('file');
    ph_export(table, type, fileName);
  });
  refreshList();
});

function openNew() {
  $('#ph_Form').trigger('reset');
  $('#fldId').val(0);
  $('#fldKey').val('');
  $('#fldName').val('');
  $('#fldValue').val('');
  $('#fldRem').val('');
  $('#ph_Modal').modal('show');
}

function save() {
  let form = KTUtil.getById('ph_Form');
  form.classList.remove('was-validated');
  if (form.checkValidity()) {
    PhUtility.doSave({
      'vOperation': 'cpy-Copy-Prefrences-Save',
      'nId': $('#fldId').val(),
      'vKey': $('#fldKey').val(),
      'vName': $('#fldName').val(),
      'vValue': $('#fldValue').val(),
      'vRem': $('#fldRem').val(),
    }, refreshList);
  } else {
    form.classList.add('was-validated');
  }
}

function cellEditClick(e, cell) {
  let data = cell.getData();
  $('#fldId').val(data.nId);
  $('#fldKey').val(data.vKey);
  $('#fldName').val(data.vName);
  $('#fldValue').val(data.vValue);
  $('#fldRem').val(data.vRem);
  $('#ph_Modal').modal('show');
}

function cellDeleteClick(e, cell) {
  let data = cell.getData();
  PhUtility.doDelete(data.vName, {
    'vOperation': 'cpy-Copy-Prefrences-Delete',
    'nId': data.nId
  }, refreshALL);
}

function refreshALL() {
  refreshList();
}
function refreshList() {
  let aColumns = [];
  let nIdx = 0;
  if (PhSettings.current.update) {
    aColumns[nIdx++] = {
      title: getLabel(''),
      width: '4%',
      hozAlign: 'center',
      headerHozAlign: 'center',
      headerSort: false,
      formatter: function (cell, formatterParams) {
        return PhUtility.editButton();
      },
      cellClick: cellEditClick
    };
  }
  aColumns[nIdx++] = {
    title: getLabel('Key'),
    field: 'vKey',
    hozAlign: 'left',
    headerHozAlign: 'center',
    headerFilter: 'input',
    formatter: 'textarea'
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'vName',
    hozAlign: 'left',
    headerHozAlign: 'center',
    headerFilter: 'input',
    formatter: 'textarea'
  };
  aColumns[nIdx++] = {
    title: getLabel('Value'),
    field: 'vValue',
    hozAlign: 'left',
    headerHozAlign: 'center',
    headerFilter: 'input',
    formatter: 'textarea'
  };
  aColumns[nIdx++] = {
    title: getLabel('Remarks'),
    field: 'vRem',
    hozAlign: 'left',
    headerHozAlign: 'center',
    headerFilter: 'input',
    formatter: 'textarea'
  };
  if (PhSettings.current.delete) {
    aColumns[nIdx++] = {
      title: getLabel(''),
      width: '4%',
      hozAlign: 'center',
      headerHozAlign: 'center',
      headerSort: false,
      formatter: function (cell, formatterParams) {
        return PhUtility.deleteButton();
      },
      cellClick: cellDeleteClick
    };
  }
  table = getAjaxTabulator('cpy-Copy-Prefrences-List', aColumns);
}
