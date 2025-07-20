let phForm;
let aLender = [], aRequest = [], aBorrower = [], aProd = [], aLenderBranches = [], aLenderBranche = [];
let aStatus = PhSettings.PhsCodes.PhsStatus;
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
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/RejectionLetter';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('Pointers', metta, options);
});

function getList() {
  getLender();
  getBranches();
  getBorrower();
  getProd();
  getReguest();
}

function getReguest() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ShortRequest/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aRequest[i] = response.data.List[i];
          aRequest[i].id = response.data.List[i].id;
          aRequest[i].name = response.data.List[i].dnum + '-' + response.data.List[i].borrowerName;
        }
      }
    }
  });
}

function getProd() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Products/List',
    headers: PhSettings.Headers
    , success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aProd[i] = {};
          aProd[i].id = response.data.List[i].id;
          aProd[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getLender() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Lenders/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aLender[i] = {};
          aLender[i].id = response.data.List[i].id;
          aLender[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getBorrower() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Borrowers/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aBorrower[i] = {};
          aBorrower[i].id = response.data.List[i].id;
          aBorrower[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getBranches() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/LenderBranches/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aLenderBranche[i] = {};
          aLenderBranche[i].id = response.data.List[i].id;
          aLenderBranche[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'ReqId',
    field: 'reqId',
    component: PhFC_Select,
    defValue: '',
    options: aRequest,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Lender'),
    element: 'LenderId',
    field: 'lenderId',
    component: PhFC_Select,
    defValue: '',
    options: aLender,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('LbranId'),
    element: 'LbranId',
    field: 'lbranId',
    component: PhFC_Select,
    defValue: '',
    options: aLenderBranche,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Lnum'),
    element: 'Lnum',
    field: 'lnum',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('ProdId'),
    element: 'ProdId',
    field: 'prodId',
    component: PhFC_Select,
    defValue: '',
    options: aProd,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Borrower'),
    element: 'BorrowerId',
    field: ' borrowerId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Lrg/Borrowers/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('StatusId'),
    element: 'StatusId',
    field: 'statusId',
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'DNum',
    field: 'dnum',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'DDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Agrdate'),
    element: 'Agrdate',
    field: 'agrdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Agrnum'),
    element: 'Agrnum',
    field: 'agrnum',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Director'),
    element: 'Director',
    field: 'director',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
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
    element: 'fldVhrId',
    field: 'vhrId',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'fldReqId',
    field: 'reqId',
    isRequired: true,
    defValue: '',
    options: aRequest,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Lender'),
    element: 'fldLenderId',
    field: 'lenderId',
    rField: 'lenderName',
    isRequired: true,
    defValue: '',
    options: aLender,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('LbranId'),
    element: 'fldLbranId',
    field: 'lbranId',
    rField: 'lbranName',
    isRequired: true,
    defValue: '',
    options: aLenderBranches,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Lnum'),
    element: 'fldLnum',
    field: 'lnum',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ProdId'),
    element: 'fldProdId',
    field: 'prodId',
    rField: 'prodName',
    isRequired: true,
    defValue: '',
    options: aProd,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Borrower'),
    element: 'fldBorrowerId',
    rElement: 'fldBorrowerName',
    field: 'borrowerId',
    rField: 'borrowerName',
    isRequired: true,
    defValue: '',
    options: aBorrower,
    tableWidth: '100px'
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
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldDNum',
    field: 'dnum',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Agrdate'),
    element: 'fldAgrdate',
    field: 'agrdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Agrnum'),
    element: 'fldAgrnum',
    field: 'agrnum',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Director'),
    element: 'fldDirector',
    field: 'director',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
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
    field: 'rejectId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Note'),
    field: 'note',
    width: '400px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '450px',
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
