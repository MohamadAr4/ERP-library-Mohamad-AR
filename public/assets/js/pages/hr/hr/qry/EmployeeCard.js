let phQForm;
let aLevel = PhSettings.UsrCodes.EmpLevel,
        aSection = PhSettings.UsrCodes.EmpSection,
        aEducation = PhSettings.UsrCodes.EmpEducation,
        aJob = PhSettings.UsrCodes.EmpJob,
        aSpec1 = PhSettings.UsrCodes.EmpSpecification1,
        aSpec2 = PhSettings.UsrCodes.EmpSpecification2,
        aSpec3 = PhSettings.UsrCodes.EmpSpecification3,
        aSpec4 = PhSettings.UsrCodes.EmpSpecification4,
        aDepartment = PhSettings.UsrCodes.EmpDepartment,
        aNationality = PhSettings.UsrCodes.EmpNationality,
        aGender = PhSettings.PhsCodes.PhsGender,
        aMartial = PhSettings.PhsCodes.PhsMarital,
        aLanguage = PhSettings.UsrCodes.EmpLanguage,
        aMilitaryStatus = PhSettings.PhsCodes.PhsMilitaryStatus,
        aEmpStatus = PhSettings.UsrCodes.EmpStatus;
let aWgtatus = [],
        aAppraiser = [],
        aTgrad = [];
jQuery(document).ready(function () {
  let options = {};
  getList();
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.displayOptionCard = displayOption();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/Employee';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Query'};
  phQForm = new PhQForm('EmployeeCard', options);
});

