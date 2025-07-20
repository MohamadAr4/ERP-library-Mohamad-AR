let phForm;
let aType = PhSettings.UsrCodes.EmpChangeType,
        aSalaryType = PhSettings.UsrCodes.EmpAffectedSalary,
        aBrkt = [],
        aSalary = [];
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
  getBracket();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/ChangeSalary';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterNew: showComiteSalary, afterEdit: showComiteSalary, afterPagerClick: showComiteSalary};
  phForm = new PhForm('SalaryChange', metta, options);
  $('#fldTypeId,#fldSaltypId,#fldBrktId,#fldPerc,#fldAmt,#fldNmin,#fldNmax').change(function () {
    for (let i = 0; i < phForm.phTable.phT0.aRows.length; i++) {
      renderSalaryType(i);
    }
  });
  $('#ph-commit').click(function () {
    commiteSalaryChange();
  });
});

function getBracket() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/ChangesalaryBracketsMst/Search/0/0',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, data: JSON.stringify([]),
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aBrkt[i] = {};
          aBrkt[i].id = response.data.List[i].id;
          aBrkt[i].name = response.data.List[i].name;
          aBrkt[i].aList = response.data.List[i].aList;
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
    aOpers: aTOpers
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
    label: getLabel('Brackets'),
    element: 'BrktId',
    field: 'brktId',
    component: PhFC_Select,
    defValue: '',
    options: aBrkt,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Perc'),
    element: 'Perc',
    field: 'perc',
    component: PhFC_Number,
    step: '1',
    min: '0',
    max: '100',
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amount'),
    element: 'Amt',
    field: 'amt',
    component: PhFC_Number,
    step: '1',
    min: '0',
    max: '',
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Min'),
    element: 'Nmin',
    field: 'nmin',
    component: PhFC_Number,
    step: '1',
    min: '0',
    max: '',
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Max'),
    element: 'Nmax',
    field: 'nmax',
    component: PhFC_Number,
    step: '1',
    min: '0',
    max: '',
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
    element: 'fldStatusId',
    field: 'statusId',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Doc.Num'),
    element: 'fldDocn',
    field: 'docn',
    isRequired: false,
    defValue: '',
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('Doc.Date'),
    element: 'fldDocd',
    field: 'docd',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    isRequired: true,
    defValue: "",
    options: aType,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Salary.Type'),
    element: 'fldSaltypId',
    field: 'saltypId',
    rField: 'saltypName',
    isRequired: true,
    defValue: '',
    options: aSalaryType,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Brackets'),
    element: 'fldBrktId',
    field: 'brktId',
    rField: 'brktName',
    isRequired: true,
    defValue: 1,
    options: aBrkt,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Perc'),
    element: 'fldPerc',
    field: 'perc',
    isRequired: false,
    defValue: 0,
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('Amount'),
    element: 'fldAmt',
    field: 'amt',
    isRequired: false,
    defValue: 0,
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('S.Min'),
    element: 'fldNmin',
    field: 'nmin',
    isRequired: false,
    defValue: 0,
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('S.Max'),
    element: 'fldNmax',
    field: 'nmax',
    isRequired: false,
    defValue: 0,
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 40
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
    field: 'csalId',
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
    title: getLabel('Osal'),
    field: 'osal',
    datatype: 'NUMBER',
    width: '150px',
    required: true,
    component: 'display',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Chnge'),
    field: 'chnge',
    datatype: 'NUMBER',
    width: '150px',
    required: true,
    component: 'input',
    enabled: true,
    defValue: '',
    callback: {'event': 'focusout',
      'callback': renderSalaryType
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Nsal'),
    field: 'nsal',
    datatype: 'NUMBER',
    width: '150px',
    required: true,
    component: 'display',
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    rfield: 'rem',
    datatype: 'string',
    width: '300px',
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
  if (isNaN(nRow)) {
    nRow = parseInt($(this).data('row'));
  }
  let vSalType = '';
  if ($('#fldSaltypId').val() == 1) {
    vSalType = 'basesal';
  } else if ($('#fldSaltypId').val() == 2) {
    vSalType = 'insursal';
  } else if ($('#fldSaltypId').val() == 3) {
    vSalType = 'financesal';
  }
  phForm.phTable.phT0.setFieldValueLabel(nRow, 'osal', aSalary[nRow][vSalType], aSalary[nRow][vSalType]);
  calcChange(nRow, aSalary[nRow][vSalType]);
}

