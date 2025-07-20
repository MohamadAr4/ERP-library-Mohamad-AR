let phForm;
let aType = PhSettings.PhsCodes.PhsAmountType;
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
  aURL.Api = '/UC/Emp/TaxBracketsMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, beforSave: checkValue};
  phForm = new PhForm('Tax', metta, options);
});

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
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
    label: getLabel('G.Num'),
    element: 'Gnum',
    field: 'gnum',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('G.Date'),
    element: 'Gdate',
    field: 'gdate',
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
    isRequired: true,
    defValue: ''
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
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '12'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('G.Num'),
    element: 'fldGnum',
    field: 'gnum',
    isRequired: false,
    defValue: '',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('G.Date'),
    element: 'fldGdate',
    field: 'gdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '12'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '40'
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
    field: 'brktId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('S.Amount'),
    field: 'samt',
    datatype: 'NUMBER',
    width: '175px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('E.Amount'),
    field: 'eamt',
    datatype: 'NUMBER',
    width: '175px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Tax.perc') + ' %',
    field: 'tax',
    datatype: 'NUMBER',
    width: '175px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    datatype: 'string',
    width: '450px',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function checkValue() {
  for (let i = 0; i < phForm.phTable.phT0.getRowCount(); i++) {
    let nFAmount = parseInt(phForm.phTable.phT0.getFieldValue(i, 'samt'));
    let nTAmount = parseInt(phForm.phTable.phT0.getFieldValue(i, 'eamt'));
    phForm.phTable.phT0.removeClass(i, '3', 'invalid');
    phForm.phTable.phT0.removeClass(i, '4', 'invalid');
    if (nFAmount >= nTAmount) {
      phForm.validated = false;
      phForm.phTable.phT0.addClass(i, '3', 'invalid');
      phForm.phTable.phT0.addClass(i, '4', 'invalid');
      showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Check Amount'));
      break;
    }
  }
}