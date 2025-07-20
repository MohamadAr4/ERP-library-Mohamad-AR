/* global swal */
let phForm;
let aStore = [];
let nStoreId = 0;
let aDocument = PhSettings.UsrCodes.StrDocument;
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
  aURL.Api = '/UC/Str/InputMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterEdit: editStore, afterNew: editStore, beforSave: checkValue};
  phForm = new PhForm('Inbound', metta, options);
  $('#fldStorId').change(function () {
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
        $('#fldStorId').val(nStoreId);
      }
    });
  }
  nStoreId = $('#fldStorId').val();
}

function editStore() {
  if ($('#fldId').val() > 0) {
    $('#fldStorId').attr("disabled", true);
  } else {
    $('#fldStorId').attr("disabled", false);
  }
}

function acParams() {
  return {systemId: SystemInv};
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
    dataType: PhFDT_String,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'dDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Store'),
    element: 'StorId',
    field: 'storId',
    component: PhFC_Select,
    defValue: -1,
    options: aStore,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Employee'),
    element: 'Emp',
    field: 'empId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Account'),
    element: 'Acc',
    field: 'accId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/Acc/GrantedAccount/Autocomplete',
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
    element: 'fldVhrId',
    field: 'vhrId',
    defValue: null,
    alert: {
      isOk: alertCheck,
      message: getLabel('The.document.cannot.be.deleted.or.modified'),
      action: alertAction
    }
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
    label: getLabel('Store'),
    element: 'fldStorId',
    field: 'storId',
    rField: 'storName',
    isRequired: true,
    defValue: '1',
    options: aStore,
    tableWidth: 15
  };
  aFields[idx++] = {
    label: getLabel('Document'),
    element: 'fldDocId',
    field: 'docId',
    rField: 'docName',
    isRequired: true,
    defValue: '1',
    options: aDocument,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('his.Num'),
    element: 'fldDocNum',
    field: 'docn',
    isRequired: true,
    defValue: '0',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('his.Date'),
    element: 'fldDocDate',
    field: 'docd',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Account'),
    element: 'fldAccId',
    rElement: 'fldAccName',
    field: 'accId',
    rField: 'accName',
    isRequired: true,
    defValue: '',
    tableWidth: 25
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
    callback: {
      'event': 'click',
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
      return {
        'term': '',
        'storId': $('#fldStorId').val()
      };
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
    callback: {
      'event': 'change',
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
    callback: {
      'event': 'change',
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

function checkValue() {
  for (let i = 0; i < phForm.phTable.phT0.getRowCount(); i++) {
    let nQnt = parseInt(phForm.phTable.phT0.getFieldValue(i, 'qnt'));
    if (nQnt <= 0) {
      phForm.validated = false;
      phForm.phTable.phT0.removeClass(i, '5', 'invalid');
      phForm.phTable.phT0.addClass(i, '5', 'invalid');
      showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Quantity Must be Grater Than 0'));
      break;
    }
  }
}

function alertCheck() {
  let isOk = false;
  if ($('#fldVhrId').val() != '' && $('#fldVhrId').val() != null && $('#fldVhrId').val() != 'null') {
    isOk = true;
  }
  return isOk;
}

function alertAction() {
  $('#ph-submit').addClass('d-none');
  $('#ph-delete').addClass('d-none');
  phForm.saveValidated = false;
  phForm.deleteValidated = false;
}
