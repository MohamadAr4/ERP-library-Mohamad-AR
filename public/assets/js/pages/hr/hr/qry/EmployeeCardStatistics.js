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
        aStatus = PhSettings.UsrCodes.EmpStatus;
let aWgtatus = [],
        aAppraiser = [],
        aTgrad = [];
let aGroup = [

  {id: 'natName', name: getLabel('Nationality')},
  {id: 'militaryName', name: getLabel('Military')},
  {id: 'maritalName', name: getLabel('Martial')},
  {id: 'langName', name: getLabel('Language')},
  {id: 'eduName', name: getLabel('Education')},
  {id: 'statusName', name: getLabel('Employee.Status')},
  {id: 'levelName', name: getLabel('Emp.Level')},
  {id: 'jobName', name: getLabel('Job')},
  {id: 'workshiftName', name: getLabel('Working.Shifts')},
  {id: 'gradGrpName', name: getLabel('gradGrpName')},
  {id: 'gradDegreeName', name: getLabel('gradDegreeName')},

  {id: 'spec1Name', name: getLabel('Specification.1')},
  {id: 'spec2Name', name: getLabel('Specification.2')},
  {id: 'spec3Name', name: getLabel('Specification.3')},
  {id: 'spec4Name', name: getLabel('Specification.4')},
  {id: 'deptName', name: getLabel('Department')},
  {id: 'secName', name: getLabel('Section')},
  {id: 'genderName', name: getLabel('Gender')}

];
jQuery(document).ready(function () {
  let options = {};
  getList();
  options.type = "";
  options.cols = 2;
  options.btns = {};
  options.aEvents = {};
  options.aUrl = {};
  options.conditonCard = conditon();
  options.groupCard = group();
  options.aUrl.Url = PhSettings.apiURL;
  options.aUrl.Api = '/UC/Emp/EmployeeStatistics';
  options.aUrl.RUrl = {Method: 'POST', URL: '/Statistics'};
  phQForm = new PhQForm('EmployeeCardStatistics', options);
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
    id: "Conditon",
    cardCol: 8,
    order: 0,
    margin: PhConst_MarginAuto,
    newRow: false,
    visible: true,
    header: {title: "Filtering", isToggle: true},
    body: {
      elementCols: 2,
      fields: [{
          label: 'Number', labelCol: 3,
          element: 'fldNumber', elementCol: 9,
          field: 'num', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'ID.Number', labelCol: 3,
          element: 'fldNnum', elementCol: 9,
          field: 'nnum', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: ['', ''],
          aOpers: aTAOpers
        }, {
          label: 'Insurance.Number', labelCol: 3,
          element: 'fldInum', elementCol: 9,
          field: 'inum', componentType: PhFC_Text,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
        }, {
          label: 'Name', labelCol: 3,
          element: 'fldName', elementCol: 9,
          field: 'name', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Father', labelCol: 3,
          element: 'fldFather', elementCol: 9,
          field: 'father', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Mother', labelCol: 3,
          element: 'fldMother', elementCol: 9,
          field: 'mother', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Rem', labelCol: 3,
          element: 'fldRem', elementCol: 9,
          field: 'rem', componentType: PhFC_Text,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          aOpers: aTAOpers
        }, {
          label: 'Gender', labelCol: 3,
          element: 'fldGenderId', elementCol: 9,
          field: 'genderId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aGender,
          aOpers: aSAOpers
        }, {
          label: 'Nationality', labelCol: 3,
          element: 'fldNatId', elementCol: 9,
          field: 'natId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aNationality,
          aOpers: aSAOpers
        }, {
          label: 'Military', labelCol: 3,
          element: 'fldMilitaryId', elementCol: 9,
          field: 'militaryId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aMilitaryStatus,
          aOpers: aSAOpers
        }, {
          label: 'Martial', labelCol: 3,
          element: 'fldMartialId', elementCol: 9,
          field: 'martialId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aMartial,
          aOpers: aSAOpers
        }, {
          label: 'Date.of.birth', labelCol: 3,
          element: 'fldDbirth', elementCol: 9,
          field: 'trndbirth', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Language', labelCol: 3,
          element: 'fldLangId', elementCol: 9,
          field: 'langId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aLanguage,
          aOpers: aSAOpers
        }, {
          label: 'Education', labelCol: 3,
          element: 'fldEducatId', elementCol: 9,
          field: 'educatId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aEducation,
          aOpers: aSAOpers
        }, {
          label: 'Employee.Status', labelCol: 3,
          element: 'fldStatusId', elementCol: 9,
          field: 'statusId', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aStatus,
          aOpers: aSAOpers
        }, {
          label: 'username', labelCol: 3,
          element: 'fldUserFname', elementCol: 9,
          field: 'userFname', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Cpy/Users/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ]
        }, {
          label: 'Manager', labelCol: 3,
          element: 'fldManagerFname', elementCol: 9,
          field: 'ManagerFname', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ]
        }, {
          label: 'Director', labelCol: 3,
          element: 'fldDirectorFname', elementCol: 9,
          field: 'directorFname', componentType: PhFC_Autocomplete,
          isRequired: false, hasSecondField: false,
          defValue: [''],
          autoComplete: {acUrl: '/UC/Emp/Employee/Autocomplete', acParams: ''},
          aOpers: [PhFOper_EQ]
        }, {
          label: 'Coun.Start.Date', labelCol: 3,
          element: 'fldCsdate', elementCol: 9,
          field: 'trncsdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Coun.End.Date', labelCol: 3,
          element: 'fldCedate', elementCol: 9,
          field: 'trncedate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Work.Start.Date', labelCol: 3,
          element: 'fldSdate', elementCol: 9,
          field: 'trnsdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Work.End.Date', labelCol: 3,
          element: 'fldEdate', elementCol: 9,
          field: 'trnedate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: [PhFOper_BT]
        }, {
          label: 'Working.shift', labelCol: 3,
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
          field: 'sectId', componentType: PhFC_Select,
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
          field: 'spc1Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec1,
          aOpers: aSAOpers
        }, {
          label: 'Specification.2', labelCol: 3,
          element: 'fldSpc2Id', elementCol: 9,
          field: 'spc2Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec2,
          aOpers: aSAOpers
        }, {
          label: 'Specification.3', labelCol: 3,
          element: 'fldSpc3Id', elementCol: 9,
          field: 'spc3Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec3,
          aOpers: aSAOpers
        }, {
          label: 'Specification.4', labelCol: 3,
          element: 'fldSpc4Id', elementCol: 9,
          field: 'spc4Id', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aSpec4,
          aOpers: aSAOpers
        }, {
          label: 'gradDegreeName', labelCol: 3,
          element: 'fldTgradId', elementCol: 9,
          field: 'gradDegreeName', componentType: PhFC_Select,
          isRequired: false, hasSecondField: false,
          defValue: [-1], options: aTgrad,
          aOpers: aSAOpers
        }, {
          label: 'Grad.Start.Date', labelCol: 3,
          element: 'fldGradsdate', elementCol: 9,
          field: 'trngradsdate', componentType: PhFC_DatePicker,
          isRequired: false, hasSecondField: true,
          defValue: ['', ''],
          aOpers: aNQOpers
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
          field: 'addr', componentType: PhFC_Text,
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
        }
      ]
    }
  };
  return card;
}

function group() {
  let card = {
    id: "Group",
    cardCol: 4,
    order: 1,
    margin: PhConst_MarginEnd,
    newRow: false,
    visible: true,
    header: {title: "Grouping", isToggle: true},
    body: {
      elementCols: 1,
      fields: {
        label: 'Group.by', labelCol: 2,
        element: 'Grp', elementCol: 10,
        field: 'grp', componentType: PhFC_Select,
        isRequired: false, groupCount: 3, options: aGroup,
        defValue: ['deptName', 'secName', 'genderName']
      }}};
  return card;
}