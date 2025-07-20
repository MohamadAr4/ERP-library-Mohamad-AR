let phForm;
let month = currentDate();
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/SalariesCalculation';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterNew: defaultDate};
  phForm = new PhForm('AttendanceForSalaries', metta, options);
  $('#ph-Get-Attend').click(function () {
    if (phForm.saveValidated) {
      swal.fire({
        title: getLabel('The.data.will.be.modified') + ' !!',
        text: getLabel('Are.You.Sure.?'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
        cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
        reverseButtons: true,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-info"
        }
      }).then(function (result) {
        if (result.value) {
          getAttendance();
        } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
        }
      });
    }
  });
  defaultDate();
});

function getAttendance() {
  let year = parseInt($('#fldNyear').val());
  let month = parseInt($('#fldNmonth').val());
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/CC/HR/GetAttendance/' + year + '/' + month,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        phForm.doGetData(response.data.InsertedId, PhF_Action_New);
      }
    }
  });
}

function defaultDate() {
  $('#fldNyear').val(PhSettings.Period.SDate.slice(6, 10));
  $('#fldNmonth').val(month.slice(3, 5));
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
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
    value: 0,
    alert: {
      isOk: alertCheck,
      message: getLabel('The document cannot be deleted or modified'),
      action: alertAction
    }
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
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: 'MstId',
    field: 'salId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Employee'),
    field: 'empId',
    rfield: 'empName',
    datatype: 'integer',
    width: '225px',
    component: 'input',
    required: true,
    enabled: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Emp/Employee/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Dadd'),
    field: 'dadd',
    width: '110px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Nadd'),
    field: 'nadd',
    width: '110px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Wadd'),
    field: 'wadd',
    width: '140px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Hadd'),
    field: 'hadd',
    width: '140px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Nabs'),
    field: 'nabs',
    width: '75px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Nsik') + ' 70',
    field: 'nsik70',
    width: '100px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Nsik') + ' 80',
    field: 'nsik80',
    width: '100px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Ndel'),
    field: 'ndel',
    width: '100px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Nnpay'),
    field: 'nnpay',
    width: '100px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '0'
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
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

function alertCheck() {
  let isOk = false;
  if (parseInt($('#fldStatusId').val()) === 2) {
    isOk = true;
  }
  return isOk;
}

function alertAction() {
  $('#ph-submit').addClass('d-none');
  $('#ph-delete').addClass('d-none');
  phForm.saveValidated = false;
  phForm.deleteValidated = false;
}

