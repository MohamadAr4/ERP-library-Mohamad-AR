let phForm;
let aLender = [], aBorrower = [], aProd = [], aPurpose = [], aLenderBranche = [], aLenderBranches = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/ShortRequest';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: getLenderBranches, afterEdit: getLenderBranches, afterPagerClick: getLenderBranches};
  phForm = new PhForm('LoanRequest', metta, options);
  $('#fldLenderId').change(function () {
    getLenderBranches();
  });
  $('#fldReqGPerc,#fldReqLAmt').change(function () {
    let nReqLAmt = parseFloat($('#fldReqLAmt').val());
    let nReqGPerc = parseFloat($('#fldReqGPerc').val());
    let nReqGAmt = parseFloat($('#fldReqGAmt').val());
    if (parseFloat(nReqGAmt) > parseFloat(nReqLAmt)) {
      $('#fldReqGAmt').val('');
    } else {
      $('#fldReqGAmt').val(parseFloat(((nReqLAmt * nReqGPerc) / 100)));
    }
  });
  $('#fldReqGAmt,#fldReqLAmt').change(function () {
    let nReqLAmt = parseFloat($('#fldReqLAmt').val());
    let nReqGAmt = parseFloat($('#fldReqGAmt').val());
    if (parseFloat(nReqGAmt) > parseFloat(nReqLAmt)) {
      $('#fldReqGAmt').val('');
    } else {
      $('#fldReqGPerc').val(parseFloat(((nReqGAmt * 100) / nReqLAmt)));
    }
  });
  getLenderBranches();
});
function getList() {
  getLender();
  getBranches();
  getBorrower();
  getProd();
  getPurpose();
}

function getPurpose() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/CodeLoanPurpose/List',
    headers: PhSettings.Headers
    , success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aPurpose[i] = {};
          aPurpose[i].id = response.data.List[i].id;
          aPurpose[i].name = response.data.List[i].name;
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

function getLenderBranches() {
  aLenderBranches = [];
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'lenderId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldLenderId').val();
  aQData[0].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/LenderBranches/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aLenderBranches[i] = {};
          aLenderBranches[i].id = response.data.List[i].id;
          aLenderBranches[i].name = response.data.List[i].name;
        }
      }
    }
  });
  renderLenderBranches();
}

function renderLenderBranches() {
  let vHtml = '';
  for (let i = 0; i < aLenderBranches.length; i++) {
    vHtml += '<option value="' + aLenderBranches[i].id + '">' + aLenderBranches[i].name + '</option>';
  }
  $('#fldLbranId').html(vHtml);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
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
    label: getLabel('ProdId'),
    element: 'ProdId',
    field: 'prodId',
    component: PhFC_Select,
    defValue: '',
    options: aProd,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Purpose'),
    element: 'PurposeId',
    field: 'loanPurposeId',
    component: PhFC_Select,
    defValue: '',
    options: aPurpose,
    aOpers: aSAOpers
  };
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
    label: getLabel('DNumm'),
    element: 'DNum',
    field: 'dnum',
    defValue: '',
    component: PhFC_Number,
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
    label: getLabel('LDate'),
    element: 'LDate',
    field: 'ldate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Lnum'),
    element: 'Lnum',
    field: 'lnum',
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
    element: 'fldPeriod',
    field: 'periodId',
    isRequired: false,
    value: PhSettings.Period.Id
  };
  aFields[idx++] = {
    element: 'fldUser',
    field: 'userId',
    isRequired: false,
    value: PhSettings.GUId.UId
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
    label: getLabel('Purpose'),
    element: 'fldPurposeId',
    field: 'loanPurposeId',
    rField: 'loanPurposeName',
    isRequired: true,
    defValue: '',
    options: aPurpose,
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
  return aFields;
}
