let phForm;
let aProd = [];
let aDirector = [];
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aCpyPreferences = PhSettings.CpyCodes.CpyPreferences;
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
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterNew: getMoney, afterEdit: getMoney, afterPagerClick: getMoney};
  phForm = new PhForm('RejectRequest', metta, options);
  $('#fldReqId').change(function () {
    getMoney();
  });
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
});

function getList() {
  getProd();
  getDirector();
}

function getQueryData() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'borrowerId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldBorrowerId').val();
  aQData[nIdx].value2 = '';
  return aQData;
}

function openNewRejection() {
  let aFields = getFields();
  $('#fldBorrowerId').val('');
  $('#fldBorrowerName').val('');
  $('#fldReqId').html('');
  for (let i = 0; i < aFields.length; i++) {
    $('#' + aFields[i].element).attr('disabled', false);
  }
  $('#fldReqName').attr('disabled', false);
  $('#ph-submit').removeClass('d-none');
  $('#ph-delete').addClass('d-none');
}

function getBorrowRequest() {
  showHeaderSpinner(true);
  aRequest = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/ShortRequest/Search/1/10',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, data: JSON.stringify(getQueryData()),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequest = response.data.List;
        renderRequest();
      }
    }
  });
  getMoney();
  showHeaderSpinner(false);
}

function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aRequest.length; i++) {
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].lnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}

function checkSrcIdTSal() {
  $('#fldBorrowerId').val(phForm.aResultData.borrowerId);
  $('#fldBorrowerName').val(phForm.aResultData.borrowerName);
  getBorrowRequest();
}

function getMoney() {
  let aEditField = aRequest.filter(function (el) {
    return el.id === $('#fldReqId').val();
  });
  $('#fldLenderId').val(aEditField[0].lenderName);
  $('#fldLbranId').val(aEditField[0].lbranName);
}

function getDirector() {
  aDirector = aCpyPreferences.filter(function (el) {
    return el.key === 'General_Manager';
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

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'ReqId',
    field: 'reqId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Lrg/Borrowers/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Lender'),
    element: 'LenderId',
    field: 'lenderId',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('LbranId'),
    element: 'LbranId',
    field: 'lbranId',
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
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
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
    element: 'fldPeriod',
    field: 'periodId',
    isRequired: false,
    value: PhSettings.Period.Id
  };
  aFields[idx++] = {
    element: 'fldVhrId',
    field: 'vhrId',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Borrower'),
    element: 'fldBorrowerId',
    rElement: 'fldBorrowerName',
    field: 'borrowerId',
    rField: 'borrowerName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Lnum'),
    element: 'fldReqId',
    rElement: 'fldReqName',
    field: 'reqId',
    rField: 'reqName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Lender'),
    element: 'fldLenderId',
    field: 'lenderName',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('LbranId'),
    element: 'fldLbranId',
    field: 'lendBranName',
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
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
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
    defValue: aDirector[0].value1,
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
    width: '450px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '500px',
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
