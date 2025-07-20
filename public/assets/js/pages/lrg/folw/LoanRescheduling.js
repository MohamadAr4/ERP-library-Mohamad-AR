let phForm;
let aRequest = [];
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
  aURL.Api = '/UC/Lrg/RequestSettlment';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterEdit: afterEdit, afterPagerClick: afterEdit};
  phForm = new PhForm('LoanRescheduling', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequests();
  });
  $('#fldReqId').change(function () {
    setRequestValue();
  });
  $('#ph-iscommit').click(function (e) {
    e.preventDefault();
    swal.fire({
      title: getLabel('Commit this Rescheduling') + ' !!',
      text: getLabel('Are.You.Sure.?'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "<i class='flaticon2-check-mark'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='flaticon2-cross'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-default"
      }
    }).then(function (result) {
      if (result.value) {
        commitLoanRescheduling();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
});

function getBorrowRequests() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'borrowerId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldBorrowerId').val();
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0/',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequests = response.data.List;
        $.each(aRequests, function (i, aRequest) {
          $('#fldReqId').append($('<option>', {
            value: aRequest.id,
            text: aRequest.loanNum
          }));
        });
        setRequestValue();
      }
    }
  });
}

function setRequestValue() {
  if (phForm.aResultData.reqId !== undefined) {
    $('#fldReqId').val(phForm.aResultData.reqId);
  }
  aRequest = aRequests.filter(function (el) {
    return el.id === $('#fldReqId').val();
  });
  $('#fldReqGAmt').val(aRequest[0].reqGamt);
  $('#fldReqGPerc').val(aRequest[0].reqGperc);
  $('#fldLnum').val(aRequest[0].lnum);
  getActiveLoan();
//  $('#fldReqLAmt').val(aRequest[0].reqLamt);
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
    label: getLabel('Num'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
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
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('ReqLAmt'),
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
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('UsedAmt'),
    element: 'UsedAmt',
    field: 'usedamt',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('NameReq'),
    element: 'Name',
    field: 'name',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('PositionReq'),
    element: 'Position',
    field: 'position',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Address'),
    element: 'Address',
    field: 'address',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('ReturnDate'),
    element: 'ReturnDate',
    field: 'returndate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('GoodwillAmt'),
    element: 'GoodwillAmt',
    field: 'goodwillamt',
    defValue: '',
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Guarantees'),
    element: 'Guarantees',
    field: 'guarantees',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Report'),
    element: 'Report',
    field: 'report',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    defValue: '',
    component: PhFC_Text,
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
    element: 'fldRelId',
    field: 'relId',
    isRequired: true,
    defValue: ''
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
    label: getLabel('Req.loanNum'),
    element: 'fldReqId',
    rElement: 'fldReqName',
    field: 'reqId',
    rField: 'loanNum',
    isRequired: true,
    defValue: '',
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
    label: getLabel('LDate'),
    element: 'fldLDate',
    field: 'ldate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReqLAmt'),
    element: 'fldReqLAmt',
    field: 'reqLamt',
    isRequired: false,
    value: $('#fldNewAmt').val(),
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
    label: getLabel('UsedAmt'),
    element: 'fldUsedAmt',
    field: 'usedamt',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('NameReq'),
    element: 'fldName',
    field: 'name',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('PositionReq'),
    element: 'fldPosition',
    field: 'position',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Address'),
    element: 'fldAddress',
    field: 'address',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('ReturnDate'),
    element: 'fldReturnDate',
    field: 'returndate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('GoodwillAmt'),
    element: 'fldGoodwillAmt',
    field: 'goodwillamt',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Guarantees'),
    element: 'fldGuarantees',
    field: 'guarantees',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Report'),
    element: 'fldReport',
    field: 'report',
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
    field: 'mstId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Num'),
    field: 'num',
    width: '125px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Descr'),
    field: 'descr',
    width: '550px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '550px',
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

function commitLoanRescheduling() {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/LoanRescheduling/' + $('#fldReqId').val(),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {

      }
    }
  });
}

function alertCommitCheck() {
  let isOk = false;
  $('#ph-iscommit').removeClass('d-none');
  $('#ph_divdelete').removeClass('d-none');
  if (parseInt($('#fldIsCommitId').val()) === 1) {
    $('#ph-iscommit').addClass('d-none');
    $('#ph_divdelete').addClass('d-none');
    isOk = true;
  }
  return isOk;
}

function afterEdit() {
  getBorrowRequests();
}

function getActiveLoan() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'borrowerId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldBorrowerId').val();
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/getActiveLoan/' + $('#fldReqId').val(),
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
      }
    }
  });
}