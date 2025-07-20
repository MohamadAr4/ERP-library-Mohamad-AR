let phForm;
let aType = PhSettings.PhsCodes.PhsSign,
        aApprGroup = PhSettings.UsrCodes.EmpAppraisalGrp,
        aApprItem = PhSettings.UsrCodes.EmpAppraisalItem;
let aApprisal = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/AppraisalNotes';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', beforNew: '', beforEdit: getEmpId, beforPagerClick: getEmpId};
  phForm = new PhForm('AppraisalNote', metta, options);
  $('#fldEmpName').focusout(function () {
    if ($('#fldEmpId').val() !== '') {
      getEmpAppraisalTemplates();
    } else {
      $('#fldAppraisal').val('');
      $('#fldApprgrpId').html('');
      $('#fldAppritmId').html('');
    }
  });
  $('#fldApprgrpId').change(function () {
    renderApprisalItemSelect();
  });
  $('#fldAppritmId').change(function () {
    getMaxPoints();
  });
});

function getEmpId() {
  $('#fldEmpId').val(phForm.aResultData.empId);
  getEmpAppraisalTemplates();
}

function getEmpAppraisalTemplates() {
  showHeaderSpinner(true);
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/CC/HR/EmployeeAppraisalTemplate/' + parseInt($('#fldEmpId').val()),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        $('#fldAppraisal').val(response.data.Obj.num + ' - ' + response.data.Obj.name);
        for (let i = 0; i < response.data.Obj.aList.length; i++) {
          aApprisal[i] = {};
          aApprisal[i].apprgrpId = response.data.Obj.aList[i].apprgrpId;
          aApprisal[i].apprgrpName = response.data.Obj.aList[i].apprgrpName;
          aApprisal[i].appritmId = response.data.Obj.aList[i].appritmId;
          aApprisal[i].appritmName = response.data.Obj.aList[i].appritmName;
          aApprisal[i].points = response.data.Obj.aList[i].points;
        }
        renderApprisalGroupSelect();
      }
    }
  });
  showHeaderSpinner(false);
}

function renderApprisalGroupSelect() {
  let vHtml = '';
  for (let i = 0; i < aApprisal.length; i++) {
    if (i > 0) {
      if (aApprisal[i].apprgrpId !== aApprisal[i - 1].apprgrpId) {
        vHtml += '<option value="' + aApprisal[i].apprgrpId + '">' + aApprisal[i].apprgrpName + '</option>';
      }
    } else {
      vHtml += '<option value="' + aApprisal[i].apprgrpId + '">' + aApprisal[i].apprgrpName + '</option>';
    }
  }
  $('#fldApprgrpId').html(vHtml);
  renderApprisalItemSelect();
}

function renderApprisalItemSelect() {
  let vHtml = '';
  let aApprisalItem = aApprisal.filter(function (el) {
    return el.apprgrpId === $('#fldApprgrpId').val();
  });
  for (let i = 0; i < aApprisalItem.length; i++) {
    vHtml += '<option value="' + aApprisalItem[i].appritmId + '">' + aApprisalItem[i].appritmName + '</option>';
  }
  $('#fldAppritmId').html(vHtml);
  getMaxPoints();
}

function getMaxPoints() {
  let aMaxPoint = aApprisal.filter(function (el) {
    return el.apprgrpId === $('#fldApprgrpId').val() && el.appritmId === $('#fldAppritmId').val();
  });
  $('#fldPoints').attr('max', aMaxPoint[0].points);
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
    label: getLabel('Appraisal.Group'),
    element: 'ApprgrpId',
    field: 'apprgrpId',
    component: PhFC_Select,
    defValue: '',
    options: aApprGroup,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Appraisal.Item'),
    element: 'AppritmId',
    field: 'appritmId',
    component: PhFC_Select,
    defValue: '',
    options: aApprItem,
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
    label: getLabel('Points'),
    element: 'Points',
    field: 'points',
    component: PhFC_Number,
    defValue: '',
    minValue: 0,
    step: 1,
    maxValue: 1000,
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
    tableWidth: '8'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
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
    label: getLabel('Appraisal.Group'),
    element: 'fldApprgrpId',
    field: 'apprgrpId',
    rField: 'apprgrpName',
    isRequired: true,
    defValue: 1,
    options: aApprGroup,
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Appraisal.Item'),
    element: 'fldAppritmId',
    field: 'appritmId',
    rField: 'appritmName',
    isRequired: true,
    defValue: 1,
    options: aApprItem,
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aType,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Points'),
    element: 'fldPoints',
    field: 'points',
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
