let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus;
let aCompensation = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getCompensation();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/EmployeeCompensation';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: setAmount, afterEdit: setLabel, afterPagerClick: setLabel};
  phForm = new PhForm('EmployeeCompensation', metta, options);
  $('#fldComId').change(function () {
    setAmount();
  });
  setAmount();
});

function getCompensation() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Compensation/List',
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
          aCompensation[i] = {};
          aCompensation[i].id = response.data.List[i].id;
          aCompensation[i].name = response.data.List[i].num + ' - ' + response.data.List[i].name;
          aCompensation[i].amt = response.data.List[i].pamt;
          aCompensation[i].typeName = response.data.List[i].typeName;
        }
      }
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
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
    label: getLabel('Compensation'),
    element: 'ComId',
    field: 'comId',
    component: PhFC_Select,
    defValue: '',
    options: aCompensation,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: -1,
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amount'),
    element: 'Pamt',
    field: 'pamt',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
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
    label: getLabel('Compensation'),
    element: 'fldComId',
    field: 'comId',
    rField: 'comName',
    isRequired: true,
    defValue: 1,
    options: aCompensation,
    tableWidth: '20'
  };
  aFields[idx++] = {
    label: getLabel('Amount'),
    element: 'fldPamt',
    field: 'pamt',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('S.date'),
    element: 'fldSdate',
    field: 'sdate',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('E.date'),
    element: 'fldEdate',
    field: 'edate',
    isRequired: true,
    defValue: '',
    tableWidth: 10
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
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '40'
  };
  return aFields;
}

function setAmount() {
  let aComp = aCompensation.filter(function (el) {
    return el.id === $('#fldComId').val();
  });
  $('#fldPamt').val(aComp[0].amt);
  setLabel();
}

function setLabel() {
  let aDeduct = aDeduction.filter(function (el) {
    return el.id === $('#fldDedId').val();
  });
  $('#labelAmt').html(getLabel(aDeduct[0].typeName));
}