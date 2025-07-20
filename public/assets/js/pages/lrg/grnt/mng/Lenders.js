let phForm;
let aClass1 = PhSettings.UsrCodes.LrgLenderClass1,
        aClass2 = PhSettings.UsrCodes.LrgLenderClass2,
        aClass3 = PhSettings.UsrCodes.LrgLenderClass3,
        aClass4 = PhSettings.UsrCodes.LrgLenderClass4,
        aClass5 = PhSettings.UsrCodes.LrgLenderClass5,
        aCity = PhSettings.UsrCodes.LrgCity,
        aTitle = PhSettings.UsrCodes.LrgTitles,
        aPosition = PhSettings.UsrCodes.LrgPositions,
        aStatus = PhSettings.PhsCodes.PhsStatus;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  getList();
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_FIXED,
        addRowBtn: true}
    },
    {container: 'phTable1',
      aColumns: initPhTableColumns1(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/Lenders';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('Lenders', metta, options);
  showHeaderSpinner(false);

});

function getList() {
  getLabelSelect();
  removeTitle();
  removePosition();
}

function getLabelSelect() {
  for (let i = 0; i < aStatus.length; i++) {
    aStatus[i].name = getLabel(aStatus[i].name);
  }
}

function removeTitle() {
  aTitle = aTitle.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
}
function removePosition() {
  aPosition = aPosition.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
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
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class1Id'),
    element: 'Class1Id',
    field: 'class1Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass1,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class2Id'),
    element: 'Class2Id',
    field: 'class2Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass2,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class3Id'),
    element: 'Class3Id',
    field: 'class3Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass3,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class4Id'),
    element: 'Class4Id',
    field: 'class4Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass4,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class5Id'),
    element: 'Class5Id',
    field: 'class5Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass5,
    aOpers: aSAOpers
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
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Class1'),
    element: 'fldClass1Id',
    field: 'class1Id',
    rField: 'class1Name',
    isRequired: true,
    defValue: '',
    options: aClass1,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Class2'),
    element: 'fldClass2Id',
    field: 'class2Id',
    rField: 'class2Name',
    isRequired: true,
    defValue: '',
    options: aClass2,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Class3'),
    element: 'fldClass3Id',
    field: 'class3Id',
    rField: 'class3Name',
    isRequired: true,
    defValue: '',
    options: aClass3,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Class5'),
    element: 'fldClass5Id',
    field: 'class5Id',
    rField: 'class5Name',
    isRequired: true,
    defValue: '',
    options: aClass5,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Class4'),
    element: 'fldClass4Id',
    field: 'class4Id',
    rField: 'class4Name',
    isRequired: true,
    defValue: '',
    options: aClass4,
    tableWidth: '150px'
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
    field: 'lenderId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Number'),
    field: 'num',
    width: '100px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'name',
    width: '200px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('User'),
    field: 'userId',
    rfield: 'userName',
    datatype: 'integer',
    width: '200px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Lrg/LenderUsers/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('CityId'),
    field: 'cityId',
    datatype: 'integer',
    width: '300px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: 0,
    options: aCity
  };
  aColumns[nIdx++] = {
    title: getLabel('Address'),
    field: 'address',
    width: '300px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
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

function initPhTableColumns1() {
  var aColumns = [];
  var nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow1',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow1
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
    field: 'lenderId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Lender.Title'),
    field: 'titleId',
    width: '200px',
    datatype: 'string',
    component: 'select',
    required: true,
    enabled: true,
    defValue: '0',
    options: aTitle
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'name',
    width: '200px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Lender.Position'),
    field: 'positionId',
    width: '200px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: '0',
    options: aPosition
  };
  aColumns[nIdx++] = {
    title: getLabel('Mobile'),
    field: 'mobile',
    width: '150px',
    datatype: 'string',
    component: 'input',
    classes: ' phPhoneNumberMask',
    attr: 'maxlength=10',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Phone'),
    field: 'phone',
    width: '150px',
    datatype: 'string',
    component: 'input',
    classes: ' phPhoneNumberMask',
    attr: 'maxlength=10',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Fax'),
    field: 'fax',
    width: '150px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Email'),
    field: 'email',
    width: '250px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '350px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: false,
    defValue: ''
  };
  return aColumns;
}

function deleteRow1() {
  phForm.phTable.phT1.deleteRow(parseInt($(this).data('row')));
}
