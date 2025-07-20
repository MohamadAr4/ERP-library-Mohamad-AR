let phForm;
let  aBorrower = [], aRequest = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/RequestRestructure';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('LoanRestructuring', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
  $('#fldReqId').change(function () {
    getElemntFromReq();
  });
});

function getBorrower() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Borrowers/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.UId,
      'vLang': PhSettings.display.vLang
    },
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
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/1/10',
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
        console.log(aRequest);
      }
      getElemntFromReq();
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
  $('#fldRelId').val(aEditField[0].id);
  $('#fldReqGAmt').val(aEditField[0].reqGamt);
  $('#fldReqGPerc').val(aEditField[0].reqGperc);
  $('#fldLnum').val(aEditField[0].lnum);
  $('#fldReqLAmt').val(aEditField[0].reqLamt);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Num'),
    element: 'Num',
    field: 'num',
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
    label: getLabel('LDate'),
    element: 'LDate',
    field: 'ldate',
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
    label: getLabel('Lnum'),
    element: 'Lnum',
    field: 'lnum',
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
    label: getLabel('NewAmt'),
    element: 'NewAmt',
    field: 'newamt',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('InterestRate'),
    element: 'InterestRate',
    field: 'interestrate',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Condition'),
    element: 'Condition',
    field: 'condition',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
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
    element: 'fldRelId',
    field: 'relId',
    isRequired: true,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'fldReqId',
    rElement: 'fldReqName',
    field: 'reqId',
    rField: 'reqName',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Commit'),
    element: 'fldIsCommitId',
    field: 'commitId',
    rField: 'commitName',
    getLabel: true,
    isRequired: true,
    value: '2',
    alert: {
      isOk: alertCommitCheck,
      message: getLabel('Commited Concentrations')
    },
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
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
    label: getLabel('Lnum'),
    element: 'fldLnum',
    field: 'lnum',
    isRequired: false,
    defValue: '',
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
    label: getLabel('ReqLAmtt'),
    element: 'fldReqLAmt',
    field: 'reqLamt',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqGAmt'),
    element: 'fldReqGAmt',
    field: 'reqGamt',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqGPerc'),
    element: 'fldReqGPerc',
    field: 'reqGperc',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('NewAmt'),
    element: 'fldNewAmt',
    field: 'newamt',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('InterestRate'),
    element: 'fldInterestRate',
    field: 'interestrate',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Condition'),
    element: 'fldCondition',
    field: 'condition',
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
function alertCommitCheck() {
  let isOk = false;
  $('#ph-commit').addClass('d-none');
  $('#ph-delete').addClass('d-none');
  if (parseInt($('#fldIsCommitId').val()) === 1) {
    $('#ph-commit').addClass('d-none');
    $('#ph-delete').addClass('d-none');
    isOk = true;
  }
  return isOk;
}