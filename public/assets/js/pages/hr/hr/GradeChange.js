let phForm;
let aDefaultGrade = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  getDefaultGrade();
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/GradeChange';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'POST', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  aURL.VGet = {Method: 'GET', URL: '/Get'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', beforEdit: getEmpGrade};
  phForm = new PhForm('GradeChange', metta, options);
  $('#fldEmpName').change(function () {
    if ($('#fldEmpId').val() !== '' && $('#fldEmpName').val().trim() !== '') {
      getEmpGrade();
    } else {
      $('#fldOldGradeId').val('');
      $('#fldOldGradeName').val('');
    }
  });
});

function getDefaultGrade() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'isdefaultId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = 1;
  aQData[0].value2 = '';
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/GradeTemplatesMst/Search/0/0',
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
      if (response.status) {
        for (let i = 0; i < response.data.List[0].aList.length; i++) {
          aDefaultGrade[i] = {};
          aDefaultGrade[i].id = response.data.List[0].aList[i].id;
          aDefaultGrade[i].name = response.data.List[0].aList[i].grpName + ' - ' + response.data.List[0].aList[i].degreeName;
        }
      }
    }
  });
  showHeaderSpinner(false);
}

function getEmpGrade() {
  if (typeof phForm.aResultData !== "object") {
    $('#fldEmpId').val(phForm.aResultData.empId);
  }
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/CC/HR/EmployeeGradeTemplate/' + parseInt($('#fldEmpId').val()),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        let aOldGrade = response.data.Obj.aList.filter(function (el) {
          return el.id === response.data.TGrad_Id;
        });
        let aNewGrade = aDefaultGrade.filter(function (el) {
          return el.id !== response.data.TGrad_Id;
        });
        $('#fldOldGradeId').val(aOldGrade[0].id);
        $('#fldOldGradeName').val(aOldGrade[0].grpName + ' - ' + aOldGrade[0].degreeName);
        aDefaultGrade = [];
        let vHtml = '';
        for (let i = 0; i < aNewGrade.length; i++) {
          aDefaultGrade[i] = {};
          aDefaultGrade[i].id = aNewGrade[i].id;
          aDefaultGrade[i].name = aNewGrade[i].name;
          vHtml += '<option value="' + aDefaultGrade[i].id + '">' + aDefaultGrade[i].name + '</option>';
        }
        $('#fldNewGradeId').html(vHtml);
        if (phForm.aResultData.length > 0) {
          $('#fldNewGradeId').val(phForm.aResultData.tgradNid);
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
    component: PhFC_Text,
    defValue: '',
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
    label: getLabel('Old.Grade'),
    element: 'TgradOId',
    field: 'tgradOid',
    component: PhFC_Select,
    defValue: '',
    options: aDefaultGrade,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('New.Grade'),
    element: 'TgradNId',
    field: 'tgradNid',
    component: PhFC_Select,
    defValue: '',
    options: aDefaultGrade,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Grad.Start.Date'),
    element: 'SDate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Grad.Days'),
    element: 'Days',
    field: 'days',
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
    options: [],
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
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Employee'),
    element: 'fldEmpId',
    rElement: 'fldEmpName',
    field: 'empId',
    rField: 'empName',
    isRequired: false,
    defValue: '',
    tableWidth: '200px'
  };
  aFields[idx++] = {
    label: getLabel('Old.Grade'),
    element: 'fldOldGradeId',
    rElement: 'fldOldGradeName',
    field: 'tgradOid',
    rField: 'tgradOName',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('New.Grade'),
    element: 'fldNewGradeId',
    field: 'tgradNid',
    rField: 'tgradNName',
    isRequired: true,
    defValue: 1,
    options: aDefaultGrade,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Grad.Start.Date'),
    element: 'fldSDate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Grad.Days'),
    element: 'fldDays',
    field: 'days',
    isRequired: false,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '50'
  };
  return aFields;
}
