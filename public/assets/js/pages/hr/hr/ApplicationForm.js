let phForm;
let aEducation = PhSettings.UsrCodes.EmpEducation,
  aNationality = PhSettings.UsrCodes.EmpNationality,
  aYesNo = PhSettings.PhsCodes.PhsYesno,
  aGender = PhSettings.PhsCodes.PhsGender,
  aMartial = PhSettings.PhsCodes.PhsMarital,
  aLanguage = PhSettings.UsrCodes.EmpLanguage,
  aMilitary = PhSettings.PhsCodes.PhsMilitaryStatus,
  aRecruitment = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getRecruitment();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/Application';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('Application', metta, options);
});

function getRecruitment() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Recruitment/List',
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
          aRecruitment[i] = {};
          aRecruitment[i].id = response.data.List[i].id;
          aRecruitment[i].name = response.data.List[i].num + ' - ' + response.data.List[i].name;
        }
      }
      showHeaderSpinner(false);
    }
  });
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Recruitment'),
    element: 'fldrecrId',
    field: 'recrId',
    component: PhFC_Select,
    defValue: '',
    options: aRecruitment,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('num'),
    element: 'fldnum',
    field: 'num',
    component: PhFC_Number,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('name'),
    element: 'fldname',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('gender'),
    element: 'fldgenderId',
    field: 'genderId',
    component: PhFC_Select,
    defValue: '',
    options: aGender,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Nationality'),
    element: 'fldnatId',
    field: 'natId',
    component: PhFC_Select,
    defValue: '',
    options: aNationality,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('martial'),
    element: 'fldmartialId',
    field: 'martialId',
    component: PhFC_Select,
    defValue: '',
    options: aMartial,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('military'),
    element: 'fldmilitaryId',
    field: 'militaryId',
    component: PhFC_Select,
    defValue: '',
    options: aMilitary,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('mobile'),
    element: 'fldmobile',
    field: 'mobile',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('email'),
    element: 'fldemail',
    field: 'email',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('ReqSal'),
    element: 'fldreqsal',
    field: 'reqsal',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('rem'),
    element: 'fldrem',
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
    label: getLabel('Recruitment'),
    element: 'fldRecrId',
    field: 'recrId',
    rField: 'recrName',
    isRequired: false,
    defValue: '',
    options: aRecruitment,
    tableWidth: '200px'
  };
  aFields[idx++] = {
    label: getLabel('num'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    options: [],
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('date'),
    element: 'fldDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('name'),
    element: 'fldName',
    field: 'name',
    isRequired: false,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Gender'),
    element: 'fldGenderId',
    field: 'genderId',
    rField: 'genderName',
    isRequired: true,
    defValue: '',
    options: aGender,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Nationality'),
    element: 'fldNatId',
    field: 'natId',
    rField: 'natName',
    isRequired: true,
    defValue: '',
    options: aNationality,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    element: 'fldMartialId',
    field: 'martialId',
    rField: 'martialName',
    isRequired: true,
    defValue: '',
    options: aMartial,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    element: 'fldMilitaryId',
    field: 'militaryId',
    rField: 'militaryName',
    isRequired: true,
    defValue: '',
    options: aMilitary,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    element: 'fldMobile',
    field: 'mobile',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    element: 'fldEmail',
    field: 'email',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    element: 'fldReqSal',
    field: 'reqsal',
    isRequired: true,
    defValue: 0,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  return aFields;
}
