let aMFields = [];
let aData = [];
let aQData = [];
let aType = [];
let empId;
let aRequestType = [
  {id: 0, name: getLabel('self'), urlSearch: '/UC/Emp/Employee/Search/0/0'},
  {id: 1, name: getLabel('Employee.Deduction'), urlSearch: '/UC/Emp/EmployeeDeduction/Query'},
  {id: 2, name: getLabel('Employee.Compensation'), urlSearch: '/UC/Emp/EmployeeCompensation/Query'},
  {id: 3, name: getLabel('Overtimes'), urlSearch: '/UC/Emp/Overtimes/Query'},
  {id: 4, name: getLabel('Leaves'), urlSearch: '/UC/Emp/Leaves/Query'}];
jQuery(document).ready(function () {
  $('#ph-execute').click(function (e) {
    e.preventDefault();
    doSearch();
  });
  renderSelect();
  getMFields();
  showHeaderSpinner(false);
});

function renderSelect() {
  let vHtml = '';
  for (let i = 0; i < aRequestType.length; i++) {
    vHtml += '<option value="' + aRequestType[i].id + '">' + aRequestType[i].name + '</option>';
  }
  $('#fldRequstTypeId').html(vHtml);
}

function getMFields() {
  let idx = 0;
  aMFields[idx++] = {
    element: 'fldId',
    field: 'id'
  };
  aMFields[idx++] = {
    element: 'fldNum',
    field: 'num'
  };
  aMFields[idx++] = {
    element: 'fldPnum',
    field: 'pnum'
  };
  aMFields[idx++] = {
    element: 'fldAttnum',
    field: 'attnum'
  };
  aMFields[idx++] = {
    element: 'fldNnum',
    field: 'nnum'
  };
  aMFields[idx++] = {
    element: 'fldInum',
    field: 'inum'
  };
  aMFields[idx++] = {
    element: 'fldPcard',
    field: 'pcard'
  };
  aMFields[idx++] = {
    element: 'fldFather',
    field: 'father'
  };
  aMFields[idx++] = {
    element: 'fldMother',
    field: 'mother'
  };
  aMFields[idx++] = {
    element: 'fldName',
    field: 'name'
  };
  aMFields[idx++] = {
    element: 'fldRem',
    field: 'rem'
  };
  aMFields[idx++] = {
    element: 'fldGenderId',
    field: 'genderName'
  };
  aMFields[idx++] = {
    element: 'fldNatId',
    field: 'natName'
  };
  aMFields[idx++] = {
    element: 'fldMilitaryId',
    field: 'militaryName'
  };
  aMFields[idx++] = {
    element: 'fldMartialId',
    field: 'martialName'
  };
  aMFields[idx++] = {
    element: 'fldKied',
    field: 'kied'
  };
  aMFields[idx++] = {
    element: 'fldExt',
    field: 'ext'
  };
  aMFields[idx++] = {
    label: getLabel('Manager'),
    element: 'fldManagerId',
    field: 'managerName'
  };
  aMFields[idx++] = {
    label: getLabel('Place.of .birth'),
    element: 'fldPbirth',
    field: 'pbirth',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Date.of.birth'),
    element: 'fldDbirth',
    field: 'dbirth',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Phone1'),
    element: 'fldPhone1',
    field: 'phone1',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Phone2'),
    element: 'fldPhone2',
    field: 'phone2',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Mobile1'),
    element: 'fldMobile1',
    field: 'mobile1',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Mobile2'),
    element: 'fldMobile2',
    field: 'mobile2',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Fax'),
    element: 'fldFax',
    field: 'fax',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Emergency'),
    element: 'fldEperson',
    field: 'eperson',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('ph.Emergency'),
    element: 'fldEphone',
    field: 'ephone',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('EMail1'),
    element: 'fldEmail1',
    field: 'email1',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('EMail2'),
    element: 'fldEmail2',
    field: 'email2',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Address'),
    element: 'fldAddr',
    field: 'addr',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusName'
  };
  aMFields[idx++] = {
    label: getLabel('Work.Status'),
    element: 'fldWstatusId',
    field: 'wstatusName'
  };
  aMFields[idx++] = {
    label: getLabel('Working.Shift'),
    element: 'fldWgrpId',
    field: 'wgrpName',
  };
  aMFields[idx++] = {
    label: getLabel('Language'),
    element: 'fldLangId',
    field: 'langName',
  };
  aMFields[idx++] = {
    label: getLabel('Owner'),
    element: 'fldIsownerId',
    field: 'isownerName',
  };
  aMFields[idx++] = {
    label: getLabel('User'),
    element: 'fldUserId',
    field: 'userName',
  };
  aMFields[idx++] = {
    label: getLabel('Computer'),
    element: 'fldComputer',
    field: 'computer',
  };
  aMFields[idx++] = {
    label: getLabel('Username'),
    element: 'fldUsername',
    field: 'username',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('Department'),
    element: 'fldDeptId',
    field: 'deptName',
  };
  aMFields[idx++] = {
    label: getLabel('Section'),
    element: 'fldSectId',
    field: 'sectName',
  };
  aMFields[idx++] = {
    label: getLabel('Level'),
    element: 'fldLevelId',
    field: 'levelName',
  };
  aMFields[idx++] = {
    label: getLabel('Location'),
    element: 'fldLocId',
    field: 'locName'
  };
  aMFields[idx++] = {
    label: getLabel('Secification1'),
    element: 'fldSpc1Id',
    field: 'spc1Name'
  };
  aMFields[idx++] = {
    label: getLabel('Secification2'),
    element: 'fldSpc2Id',
    field: 'spc2Name'
  };
  aMFields[idx++] = {
    label: getLabel('Secification3'),
    element: 'fldSpc3Id',
    field: 'spc3Name'
  };
  aMFields[idx++] = {
    label: getLabel('Secification4'),
    element: 'fldSpc4Id',
    field: 'spc4Name'
  };
  aMFields[idx++] = {
    label: getLabel('Education'),
    element: 'fldEducatId',
    field: 'educatName'
  };
  aMFields[idx++] = {
    label: getLabel('Job'),
    element: 'fldJobId',
    field: 'jobName'
  };
  aMFields[idx++] = {
    label: getLabel('Director'),
    element: 'fldDirectorId',
    field: 'directorName'
  };
  aMFields[idx++] = {
    label: getLabel('Salary.Group'),
    element: 'fldSgrpId',
    field: 'sgrpName'
  };
  aMFields[idx++] = {
    label: getLabel('Appraisa'),
    element: 'fldApprId',
    field: 'apprName'
  };
  aMFields[idx++] = {
    label: getLabel('Tgrad'),
    element: 'fldTgradId',
    field: 'tgradName'
  };
  aMFields[idx++] = {
    label: getLabel('First.Appraisal'),
    element: 'fldFappraisalId',
    field: 'fappraisalName'
  };
  aMFields[idx++] = {
    label: getLabel('Second.Appraisal'),
    element: 'fldSappraisalId',
    field: 'sappraisalName'
  };
  aMFields[idx++] = {
    label: getLabel('Acr'),
    element: 'fldAcrId',
    field: 'acrName'
  };
  aMFields[idx++] = {
    label: getLabel('Years'),
    element: 'fldYears',
    field: 'years'
  };
  aMFields[idx++] = {
    label: getLabel('GradDays'),
    element: 'fldGraddays',
    field: 'graddays'
  };
  aMFields[idx++] = {
    label: getLabel('GradStartDate'),
    element: 'fldGradsdate',
    field: 'gradsdate'
  };
  aMFields[idx++] = {
    label: getLabel('GradCons'),
    element: 'fldGradcons',
    field: 'gradcons',
    isRequired: true,
    defValue: '',
    tableWidth: 10
  };
  aMFields[idx++] = {
    label: getLabel('GradPuns'),
    element: 'fldGradpuns',
    field: 'gradpuns'
  };
  aMFields[idx++] = {
    label: getLabel('CSDate'),
    element: 'fldCsdate',
    field: 'csdate'
  };
  aMFields[idx++] = {
    label: getLabel('CEDate'),
    element: 'fldCedate',
    field: 'cedate'
  };
  aMFields[idx++] = {
    label: getLabel('Idate'),
    element: 'fldIdate',
    field: 'idate'
  };
  aMFields[idx++] = {
    label: getLabel('StartWorkDate'),
    element: 'fldSdate',
    field: 'sdate'
  };
  aMFields[idx++] = {
    label: getLabel('EndWorkDate'),
    element: 'fldEdate',
    field: 'edate'
  };
  aMFields[idx++] = {
    label: getLabel('vacation.days'),
    element: 'fldVacdays',
    field: 'vacdays'
  };
  aMFields[idx++] = {
    label: getLabel('vacation.Hours'),
    element: 'fldVachours',
    field: 'vachours'
  };
  aMFields[idx++] = {
    label: getLabel('Vacbdays'),
    element: 'fldVacbdays',
    field: 'vacbdays'
  };
  aMFields[idx++] = {
    label: getLabel('Vacbhours'),
    element: 'fldVacbhours',
    field: 'vacbhours'
  };
  return aMFields;
}

