let phForm;
let aType = PhSettings.UsrCodes.EmpPunishment,
        aApprGroup = PhSettings.UsrCodes.EmpAppraisalGrp,
        aApprItem = PhSettings.UsrCodes.EmpAppraisalItem;
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
  aURL.Api = '/UC/Emp/AdminPunishmentMst';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('AdminPunishment', metta, options);
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
    label: getLabel('Type'),
    element: 'TypeId',
    field: 'typeId',
    component: PhFC_Select,
    defValue: '',
    options: aType,
    aOpers: aSAOpers
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
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    isRequired: true,
    defValue: '',
    options: aType,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 40
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
    field: 'mapunId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Employee'),
    field: 'empId',
    rfield: 'empName',
    datatype: 'integer',
    width: '225px',
    component: 'input',
    required: true,
    enabled: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Emp/Employee/Autocomplete',
    callback: {'event': 'focusout',
      'callback': ''
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Appraisal.Group'),
    field: 'apprgrpId',
    datatype: 'integer',
    width: '225px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: 0,
    options: aApprGroup,
    callback: {'event': 'change',
      'callback': ''
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Appraisal.Item'),
    field: 'appritmId',
    width: '225px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aApprItem,
    callback: {'event': 'change',
      'callback': ''
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Points'),
    field: 'points',
    width: '125px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Month'),
    field: 'days',
    width: '100px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '250px',
    datatype: 'string',
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
