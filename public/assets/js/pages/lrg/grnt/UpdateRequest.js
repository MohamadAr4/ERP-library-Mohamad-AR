let phForm;
let aLender = [], aBorrower = [], aProd = [], aLenderBranche = [], aLenderBranches = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
//  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/UpdateRequest ';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('UpdateRequest', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
  $('#fldReqId').change(function () {
    getElemntFromReq();
  });
});

function getList() {
  getLender();
  getBranches();
  getBorrower();
  getProd();
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
      getElemntFromReq();
      console.log(11111);
    }
  });
  console.log(aRequest);
  showHeaderSpinner(false);
}

function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aRequest.length; i++) {
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].lnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}


function getElemntFromReq() {
  let aEditField = aRequest.filter(function (el) {
    return el.id === $('#fldReqId').val();
  });
  $('#fldLenderId').val(aEditField[0].lenderId);
  $('#fldLenderName').val(aEditField[0].lenderName);
  $('#fldLbranId').val(aEditField[0].lbranId);
  $('#fldLbranName').val(aEditField[0].lbranName);
  $('#fldProdId').val(aEditField[0].prodId);
  $('#fldProdName').val(aEditField[0].prodName);
  $('#fldLDate').val(aEditField[0].ldate);
  $('#fldLnum').val(aEditField[0].lnum);
  $('#fldDNum').val(aEditField[0].dnum);
  $('#fldRDate').val(aEditField[0].rdate);
  $('#fldReqLAmt').val(aEditField[0].reqLamt);
  $('#fldReqGAmt').val(aEditField[0].reqGamt);
  $('#fldReqGPerc').val(aEditField[0].reqGperc);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Borrower'),
    element: 'BorrowerId',
    field: 'borrowerId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Lrg/Borrowers/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Lnumm'),
    element: 'Lnum',
    field: 'lnum',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('LDate'),
    element: 'LDate',
    field: 'ldate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('DNumm'),
    element: 'DNum',
    field: 'dnum',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('ReqLAmtt'),
    element: 'ReqLAmt',
    field: 'reqLamt',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('ReqGAmt'),
    element: 'ReqGAmt',
    field: 'reqGamt',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('ReqGPerc'),
    element: 'ReqGPerc',
    field: 'reqGperc',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Datee'),
    element: 'DDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('RDate'),
    element: 'RDate',
    field: 'rdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    defValue: '',
    component: PhFC_Number,
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
    label: getLabel('Lender'),
    element: 'fldLenderId',
    rElement: 'fldLenderName',
    field: 'lenderId',
    rField: 'lenderName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'fldReqId',
    field: 'relId',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('LbranId'),
    element: 'fldLbranId',
    rElement: 'fldLbranName',
    field: 'lbranId',
    rField: 'lbranName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ProdId'),
    element: 'fldProdId',
    rElement: 'fldProdName',
    field: 'prodId',
    rField: 'prodName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqLAmtt'),
    element: 'fldReqLAmt',
    field: 'reqLamt',
    isRequired: false,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqGAmt'),
    element: 'fldReqGAmt',
    field: 'reqGamt',
    isRequired: false,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqGPerc'),
    element: 'fldReqGPerc',
    field: 'reqGperc',
    isRequired: false,
    defValue: '0',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('DNumm'),
    element: 'fldDNum',
    field: 'dnum',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Datee'),
    element: 'fldDDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('RDate'),
    element: 'fldRDate',
    field: 'rdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('LDate'),
    element: 'fldLDate',
    field: 'ldate',
    isRequired: true,
    defValue: currentDate(),
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
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  return aFields;
}
