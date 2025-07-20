let phForm;
let aBorrower = [];
let aClass1 = PhSettings.UsrCodes.LrgBorrowerClass1,
        aClass2 = PhSettings.UsrCodes.LrgBorrowerClass2,
        aMartial = PhSettings.PhsCodes.PhsMarital,
        aClass3 = PhSettings.UsrCodes.LrgBorrowerClass3,
        aDoc = PhSettings.UsrCodes.LrgDocument,
        aCity = PhSettings.UsrCodes.LrgCity,
        aNationality = PhSettings.UsrCodes.LrgNationality,
        aSector = PhSettings.UsrCodes.LrgSector,
        aType = PhSettings.UsrCodes.LrgType,
        aGender = PhSettings.PhsCodes.PhsGender,
        aStatus = PhSettings.PhsCodes.PhsStatus,
        aLegal = PhSettings.UsrCodes.LrgBorrowerLegal,
        aTitle = PhSettings.UsrCodes.LrgTitles,
        aPosition = PhSettings.UsrCodes.LrgPositions,
        aRelationType = PhSettings.UsrCodes.LrgRelationType,
        aAddressType = PhSettings.PhsCodes.PhsAddressType;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  initFunction();
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    },
    {container: 'phTable1',
      aColumns: initPhTableColumns1(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    },
    {container: 'phTable2',
      aColumns: initPhTableColumns2(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/Borrowers';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable, afterNew: afterNew, afterEdit: disabledField, beforSave: beforSaveData, afterSave: disabledField};
  phForm = new PhForm('Borrowers', metta, options);
  $('#fldLegalId').change(function () {
    disabledField();
    disableFieldPartner();
  });
  $('#ph-docCheck').click(function (e) {
    e.preventDefault();
    checkForDocNnmber();
  });
  $('#fldMartialId').change(function () {
    disableFieldPartner();
  });
  let isRtl = true;
  if (PhSettings.display.vDir === 'ltr') {
    isRtl = false;
  }
  $('.ph_Maxdate').datepicker({
    isRTL: isRtl,
    dateFormat: 'dd-mm-yy',
    minDate: "-100Y",
    maxDate: currentDate(),
    timepicker: true,
    changeMonth: true,
    changeYear: true,
    showOtherMonths: true,
    selectOtherMonths: true
  });
  $('.datepicker-btn').off('click').on('click', function () {
    $(this).prev('.ph_Maxdate').datepicker('show');
  });
});

function beforSaveData() {
  checkForDocNnmber();
  checkDate();
}

function afterNew() {
  $('#docChecklabel').text('');
}

function removeDash() {
  aLegal = aLegal.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aDoc = aDoc.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aSector = aSector.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aSector = aSector.filter(function (el) {
    return parseInt(el.id) !== -1;
  });
  aType = aType.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
}

function initFunction() {
  removeDash();
  disabledField();
  disableFieldPartner();
  getBorrower();
  getLabelSelect();
  showHeaderSpinner(false);
}

function disableFieldPartner() {
  if (parseInt($('#fldMartialId').val()) === 1) {
    $('#fldPartner').attr('disabled', true);
    $('#fldPartner').text('');
  } else {
    $('#fldPartner').attr('disabled', false);
  }
}

function getQueryDate() {
  let nIdx = 0;
  let aQData = [];
  if ($('#fldDocId').val() !== '' && $('#fldDocNum').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'docId';
    aQData[nIdx].dataType = PhFC_Select;
    aQData[nIdx].operation = '=';
    aQData[nIdx].value1 = $('#fldDocId').val();
    aQData[nIdx].value2 = '';
    nIdx++;
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'docNum';
    aQData[nIdx].dataType = PhFC_Number;
    aQData[nIdx].operation = '=';
    aQData[nIdx].value1 = $('#fldDocNum').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  return aQData;
}

function checkForDocNnmber() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Borrowers/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getQueryDate()),
    success: function (response) {
      if (response.status && response.code === 200) {
        $('#docChecklabel').text(getLabel('Document added'));
      } else if (response.status && response.code === 204) {
        $('#docChecklabel').text(getLabel('Document was not added'));
      }
    }
  });
}

function renderSelectGender() {
  aGender = PhSettings.PhsCodes.PhsGender;
  $('#fldGenderId').text('');
  $.each(aGender, function (i, Gender) {
    $('#fldGenderId').append($('<option>', {
      value: Gender.id,
      text: Gender.name
    }));
  });
}

function renderSelectMartial() {
  aMartial = PhSettings.PhsCodes.PhsMarital;
  $('#fldMartialId').text('');
  $.each(aMartial, function (i, Martial) {
    $('#fldMartialId').append($('<option>', {
      value: Martial.id,
      text: Martial.name
    }));
  });
}


