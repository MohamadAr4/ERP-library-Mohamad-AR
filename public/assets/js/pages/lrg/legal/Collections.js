let phForm;
let  aResp = PhSettings.PhsCodes.PhsYesno,
        aType = PhSettings.UsrCodes.LrgCodeCollectType,
        aInter = PhSettings.UsrCodes.LrgCodeInterventionType,
        aCurrency = PhSettings.UsrCodes.MngCurrency,
        aRequest = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/LoanCollections';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', beforSave: getAmt, afterEdit: calDAmount};
  phForm = new PhForm('Collections', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
  $('#fldAmt,#fldLamt').change(function () {
    calDAmount();
  });
});

function getBorrowRequest() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'borrowerId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldBorrowerId').val();
  aQData[0].value2 = '';
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequest = response.data.List;
        renderRequest();
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

function getAmt() {
  $('#fldCamt').val($('#fldAmt').val());
}

function calDAmount() {
  $('#fldDamt').val(parseFloat($('#fldAmt').val()) - parseFloat($('#fldLamt').val()));
  $('#fldCollectPercc').val(Math.random(parseFloat($('#fldAmt').val()) -
          parseFloat($('#fldLamt').val()) * 100, 2));
  $('#fldCollectPerc').val(parseFloat($('#fldDamt').val()) - parseFloat($('#fldLamt').val() * 100));

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
    label: getLabel('DDatee'),
    element: 'DDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('TypeId'),
    element: 'TypeId',
    field: 'typeId',
    component: PhFC_Select,
    defValue: '',
    options: aType,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('RespId'),
    element: 'RespId',
    field: 'respId',
    component: PhFC_Select,
    defValue: '',
    options: aResp,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('InterId'),
    element: 'InterId',
    field: 'interId',
    component: PhFC_Select,
    defValue: '',
    options: aInter,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('BorrowerId'),
    element: 'BorrowerId',
    field: 'borrowerId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Lrg/Borrowers/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amt'),
    element: 'Amt',
    field: 'amt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Lamt'),
    element: 'Lamt',
    field: 'lamt',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
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
    element: 'fldVhrId',
    field: 'vhrId',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    element: 'fldCurnRate',
    field: 'curnRate',
    isRequired: true,
    Value: '1'
  };
  aFields[idx++] = {
    element: 'fldCamt',
    field: 'camt',
    isRequired: true,
    defValue: ''
  };
  aFields[idx++] = {
    element: 'fldCurnId',
    field: 'curnId',
    isRequired: true,
    Value: '1'
  };
  aFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'fldReqId',
    field: 'reqId',
    rField: 'reqName',
    isRequired: true,
    defValue: '',
    tableWidth: '25'
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
    label: getLabel('DDatee'),
    element: 'fldDDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('TypeId'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aType,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('RespId'),
    element: 'fldRespId',
    field: 'respId',
    rField: 'respName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aResp,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('InterId'),
    element: 'fldInterId',
    field: 'interId',
    rField: 'interName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aInter,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('BorrowerId'),
    element: 'fldBorrowerId',
    rElement: 'fldBorrowerName',
    field: 'borrowerId',
    rField: 'borrowerName',
    isRequired: true,
    defValue: '',
    tableWidth: '25'
  };
  aFields[idx++] = {
    label: getLabel('Amt'),
    element: 'fldAmt',
    field: 'amt',
    isRequired: true,
    defValue: 0,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Lamt'),
    element: 'fldLamt',
    field: 'lamt',
    isRequired: true,
    defValue: 0,
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