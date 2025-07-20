let phForm;
let nRow = 0;
let aWgtatus = [],
        aUser = [],
        aAcr = [],
        aAppraiser = [],
        aSalary = [],
        aDirector = [],
        aTgrad = [];
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
        aStatus = PhSettings.PhsCodes.PhsStatus;

jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Emp/Employee';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('EmployeeCard', metta, options);

});
function getList() {
  getDirector();
  getAppraiser();
  getUser();
  getAcr();
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
function getUser() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/Users/List',
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
          aUser[i] = {};
          aUser[i].id = response.data.List[i].id;
          aUser[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getAcr() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Emp/Accredited/List',
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
          aAcr[i] = {};
          aAcr[i].id = response.data.List[i].id;
          aAcr[i].name = response.data.List[i].name;

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
          aTgrad[i] = {};
          aTgrad[i].id = response.data.List[i].id;
          aTgrad[i].name = response.data.List[i].grpName + ' - ' + response.data.List[i].degreeName;
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
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Resume.No'),
    element: 'Pnum',
    field: 'pnum',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Shift.Number'),
    element: 'Attnum',
    field: 'attnum',
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
    label: getLabel('Insurance.Number'),
    element: 'Inum',
    field: 'inum',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Pcard'),
    element: 'Pcard',
    field: 'pcard',
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
    element: 'Mother ',
    field: 'mother ',
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
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Gender'),
    element: 'GenderId',
    field: 'genderId',
    component: PhFC_Select,
    defValue: -1,
    options: aGender,
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
    label: getLabel('Kied'),
    element: 'Kied',
    field: 'kied',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Ext'),
    element: 'Ext',
    field: 'ext',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Manager'),
    element: 'ManagerId',
    field: 'managerId',
    component: PhFC_Select,
    Value: 1,
    options: aDirector,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Place.of.birth'),
    element: 'Pbirth',
    field: 'pbirth',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date.of.birth'),
    element: 'Dbirth',
    field: 'dbirth',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Phone1'),
    element: 'Phone1',
    field: 'phone1',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Phone2'),
    element: 'Phone2',
    field: 'phone2',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Mobile1'),
    element: 'Mobile1',
    field: 'mobile1',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Mobile2'),
    element: 'Mobile2',
    field: 'mobile2',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Fax'),
    element: 'Fax',
    field: 'fax',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Emergency'),
    element: 'Eperson',
    field: 'eperson',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('ph.Emergency'),
    element: 'Ephone',
    field: 'ephone',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('EMail1'),
    element: 'Email1',
    field: 'email1',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('EMail2'),
    element: 'Email2',
    field: 'email2',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Address'),
    element: 'Addr',
    field: 'addr',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    component: PhFC_Select,
    defValue: 1,
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Work.Status'),
    element: 'WstatusId',
    field: 'wstatusId',
    component: PhFC_Select,
    defValue: 1,
    options: aYesNo,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Work.group'),
    element: 'WgrpId',
    field: 'wgrpId',
    component: PhFC_Select,
    defValue: 1,
    options: aWgtatus,
    aOpers: aSAOpers
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
    label: getLabel('Owner'),
    element: 'IsownerId',
    field: 'isownerId',
    component: PhFC_Select,
    defValue: -1,
    options: aYesNo,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('User'),
    element: 'UserId',
    field: 'userId',
    component: PhFC_Select,
    defValue: -1,
    options: aUser,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Computer'),
    element: 'Computer',
    field: 'computer',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Username'),
    element: 'Username',
    field: 'username',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
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
    label: getLabel('Level'),
    element: 'LevelId',
    field: 'levelId',
    component: PhFC_Select,
    defValue: -1,
    options: aLevel,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Location'),
    element: 'LocId',
    field: 'locId',
    component: PhFC_Select,
    defValue: -1,
    options: aLocation,
    aOpers: aSAOpers
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
    label: getLabel('Job'),
    element: 'JobId',
    field: 'jobId',
    component: PhFC_Select,
    defValue: -1,
    options: aJob,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Director'),
    element: 'DirectorId',
    field: 'directorId',
    component: PhFC_Select,
    defValue: -1,
    options: aDirector,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Salary.Group'),
    element: 'SgrpId',
    field: 'sgrpId',
    component: PhFC_Select,
    defValue: -1,
    options: aSalary,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Appraiser'),
    element: 'ApprId',
    field: 'apprId',
    component: PhFC_Select,
    defValue: -1,
    options: aAppraiser,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Tgrad'),
    element: 'TgradId',
    field: 'tgradId',
    component: PhFC_Select,
    defValue: 1,
    options: aTgrad,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('First.Appraisal'),
    element: 'FappraisalId',
    field: 'fappraisalId',
    component: PhFC_Select,
    defValue: -1,
    options: aDirector,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Second.Appraisal'),
    element: 'SappraisalId',
    field: 'sappraisalId',
    component: PhFC_Select,
    defValue: -1,
    options: aDirector,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Acr'),
    element: 'AcrId',
    field: 'acrId',
    component: PhFC_Select,
    defValue: '',
    options: aAcr,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Years'),
    element: 'Years',
    field: 'years',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('GradDays'),
    element: 'Graddays',
    field: 'graddays',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('GradStartDate'),
    element: 'Gradsdate',
    field: 'gradsdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('GradCons'),
    element: 'Gradcons',
    field: 'gradcons',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('GradPuns'),
    element: 'Gradpuns',
    field: 'gradpuns',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('CSDate'),
    element: 'Csdate',
    field: 'csdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('CEDate'),
    element: 'Cedate',
    field: 'cedate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };

  aQFields[idx++] = {
    label: getLabel('Idate'),
    element: 'Idate',
    field: 'idate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('StartWorkDate'),
    element: 'Sdate',
    field: 'sdate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('EndWorkDate'),
    element: 'Edate',
    field: 'edate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('vacation.days'),
    element: 'Vacdays',
    field: 'vacdays',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('vacation.Hours'),
    element: 'Vachours',
    field: 'vachours',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Vacbdays'),
    element: 'Vacbdays',
    field: 'vacbdays',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Vacbhours'),
    element: 'Vacbhours',
    field: 'vacbhours',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Insursal'),
    element: 'Insursal',
    field: 'insursal',
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
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Resume.No'),
    element: 'fldPnum',
    field: 'pnum',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Shift.Number'),
    element: 'fldAttnum',
    field: 'attnum',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('ID.Number'),
    element: 'fldNnum',
    field: 'nnum',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Insurance.Number'),
    element: 'fldInum',
    field: 'inum',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Pcard'),
    element: 'fldPcard',
    field: 'pcard',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Father'),
    element: 'fldFather',
    field: 'father',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Mother'),
    element: 'fldMother',
    field: 'mother',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Gender'),
    element: 'fldGenderId',
    field: 'genderId',
    isRequired: true,
    defValue: 1,
    options: aGender,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Nationality'),
    element: 'fldNatId',
    field: 'natId',
    isRequired: true,
    defValue: 1,
    options: aNationality,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Military'),
    element: 'fldMilitaryId',
    field: 'militaryId',
    isRequired: true,
    defValue: 1,
    options: aMilitaryStatus,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Martial'),
    element: 'fldMartialId',
    field: 'martialId',
    isRequired: true,
    defValue: 1,
    options: aMartial,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Kied'),
    element: 'fldKied',
    field: 'kied',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Ext'),
    element: 'fldExt',
    field: 'ext',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Manager'),
    element: 'fldManagerId',
    field: 'managerId',
    isRequired: true,
    Value: 1,
    options: aDirector,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Place.of .birth'),
    element: 'fldPbirth',
    field: 'pbirth',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Date.of.birth'),
    element: 'fldDbirth',
    field: 'dbirth',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Phone1'),
    element: 'fldPhone1',
    field: 'phone1',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Phone2'),
    element: 'fldPhone2',
    field: 'phone2',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Mobile1'),
    element: 'fldMobile1',
    field: 'mobile1',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Mobile2'),
    element: 'fldMobile2',
    field: 'mobile2',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Fax'),
    element: 'fldFax',
    field: 'fax',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Emergency'),
    element: 'fldEperson',
    field: 'eperson',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('ph.Emergency'),
    element: 'fldEphone',
    field: 'ephone',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('EMail1'),
    element: 'fldEmail1',
    field: 'email1',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('EMail2'),
    element: 'fldEmail2',
    field: 'email2',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Address'),
    element: 'fldAddr',
    field: 'addr',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    isRequired: true,
    defValue: 1,
    options: aStatus,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Work.Status'),
    element: 'fldWstatusId',
    field: 'wstatusId',
    isRequired: true,
    defValue: 1,
    options: aYesNo,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Work.group'),
    element: 'fldWgrpId',
    field: 'wgrpId',
    isRequired: true,
    defValue: 1,
    options: aWgtatus,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Language'),
    element: 'fldLangId',
    field: 'langId',
    isRequired: true,
    defValue: 1,
    options: aLanguage,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Owner'),
    element: 'fldIsownerId',
    field: 'isownerId',
    isRequired: true,
    defValue: 1,
    options: aYesNo,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('User'),
    element: 'fldUserId',
    field: 'userId',
    isRequired: true,
    defValue: 1,
    options: aUser,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Computer'),
    element: 'fldComputer',
    field: 'computer',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Username'),
    element: 'fldUsername',
    field: 'username',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Department'),
    element: 'fldDeptId',
    field: 'deptId',
    isRequired: true,
    defValue: 1,
    options: aDepartment,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Section'),
    element: 'fldSectId',
    field: 'sectId',
    isRequired: true,
    defValue: 1,
    options: aSection,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Level'),
    element: 'fldLevelId',
    field: 'levelId',
    isRequired: true,
    defValue: 1,
    options: aLevel,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Location'),
    element: 'fldLocId',
    field: 'locId',
    isRequired: true,
    defValue: 1,
    options: aLocation,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Specification.1'),
    element: 'fldSpc1Id',
    field: 'spc1Id',
    isRequired: true,
    defValue: 1,
    options: aSpec1,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Specification.2'),
    element: 'fldSpc2Id',
    field: 'spc2Id',
    isRequired: true,
    defValue: 1,
    options: aSpec2,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Specification.3'),
    element: 'fldSpc3Id',
    field: 'spc3Id',
    isRequired: true,
    defValue: 1,
    options: aSpec3,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Specification.4'),
    element: 'fldSpc4Id',
    field: 'spc4Id',
    isRequired: true,
    defValue: 1,
    options: aSpec4,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Education'),
    element: 'fldEducatId',
    field: 'educatId',
    isRequired: true,
    defValue: 1,
    options: aEducation,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Job'),
    element: 'fldJobId',
    field: 'jobId',
    isRequired: true,
    defValue: 1,
    options: aJob,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Director'),
    element: 'fldDirectorId',
    field: 'directorId',
    isRequired: true,
    defValue: 1,
    options: aDirector,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Salary.Group'),
    element: 'fldSgrpId',
    field: 'sgrpId',
    isRequired: true,
    defValue: 1,
    options: aSalary,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Appraisa'),
    element: 'fldApprId',
    field: 'apprId',
    rField: 'apprName',
    isRequired: true,
    defValue: 1,
    options: aAppraiser,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Tgrad'),
    element: 'fldTgradId',
    field: 'tgradId',
    isRequired: true,
    defValue: 1,
    options: aTgrad,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('First.Appraisal'),
    element: 'fldFappraisalId',
    field: 'fappraisalId',
    isRequired: true,
    defValue: 1,
    options: aDirector,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Second.Appraisal'),
    element: 'fldSappraisalId',
    field: 'sappraisalId',
    isRequired: true,
    defValue: 1,
    options: aDirector,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Acr'),
    element: 'fldAcrId',
    field: 'acrId',
    isRequired: true,
    defValue: 1,
    options: aAcr,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Years'),
    element: 'fldYears',
    field: 'years',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('GradDays'),
    element: 'fldGraddays',
    field: 'graddays',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('GradStartDate'),
    element: 'fldGradsdate',
    field: 'gradsdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('GradCons'),
    element: 'fldGradcons',
    field: 'gradcons',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('GradPuns'),
    element: 'fldGradpuns',
    field: 'gradpuns',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('CSDate'),
    element: 'fldCsdate',
    field: 'csdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('CEDate'),
    element: 'fldCedate',
    field: 'cedate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Idate'),
    element: 'fldIdate',
    field: 'idate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('StartWorkDate'),
    element: 'fldSdate',
    field: 'sdate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('EndWorkDate'),
    element: 'fldEdate',
    field: 'edate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('vacation.days'),
    element: 'fldVacdays',
    field: 'vacdays',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('vacation.Hours'),
    element: 'fldVachours',
    field: 'vachours',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Vacbdays'),
    element: 'fldVacbdays',
    field: 'vacbdays',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Vacbhours'),
    element: 'fldVacbhours',
    field: 'vacbhours',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  return aFields;
}

























