function calcChange(nRow, nSal) {
  let change = 0;
  if ($('#fldTypeId').val() == 1) {
    change = parseFloat((nSal * $('#fldPerc').val()) / 100);
  } else if ($('#fldTypeId').val() == 2) {
    change = parseFloat($('#fldAmt').val());
  } else if ($('#fldTypeId').val() == 3) {
    change = parseFloat($('#fldAmt').val()) + parseFloat(nSal);
    change = parseFloat((change * $('#fldPerc').val()) / 100);
  } else if ($('#fldTypeId').val() == 4) {
    change = parseFloat((nSal * $('#fldPerc').val()) / 100);
    change += parseFloat($('#fldAmt').val());
  } else if ($('#fldTypeId').val() == 5) {
    change = calcBrktTrn(nRow);
  } else if ($('#fldTypeId').val() == 6) {
    change = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'chnge'));
    if (isNaN(change)) {
      change = 0;
    }
  }
  if (parseFloat($('#fldNmin').val()) > 0 || parseFloat($('#fldNmax').val()) > 0) {
    if (change < parseFloat($('#fldNmin').val())) {
      change = parseFloat($('#fldNmin').val());
    } else if (change > parseFloat($('#fldNmax').val())) {
      change = parseFloat($('#fldNmax').val());
    }
  }
  let nOldSal = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'osal'));
  phForm.phTable.phT0.setFieldValue(nRow, 'chnge', change);
  phForm.phTable.phT0.setFieldValueLabel(nRow, 'nsal', change + nOldSal, change + nOldSal);
}

function calcBrktTrn(nRow) {
  let nChange = 0;
  let nBrkt = $('#fldBrktId').val();
  let nIndex = aBrkt.map(e => e.id).indexOf(nBrkt);
  let nOldSal = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'osal'));
  for (let i = 0; i < aBrkt[nIndex].aList.length; i++) {
    if (nOldSal <= parseFloat(aBrkt[nIndex].aList[i].eamt)) {
      if (nOldSal >= parseFloat(aBrkt[nIndex].aList[i].samt)) {
        nChange += ((nOldSal - aBrkt[nIndex].aList[i].samt) / 100) * aBrkt[nIndex].aList[i].amt;
      }
    } else {
      nChange += ((aBrkt[nIndex].aList[i].eamt - aBrkt[nIndex].aList[i].samt) / 100) * aBrkt[nIndex].aList[i].amt;
    }
  }
  return nChange;
}

function showComiteSalary() {
  let aField = getFields();
  if ($('#fldId').val() > 0) {
    $('#ph_divcommit').removeClass('d-none');
  } else {
    $('#ph_divcommit').addClass('d-none');
  }
  if (parseInt($('#fldStatusId').val()) === 0) {
    $('#ph-submit').removeClass('d-none');
    $('#ph-delete').removeClass('d-none');
    for (let i = 0; i < aField.length; i++) {
      $('#' + aField[i].element).attr('disabled', false);
    }
  } else {
    $('#ph-submit').addClass('d-none');
    $('#ph-delete').addClass('d-none');
    for (let i = 0; i < aField.length; i++) {
      $('#' + aField[i].element).attr('disabled', true);
    }
    phForm.validated = false;
  }
}

function commiteSalaryChange() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/HR/CommitSalaryChange/' + $('#fldId').val(),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        showComiteSalary();
      }
    }, error: function (response) {
    }
  });
}
;