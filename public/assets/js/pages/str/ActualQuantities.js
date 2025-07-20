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
  aURL.Api = '/UC/Str/ActualMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, beforEdit: editStore, afterNew: editStore};
  phForm = new PhForm('ActualQuantities', metta, options);
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
    label: getLabel('Document'),
    element: 'Document',
    field: 'docId',
    component: PhFC_Select,
    defValue: -1,
    options: aDocument,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('his.Num'),
    element: 'DocNum',
    field: 'docn',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('his.Date'),
    element: 'docDate',
    field: 'docD',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Responsible'),
    element: 'Responsible',
    field: 'responsible',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: aTOpers
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
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Store'),
    element: 'fldStorId',
    field: 'storId',
    rField: 'storName',
    isRequired: true,
    defValue: '1',
    options: aStore,
    tableWidth: '150px'
  };

  aFields[idx++] = {
    label: getLabel('Document'),
    element: 'fldDocId',
    field: 'docId',
    rField: 'docName',
    isRequired: true,
    defValue: '1',
    options: aDocument,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('his.Num'),
    element: 'fldDocNum',
    field: 'docn',
    isRequired: true,
    defValue: '',
    tableWidth: '75px'
  };
  aFields[idx++] = {
    label: getLabel('his.Date'),
    element: 'fldDocDate',
    field: 'docd',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Responsible'),
    element: 'fldResponsible',
    field: 'responsible',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Remark'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Ins.Date'),
    element: 'insDate',
    field: 'insDate',
    defValue: '',
    tableWidth: '150px'
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
      'callback': ''
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '700px',
    component: 'input',
    enabled: true
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}