function disabledField() {
  if (parseInt($('#fldLegalId').val()) === 2) {
    $('#fldGenderId').text('');
    $('#fldGenderId').append($('<option>', {
      value: 1,
      text: '-'
    }));
    $('#fldMartialId').text('');
    $('#fldMartialId').append($('<option>', {
      value: 1,
      text: ''
    }));
    $('.pType').attr('disabled', true);
    $('.cType').attr('disabled', false);
    $('#dateLabel').text(getLabel('Establishment.Date'));
    $('#partners-Tab').removeClass('disabled');
  } else {
    $('.pType').attr('disabled', false);
    $('.cType').attr('disabled', true);
    $('#dateLabel').text(getLabel('Date.Of.Birth'));
    $('.active').removeClass('active');
    $('#contact-Tab').addClass('active');
    $('#contact').addClass('active');
    $('#partners-Tab').addClass('disabled');
    renderSelectGender();
    renderSelectMartial();
  }
  $('#docChecklabel').text('');
}

function getBorrower() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Borrowers/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aBorrower[i] = {};
          aBorrower[i].id = response.data.List[i].id;
          aBorrower[i].name = response.data.List[i].name;
        }
      }
    },
    error: function (response) {
    }
  });
}

function getLabelSelect() {
  for (let i = 0; i < aStatus.length; i++) {
    aStatus[i].name = getLabel(aStatus[i].name);
  }
  for (let i = 0; i < aAddressType.length; i++) {
    aAddressType[i].name = getLabel(aAddressType[i].name);
  }
}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Num'),
    element: 'Num',
    field: 'num',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('LegalId'),
    element: 'LegalId',
    field: 'legalId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aLegal,
    aOpers: aSAOpers
  };

  aQFields[idx++] = {
    label: getLabel('DocId'),
    element: 'DocId',
    field: 'docId',
    component: PhFC_Select,
    defValue: '',
    options: aDoc,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('DocNum'),
    element: 'DocNum',
    field: 'docNum',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('CityId'),
    element: 'CityId',
    field: 'cityId',
    component: PhFC_Select,
    defValue: '',
    options: aCity,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Sector'),
    element: 'SectorId',
    field: 'sectorId',
    component: PhFC_Select,
    defValue: '',
    options: aSector,
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
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Father'),
    element: 'Father',
    field: 'father',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Mother'),
    element: 'Mother',
    field: 'mother',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('LName'),
    element: 'LName',
    field: 'lname',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Gender'),
    element: 'GenderId',
    field: 'genderId',
    component: PhFC_Select,
    defValue: '',
    options: aGender,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('IssuDate'),
    element: 'IssuDate',
    field: 'issudate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('ExpireDate'),
    element: 'ExpireDate',
    field: 'expiredate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('KiedPlace'),
    element: 'KiedPlace',
    field: 'kiedplace',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('KiedNum'),
    element: 'KiedNum',
    field: 'kiednum',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Date.Of.Birth'),
    element: 'DOB',
    field: 'dob',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Place.Of.Birth'),
    element: 'POB',
    field: 'pob',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Partner'),
    element: 'Partner',
    field: 'partner',
    defValue: '',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class1Id'),
    element: 'Class1Id',
    field: 'class1Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass1,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class2Id'),
    element: 'Class2Id',
    field: 'class2Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass2,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Class3Id'),
    element: 'Class3Id',
    field: 'class3Id',
    component: PhFC_Select,
    defValue: '',
    options: aClass3,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('maritalName'),
    element: 'MartialId',
    field: 'martialId',
    component: PhFC_Select,
    defValue: '',
    options: aMartial,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Nationality'),
    element: 'NatId',
    field: 'natId',
    component: PhFC_Select,
    defValue: '',
    options: aNationality,
    aOpers: aSAOpers
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
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('LegalId'),
    element: 'fldLegalId',
    field: 'legalId',
    rField: 'legalName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aLegal,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('DocId'),
    element: 'fldDocId',
    field: 'docId',
    rField: 'docName',
    isRequired: true,
    defValue: '',
    options: aDoc,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('DocNum'),
    element: 'fldDocNum',
    field: 'docNum',
    isRequired: true,
    defValue: '-',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('CityId'),
    element: 'fldCityId',
    field: 'cityId',
    rField: 'cityName',
    isRequired: true,
    defValue: '',
    options: aCity,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Sector'),
    element: 'fldSectorId',
    field: 'sectorId',
    rField: 'sectorName',
    isRequired: true,
    defValue: '',
    options: aSector,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    isRequired: true,
    defValue: '',
    options: aType,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Father'),
    element: 'fldFather',
    field: 'father',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Mother'),
    element: 'fldMother',
    field: 'mother',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('LName'),
    element: 'fldLName',
    field: 'lname',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Gender'),
    element: 'fldGenderId',
    field: 'genderId',
    rField: 'genderName',
    isRequired: true,
    defValue: '',
    options: aGender,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Nationality'),
    element: 'fldNatId',
    field: 'natId',
    rField: 'natName',
    isRequired: true,
    defValue: '',
    options: aNationality,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('IssuDate'),
    element: 'fldIssuDate',
    field: 'issudate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('ExpireDate'),
    element: 'fldExpireDate',
    field: 'expiredate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('KiedPlace'),
    element: 'fldKiedPlace',
    field: 'kiedplace',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('KiedNum'),
    element: 'fldKiedNum',
    field: 'kiednum',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Date.Of.Birth'),
    element: 'fldDOB',
    field: 'dob',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Place.Of.Birth'),
    element: 'fldPOB',
    field: 'pob',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Partner'),
    element: 'fldPartner',
    field: 'partner',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  aFields[idx++] = {
    label: getLabel('Class1Id'),
    element: 'fldClass1Id',
    field: 'class1Id',
    rField: 'class1Name',
    isRequired: true,
    defValue: '',
    options: aClass1,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Class2Id'),
    element: 'fldClass2Id',
    field: 'class2Id',
    rField: 'class1Name',
    isRequired: true,
    defValue: '',
    options: aClass2,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Class3Id'),
    element: 'fldClass3Id',
    field: 'class3Id',
    rField: 'class3Name',
    isRequired: true,
    defValue: '',
    options: aClass3,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('maritalName'),
    element: 'fldMartialId',
    field: 'martialId',
    rField: 'martialName',
    isRequired: true,
    defValue: '',
    options: aMartial,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  return aFields;
}

