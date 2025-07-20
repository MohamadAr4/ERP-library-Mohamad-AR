let phForm;
let aLevel = PhSettings.UsrCodes.EmpLevel,
        aSection = PhSettings.UsrCodes.EmpSection,
        aEducation = PhSettings.UsrCodes.EmpEducation,
        aJob = PhSettings.UsrCodes.EmpJob,
        aSpec1 = PhSettings.UsrCodes.EmpSpecification1,
        aSpec2 = PhSettings.UsrCodes.EmpSpecification2,
        aSpec3 = PhSettings.UsrCodes.EmpSpecification3,
        aSpec4 = PhSettings.UsrCodes.EmpSpecification4,
        aLocation = PhSettings.UsrCodes.EmpLocation,
        aDepartment = PhSettings.UsrCodes.EmpDepartment,
        aNationality = PhSettings.UsrCodes.EmpNationality,
        aYesNo = PhSettings.PhsCodes.PhsYesno,
        aGender = PhSettings.PhsCodes.PhsGender,
        aMartial = PhSettings.PhsCodes.PhsMarital,
        aLanguage = PhSettings.UsrCodes.EmpLanguage,
        aMilitaryStatus = PhSettings.PhsCodes.PhsMilitaryStatus,
        aStatus = PhSettings.UsrCodes.EmpStatus;
let aWgtatus = [],
        aAppraiser = [],
        aSalary = [],
        aDirector = [],
        aTgrad = [];

jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/EmployeeCard';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: afterEdit, afterPagerClick: afterEdit, afterEdit: afterEdit, beforSave: checkValue};
  phForm = new PhForm('EmployeeCard', metta, options);
  let isRtl = true;
  if (PhSettings.display.vDir === 'ltr') {
    isRtl = false;
  }
  $('.ph_dateBirth').datepicker({
    isRTL: isRtl,
    dateFormat: 'dd-mm-yy',
    minDate: "-100Y",
    maxDate: "-18Y",
    timepicker: true,
    changeMonth: true,
    changeYear: true,
    showOtherMonths: true,
    selectOtherMonths: true
  });
  $('.datepicker-btn').off('click').on('click', function () {
    $(this).prev('.ph_dateBirth').datepicker('show');
  });
});

function afterEdit() {
  if (parseInt($('#fldId').val()) > 0) {
    $('#fldTgradId').attr('disabled', true);
    getEmployeeGrade();
  } else {
    $('#fldTgradId').attr('disabled', false);
    getTgrad();
    renderSelect();
  }
}

function getList() {
  getDirector();
  getAppraiser();
  getWgtatus();
  getSalary();
  getTgrad();
  showHeaderSpinner(false);
}

function getDirector() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Employee/List',
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
          aDirector[i] = {};
          aDirector[i].id = response.data.List[i].id;
          aDirector[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getAppraiser() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/AppraisalTemplatesMst/List',
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
          aAppraiser[i] = {};
          aAppraiser[i].id = response.data.List[i].id;
          aAppraiser[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getWgtatus() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/WorkGroups/List',
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
          aWgtatus[i] = {};
          aWgtatus[i].id = response.data.List[i].id;
          aWgtatus[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getSalary() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/SalaryGroups/List',
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
          aSalary[i] = {};
          aSalary[i].id = response.data.List[i].id;
          aSalary[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getTgrad() {
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
          aTgrad[i] = {};
          aTgrad[i].id = response.data.List[0].aList[i].id;
          aTgrad[i].name = response.data.List[0].aList[i].grpName + ' - ' + response.data.List[0].aList[i].degreeName;
        }
      }
    }
  });
  showHeaderSpinner(false);
}

function renderSelect() {
  let vHtml = '';
  for (let i = 0; i < aTgrad.length; i++) {
    vHtml += '<option value="' + aTgrad[i].id + '">' + aTgrad[i].name + '</option>';
  }
  $('#fldTgradId').html(vHtml);
}

