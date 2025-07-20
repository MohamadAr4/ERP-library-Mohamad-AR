let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aYesNo = PhSettings.PhsCodes.PhsYesno;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/Loans';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: disabledTotalAmount, afterEdit: disabledTotalAmount};
  phForm = new PhForm('Loans', metta, options);
  $('#fldSdate,#fldTamt,#fldMamt').change(function () {
    calcEndDate();
  });
  $('#fldTamt').change(function () {
    if ($('#fldId').val() == 0) {
      $('#fldBamt').val($('#fldTamt').val());
    }
  });
});

function disabledTotalAmount() {
  if ($('#fldId').val() > 0) {
    $('#fldTamt').attr('disabled', true);
  } else {
    $('#fldTamt').attr('disabled', false);
  }
}

function calcEndDate() {
  let nTotalAmount = parseFloat($('#fldTamt').val());
  let nMonthAmount = parseFloat($('#fldMamt').val());
  let dSDate = $('#fldSdate').val();
  let nMonth = Math.ceil(nTotalAmount / nMonthAmount);
  let nDays = nMonth * 30;
  let dEDate = addDaysToDate(stringToDate(dSDate), nDays);
  dEDate = formatDate(dEDate, 'dd-mm-yyyy');
  if (!isNaN(nTotalAmount) && !isNaN(nMonthAmount)) {
    $('#fldEdate').val(dEDate);
  }
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
    label: getLabel('Employee'),
    element: 'EmpId',
    field: 'empId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Pflg'),
    element: 'PflgId',
    field: 'pflgId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aYesNo,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Date'),
    element: 'Sdate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('E.date'),
    element: 'Edate',
    field: 'edate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Total.Amount'),
    element: 'Tamt',
    field: 'tamt',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Month.Amount'),
    element: 'Mamt',
    field: 'mamt',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Balance.Amount'),
    element: 'Bamt',
    field: 'bamt',
    component: PhFC_Text,
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
    isRequired: false,
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
    label: getLabel('Employee'),
    element: 'fldEmpId',
    rElement: 'fldEmpName',
    field: 'empId',
    rField: 'empName',
    isRequired: false,
    defValue: '',
    tableWidth: '25'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: 1,
    options: aStatus,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('S.Date'),
    element: 'fldSdate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('E.Date'),
    element: 'fldEdate',
    field: 'edate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Pflg'),
    element: 'fldPflgId',
    field: 'pflgId',
    rField: 'pflgName',
    getLabel: true,
    isRequired: true,
    defValue: 1,
    options: aYesNo,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Total.Amount'),
    element: 'fldTamt',
    field: 'tamt',
    isRequired: false,
    defValue: '',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Month.Amount'),
    element: 'fldMamt',
    field: 'mamt',
    isRequired: false,
    defValue: '',
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Balance.Amount'),
    element: 'fldBamt',
    field: 'bamt',
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

