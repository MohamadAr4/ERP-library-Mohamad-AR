var phForm;
jQuery(document).ready(function () {
  var options = { cols: 1, mode: PhF_Mode_Query, type: PhF_Type_MstTrn };
  var idx = 0;
  var metta = {};
  var aURL = {};
  var QFields = [];
  var aFields = [];
  var phTable = {
    container: "phTable",
    aColumns: initPhTableColumns(),
    widthType: PhTable_WIDTH_FIXED,
    phT: null
  };

  aURL.Url = 'http://Eng-Radwan:9090/ERP/api';
  aURL.Api = '/Acc/CostCenters';
  aURL.New = { Method: 'POST', URL: '/New' };
  aURL.Update = { Method: 'PUT', URL: '/' };
  aURL.List = { Method: 'GET', URL: '/List' };
  aURL.Search = { Method: 'POST', URL: '/Search' };
  aURL.Delete = { Method: 'DELETE', URL: '/' };
  aURL.Get = { Method: 'GET', URL: '/' };


  idx = 0;
  QFields[idx++] = {
    label: getLabel('Item Number'),
    field: 'Num',
    dbName: 'num',
    component: PhFC_Number,
    dataType: PhFDT_Number,
    defValue: '',
    minValue: '0',
    step: '0.1',
    maxValue: '9999999999999',
    aOpers: [PhFOper_EQ, PhFOper_NE, PhFOper_GT, PhFOper_GE, PhFOper_LT, PhFOper_LE, PhFOper_BT, PhFOper_NB]
  };
  QFields[idx++] = {
    label: getLabel('Item Name'),
    field: 'Name',
    dbName: 'name',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: [PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED, PhFOper_BT]
  };
  QFields[idx++] = {
    label: getLabel('Status'),
    field: 'Status',
    dbName: 'statusId',
    component: PhFC_Select,
    dataType: PhFDT_Number,
    defValue: -1,
    aOpers: [PhFOper_EQ, PhFOper_NE],
    options: PhSettings.Codes.Status
  };
  QFields[idx++] = {
    label: getLabel('Type'),
    field: 'Type',
    dbName: 'typeId',
    component: PhFC_Select,
    dataType: PhFDT_Number,
    defValue: -1,
    aOpers: [PhFOper_EQ, PhFOper_NE],
    options: PhSettings.Codes.Type
  };
  QFields[idx++] = {
    label: getLabel('Rem'),
    field: 'Rem',
    dbName: 'rem',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: [PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED]
  };
  // QFields[idx++] = {
  //   label: getLabel('Date'),
  //   field: 'Date',
  //   component: PhFC_DatePicker,
  //   dataType: PhFDT_Date,
  //   defValue: currentDate(),
  //   aOpers: [PhFOper_EQ, PhFOper_NE, PhFOper_GT, PhFOper_GE, PhFOper_LT, PhFOper_LE, PhFOper_BT, PhFOper_NB]
  // };
//   QFields[idx++] = {
//     label: getLabel('CostName'),
//     field: 'Cost',
//     component: PhFC_Autocomplete,
//     dataType: PhFDT_String,
//     defValue: '',
//     aOpers: [PhFOper_CT, PhFOper_NCT, PhFOper_ST, PhFOper_NST, PhFOper_ED, PhFOper_NED],
//     autoCompleteApi: '/Acc/Account/AutocompleteActives'
//   };
  idx = 0;
  aFields[idx++] = {
    field: 'fldId',
    dbName: 'id',
    isRequired: false,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    field: 'fldNum',
    dbName: 'num',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    field: 'fldName',
    dbName: 'name',
    isRequired: true,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    field: 'fldStatusId',
    dbName: 'statusId',
    isRequired: true,
    defValue: '1',
    options: []
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    field: 'fldTypeId',
    dbName: 'typeId',
    isRequired: true,
    defValue: '1',
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    field: 'fldRem',
    dbName: 'rem',
    isRequired: true,
    defValue: ''
  };
  metta = { aURL: aURL, QFields: QFields, aFields: aFields, phTable: phTable };
  phForm = new PhForm('fixItem', metta, options); 
});

