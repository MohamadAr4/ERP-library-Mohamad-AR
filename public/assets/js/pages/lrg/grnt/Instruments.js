let phForm;
let aBorrower = [], oRequest = [],
        aInssue = PhSettings.UsrCodes.LrgInstrumentIssue,
        aCpyPreferences = PhSettings.CpyCodes.CpyPreferences;
let akind = [
  {'id': '0', 'name': 'حيثيات'},
  {'id': '1', 'name': 'شرط'}
];

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
  getBorrower();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/Instrument';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterNew: getListAfterNew, afterEdit: getListAfterEdit, afterPagerClick: getListAfterEdit};
  phForm = new PhForm('Instruments', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
  $('#fldReqId').change(function () {
    getElemntFromReq();
  });
  getDirector();
});

function getListAfterNew() {
  afterEdit();
  openNewReject();
}

function getListAfterEdit() {
  afterEdit();
  checkSrcIdTSal();
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

function openNewReject() {
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

function getQueryData() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'borrowerId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = $('#fldBorrowerId').val();
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'statusId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = 1401;
  aQData[nIdx].value2 = '';
  return aQData;
}

function getBorrowRequest() {
  showHeaderSpinner(true);
  aRequest = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getQueryData()),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequest = response.data.List;
        renderRequest();
        getElemntFromReq();
      }
    }
  });
  showHeaderSpinner(false);
}

function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aRequest.length; i++) {
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].lnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}

function getInstrumentIssue() {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/getNumOfInstrumentWithIssueId/' + oRequest[0].id + '/' + oRequest[0].gamt,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        $('#fldInssue').val(response.data.Obj.issueId);
        $('#fldAppendixNum').attr('disabled', false);
        if (response.data.Obj.appendixCount === 0) {
          $('#fldAppendixNum').val('');
          $('#fldAppendixNum').attr('disabled', true);
        }
      }
    }
  });
}

function getElemntFromReq() {
  oRequest = aRequest.filter(function (el) {
    return el.id === $('#fldReqId').val();
  });
  $('#fldGAmt').val(oRequest[0].reqGamt);
  $('#fldGPerc').val(oRequest[0].reqGperc);
  $('#fldLAmt').val(oRequest[0].reqLamt);
  getInstrumentIssue();
}

function checkSrcIdTSal() {
  $('#fldBorrowerId').val(phForm.aResultData.borrowerId);
  $('#fldBorrowerName').val(phForm.aResultData.borrowerName);
  getBorrowRequest();
}

function afterEdit() {
  if (parseInt($('#fldId').val()) > 0) {
    $('#fldLAmt').attr('disabled', true);
  } else {
    $('#fldLAmt').attr('disabled', false);
  }
}

function getDirector() {
  let aEditDirector = aCpyPreferences.filter(function (el) {
    return el.key === 'General_Manager';
  });
  $('#fldDirector').val(aEditDirector[0].value1);
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Num'),
    element: 'DNum',
    field: 'dnum',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
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
    label: getLabel('Ddate'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('GAmt'),
    element: 'GAmt',
    field: 'gamt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Inssue'),
    element: 'Inssue',
    field: 'issueID',
    component: PhFC_Select,
    defValue: '',
    options: aInssue,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('LAmt'),
    element: 'LAmt',
    field: 'lamt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('GPerc'),
    element: 'GPerc',
    field: 'gperc',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Comm'),
    element: 'Comm',
    field: 'comm',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('AgrNum'),
    element: 'AgrNum',
    field: 'agrnum',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('AgrDate'),
    element: 'AgrDate',
    field: 'agrdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('MintNum'),
    element: 'MintNum',
    field: 'mintnum',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('AppendixNum'),
    element: 'AppendixNum',
    field: 'appendixNum',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('MintDate'),
    element: 'MintDate',
    field: 'mintdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Director'),
    element: 'Director',
    field: 'director',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Notee'),
    element: 'Note',
    field: 'note',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
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
    element: 'fldStutsId',
    field: 'statusId',
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
    label: getLabel('Inssue'),
    element: 'fldInssue',
    field: 'issueID',
    rField: 'issueName',
    isRequired: true,
    defValue: '',
    options: aInssue,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    element: 'fldDnum',
    field: 'dnum',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Lnum'),
    element: 'fldReqId',
    rElement: 'fldReqName',
    field: 'reqId',
    rField: 'reqLnum',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('AgrNum'),
    element: 'fldAgrNum',
    field: 'agrnum',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('AppendixNum'),
    element: 'fldAppendixNum',
    field: 'appendixNum',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('AgrDate'),
    element: 'fldAgrDate',
    field: 'agrdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('MintNum'),
    element: 'fldMintNum',
    field: 'mintnum',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('MintDate'),
    element: 'fldMintDate',
    field: 'mintdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('LAmt'),
    element: 'fldLAmt',
    field: 'lamt',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('GAmt'),
    element: 'fldGAmt',
    field: 'gamt',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('GPerc'),
    element: 'fldGPerc',
    field: 'gperc',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Comm'),
    element: 'fldComm',
    field: 'comm',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Director'),
    element: 'fldDirector',
    field: 'director',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Notee'),
    element: 'fldNote',
    field: 'note',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
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
    field: 'instId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('KindId'),
    field: 'kindId',
    width: '200px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: akind
  };
  aColumns[nIdx++] = {
    title: getLabel('text'),
    field: 'note',
    width: '500px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
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
