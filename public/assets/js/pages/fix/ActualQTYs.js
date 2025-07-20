let phForm;
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
  aURL.Api = '/UC/Fix/ActualMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: phTable};
  phForm = new PhForm('ActualQTYs', metta, options);
  showHeaderSpinner(false);
});

function acParams() {
  return {systemId: SystemFIX};
}

function getaQFields() {
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
    element: 'dDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
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
    defValue: 0
  };
  aFields[idx++] = {
    element: 'fldPeriod',
    field: 'periodId',
    isRequired: false,
    value: parseInt(PhSettings.Period.Id)
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: false,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '50'
  };
  return aFields;
}

function initPhTableColumns() {
  let aColumns = [];
  let nIdx = 0;
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
    title: 'Id',
    field: 'id',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'MstId',
    field: 'fmstId',
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
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Serial'),
    field: 'ftrnId',
    width: '150px',
    component: 'input',
    componentType: 'text',
    enabled: true,
    required: false,
    defValue: '',
    callback: {'event': 'change',
      'callback': getAsset
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Number'),
    field: 'fixdId',
    datatype: 'integer',
    visible: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Asset'),
    field: 'fixdFname',
    datatype: 'string',
    width: '250px',
    component: 'input',
    enabled: false,
    required: true,
    isSent: false,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Quantity'),
    field: 'qnt',
    datatype: 'decimal',
    width: '100px',
    aggregate: 'sum',
    component: 'input',
    componentType: 'text',
    enabled: true,
    required: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '700px',
    component: 'input',
    componentType: 'text',
    enabled: true,
    required: false,
    defValue: ''
  };
  return aColumns;
}

function deleteRow() {
  let nId = parseInt(phForm.phTable.phT0.getFieldValue($(this).data('row'), 'ftrnId'));
  $("#check" + nId).prop("checked", false);
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function getAsset() {
  let nRow = $(this).data('row');
  let nTrnId = parseInt(phForm.phTable.phT0.getFieldValue(nRow, 'ftrnId'));
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Fix/InputTrans/' + nTrnId,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(),
    success: function (response) {
      if (response.status && parseInt(response.code) === 200 && response.data.List !== []) {
        aData = response.data.Obj;
        getQueryData(nRow);
      } else {
        phForm.phTable.phT0.setFieldValue(nRow, 'fixdId', '');
        phForm.phTable.phT0.setFieldValue(nRow, 'fixdFname', 'رقم التسلسلي غير صحيح');
      }
    },
    error: function (response) {
    }
  });
}

function getQueryData(nRow) {
  phForm.phTable.phT0.setFieldValue(nRow, 'fixdId', aData.fixdId);
  phForm.phTable.phT0.setFieldValue(nRow, 'fixdFname', aData.fixdName);
}