function initPhTableColumns() {
  let aColumns = [];
  let nIdx = 0;
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
    field: 'borrowerId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Borrower.Title'),
    field: 'titleId',
    width: '190px',
    datatype: 'string',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aTitle
  };
  aColumns[nIdx++] = {
    title: getLabel('PositionId'),
    field: 'positionId',
    width: '190px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: 0,
    options: aPosition
  };
  aColumns[nIdx++] = {
    title: getLabel('Name'),
    field: 'name',
    width: '200px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Mobile'),
    field: 'mobile',
    width: '120px',
    datatype: 'integer',
    component: 'input',
    classes: 'phPhoneNumberMask',
    attr: 'maxlength=10',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Phone'),
    field: 'phone',
    width: '120px',
    datatype: 'integer',
    component: 'input',
    classes: 'phPhoneNumberMask',
    attr: 'maxlength=10',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Fax'),
    field: 'fax',
    width: '150px',
    datatype: 'integer',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Email'),
    field: 'email',
    width: '200px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '300px',
    datatype: 'string',
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

function initPhTableColumns1() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow1',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow1
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
    field: 'borrowerId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Borrower.Partner'),
    field: 'partnerId',
    rfield: 'partnerName',
    datatype: 'integer',
    width: '300px',
    component: 'input',
    required: true,
    enabled: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Lrg/Borrowers/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Relation.Type'),
    field: 'reltypeId',
    width: '250px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: '0',
    options: aRelationType
  };
  aColumns[nIdx++] = {
    title: getLabel('Perc') + ' %',
    field: 'perc',
    width: '150px',
    datatype: 'decimal',
    classes: 'phPercentNumberMask',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Status'),
    field: 'statusId',
    width: '150px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: '1',
    options: aStatus
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '450px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteRow1() {
  phForm.phTable.phT1.deleteRow(parseInt($(this).data('row')));
}

function initPhTableColumns2() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow2',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow2
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
    field: 'borrowerId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Type'),
    field: 'typeId',
    width: '150px',
    datatype: 'integer',
    component: 'select',
    required: true,
    enabled: true,
    defValue: '0',
    options: aAddressType
  };
  aColumns[nIdx++] = {
    title: getLabel('Concentration.City'),
    field: 'city',
    width: '200px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Street'),
    field: 'street',
    width: '150px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Bld'),
    field: 'bld',
    width: '150px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Address'),
    field: 'address',
    width: '320px',
    datatype: 'string',
    component: 'input',
    required: true,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '250px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteRow2() {
  phForm.phTable.phT2.deleteRow(parseInt($(this).data('row')));
}

function checkDate() {
  let dDate = $('#fldDOB').val();
  let dCDate = currentDate();
  if (process(dDate) <= process(dCDate)) {
    $('#fldDOB').removeClass('invalid');
    phForm.validated = true;
  } else {
    $('#fldDOB').addClass('invalid');
    phForm.validated = false;
    showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Date.Greater.Than.Current.Date'));
    return 0;
  }
}



