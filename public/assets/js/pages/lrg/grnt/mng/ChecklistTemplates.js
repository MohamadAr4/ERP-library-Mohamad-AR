let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus;
let aYesno = PhSettings.PhsCodes.PhsYesno;
let aElemType = [];
let aItem = PhSettings.UsrCodes.LrgReqCheckItem;
let aGroup = PhSettings.UsrCodes.LrgReqCheckGrp;
jQuery(document).ready(function () {
  statusTranslate();
  addElemType();
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/CodeMchecklist';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('Checklist', metta, options);
});

function statusTranslate() {
  for (let i = 0; i < aStatus.length; i++) {
    aStatus[i].name = getLabel(aStatus[i].name);
  }
  for (let i = 0; i < aYesno.length; i++) {
    aYesno[i].name = getLabel(aYesno[i].name);
  }
}

function addElemType() {
  aElemType[0] = {};
  aElemType[0].id = 1;
  aElemType[0].name = getLabel('check');
  aElemType[1] = {};
  aElemType[1].id = 2;
  aElemType[1].name = getLabel('isvalue');
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
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
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '300px'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '600px'
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
    title: getLabel('CheckList.Group'),
    field: 'groupId',
    datatype: 'integer',
    width: '250px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: 0,
    options: aGroup
  };
  aColumns[nIdx++] = {
    title: getLabel('CheckList.Item'),
    field: 'itemId',
    datatype: 'integer',
    width: '450px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: 0,
    options: aItem
  };
  aColumns[nIdx++] = {
    title: getLabel('Nord'),
    field: 'nord',
    width: '75px',
    datatype: 'integer',
    component: 'input',
    required: false,
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('ischeck'),
    field: 'ischeckId',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: '1',
    options: aElemType
  };
  aColumns[nIdx++] = {
    title: getLabel('attach'),
    field: 'isattachId',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: '1',
    options: aYesno
  };
  aColumns[nIdx++] = {
    title: getLabel('isRequired'),
    field: 'isRequiredId',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: '1',
    options: aYesno,
    callback: {'event': '',
      'callback': ''
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('status'),
    field: 'statusId',
    datatype: 'integer',
    width: '100px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: '1',
    options: aStatus
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
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