function getQueryData() {
  let aQData = [];
  let idx = 0;
  if ($('#fldNum').val() !== '') {
    aQData[idx] = {};
    aQData[idx].fieldName = 'num';
    aQData[idx].operation = '=';
    aQData[idx].dataType = 2;
    aQData[idx].value1 = parseInt($('#fldNum').val());
    aQData[idx].value2 = '';
    idx++;
  }
  aQData[idx] = {};
  aQData[idx].fieldName = 'nnum';
  aQData[idx].operation = '=';
  aQData[idx].dataType = 2;
  aQData[idx].value1 = parseInt($('#fldNnum').val());
  aQData[idx].value2 = '';
  return aQData;
}

function doSearch() {
  $('#fldNnum').removeClass('invalid');
  if ($('#fldNnum').val() !== '') {
    showHeaderSpinner(true);
    $.ajax({
      type: 'POST',
      async: false,
      url: PhSettings.apiURL + aRequestType[0].urlSearch,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      },
      data: JSON.stringify(getQueryData()),
      success: function (response) {
        if (response.status && parseInt(response.code) === 200 && response.data.List !== []) {
          aData = response.data.List[0];
          empId = response.data.List[0].id;
          addEmpInfo();
          if ($('#fldRequstTypeId').val() > 0) {
            doSearchType();
          }
        }
      },
      error: function (response) {
      }
    });
  } else {
    $('#fldNnum').addClass('invalid');
  }
  showHeaderSpinner(false);
}

