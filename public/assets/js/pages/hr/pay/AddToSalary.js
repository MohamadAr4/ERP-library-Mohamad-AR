let phForm;
let aType = PhSettings.UsrCodes.EmpChangeType,
        aSalaryType = PhSettings.UsrCodes.EmpAffectedSalary,
        aTaxBracket = [], aSalary = [], aEmployees = [];
let month = currentDate();
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
  removeFormType();
  getTaxBracket();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/AddonSalary';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('AddToSalary', metta, options);
  $('#fldTypeId,#fldSaltypId,#fldPerc,#fldAmt,#fldNmin,#fldNmax').change(function () {
    for (let i = 0; i < phForm.phTable.phT0.aRows.length; i++) {
      renderSalaryType(i);
    }
  });
  $('#ph-Get').click(function () {
    getAllEmployees();
  });
  defaultDate();
});

function removeFormType() {
  let aNewType = aType.filter(function (el) {
    return el.id !== "5";
  });
  aType = aNewType;
}

function defaultDate() {
  $('#fldNyear').val(PhSettings.Period.SDate.slice(6, 10));
  $('#fldNmonth').val(month.slice(3, 5));
}

function getTaxBracket() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/TaxBracketsMaster/List',
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
          aTaxBracket[i] = {};
          aTaxBracket[i].id = response.data.List[i].id;
          aTaxBracket[i].name = response.data.List[i].num + ' - ' + response.data.List[i].name;
        }
      }
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
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Doc.Num'),
    element: 'Docn',
    field: 'docn',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Doc.Date'),
    element: 'Docd',
    field: 'docd',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Type'),
    element: 'TypeId',
    field: 'typeId',
    component: PhFC_Select,
    defValue: '',
    options: aType,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Salary.Type'),
    element: 'SaltypId',
    field: 'saltypId',
    component: PhFC_Select,
    defValue: '',
    options: aSalaryType,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('TaxBrackets'),
    element: 'BrktId',
    field: 'brktId',
    component: PhFC_Select,
    defValue: '',
    options: aTaxBracket,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Year'),
    element: 'Nyear',
    field: 'nyear',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Month'),
    element: 'nmonth',
    field: 'nmonth',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Perc'),
    element: 'Perc',
    field: 'perc',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amount'),
    element: 'Amt',
    field: 'amt',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Min'),
    element: 'Nmin',
    field: 'nmin',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Max'),
    element: 'Nmax',
    field: 'nmax',
    component: PhFC_Number,
    defValue: '',
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
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Doc.Num'),
    element: 'fldDocn',
    field: 'docn',
    isRequired: false,
    defValue: '',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Doc.Date'),
    element: 'fldDocd',
    field: 'docd',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    isRequired: true,
    defValue: 1,
    options: aType,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Salary.Type'),
    element: 'fldSaltypId',
    field: 'saltypId',
    isRequired: true,
    defValue: '',
    options: aSalaryType,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('TaxBrackets'),
    element: 'fldBrktId',
    field: 'brktId',
    rField: 'brktName',
    isRequired: true,
    defValue: '',
    options: aTaxBracket,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Year'),
    element: 'fldNyear',
    field: 'nyear',
    isRequired: true,
    defValue: '',
    tableWidth: "10"
  };
  aFields[idx++] = {
    label: getLabel('Month'),
    element: 'fldNmonth',
    field: 'nmonth',
    isRequired: true,
    defValue: '',
    tableWidth: "10"
  };
  aFields[idx++] = {
    label: getLabel('Perc'),
    element: 'fldPerc',
    field: 'perc',
    isRequired: false,
    defValue: 0,
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Amount'),
    element: 'fldAmt',
    field: 'amt',
    isRequired: false,
    defValue: 0,
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('S.Min'),
    element: 'fldNmin',
    field: 'nmin',
    isRequired: false,
    defValue: '',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('S.Max'),
    element: 'fldNmax',
    field: 'nmax',
    isRequired: false,
    defValue: '',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '40'
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
    field: 'asalId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: "0"
  };
  aColumns[nIdx++] = {
    title: getLabel('Employee'),
    field: 'empId',
    rfield: 'empName',
    datatype: 'integer',
    width: '300px',
    component: 'input',
    required: true,
    enabled: true,
    defValue: -1,
    defLabel: '',
    callback: {'event': 'focusout',
      'callback': onChangeEmployee
    },
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Emp/Employee/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Salary'),
    field: 'sal',
    rfield: 'sal',
    datatype: 'string',
    width: '150px',
    required: true,
    component: 'display',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Amount'),
    field: 'amt',
    datatype: 'NUMBER',
    width: '150px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    rfield: 'rem',
    datatype: 'string',
    width: '500px',
    required: false,
    component: 'input',
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function onChangeEmployee() {
  let nRow = $(this).data('row');
  let nId = parseInt(phForm.phTable.phT0.getFieldValue(nRow, 'empId'));
  if (nId !== -1) {
    $.ajax({
      type: 'GET',
      async: false,
      url: PhSettings.apiURL + '/UC/Emp/Employee/' + nId,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      }, success: function (response) {
        if (response.status) {
          aSalary[nRow] = {};
          aSalary[nRow].basesal = response.data.Obj.basesal;
          aSalary[nRow].insursal = response.data.Obj.insursal;
          aSalary[nRow].financesal = response.data.Obj.financesal;
          renderSalaryType(nRow);
        }
      }, error: function (response) {
      }
    });
  }
}