function initPhTableColumns() {
  var curnOptions = [];
  // $.ajax({
  //   type: 'POST',
  //   url: aURL.Url + aURL.Api + '',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': PhSettings.Headers.Authorization
  //   }, success: function (response) {
  //     if (response.status) {
  //       curnOptions = response.Data;
  //     } else {

  //     }
  //   },
  //   error: function (response) {
  //   }
  // });
  var aColumns = [];
  var nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="icon flaticon-delete p-0"></i>',
    callback: {
      'event': 'click',
      'callback': deleteRow
    }
  };
  aColumns[nIdx++] = {
    title: 'Id',
    field: 'Id',
    visible: false,
    component: 'input',
    enabled: true
  };
  aColumns[nIdx++] = {
    title: 'MstId',
    field: 'MstId',
    visible: false,
    component: 'input',
    enabled: true
  };
  aColumns[nIdx++] = {
    title: getLabel('Debit'),
    field: 'DebC',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {
      'event': 'change',
      'callback': onChangeDebitC
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Credit'),
    field: 'CrdC',
    datatype: 'decimal',
    width: '125px',
    aggregate: 'sum',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {
      'event': 'change',
      'callback': onChangeCreditC
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Remarks'),
    field: 'Rem',
    width: '300px',
    component: 'input',
    enabled: true
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT.deleteRow(parseInt($(this).data('row')));
}

function onChangeDebitC() {
  var nRow = $(this).data('row');
  changeDebitC(nRow);
}

function onChangeCreditC() {
  var nRow = $(this).data('row');
  changeCreditC(nRow);
}

function onChangeCurrency() {
  var nRate = 1;
  var nRow = $(this).data('row');
  var nId = $(this).val();
  if (nId !== '') {
    $.ajax({
      type: 'POST',
      async: false,
      url: PhSettings.serviceURL,
      data: {
        "vCopy": PhSettings.copy,
        "vCDId": PhSettings.CDId,
        "vGUId": PhSettings.GUId,
        "vOperation": "cpy-Management-Currency-GetRate",
        "nId": nId
      },
      success: function (response) {
        try {
          if (response.Status) {
            nRate = response.nRate;
            if (nId === 1) {
              phForm.phTable.phT.disableField(nRow, 'Deb');
              phForm.phTable.phT.disableField(nRow, 'Crd');
            } else {
              phForm.phTable.phT.enableField(nRow, 'Deb');
              phForm.phTable.phT.enableField(nRow, 'Crd');
            }
            changeRate(nRow, nRate);
          }
        } catch (ex) {
        }
      },
      error: function (response) {

      }
    });
  }

}

function onChangeRate() {
  var nRow = $(this).data('row');
  var nRate = parseFloat($(this).val());
  changeRate(nRow, nRate);
}

function onChangeDebit() {
  var nRow = $(this).data('row');
  console.log('OnChange Debit');
}

function onChangeCredit() {
  var nRow = $(this).data('row');
  console.log('OnChange Credit');
}

function changeDebitC(nRow) {
  console.log('OnChange DebitC');
  var nDebitC = parseFloat(phForm.phTable.phT.getFieldValue(nRow, 'DebC'));
  var nRate = parseFloat(phForm.phTable.phT.getFieldValue(nRow, 'Rate'));
  var nDebit = parseFloat(nDebitC * nRate);
  phForm.phTable.phT.setFieldValue(nRow, 'Deb', nDebit);
  if (nDebit > 0) {
    phForm.phTable.phT.setFieldValue(nRow, 'Crd', 0);
    phForm.phTable.phT.setFieldValue(nRow, 'CrdC', 0);
  }
}

function changeCreditC(nRow) {
  console.log('OnChange CreditC');
  var nCreditC = parseFloat(phForm.phTable.phT.getFieldValue(nRow, 'CrdC'));
  var nRate = parseFloat(phForm.phTable.phT.getFieldValue(nRow, 'Rate'));
  var nCredit = parseFloat(nCreditC * nRate);
  phForm.phTable.phT.setFieldValue(nRow, 'Crd', nCredit);
  if (nCredit > 0) {
    phForm.phTable.phT.setFieldValue(nRow, 'Deb', 0);
    phForm.phTable.phT.setFieldValue(nRow, 'DebC', 0);
  }
}

function changeRate(nRow, nRate) {
  phForm.phTable.phT.setFieldValue(nRow, 'Rate', nRate);
  var nDebitC = parseFloat(phForm.phTable.phT.getFieldValue(nRow, 'DebC'));
  if (nDebitC > 0) {
    var nDebit = parseFloat(nDebitC * nRate);
    phForm.phTable.phT.setFieldValue(nRow, 'Deb', nDebit);
    phForm.phTable.phT.setFieldValue(nRow, 'Crd', 0);
    phForm.phTable.phT.setFieldValue(nRow, 'CrdC', 0);
  } else {
    var nCreditC = parseFloat(phForm.phTable.phT.getFieldValue(nRow, 'CrdC'));
    if (nCreditC > 0) {
      var nCredit = parseFloat(nCreditC * nRate);
      phForm.phTable.phT.setFieldValue(nRow, 'Crd', nCredit);
      phForm.phTable.phT.setFieldValue(nRow, 'Deb', 0);
      phForm.phTable.phT.setFieldValue(nRow, 'DebC', 0);
    }
  }
}
