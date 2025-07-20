/* global swal */
let phForm;
let aStore = [];
let nStoreFId = 0;
let nStoreTId = 0;
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
  getStore();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Str/TransferMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterEdit: editStore, afterNew: editStore};
  phForm = new PhForm('Transfer', metta, options);
  $('#fldStorFId ,#fldStorTId').on('change', function () {
    changeStore();
  });
});

async function changeStore() {
  if (phForm.phTable.phT0.aRows.length > 0) {
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
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
        $('#fldStorFId').val(nStoreFId);
      }
    });
  }
  nStoreTId = $('#fldStorTId').val();
}

function editStore() {
  if ($('#fldId').val() > 0) {
    $('#fldStorFId').attr("disabled", true);
    $('#fldStorTId').attr("disabled", true);
  } else {
    $('#fldStorFId').attr("disabled", false);
    $('#fldStorTId').attr("disabled", false);
  }
}

function getStore() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Str/Stores/List',
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
          aStore[i] = {};
          aStore[i].id = response.data.List[i].id;
          aStore[i].name = response.data.List[i].name;
        }
      }
      showHeaderSpinner(false);
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'ddate',
    component: PhFC_DatePicker,
    dataType: PhFDT_Date,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('From.Store'),
    element: 'StorFId',
    field: 'storFId',
    component: PhFC_Select,
    defValue: -1,
    options: aStore,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('To.Store'),
    element: 'StorTId',
    field: 'storTId',
    component: PhFC_Select,
    defValue: -1,
    options: aStore,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
    dataType: PhFDT_String,
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
    defValue: 0
  };
  aFields[idx++] = {
    element: 'fldPeriod',
    field: 'periodId',
    isRequired: false,
    value: PhSettings.Period.Id
  };
  aFields[idx++] = {
    label: getLabel('Number'),
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
    label: getLabel('From.Store'),
    element: 'fldStorFId',
    field: 'storfId',
    rField: 'storfName',
    isRequired: true,
    defValue: '1',
    options: aStore,
    tableWidth: 15
  };
  aFields[idx++] = {
    label: getLabel('To.Store'),
    element: 'fldStorTId',
    field: 'stortId',
    rField: 'stortName',
    isRequired: true,
    defValue: '1',
    options: aStore,
    tableWidth: 15
  };
  aFields[idx++] = {
    label: getLabel('Remark'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: ''
  };
  return aFields;
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
    title: 'MstId',
    field: 'mstId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'ord',
    field: 'ord',
    visible: false,
    component: 'input',
    defValue: 0,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('Item'),
    field: 'itemId',
    rfield: 'itemName',
    width: '400px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Str/StoreItems/Autocomplete',
    ajaxData: function () {
      return{
        'term': '',
        'storId': $('#fldStorId').val()};
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Quantity'),
    field: 'qnt',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 1,
    callback: {'event': 'change',
      'callback': onChangeQnt
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Price'),
    field: 'price',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 0,
    callback: {'event': 'change',
      'callback': onChangePrice
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Amount'),
    field: 'amt',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '400px',
    component: 'input',
    enabled: true
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function onChangeQnt() {
  var nRow = $(this).data('row');
  var nQnt = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'qnt'));
  var nPrice = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'price'));
  if (nQnt === 'NaN' || nQnt <= 0 || nPrice === 'NaN' || nPrice <= 0) {
    return false;
  }
  phForm.phTable.phT0.setFieldValue(nRow, 'amt', nQnt * nPrice);
}

function onChangePrice() {
  var nRow = $(this).data('row');
  var nQnt = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'qnt'));
  var nPrice = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'price'));
  if (nQnt === 'NaN' || nQnt <= 0 || nPrice === 'NaN') {
    return false;
  }
  phForm.phTable.phT0.setFieldValue(nRow, 'amt', nQnt * nPrice);
}
