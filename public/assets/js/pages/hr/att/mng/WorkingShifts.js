let phForm;
let nType = 0;
let aType = PhSettings.UsrCodes.EmpWgrpType;
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
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/WorkGroups';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterNew: drawRow, afterEdit: editType};
  phForm = new PhForm('WorkingShifts', metta, options);
  $('#fldTypeId').change(function () {
    changeType();
  });
  drawRow();
  showHeaderSpinner(false);
});

function editType() {
  $('#fldTypeId').prop('disabled', true);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Num'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    defValue: '',
    component: PhFC_Text,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Type'),
    element: 'TypeId',
    field: 'typeId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aType,
    aOpers: aSAOpers
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
    defValue: 0
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aType,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '60'
  };
  return aFields;
}

function initPhTableColumns() {
  var aColumns = [];
  var nIdx = 0;
//  aColumns[nIdx++] = {
//    title: '<i class="icon flaticon-delete p-0"></i>',
//    field: 'delrow',
//    width: '35px',
//    component: 'button',
//    enabled: true,
//    classes: 'btn-danger',
//    format: '<i class="bi bi-trash p-1"></i>',
//    callback: {'event': 'click',
//      'callback': deleteRow
//    }
//  };
  aColumns[nIdx++] = {
    title: getLabel('id'),
    field: 'id',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('wgrpId'),
    field: 'wgrpId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Days'),
    field: 'day',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'display',
    enabled: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('S.Hour'),
    field: 'st1h',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('S.Minute'),
    field: 'st1m',
    datatype: 'integer',
    width: '100px',
    required: false,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('E.Hour'),
    field: 'ed1h',
    datatype: 'integer',
    component: 'input',
    width: '100px',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('E.Minute'),
    field: 'ed1m',
    datatype: 'integer',
    width: '100px',
    required: false,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Add.Hour'),
    field: 'addh',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Add.Minute'),
    field: 'addm',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function drawRow(nRowCount = $('#fldTypeId').val()) {
  let nRow = '';
  for (let i = 0; i < nRowCount; i++) {
    phForm.phTable.phT0.addEmptyRow();
    nRow = parseInt(phForm.phTable.phT0.getRowCount()) - 1;
    phForm.phTable.phT0.setFieldValue(nRow, 'day', parseInt(i + 1));
    phForm.phTable.phT0.setFieldValue(nRow, 'st1h', 9);
    phForm.phTable.phT0.setFieldValue(nRow, 'st1m', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'ed1h', 17);
    phForm.phTable.phT0.setFieldValue(nRow, 'ed1m', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'addh', 8);
    phForm.phTable.phT0.setFieldValue(nRow, 'addm', 0);
  }
  phForm.phTable.phT0.render();
  $('#fldTypeId').prop('disabled', false);
}

async function changeType() {
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
      phForm.phTable.phT0.setData([]);
      if ($('#fldTypeId').val() === '1') {
        drawRow(1);
      } else if ($('#fldTypeId').val() === '2') {
        drawRow(7);
      } else if ($('#fldTypeId').val() === '3') {
        drawRow(31);
      }
    } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      $('#fldTypeId').val(nType);
    }
  });
  nType = $('#fldTypeId').val();
}