function doSearchType() {
  let aQData = {};
  aQData.conditions = [];
  aQData.conditions[0] = {};
  aQData.conditions[0].fieldName = 'empId';
  aQData.conditions[0].operation = '=';
  aQData.conditions[0].dataType = PhFC_Number;
  aQData.conditions[0].value1 = empId;
  aQData.conditions[0].value2 = '';
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + aRequestType[$('#fldRequstTypeId').val()].urlSearch,
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
      if (response.status && parseInt(response.code) === 200 && response.data.List !== []) {
        aData = response.data.report;
      }
      renderTable();
    },
    error: function (response) {
    }
  });
  showHeaderSpinner(false);
}

function addEmpInfo() {
  $('#empInfo').removeClass('d-none');
  for (let index = 0; index < aMFields.length; index++) {
    if (aData.hasOwnProperty(aMFields[index].field)) {
      $('#' + aMFields[index].element).val(aData[aMFields[index].field]);
    }
  }
}

function renderTable() {
  let vHtml = '';
  vHtml += '<table class="table table-bordered table-striped text-center" style="min-width: max-content;">';
  vHtml += '' + renderTableHead();
  vHtml += '' + renderTableBody();
  if (aData.hasOwnProperty('Footers')) {
    vHtml += renderTableFooter();
  }
  vHtml += '</table>';
  $('#EmployeeTable').removeClass('d-none');
  $('#EmployeeCardQueryTable').html(vHtml);
}

function getTableStyle(obj) {
  let vStyle = '';
  if (obj !== undefined) {
    Object.keys(obj).forEach(key => {
      vStyle += key + ':' + obj[key] + ' !important;';
    });
  }
  return vStyle;
}

function renderTableHead() {
  let vHtml = '';
  vHtml += '<thead class="bg-secondary-subtle" style="' + getTableStyle(aData.header.style) + ' position: sticky !important; top: 0 !important;">';
  vHtml += '  <tr>';
  for (let i = 0; i < aData.header.length; i++) {
    for (let j = 0; j < aData.header[i].cells.length; j++) {
      vHtml += ' <td style="' + getTableStyle(aData.header[i].cells[j].style) + '">' + getLabel(aData.header[i].cells[j].name) + '</td>';
    }
  }
  vHtml += '  </tr>';
  vHtml += '</thead>';
  return vHtml;
}

function renderTableBody() {
  let vHtml = '';
  vHtml += '<tbody>';
  for (let i = 0; i < aData.rows.length; i++) {
    vHtml += '<tr style="' + getTableStyle(aData.rows[i].style) + '">';
    for (let j = 0; j < aData.rows[i].cells.length; j++) {
      if (aData.rows[i].cells[j].value === null || aData.rows[i].cells[j].value === 'null') {
        vHtml += ' <td style="' + getTableStyle(aData.rows[i].cells[j].style) + '"> </td>';
      } else {
        vHtml += ' <td style="' + getTableStyle(aData.rows[i].cells[j].style) + '"> ' + aData.rows[i].cells[j].value + '</td>';
      }
    }
    vHtml += '</tr>';
  }
  vHtml += '</tbody>';
  return vHtml;
}

function renderTableFooter() {
  let vHtml = '';
  vHtml += '<tfoot class="bg-secondary-subtle" style="' + getTableStyle(aData.Footers.style) + ' position: sticky !important; bottom: 0 !important;">';
  vHtml += '  <tr>';
  for (let i = 0; i < aData.Footers.length; i++) {
    for (let j = 0; j < aData.Footers[i].cells.length; j++) {
      vHtml += '<td style="' + getTableStyle(aData.Footers[i].cells[j].style) + '">' + getLabel(aData.Footers[i].cells[j].value) + '</td>';
    }
  }
  vHtml += '  </tr>';
  vHtml += '</tfoot>';
  return vHtml;
}
