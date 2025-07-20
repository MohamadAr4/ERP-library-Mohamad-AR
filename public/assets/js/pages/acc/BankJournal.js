let phForm;
let aCurn = [];
let aDoc = PhSettings.UsrCodes.AccDocument;
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
  aURL.Api = '/UC/Acc/BankMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('BankJournal', metta, options);
});

function getList() {
  getCurn();
}

function getCurn() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Mng/Currency/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aCurn[i] = {};
          aCurn[i].id = response.data.List[i].id;
          aCurn[i].name = response.data.List[i].code;
          aCurn[i].rate = response.data.List[i].rate;
        }
      }
    },
    error: function (response) {
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'mdate',
    field: 'mdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Account'),
    element: 'Acc',
    field: 'accId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/Acc/AccActive/Autocomplete',
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
    defValue: 0
  };
  aFields[idx++] = {
    element: 'fldPeriod',
    field: 'periodId',
    isRequired: false,
    value: PhSettings.Period.Id
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '5'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
    field: 'mdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '5'
  };
  aFields[idx++] = {
    label: getLabel('Account'),
    element: 'fldAccId',
    rElement: 'fldAccName',
    field: 'accId',
    rField: 'accName',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '50'
  };
  return aFields;
}

function initPhTableColumns() {
  let aColumns = [];
  let nIdx = 0;
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
    title: getLabel('Debit'),
    field: 'debc',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeDebitC
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Credit'),
    field: 'crdc',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeCreditC
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Bank.Doc'),
    field: 'tdocId',
    datatype: 'integer',
    width: '250px',
    component: 'select',
    enabled: true,
    required: true,
    options: aDoc,
    defValue: 1
  };
  aColumns[nIdx++] = {
    title: getLabel('her.Num'),
    field: 'tdocn',
    datatype: 'integer',
    width: '125px',
    component: 'input',
    required: false,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('her.Date'),
    field: 'tdocd',
    width: '150px',
    datatype: 'date',
    component: 'input',
    componentType: 'date',
    required: false,
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '300px',
    component: 'input',
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('Currency'),
    field: 'curnId',
    datatype: 'integer',
    width: '100px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aCurn,
    defValue: 1,
    callback: {'event': 'change',
      'callback': onChangeCurrency
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Rate'),
    field: 'curnRate',
    datatype: 'decimal',
    width: '90px',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 1,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeRate
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Local.Debit'),
    field: 'deb',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeDebit
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Local.Credit'),
    field: 'crd',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeCredit
    }
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function onChangeDebitC() {
  let nRow = $(this).data('row');
  changeDebitC(nRow);
}

function onChangeCreditC() {
  let nRow = $(this).data('row');
  changeCreditC(nRow);
}

function onChangeCurrency() {
  let nRate = 1;
  let nRow = $(this).data('row');
  let nId = parseInt($(this).val());
  if (nId !== '') {
    $.ajax({
      type: 'GET',
      url: PhSettings.apiURL + '/UC/Mng/Currency/' + nId,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      }, success: function (response) {
        if (response.status) {
          nRate = response.data.Obj.rate;
          if (nId == 1) {
            phForm.phTable.phT0.disableField(nRow, 'curnRate');
//            phForm.phTable.phT0.disableField(nRow, 'deb');
//            phForm.phTable.phT0.disableField(nRow, 'crd');
          } else {
            phForm.phTable.phT0.enableField(nRow, 'curnRate');
//            phForm.phTable.phT0.enableField(nRow, 'crd');
//            phForm.phTable.phT0.enableField(nRow, 'deb');
          }
          changeRate(nRow, nRate);
        }
      }
    });
  }
}

function onChangeRate() {
  let nRow = $(this).data('row');
  let nRate = parseFloat($(this).val());
  changeRate(nRow, nRate);
}

function onChangeDebit() {
  let nRow = $(this).data('row');
  console.log('OnChange Debit');
}

function onChangeCredit() {
  let nRow = $(this).data('row');
  console.log('OnChange Credit');
}

function changeDebitC(nRow) {
  console.log('OnChange DebitC');
  let nDebitC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'debc'));
  let nRate = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'curnRate'));
  let nDebit = parseFloat(nDebitC * nRate);
  phForm.phTable.phT0.setFieldValue(nRow, 'deb', nDebit);
  if (nDebit > 0) {
    phForm.phTable.phT0.setFieldValue(nRow, 'crd', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'crdc', 0);
  }
}

function changeCreditC(nRow) {
  console.log('OnChange CreditC');
  let nCreditC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'crdc'));
  let nRate = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'curnRate'));
  let nCredit = parseFloat(nCreditC * nRate);
  phForm.phTable.phT0.setFieldValue(nRow, 'crd', nCredit);
  if (nCredit > 0) {
    phForm.phTable.phT0.setFieldValue(nRow, 'deb', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'debc', 0);
  }
}

function changeRate(nRow, nRate) {
  phForm.phTable.phT0.setFieldValue(nRow, 'curnRate', nRate);
  let nDebitC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'debc'));
  if (nDebitC > 0) {
    let nDebit = parseFloat(nDebitC * nRate);
    phForm.phTable.phT0.setFieldValue(nRow, 'deb', nDebit);
    phForm.phTable.phT0.setFieldValue(nRow, 'crd', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'crdc', 0);
  } else {
    let nCreditC = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'crdc'));
    if (nCreditC > 0) {
      let nCredit = parseFloat(nCreditC * nRate);
      phForm.phTable.phT0.setFieldValue(nRow, 'crd', nCredit);
      phForm.phTable.phT0.setFieldValue(nRow, 'deb', 0);
      phForm.phTable.phT0.setFieldValue(nRow, 'debc', 0);
    }
  }
}