function getList() {
  getAppraiser();
  getWgtatus();
  getTgrad();
  showHeaderSpinner(false);
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

function conditon() {
  let card = {
    id: "Condition",
    cardCol: 12,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 3,
      fields: [{
          label: 'Number', labelCol: 3,
          element: 'fldNumber', elementCol: 9,
          field: 'empNum', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aTAOpers
        }, {
          label: 'ID.Number', labelCol: 3,
          element: 'fldNnum', elementCol: 9,
          field: 'empNnum', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aTAOpers
        }, {
          label: 'Insurance.Number', labelCol: 3,
          element: 'fldInum', elementCol: 9,
          field: 'empInum', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aTAOpers
        }, {
          label: 'Name', labelCol: 3,
          element: 'fldName', elementCol: 9,
          field: 'empName', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Father', labelCol: 3,
          element: 'fldFather', elementCol: 9,
          field: 'empFather', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Mother', labelCol: 3,
          element: 'fldMother', elementCol: 9,
          field: 'empMother', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Date.of.birth', labelCol: 3,
          element: 'fldDbirth', elementCol: 9,
          field: 'empDbirth', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Gender', labelCol: 3,
          element: 'fldGenderId', elementCol: 9,
          field: 'genderId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aGender,
          aOpers: aSAOpers
        }, {
          label: 'Military', labelCol: 3,
          element: 'fldMilitaryId', elementCol: 9,
          field: 'militaryId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aMilitaryStatus,
          aOpers: aSAOpers
        }, {
          label: 'Nationality', labelCol: 3,
          element: 'fldNatId', elementCol: 9,
          field: 'natId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aNationality,
          aOpers: aSAOpers
        }, {
          label: 'Martial', labelCol: 3,
          element: 'fldMaritalId', elementCol: 9,
          field: 'maritalId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aMartial,
          aOpers: aSAOpers
        }, {
          label: 'Education', labelCol: 3,
          element: 'fldEducatId', elementCol: 9,
          field: 'eduId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aEducation,
          aOpers: aSAOpers
        }, {
          label: 'Language', labelCol: 3,
          element: 'fldLangId', elementCol: 9,
          field: 'langId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aLanguage,
          aOpers: aSAOpers
        }, {
          label: 'Employee.Status', labelCol: 3,
          element: 'fldStatusId', elementCol: 9,
          field: 'statusId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aEmpStatus,
          aOpers: aSAOpers
        }, {
          label: 'Manager', labelCol: 3,
          element: 'fldManager', elementCol: 9,
          field: 'managerId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Director', labelCol: 3,
          element: 'fldDirector', elementCol: 9,
          field: 'directorId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Coun.Start.Date', labelCol: 3,
          element: 'fldCsdate', elementCol: 9,
          field: 'csdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Coun.End.Date', labelCol: 3,
          element: 'fldCedate', elementCol: 9,
          field: 'cedate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'username', labelCol: 3,
          element: 'fldUser', elementCol: 9,
          field: 'userId', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Cpy/Users/Autocomplete', acParams: ''},
          aOpers: aSAOpers
        }, {
          label: 'Work.Start.Date', labelCol: 3,
          element: 'fldSdate', elementCol: 9,
          field: 'sdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Work.End.Date', labelCol: 3,
          element: 'fldEdate', elementCol: 9,
          field: 'edate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Working.Shift', labelCol: 3,
          element: 'fldWgrpId', elementCol: 9,
          field: 'workshiftId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aWgtatus,
          aOpers: aSAOpers
        }, {
          label: 'Department', labelCol: 3,
          element: 'fldDeptId', elementCol: 9,
          field: 'deptId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aDepartment,
          aOpers: aSAOpers
        }, {
          label: 'Section', labelCol: 3,
          element: 'fldSectId', elementCol: 9,
          field: 'secId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSection,
          aOpers: aSAOpers
        }, {
          label: 'Emp.Level', labelCol: 3,
          element: 'fldLevelId', elementCol: 9,
          field: 'levelId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aLevel,
          aOpers: aSAOpers
        }, {
          label: 'Job', labelCol: 3,
          element: 'fldJobId', elementCol: 9,
          field: 'jobId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aJob,
          aOpers: aSAOpers
        }, {
          label: 'Specification.1', labelCol: 3,
          element: 'fldSpc1Id', elementCol: 9,
          field: 'spec1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec1,
          aOpers: aSAOpers
        }, {
          label: 'Specification.2', labelCol: 3,
          element: 'fldSpc2Id', elementCol: 9,
          field: 'spec2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec2,
          aOpers: aSAOpers
        }, {
          label: 'Specification.3', labelCol: 3,
          element: 'fldSpc3Id', elementCol: 9,
          field: 'spec3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec3,
          aOpers: aSAOpers
        }, {
          label: 'Specification.4', labelCol: 3,
          element: 'fldSpc4Id', elementCol: 9,
          field: 'spec4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec4,
          aOpers: aSAOpers
        }, {
          label: 'Tgrad', labelCol: 3,
          element: 'fldTgradId', elementCol: 9,
          field: 'gradGrpId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aTgrad,
          aOpers: aSAOpers
        }, {
          label: 'Grad.Start.Date', labelCol: 3,
          element: 'fldGradsdate', elementCol: 9,
          field: 'gradsdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aDOpers
        }, {
          label: 'Grad.Days', labelCol: 3,
          element: 'fldGradcons', elementCol: 9,
          field: 'gradcons', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Grad.Cons', labelCol: 3,
          element: 'fldGradpuns', elementCol: 9,
          field: 'gradpuns', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Grad.Puns', labelCol: 3,
          element: 'fldAddr', elementCol: 9,
          field: 'empAddr', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'vacation.days', labelCol: 3,
          element: 'fldVacdays', elementCol: 9,
          field: 'vacdays', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'vacation.days', labelCol: 3,
          element: 'fldVachours', elementCol: 9,
          field: 'vachours', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Rem', labelCol: 3,
          element: 'fldRem', elementCol: 9,
          field: 'rem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }
      ]
    }
  };
  return card;
}

function displayOption() {
  let card = {
    id: "DisplayOption",
    cardCol: 12,
    order: 1,
    margin: PhConst_MarginAuto,
    newRow: true,
    visible: true,
    header: {title: "Display.Options", isToggle: true},
    body: {
      fields: [{col: 2,
          label: 'Number', labelCol: 10,
          element: 'disNum', elementCol: 2,
          field: 'empNum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'ID.Number', labelCol: 10,
          element: 'disNnum', elementCol: 2,
          field: 'empNnum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Insurance.Number', labelCol: 10,
          element: 'disInum', elementCol: 2,
          field: 'empInum', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Mother', labelCol: 10,
          element: 'disMother', elementCol: 2,
          field: 'empMother', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Place.of.birth', labelCol: 10,
          element: 'disPbirth', elementCol: 2,
          field: 'empPbirth', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Date.of.birth', labelCol: 10,
          element: 'disDbirth', elementCol: 2,
          field: 'empDbirth', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Gender', labelCol: 10,
          element: 'disGenderName', elementCol: 2,
          field: 'genderName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Military', labelCol: 10,
          element: 'disMilitaryName', elementCol: 2,
          field: 'militaryName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Nationality', labelCol: 10,
          element: 'disNatName', elementCol: 2,
          field: 'natName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Martial', labelCol: 10,
          element: 'disMartialName', elementCol: 2,
          field: 'maritalName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Kied', labelCol: 10,
          element: 'disKied', elementCol: 2,
          field: 'empKied', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Phone.1', labelCol: 10,
          element: 'disPhone1', elementCol: 2,
          field: 'empPhone1', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Phone.2', labelCol: 10,
          element: 'disPhone2', elementCol: 2,
          field: 'empPhone2', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Mobile.1', labelCol: 10,
          element: 'disMobile1', elementCol: 2,
          field: 'empMobile1', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Mobile.2', labelCol: 10,
          element: 'disMobile2', elementCol: 2,
          field: 'empMobile2', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Address', labelCol: 10,
          element: 'disAddr', elementCol: 2,
          field: 'empAddr', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Emergency', labelCol: 10,
          element: 'disEperson', elementCol: 2,
          field: 'empEperson', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'ph.Emergency', labelCol: 10,
          element: 'disEphone', elementCol: 2,
          field: 'empEphone', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Email', labelCol: 10,
          element: 'disEmail1', elementCol: 2,
          field: 'empEmail1', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Education', labelCol: 10,
          element: 'disEducatIdName', elementCol: 2,
          field: 'eduName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Language', labelCol: 10,
          element: 'disLangName', elementCol: 2,
          field: 'langName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Employee.Status', labelCol: 10,
          element: 'disStatusIdName', elementCol: 2,
          field: 'statusName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'username', labelCol: 10,
          element: 'disUser', elementCol: 2,
          field: 'userName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Manager', labelCol: 10,
          element: 'disManagerName', elementCol: 2,
          field: 'managerName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Director', labelCol: 10,
          element: 'disDirectorName', elementCol: 2,
          field: 'directorName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Working.Shift', labelCol: 10,
          element: 'disWShiftIdName', elementCol: 2,
          field: 'workshiftName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Emp.Level', labelCol: 10,
          element: 'disLevelIdName', elementCol: 2,
          field: 'levelName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Appraisal.Template', labelCol: 10,
          element: 'disApprIdName', elementCol: 2,
          field: 'apprName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'First.Appraisal', labelCol: 10,
          element: 'disFappraisalFnameName', elementCol: 2,
          field: 'firstappraisalName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Second.Appraisal', labelCol: 10,
          element: 'disSappraisalFnameName', elementCol: 2,
          field: 'secondappraisalName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Specification.1', labelCol: 10,
          element: 'disSpc1IdName', elementCol: 2,
          field: 'spec1Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Specification.2', labelCol: 10,
          element: 'disSpc2IdName', elementCol: 2,
          field: 'spec2Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Specification.3', labelCol: 10,
          element: 'disSpc10IdName', elementCol: 2,
          field: 'spec3Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Specification.4', labelCol: 10,
          element: 'disSpc4IdName', elementCol: 2,
          field: 'spec4Name', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Tgrad', labelCol: 10,
          element: 'disTgradIdName', elementCol: 2,
          field: 'gradDegreeName', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Grad.Start.Date', labelCol: 10,
          element: 'disGradsdateName', elementCol: 2,
          field: 'gradsdate', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Grad.Days', labelCol: 10,
          element: 'disGradconsName', elementCol: 2,
          field: 'graddays', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Grad.Cons', labelCol: 10,
          element: 'disGradpunsName', elementCol: 2,
          field: 'gradcons', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Grad.Puns', labelCol: 10,
          element: 'disAddrName', elementCol: 2,
          field: 'gradpuns', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'vacation.days', labelCol: 10,
          element: 'disVacdaysName', elementCol: 2,
          field: 'vacdays', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }, {col: 2,
          label: 'Rem', labelCol: 10,
          element: 'disRem', elementCol: 2,
          field: 'rem', componentType: PhFC_CheckBox,
          isRequired: false, defValue: 0
        }]
    }
  };
  return card;
}
