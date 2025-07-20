let phForm;
let aType = PhSettings.UsrCodes.EmpOvertime;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/Overtimes';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', beforSave: checkValue};
  phForm = new PhForm('Overtimes', metta, options);
  showHeaderSpinner(false);
});


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
    element: 'fldEmpId',
    field: 'empId',
    component: PhFC_Autocomplete,
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    defValue: '',
    aOpers: aSAOpers
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
    label: getLabel('S.Date'),
    element: 'Sdate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Hour'),
    element: 'Shour',
    field: 'shour',
    defValue: '',
    minValue: 0,
    step: 1,
    maxValue: 23,
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('S.Minute'),
    element: 'Sminute',
    field: 'sminute',
    defValue: '',
    minValue: 0,
    step: 1,
    maxValue: 59,
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('E.Date'),
    element: 'Edate',
    field: 'edate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('E.Hour'),
    element: 'ehour',
    field: 'ehour',
    defValue: '',
    minValue: 0,
    step: 1,
    maxValue: 23,
    component: PhFC_Number,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('E.Minute'),
    element: 'eminute',
    field: 'eminute',
    defValue: '',
    minValue: 0,
    step: 1,
    maxValue: 59,
    component: PhFC_Number,
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
    defValue: 0
  };
  aFields[idx++] = {
    label: getLabel('Num'),
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
    label: getLabel('Employee'),
    element: 'fldEmpId',
    rElement: 'fldEmpName',
    field: 'empId',
    rField: 'empName',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    isRequired: true,
    defValue: '',
    options: aType,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('S.Date'),
    element: 'fldSdate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('S.Hour'),
    element: 'fldShour',
    field: 'shour',
    isRequired: true,
    defValue: 0,
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('S.Minute'),
    element: 'fldSminute',
    field: 'sminute',
    isRequired: true,
    defValue: 0,
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('E.Date'),
    element: 'fldEdate',
    field: 'edate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('E.Hour'),
    element: 'fldEhour',
    field: 'ehour',
    isRequired: true,
    defValue: '',
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('E.Minute'),
    element: 'fldEminute',
    field: 'eminute',
    isRequired: true,
    defValue: '59',
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

function checkValue() {
  let dSdate = $('#fldSdate').val();
  let dEdate = $('#fldEdate').val();
  let dShour = $('#fldShour').val();
  let dEhour = $('#fldEhour').val();
  let dSminute = $('#fldSminute').val();
  let dEminute = $('#fldEminute').val();
  $('#fldSdate').removeClass('invalid');
  $('#fldEdate').removeClass('invalid');
  if (process(dSdate) < process(dEdate)) {
    $('#fldSdate').removeClass('invalid');
    $('#fldEdate').removeClass('invalid');
    $('#fldShour').removeClass('invalid');
    $('#fldEhour').removeClass('invalid');
    $('#fldSminute').removeClass('invalid');
    $('#fldEminute').removeClass('invalid');
    phForm.validated = true;
  } else if (dSdate === dEdate) {
    if (parseInt(dShour) < parseInt(dEhour)) {
      console.log(dShour + '<= ' + dEhour + 'remove invalid ' + (dShour <= dEhour));
      $('#fldShour').removeClass('invalid');
      $('#fldEhour').removeClass('invalid');
      $('#fldSminute').removeClass('invalid');
      $('#fldEminute').removeClass('invalid');
      phForm.validated = true;
    } else if (parseInt(dShour) === parseInt(dEhour)) {
      $('#fldShour').removeClass('invalid');
      $('#fldEhour').removeClass('invalid');
      if (parseInt(dSminute) <= parseInt(dEminute)) {
        $('#fldSminute').removeClass('invalid');
        $('#fldEminute').removeClass('invalid');
        phForm.validated = true;
      } else {
        $('#fldShour').removeClass('invalid');
        $('#fldEhour').removeClass('invalid');
        $('#fldSminute').addClass('invalid');
        $('#fldEminute').addClass('invalid');
        phForm.validated = false;
        showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Check.the.limits'));
        return 0;
      }
    } else {
      console.log(dShour + '>= ' + dEhour + 'add invalid' + (dShour >= dEhour));
      $('#fldShour').addClass('invalid');
      $('#fldEhour').addClass('invalid');
      $('#fldSminute').removeClass('invalid');
      $('#fldEminute').removeClass('invalid');
      phForm.validated = false;
      showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Check.the.limits'));
      return 0;
    }
  } else {
    $('#fldShour').removeClass('invalid');
    $('#fldEhour').removeClass('invalid');
    $('#fldSminute').removeClass('invalid');
    $('#fldEminute').removeClass('invalid');
    $('#fldSdate').addClass('invalid');
    $('#fldEdate').addClass('invalid');
    phForm.validated = false;
    showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Check.the.limits'));
    return 0;
  }
}

function process(date) {
  var parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}