function getEmployeeGrade() {
  $('#fldTgradId').html('');
  let aGradeTemplet = [];
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/GradeTemplatesTrn/List',
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
          aGradeTemplet = response.data.List.filter(function (el) {
            return el.id === phForm.aResultData.tgradId;
          });
        }
        $('#fldTgradId').html('<option value="' + aGradeTemplet[0].id + '">' + aGradeTemplet[0].grpName + ' - ' + aGradeTemplet[0].degreeName + '</option>');
      }
    }
  });

}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    field: 'id',
    component: PhFC_Number,
    visibel: false,
    value: 0,
    value2: '',
    oper: '>'
  };
  aQFields[idx++] = {
    label: getLabel('Employee.Status'),
    element: 'StatusId',
    field: 'statusId',
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('UserName'),
    element: 'UserId',
    field: 'userId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Cpy/Users/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Number'),
    element: 'Num',
    field: 'num',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('ID.Number'),
    element: 'Nnum',
    field: 'nnum',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
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
    label: getLabel('Father'),
    element: 'Father',
    field: 'father',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Mother'),
    element: 'Mother',
    field: 'mother',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Language'),
    element: 'LangId',
    field: 'langId',
    component: PhFC_Select,
    defValue: 1,
    options: aLanguage,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Education'),
    element: 'EducatId',
    field: 'educatId',
    component: PhFC_Select,
    defValue: -1,
    options: aEducation,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Nationality'),
    element: 'NatId',
    field: 'natId',
    component: PhFC_Select,
    defValue: -1,
    options: aNationality,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Military'),
    element: 'MilitaryId',
    field: 'militaryId',
    component: PhFC_Select,
    defValue: -1,
    options: aMilitaryStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Martial'),
    element: 'MartialId',
    field: 'martialId',
    component: PhFC_Select,
    defValue: -1,
    options: aMartial,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Director'),
    element: 'DirectorId',
    field: 'directorId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Manager'),
    element: 'ManagerId',
    field: 'managerId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Department'),
    element: 'DeptId',
    field: 'deptId',
    component: PhFC_Select,
    defValue: -1,
    options: aDepartment,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Section'),
    element: 'SectId',
    field: 'sectId',
    component: PhFC_Select,
    defValue: -1,
    options: aSection,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Emp.Level'),
    element: 'LevelId',
    field: 'levelId',
    component: PhFC_Select,
    defValue: -1,
    options: aLevel,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Job'),
    element: 'JobId',
    field: 'jobId',
    component: PhFC_Select,
    defValue: -1,
    options: aJob,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Coun.Start.Date'),
    element: 'Csdate',
    field: 'csdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Coun.End.Date'),
    element: 'Cedate',
    field: 'cedate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Work.Start.Date'),
    element: 'Sdate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Work.End.Date'),
    element: 'Edate',
    field: 'edate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Working.shift'),
    element: 'WgrpId',
    field: 'wgrpId',
    component: PhFC_Select,
    defValue: 1,
    options: aWgtatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Appraisal.Template'),
    element: 'ApprId',
    field: 'apprId',
    component: PhFC_Select,
    defValue: -1,
    options: aAppraiser,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('First.Appraisal'),
    element: 'FappraisalId',
    field: 'fappraisalId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Second.Appraisal'),
    element: 'SappraisalId',
    field: 'sappraisalId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Emp/Employee/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Tgrad'),
    element: 'TgradId',
    field: 'tgradId',
    component: PhFC_Select,
    defValue: '',
    options: aTgrad,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Grad.Start.Date'),
    element: 'Gradsdate',
    field: 'gradsdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification.1'),
    element: 'Spc1Id',
    field: 'spc1Id',
    component: PhFC_Select,
    defValue: -1,
    options: aSpec1,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification.2'),
    element: 'Spc2Id',
    field: 'spc2Id',
    component: PhFC_Select,
    defValue: -1,
    options: aSpec2,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification.3'),
    element: 'Spc3Id',
    field: 'spc3Id',
    component: PhFC_Select,
    defValue: -1,
    options: aSpec3,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Specification.4'),
    element: 'Spc4Id',
    field: 'spc4Id',
    component: PhFC_Select,
    defValue: -1,
    options: aSpec4,
    aOpers: aSAOpers
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
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('ID.Number'),
    element: 'fldNnum',
    field: 'nnum',
    isRequired: true,
    defValue: '',
    tableWidth: '20'
  };
  aFields[idx++] = {
    label: getLabel('Insurance.Number'),
    element: 'fldInum',
    field: 'inum',
    isRequired: true,
    defValue: '',
    tableWidth: '20'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    isRequired: true,
    defValue: 1,
    options: aStatus,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Father'),
    element: 'fldFather',
    field: 'father',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Mother'),
    element: 'fldMother',
    field: 'mother',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldGenderId',
    field: 'genderId',
    isRequired: true,
    defValue: 1,
    options: aGender,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Nationality'),
    element: 'fldNatId',
    field: 'natId',
    rField: 'natName',
    isRequired: true,
    defValue: 1,
    options: aNationality,
    tableWidth: '20'
  };
  aFields[idx++] = {
    element: 'fldMilitaryId',
    field: 'militaryId',
    rField: 'militaryName',
    isRequired: true,
    defValue: 1,
    options: aMilitaryStatus,
    tableWidth: '8'
  };
  aFields[idx++] = {
    element: 'fldMartialId',
    field: 'martialId',
    rField: 'martialName',
    isRequired: true,
    defValue: 1,
    options: aMartial,
    tableWidth: '8'
  };
  aFields[idx++] = {
    element: 'fldDbirth',
    field: 'dbirth',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldKied',
    field: 'kied',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Working.Shift'),
    element: 'fldWgrpId',
    field: 'wgrpId',
    rField: 'wgrpName',
    isRequired: true,
    defValue: '',
    options: aWgtatus,
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldLangId',
    field: 'langId',
    isRequired: true,
    defValue: '',
    options: aLanguage,
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldUserId',
    rElement: 'fldUserName',
    field: 'userId',
    rField: 'userName',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Department'),
    element: 'fldDeptId',
    field: 'deptId',
    rField: 'deptName',
    isRequired: true,
    defValue: '',
    options: aDepartment,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Section'),
    element: 'fldSectId',
    field: 'sectId',
    rField: 'sectName',
    isRequired: true,
    defValue: '',
    options: aSection,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Level'),
    element: 'fldLevelId',
    field: 'levelId',
    rField: 'levelName',
    isRequired: true,
    defValue: '',
    options: aLevel,
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Job'),
    element: 'fldJobId',
    field: 'jobId',
    rField: 'jobName',
    isRequired: true,
    defValue: '',
    options: aJob,
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldSpc1Id',
    field: 'spc1Id',
    isRequired: true,
    defValue: '',
    options: aSpec1,
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldSpc2Id',
    field: 'spc2Id',
    isRequired: true,
    defValue: '',
    options: aSpec2,
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldSpc3Id',
    field: 'spc3Id',
    isRequired: true,
    defValue: '',
    options: aSpec3,
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldSpc4Id',
    field: 'spc4Id',
    isRequired: true,
    defValue: '',
    options: aSpec4,
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldEducatId',
    field: 'educatId',
    isRequired: true,
    defValue: '',
    options: aEducation,
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldDirectorId',
    rElement: 'fldDirectorName',
    field: 'directorId',
    rField: 'directorName',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldManagerId',
    rElement: 'fldManagerName',
    field: 'managerId',
    rField: 'managerName',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldApprId',
    field: 'apprId',
    rField: 'apprName',
    isRequired: true,
    defValue: '',
    options: aAppraiser,
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldTgradId',
    field: 'tgradId',
    rField: 'tgradName',
    isRequired: true,
    defValue: '',
    options: aTgrad,
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldFappraisalId',
    rElement: 'fldFappraisalName',
    field: 'fappraisalId',
    rField: 'fappraisalName',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldSappraisalId',
    rElement: 'fldSappraisalName',
    field: 'sappraisalId',
    rField: 'sappraisalName',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldGraddays',
    field: 'graddays',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldPbirth',
    field: 'pbirth',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldDbirth',
    field: 'dbirth',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldPhone1',
    field: 'phone1',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldPhone2',
    field: 'phone2',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldMobile1',
    field: 'mobile1',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldMobile2',
    field: 'mobile2',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldEphone',
    field: 'ephone',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldEperson',
    field: 'eperson',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldAddr',
    field: 'addr',
    isRequired: true,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    element: 'fldGradsdate',
    field: 'gradsdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldGradcons',
    field: 'gradcons',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldGradpuns',
    field: 'gradpuns',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldCsdate',
    field: 'csdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldCedate',
    field: 'cedate',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldSdate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldEdate',
    field: 'edate',
    isRequired: false,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldVacdays',
    field: 'vacdays',
    isRequired: true,
    defValue: '0',
    tableWidth: 10
  };
  aFields[idx++] = {
    element: 'fldVachours',
    field: 'vachours',
    isRequired: true,
    defValue: '0',
    tableWidth: 10
  };
  return aFields;
}

function checkValue() {
  let Nnum = $('#fldNnum').val();
  if (Nnum.length === 11) {
    $('#fldNnum').removeClass('invalid');
    phForm.validated = true;
  } else {
    $('#fldNnum').addClass('invalid');
    phForm.validated = false;
  }
}

