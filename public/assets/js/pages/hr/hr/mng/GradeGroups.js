let phForm;
let aGroup = PhSettings.UsrCodes.EmpGradgrp,
        aDeggre = PhSettings.UsrCodes.EmpGraddegree;
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
  aURL.Api = '/UC/Emp/GradeTemplatesMst';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, openNew: showSetAsDefaultBtn, afterEdit: showSetAsDefaultBtn};
  phForm = new PhForm('GradeGroups', metta, options);
  $('#ph-isdefault').click(function (e) {
    e.preventDefault();
    swal.fire({
      title: getLabel('Set.As.Default.Grade') + ' !!',
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
        setAsDefault();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
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
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
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
    label: getLabel('Num'),
    element: 'fldNum',
    field: 'num',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Default'),
    element: 'fldIsDefaultId',
    field: 'isdefaultId',
    rField: 'isdefaultName',
    getLabel: true,
    isRequired: true,
    defValue: '0',
    alert: {
      isOk: alertCheck,
      message: getLabel('This is the default grade group')
    },
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '250px'
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
    field: 'gradId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Work.group'),
    field: 'grpId',
    datatype: 'integer',
    width: '200px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: 0,
    options: aGroup
  };
  aColumns[nIdx++] = {
    title: getLabel('Grad.Degree'),
    field: 'degreeId',
    datatype: 'integer',
    width: '200px',
    required: true,
    component: 'select',
    enabled: true,
    defValue: 0,
    options: aDeggre
  };
  aColumns[nIdx++] = {
    title: getLabel('Months'),
    field: 'days',
    width: '100px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Min.Salary'),
    field: 'minsal',
    width: '150px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Max.Salary'),
    field: 'maxsal',
    width: '150px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'trem',
    width: '250px',
    datatype: 'strsng',
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

function showSetAsDefaultBtn() {
  if ($('#fldId').val() > 0) {
    $('#ph-default').removeClass('d-none');
  } else {
    $('#ph-default').addClass('d-none');
  }
}

function setAsDefault() {
  if ($('#fldId').val() > 0) {
    $.ajax({
      type: 'PUT',
      async: false,
      url: PhSettings.apiURL + '/CC/HR/SetDefaultGrade/' + parseInt($('#fldId').val()),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      }, success: function (response) {
        if (response.status) {
          showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
          $('#GradeGroupsAlertForm').html(getLabel('This is the default grade group'));
        }
      }
    });
  }
}

function alertCheck() {
  let isOk = false;
  if (parseInt($('#fldIsDefaultId').val()) === 1) {
    isOk = true;
  }
  return isOk;
}
