let phForm;
let aAmtType = PhSettings.UsrCodes.AccReportAmount;
let aSign = PhSettings.PhsCodes.PhsSign;
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
  aURL.Api = '/UC/Acc/Total';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: phTable};
  phForm = new PhForm('accTotal', metta, options);
  showHeaderSpinner(false);
});

function getaQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Number',
    field: 'num',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
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
    isRequired: true,
    defValue: 0
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '5'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '25'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tablewidth: ''
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
    title: 'TotId',
    field: 'totId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Account'),
    field: 'accId',
    rfield: 'accName',
    width: '215px',
    component: 'input',
    enabled: true,
    defValue: 0,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Acc/AccActive/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Cost.Center'),
    field: 'costId',
    rfield: 'costName',
    width: '215px',
    component: 'input',
    enabled: true,
    defValue: 0,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Acc/CostActive/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Sign'),
    field: 'signId',
    datatype: 'integer',
    width: '105px',
    component: 'select',
    enabled: true,
    options: aSign,
    defValue: 1
  };
  aColumns[nIdx++] = {
    title: getLabel('Type'),
    field: 'amttypId',
    datatype: 'integer',
    width: '125px',
    component: 'select',
    enabled: true,
    options: aAmtType,
    defValue: 1
  };
  aColumns[nIdx++] = {
    title: getLabel('Perc') + ' %',
    field: 'perc',
    datatype: 'decimal',
    width: '75px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 100,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': changePerc
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '250px',
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