function renderSalaryType(nRow) {
  let vSalType = '';
  if ($('#fldSaltypId').val() == 1) {
    vSalType = 'basesal';
  } else if ($('#fldSaltypId').val() == 2) {
    vSalType = 'insursal';
  } else if ($('#fldSaltypId').val() == 3) {
    vSalType = 'financesal';
  }
  phForm.phTable.phT0.setFieldValueLabel(nRow, 'sal', aSalary[nRow][vSalType], aSalary[nRow][vSalType]);
  calcChange(nRow, aSalary[nRow][vSalType]);
}

function calcChange(nRow, nSal) {
  let change = 0;
  if ($('#fldTypeId').val() == 1 && parseFloat($('#fldPerc').val()) > 0) {
    change = parseFloat((nSal * $('#fldPerc').val()) / 100);
  } else if ($('#fldTypeId').val() == 2 && parseFloat($('#fldAmt').val()) > 0) {
    change = parseFloat($('#fldAmt').val());
  } else if ($('#fldTypeId').val() == 3 && parseFloat($('#fldAmt').val()) > 0 && parseFloat($('#fldPerc').val()) > 0) {
    change = parseFloat($('#fldAmt').val()) + parseFloat(nSal);
    change = parseFloat((change * $('#fldPerc').val()) / 100);
  } else if ($('#fldTypeId').val() == 4 && parseFloat($('#fldAmt').val()) > 0 && parseFloat($('#fldPerc').val()) > 0) {
    change = parseFloat((nSal * $('#fldPerc').val()) / 100);
    change += parseFloat($('#fldAmt').val());
  }
  if (parseFloat($('#fldNmin').val()) > 0 || parseFloat($('#fldNmax').val()) > 0) {
    if (change < parseFloat($('#fldNmin').val())) {
      change = parseFloat($('#fldNmin').val());
    } else if (change > parseFloat($('#fldNmax').val())) {
      change = parseFloat($('#fldNmax').val());
    }
  }
  phForm.phTable.phT0.setFieldValue(nRow, 'amt', change);
}

function getAllEmployees() {
  let aQData = [];
  let nRow = '';
  aQData[0] = {};
  aQData[0].fieldName = 'statusId';
  aQData[0].operation = '=';
  aQData[0].dataType = 2;
  aQData[0].value1 = 1;
  aQData[0].value2 = '';
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Employee/Search/0/0',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && parseInt(response.code) === 200 && response.data.List !== []) {
        for (let i = 0; i < response.data.List.length; i++) {
          phForm.phTable.phT0.addEmptyRow();
          nRow = parseInt(phForm.phTable.phT0.getRowCount()) - 1;
          phForm.phTable.phT0.setFieldValueLabel(nRow, 'empId', response.data.List[i].id, response.data.List[i].name);
          if ($('#fldSaltypId').val() == 1) {
            phForm.phTable.phT0.setFieldValue(nRow, 'sal', response.data.List[i].basesal);
            calcChange(nRow, response.data.List[i].basesal);
          } else if ($('#fldSaltypId').val() == 2) {
            phForm.phTable.phT0.setFieldValue(nRow, 'sal', response.data.List[i].insursal);
            calcChange(nRow, response.data.List[i].insursal);
          } else if ($('#fldSaltypId').val() == 3) {
            phForm.phTable.phT0.setFieldValue(nRow, 'sal', response.data.List[i].financesal);
            calcChange(nRow, response.data.List[i].financesal);
          }
        }
        phForm.phTable.phT0.render();
      }
    },
    error: function (response) {
    }
  });
  showHeaderSpinner(false);
}
