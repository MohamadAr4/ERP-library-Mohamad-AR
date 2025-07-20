let phForm;
let aLineType = PhSettings.UsrCodes.AccLineType;
let aAmtSide = PhSettings.UsrCodes.AccAmountSide;
let aAmtType = PhSettings.UsrCodes.AccReportAmount;
let vAccUrl = '/UC/Acc/AccActive/Autocomplete';
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
  aURL.Api = '/UC/Acc/Report';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: phTable};
  phForm = new PhForm('accReport', metta, options);
  showHeaderSpinner(false);
});

function getaQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
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
    isRequired: false,
    defValue: 0
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: 35
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: ''
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
//  aColumns[nIdx++] = {
//    title: 'accId',
//    field: 'accId',
//    visible: false,
//    component: 'input',
//    enabled: true,
//    defValue: 0
//  };
  aColumns[nIdx++] = {
    title: 'costId',
    field: 'costId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'repId',
    field: 'repId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: '#',
    field: 'ord',
    datatype: 'decimal',
    width: '50px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 1,
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('Label'),
    field: 'label',
    width: '125px',
    component: 'input',
    enabled: true,
    required: false
  };
  aColumns[nIdx++] = {
    title: getLabel('Line.Type'),
    field: 'linetypeId',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aLineType,
    defValue: 1,
//    callback: {'event': 'change',
//      'callback': changeLineType
//    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Account'),
    field: 'accId',
    rfield: 'accName',
    width: '200px',
    component: 'input',
    enabled: true,
    required: false,
    defValue: '',
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Acc/AccActive/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Total.Account'),
    field: 'totId',
    rfield: 'totName',
    width: '200px',
    component: 'input',
    enabled: true,
    required: false,
    defValue: '',
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Acc/AccTotal/Autocomplete'
  };
//  aColumns[nIdx++] = {
//    title: getLabel('Account'),
//    field: 'atId',
//    rfield: 'atName',
//    width: '175px',
//    component: 'input',
//    defValue: 0,
//    defLabel: '',
//    isSent: false,
//    required: false,
//    autocomplete: true,
//    ajax: true,
//    ajaxType: 'POST',
//    ajaxAsync: false,
//    ajaxURL: function () {
//      return PhSettings.apiURL + vAccUrl;
//    },
//    callback: {'event': 'change',
//      'callback': changeAcc
//    }
//  };
//  aColumns[nIdx++] = {
//    title: getLabel('Cost.Center'),
//    field: 'costId',
//    rfield: 'costName',
//    width: '175px',
//    component: 'input',
//    defValue: 0,
//    defLabel: '',
//    required: false,
//    autocomplete: true,
//    ajax: true,
//    ajaxType: 'POST',
//    ajaxAsync: false,
//    ajaxURL: PhSettings.apiURL + '/UC/Acc/CostActive/Autocomplete'
//  };
  aColumns[nIdx++] = {
    title: getLabel('AmtSide'),
    field: 'amtsideId',
    datatype: 'integer',
    width: '115px',
    component: 'select',
    ajax: false,
    options: aAmtSide,
    defValue: 1
  };
  aColumns[nIdx++] = {
    title: getLabel('Amt.Type'),
    field: 'amttypId',
    datatype: 'integer',
    width: '115px',
    component: 'select',
    ajax: false,
    options: aAmtType,
    defValue: 1
  };
  aColumns[nIdx++] = {
    title: getLabel('Perc') + ' %',
    field: 'perc',
    datatype: 'decimal',
    width: '100px',
    component: 'input',
    required: true,
    defValue: 100,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': changePerc
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Desc'),
    field: 'rem',
    width: '200px',
    component: 'input',
    enabled: true
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function changePerc() {
  let nRow = $(this).data('row');
  let nPerc = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'perc'));
  if (nPerc <= 0) {
    phForm.phTable.phT0.setFieldValue(nRow, 'perc', '');
  } else if (nPerc > 100) {
    phForm.phTable.phT0.setFieldValue(nRow, 'perc', '100');
  }
}

function changeLineType() {
  let nRow = $(this).data('row');
  let nLineType = parseInt(phForm.phTable.phT0.getFieldValue(nRow, 'linetypeId'));
  if (nLineType === 1) {
    vAccUrl = '/UC/Acc/AccActive/Autocomplete';
  } else if (nLineType === 2) {
    vAccUrl = '/UC/Acc/AccTotal/Autocomplete';
  } else if (nLineType === 3) {
    vAccUrl = '';
  }
}

function changeAcc() {
  let nRow = $(this).data('row');
  let nLineType = parseInt(phForm.phTable.phT0.getFieldValue(nRow, 'linetypeId'));
  let atId = parseInt(phForm.phTable.phT0.getFieldValue(nRow, 'atId'));
  if (nLineType === 1) {
    phForm.phTable.phT0.setFieldValue(nRow, 'accId', atId);
    phForm.phTable.phT0.setFieldValue(nRow, 'totId', 0);
  } else if (nLineType === 2) {
    phForm.phTable.phT0.setFieldValue(nRow, 'accId', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'totId', atId);
  } else if (nLineType === 3) {
    phForm.phTable.phT0.setFieldValue(nRow, 'accId', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'totId', 0);
  }
}
