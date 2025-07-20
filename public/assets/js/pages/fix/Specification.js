let phForm;
let bToogle = false;
let aData = [];
let aMFields = [];
let tablePageCount = 1;
let tablePageCurrent = 1;
let tableRowCount = 10;
let tableRowDataCount = 0;
let aStatus = PhSettings.UsrCodes.FixStatus,
        aLocation1 = PhSettings.UsrCodes.FixLocation1,
        aLocation2 = PhSettings.UsrCodes.FixLocation2,
        aLocation3 = PhSettings.UsrCodes.FixLocation3,
        aSpec1 = PhSettings.UsrCodes.FixSpecification1,
        aSpec2 = PhSettings.UsrCodes.FixSpecification2,
        aSpec3 = PhSettings.UsrCodes.FixSpecification3,
        aSpec4 = PhSettings.UsrCodes.FixSpecification4,
        aSpec5 = PhSettings.UsrCodes.FixSpecification5;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_FIXED,
        addRowBtn: true}
    }
  ];
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Fix/SpecificationMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {
    beforNew: '', afterNew: resetFilter,
    beforSave: checkValues, afterSave: resetFilter,
    beforDelete: '', afterDelete: resetFilter,
    beforQuery: '', afterQuery: '',
    beforEdit: '', afterEdit: resetFilter,
    aURL: aURL, aFields: getFields(),
    aQFields: getaQFields(), phTable: phTable};
  phForm = new PhForm('Specification', metta, options);
  $('#ph-Open').click(function (e) {
    e.preventDefault();
    if ($('#ph-Open-Icon').hasClass('bi-arrow-bar-up')) {
      addArrowBarDownIcon();
    } else {
      addArrowBarUpIcon();
    }
    $('#SpecificationFilter').removeClass('d-none');
    $('#SpecificationFilter').animate({
      height: 'toggle'
    });
  });
  $('#ph-dReset').click(function (e) {
    e.preventDefault();
    openNew();
  });
  $('#ph-dExecute').click(function (e) {
    e.preventDefault();
    if (!bToogle) {
      doSearch();
    } else {
      toogle(bToogle);
    }
  });
  $('.FFld').change(function (e) {
    e.preventDefault();
    showSecondField($(this).attr('id'));
  });
  $('#table-fpager-next').click(function (e) {
    e.preventDefault();
    if (tablePageCurrent < tablePageCount) {
      tablePageCurrent++;
      doSearch();
    }
  });
  $('#table-fpager-last').click(function (e) {
    e.preventDefault();
    if (tablePageCurrent !== tablePageCount) {
      tablePageCurrent = tablePageCount;
      doSearch();
    }
  });
  $('#table-fpager-previous').click(function (e) {
    e.preventDefault();
    if (tablePageCurrent > 1) {
      tablePageCurrent--;
      doSearch();
    }
  });
  $('#table-fpager-first').click(function (e) {
    e.preventDefault();
    if (tablePageCurrent !== 1) {
      tablePageCurrent = 1;
      doSearch();
    }
  });
  $('#table-fpager-count').change(function (e) {
    e.preventDefault();
    doSearch();
  });
  $('#SpecificationFilter').hide();
  getaMFields();
  getOperations();
  getSelect();
  showHeaderSpinner(false);
});

function getaQFields() {
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
    label: getLabel('Date'),
    element: 'dDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Remark'),
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
    defValue: '0'
  };
  aFields[idx++] = {
    element: 'fldPeriod',
    field: 'periodId',
    isRequired: false,
    value: PhSettings.Period.Id
  };
  aFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldNum',
    field: 'num',
    isRequired: false,
    defValue: '',
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '10'
  };
  aFields[idx++] = {
    label: getLabel('Remark'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '50'
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
    title: 'Id',
    field: 'id',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'MstId',
    field: 'fmstId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'ord',
    field: 'ord',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Serial'),
    field: 'ftrnId',
    width: '125px',
    component: 'input',
    componentType: 'text',
    enabled: false,
    required: false,
    defValue: ' ',
    autocomplete: false
  };
  aColumns[nIdx++] = {
    title: getLabel('Number'),
    field: 'fixdId',
    datatype: 'string',
    visible: false,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Asset'),
    field: 'fixdFname',
    datatype: 'string',
    width: '300px',
    component: 'input',
    enabled: false,
    required: true,
    isSent: false,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Old.Status'),
    field: 'ostatusName',
    width: '125px',
    component: 'input',
    enabled: false,
    isSent: false,
    required: true,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Old.Spec') + '1',
    field: 'ospc1Name',
    width: '150px',
    component: 'input',
    enabled: false,
    isSent: false,
    required: true,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Old.Spec') + ' 2',
    field: 'ospc2Name',
    width: '150px',
    component: 'input',
    enabled: false,
    isSent: false,
    required: true,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Old.Spec') + ' 3',
    field: 'ospc3Name',
    width: '150px',
    component: 'input',
    enabled: false,
    isSent: false,
    required: true,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Old.Spec') + ' 4',
    field: 'ospc4Name',
    width: '150px',
    component: 'input',
    enabled: false,
    isSent: false,
    required: true,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Old.Spec') + ' 5',
    field: 'ospc5Name',
    width: '150px',
    component: 'input',
    enabled: false,
    isSent: false,
    required: true,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    title: getLabel('Old.Spec') + ' 6',
    field: 'ospc6',
    width: '150px',
    component: 'input',
    enabled: false,
    isSent: false,
    required: true,
    defValue: ' '
  };
  aColumns[nIdx++] = {
    field: 'ostatusId',
    datatype: 'integer',
    visible: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    field: 'ospc1Id',
    datatype: 'integer',
    visible: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    field: 'ospc2Id',
    datatype: 'integer',
    visible: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    field: 'ospc3Id',
    datatype: 'integer',
    visible: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    field: 'ospc4Id',
    datatype: 'integer',
    visible: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    field: 'ospc5Id',
    datatype: 'integer',
    visible: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('New.Status'),
    field: 'statusId',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aStatus,
    required: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('New.Spec') + ' 1',
    field: 'spc1Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aSpec1,
    required: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('New.Spec') + ' 2',
    field: 'spc2Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aSpec2,
    required: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('New.Spec') + ' 3',
    field: 'spc3Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aSpec3,
    required: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('New.Spec') + ' 4',
    field: 'spc4Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aSpec4,
    required: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('New.Spec') + ' 5',
    field: 'spc5Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    ajax: false,
    options: aSpec5,
    required: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('New.Spec') + ' 6',
    field: 'spc6',
    width: '150px',
    component: 'input',
    componentType: 'text',
    enabled: true,
    required: false,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '150px',
    component: 'input',
    componentType: 'text',
    enabled: true,
    required: false,
    defValue: '',
    defLabel: ''
  };
  return aColumns;
}

function deleteRow() {
  let nId = parseInt(phForm.phTable.phT0.getFieldValue($(this).data('row'), 'ftrnId'));
  $("#check" + nId).prop("checked", false);
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function getaMFields() {
  let idx = 0;
  aMFields = [];
  aMFields[idx++] = {
    label: getLabel('Number'),
    element: 'fldMstNum',
    field: 'mstNum',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aMFields[idx++] = {
    label: getLabel('Date'),
    element: 'fldMstDate',
    field: 'mstDate',
    component: PhFC_DatePicker,
    aOpers: aDOpers
  };
  aMFields[idx++] = {
    label: getLabel('Serial'),
    element: 'fldSerial',
    field: 'trnId',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aMFields[idx++] = {
    label: getLabel('Asset'),
    element: 'fldFixId',
    field: 'fixdId',
    rField: 'fixdFname',
    component: PhFC_Autocomplete,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + ' 1',
    element: 'fldSpc1Id',
    field: 'spc1Id',
    rField: 'spc1Name',
    component: PhFC_Select,
    options: aSpec1,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + ' 2',
    element: 'fldSpc2Id',
    field: 'spc2Id',
    rField: 'spc2Name',
    component: PhFC_Select,
    options: aSpec2,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + ' 3',
    element: 'fldSpc3Id',
    field: 'spc3Id',
    rField: 'spc3Name',
    component: PhFC_Select,
    options: aSpec3,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + ' 4',
    element: 'fldSpc4Id',
    field: 'spc4Id',
    rField: 'spc4Name',
    component: PhFC_Select,
    options: aSpec4,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + ' 5',
    element: 'fldSpc5Id',
    field: 'spc5Id',
    rField: 'spc5Name',
    component: PhFC_Select,
    options: aSpec5,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + ' 6',
    element: 'fldSpc6',
    field: 'trnSpc6',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aMFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    component: PhFC_Select,
    options: aStatus,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Qnt'),
    element: 'fldQnt',
    field: 'trnQnt',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aMFields[idx++] = {
    label: getLabel('Price'),
    element: 'fldPrice',
    field: 'trnPrice',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aMFields[idx++] = {
    label: getLabel('Amount'),
    element: 'fldAmt',
    field: 'trnAmt',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aMFields[idx++] = {
    label: getLabel('Perc'),
    element: 'fldPerc',
    field: 'trnPerc',
    component: PhFC_Text,
    aOpers: aNOpers
  };
  aMFields[idx++] = {
    label: getLabel('S.date'),
    element: 'fldSdate',
    field: 'trnSdate',
    component: PhFC_DatePicker,
    aOpers: aDOpers
  };
  aMFields[idx++] = {
    label: getLabel('E.date'),
    element: 'fldEdate',
    field: 'trnEdate',
    component: PhFC_DatePicker,
    aOpers: aDOpers
  };
  aMFields[idx++] = {
    label: getLabel('Location') + ' 1',
    element: 'fldLoc1Id',
    field: 'loc1Id',
    rField: 'loc1Name',
    options: aLocation1,
    component: PhFC_Select,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Location') + ' 2',
    element: 'fldLoc2Id',
    field: 'loc2Id',
    rField: 'loc2Name',
    options: aLocation2,
    component: PhFC_Select,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Location') + ' 3',
    element: 'fldLoc3Id',
    field: 'loc3Id',
    rField: 'loc3Name',
    options: aLocation3,
    component: PhFC_Select,
    aOpers: aSAOpers
  };
  aMFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldDRem',
    field: 'trnRem',
    component: PhFC_Text,
    aOpers: aTOpers
  };
}

function getOperations() {
  let vHtml = '';
  for (let i = 0; i < aMFields.length; i++) {
    vHtml = '';
    for (let j = 0; j < aMFields[i].aOpers.length; j++) {
      vHtml += '<option value="' + PhFOperations[aMFields[i].aOpers[j]].sign + '">' + PhFOperations[aMFields[i].aOpers[j]].sign + '</option>';
    }
    $('#' + aMFields[i].element).html(vHtml);
    $('#' + aMFields[i].element).val($('#' + aMFields[i].element + ':first').val());
  }
}

function getSelect() {
  let vHtml = '';
  for (let i = 0; i < aMFields.length; i++) {
    if (aMFields[i].hasOwnProperty('options')) {
      vHtml = '';
      vHtml += '<option value=""> </option>';
      for (let j = 0; j < aMFields[i].options.length; j++) {
        vHtml += '<option value="' + aMFields[i].options[j].id + '">' + aMFields[i].options[j].name + '</option>';
      }
      $('#' + aMFields[i].element + '1').html(vHtml);
    }
  }
}

function showSecondField(fldId) {
  if ($('#' + fldId).val() === '<>' || $('#' + fldId).val() === '><') {
    $('#' + fldId + '2').removeClass('d-none');
    $('#' + fldId + '3').removeClass('d-none');
    $('#' + fldId + '2').val('');
  } else {
    $('#' + fldId + '2').addClass('d-none');
    $('#' + fldId + '3').addClass('d-none');
    $('#' + fldId + '2').val('');
  }
}

function addArrowBarUpIcon() {
  $('#ph-Open-Icon').removeClass('bi-arrow-bar-down');
  $('#ph-Open-Icon').addClass('bi-arrow-bar-up');
}

function addArrowBarDownIcon() {
  $('#ph-Open-Icon').removeClass('bi-arrow-bar-up');
  $('#ph-Open-Icon').addClass('bi-arrow-bar-down');
}

function openNew() {
  for (let i = 0; i < aMFields.length; i++) {
    $('#' + aMFields[i].element).val($('#' + aMFields[i].element + ':first').val());
    $('#' + aMFields[i].element + '1').val('');
    $('#' + aMFields[i].element + '2').val('');
    $('#' + aMFields[i].element + '2').addClass('d-none');
    $('#' + aMFields[i].element + '3').addClass('d-none');
  }
}

function toogle(show) {
  if (show) {
    $('#SpecificationFilterForm').removeClass("d-none");
    $('#SpecificationTable').addClass("d-none");
    $('#SpecificationFilterPager').addClass("d-none");
    $('#ph-dReset').removeClass("d-none");
    $('#ph-dExecute').html('<i class="bi bi-lightning"></i>');
    bToogle = false;
  } else {
    $('#SpecificationFilterForm').addClass("d-none");
    $('#SpecificationTable').removeClass("d-none");
    $('#SpecificationFilterPager').removeClass("d-none");
    $('#ph-dReset').addClass("d-none");
    $('#ph-dExecute').html('<i class="bi bi-search"></i>');
    bToogle = true;
  }
}

function getQueryData() {
  let aQData = [];
  let idx = 0;
  for (let i = 0; i < aMFields.length; i++) {
    let field = aMFields[i];
    if ($("#" + field.element + '1').val() !== '' && $("#" + field.element + '1').val() !== null) {
      aQData[idx] = {};
      aQData[idx].fieldName = field.field;
      aQData[idx].dataType = field.component;
      aQData[idx].operation = $("#" + field.element).val();
      aQData[idx].value1 = $('#' + field.element + '1').val();
      aQData[idx].value2 = '';
      if (($("#" + field.element).val() === '<>' || $("#" + field.element).val() === '><') &&
              ($("#" + field.element + '2').val() !== '' && $("#" + field.element + '2').val() !== null)) {
        aQData[idx].value2 = $("#" + field.element + '2').val();
      }
      idx++;
    }
  }
  if (phForm.phTable.phT0.getRowCount() > 0) {
    aQData[idx] = {};
    aQData[idx].fieldName = 'trnId';
    aQData[idx].dataType = '2';
    aQData[idx].operation = '!IN';
    aQData[idx].value1 = '';
    aQData[idx].value2 = '';
    aQData[idx].values = [];
    for (let j = 0; j < phForm.phTable.phT0.getRowCount(); j++) {
      aQData[idx].values[j] = phForm.phTable.phT0.getFieldValue(j, 'ftrnId');
    }
  }
  return aQData;
}

function doSearch() {
  let tableRowCount = $('#table-fpager-count').val();
  showHeaderSpinner(false);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Fix/InboundView/Search/' + tablePageCurrent + '/' + tableRowCount,
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
      showHeaderSpinner(false);
      if (response.status && parseInt(response.code) === 200 && response.data.List !== []) {
        aData = response.data.List;
        tableRowDataCount = response.data.Count;
        toogle(false);
        drawTable();
      } else {
        toogle(false);
        let vHtml = '<h4 class="text-center text-danger">' + getLabel('There.are.no.results.matching.search.options') + '</h4>';
        tableRowDataCount = 0;
        $('#SpecificationFilterTable').html(vHtml);
        $('#SpecificationFilterPager').addClass("d-none");
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
}

function drawTable() {
  let vHtml = '';
  vHtml += '<table id="dataTable" class="table table-bordered table-striped text-center" style="width: 200%;">';
  vHtml += '  <thead class="bg-secondary text-light">';
  vHtml += '    <tr>';
  vHtml += '      <td style="width: 2%;"></td>';
  vHtml += '      <td style="width: 2%;">' + getLabel('#') + '</td>';
  for (let i = 0; i < aMFields.length; i++) {
    vHtml += '      <td>' + aMFields[i].label + '</td>';
  }
  vHtml += '    </tr>';
  vHtml += '  </thead>';
  vHtml += '  <tbody  style="width: max-content">';
  vHtml += renderTableBody();
  vHtml += '  </tbody>';
  vHtml += '</table> ';
  $('#SpecificationFilterTable').html(vHtml);
  tablePageCount = Math.ceil(tableRowDataCount / tableRowCount);
  $("#table-fpager-all").html(tablePageCount);
  $("#table-fpager-current").html(tablePageCurrent);
  $("#table-fpager-dep").html(getLabel('Total Records') + ' ' + tableRowDataCount);
  $('.check-Item').change(function () {
    let nId = parseInt($(this).data('id'));
    let nIndex = parseInt($(this).data('index'));
    if ($(this).is(':checked')) {
      console.log(aData[nIndex]);
      drawData(nIndex);
    } else {
      drawDeleteRow(nId);
    }
  });
}

function renderTableBody() {
  let vHtml = '';
  for (let index = 0; index < aData.length; index++) {
    vHtml += '<tr>';
    vHtml += ' <td><input id="check' + aData[index].id + '" class="checkbox check-Item" type="checkbox" data-index="' + index + '" data-id="' + aData[index].id + '"/></td>';
    vHtml += ' <td>' + parseInt(index + 1) + '</td>';
    for (let i = 0; i < aMFields.length; i++) {
      if (aData[index].hasOwnProperty(aMFields[i].field) && aMFields[i].hasOwnProperty('label')) {
        if (aMFields[i].hasOwnProperty('rField')) {
          vHtml += ' <td>' + aData[index][aMFields[i].rField] + '</td>';
        } else {
          if (aData[index][aMFields[i].field] === null || aData[index][aMFields[i].field] === 'null') {
            vHtml += ' <td> </td>';
          } else {
            vHtml += ' <td>' + aData[index][aMFields[i].field] + '</td>';
          }
        }
      }
    }
    vHtml += '</tr>';
  }
  return vHtml;
}

function drawData(nIndex) {
  phForm.phTable.phT0.addEmptyRow();
  nRow = parseInt(phForm.phTable.phT0.getRowCount()) - 1;
  phForm.phTable.phT0.setFieldValue(nRow, 'ord', aData[nIndex].trnOrd);
  phForm.phTable.phT0.setFieldValue(nRow, 'ftrnId', aData[nIndex].trnId);
  phForm.phTable.phT0.setFieldValue(nRow, 'fixdId', aData[nIndex].fixdId);
  phForm.phTable.phT0.setFieldValue(nRow, 'fixdFname', aData[nIndex].fixdFname);
  phForm.phTable.phT0.setFieldValue(nRow, 'ostatusName', aData[nIndex].statusName);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc1Name', aData[nIndex].spc1Name);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc2Name', aData[nIndex].spc2Name);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc3Name', aData[nIndex].spc3Name);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc4Name', aData[nIndex].spc4Name);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc5Name', aData[nIndex].spc5Name);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc6', aData[nIndex].trnSpc6);
  phForm.phTable.phT0.setFieldValue(nRow, 'ostatusId', aData[nIndex].statusId);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc1Id', aData[nIndex].spc1Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc2Id', aData[nIndex].spc2Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc3Id', aData[nIndex].spc3Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc4Id', aData[nIndex].spc4Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'ospc5Id', aData[nIndex].spc5Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'statusId', aData[nIndex].statusId);
  phForm.phTable.phT0.setFieldValue(nRow, 'spc1Id', aData[nIndex].spc1Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'spc2Id', aData[nIndex].spc2Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'spc3Id', aData[nIndex].spc3Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'spc4Id', aData[nIndex].spc4Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'spc5Id', aData[nIndex].spc5Id);
  phForm.phTable.phT0.setFieldValue(nRow, 'spc6', aData[nIndex].trnSpc6);
  phForm.phTable.phT0.setFieldValue(nRow, 'rem', '');
  phForm.phTable.phT0.render();
}

function drawDeleteRow(nId) {
  let nRow = phForm.phTable.phT0.getRowNum('ftrnId', nId);
  phForm.phTable.phT0.deleteRow(parseInt(nRow));
}

function resetFilter() {
  toogle(true);
  $('#SpecificationFilter').hide();
  addArrowBarDownIcon();
  tablePageCurrent = 1;
}

function checkValues() {
  let nOldSpec1Id = '', nOldSpec2Id = '', nOldSpec3Id = '', nOldSpec4Id = '', nOldSpec5Id = '', nOldSpec6 = '', nOldStatusId = '',
          nNewSpec1Id = '', nNewSpec2Id = '', nNewSpec3Id = '', nNewSpec4Id = '', nNewSpec5Id = '', nNewSpec6 = '', nNewStatusId = '';
  for (let i = 0; i < phForm.phTable.phT0.getRowCount(); i++) {
    nOldSpec1Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'ospc1Id'));
    nOldSpec2Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'ospc2Id'));
    nOldSpec3Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'ospc3Id'));
    nOldSpec4Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'ospc4Id'));
    nOldSpec5Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'ospc5Id'));
    nOldSpec6 = phForm.phTable.phT0.getFieldValue(i, 'ospc6');
    nOldStatusId = parseInt(phForm.phTable.phT0.getFieldValue(i, 'ostatusId'));
    nNewSpec1Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'spc1Id'));
    nNewSpec2Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'spc2Id'));
    nNewSpec3Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'spc3Id'));
    nNewSpec4Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'spc4Id'));
    nNewSpec5Id = parseInt(phForm.phTable.phT0.getFieldValue(i, 'spc5Id'));
    nNewSpec6 = phForm.phTable.phT0.getFieldValue(i, 'spc6');
    nNewStatusId = parseInt(phForm.phTable.phT0.getFieldValue(i, 'statusId'));
    if (nOldSpec1Id === nNewSpec1Id && nOldSpec2Id === nNewSpec2Id
            && nOldSpec3Id === nNewSpec3Id && nOldSpec4Id === nNewSpec4Id
            && nOldSpec4Id === nNewSpec4Id && nOldSpec5Id === nNewSpec5Id
            && nOldSpec6 === nNewSpec6 && nOldStatusId === nNewStatusId) {
      phForm.phTable.phT0.addClass(i, '21', 'invalid');
      phForm.phTable.phT0.addClass(i, '22', 'invalid');
      phForm.phTable.phT0.addClass(i, '23', 'invalid');
      phForm.phTable.phT0.addClass(i, '24', 'invalid');
      phForm.phTable.phT0.addClass(i, '25', 'invalid');
      phForm.phTable.phT0.addClass(i, '26', 'invalid');
      phForm.phTable.phT0.addClass(i, '27', 'invalid');
      phForm.validated = false;
      break;
    } else {
      phForm.phTable.phT0.removeClass(i, '21', 'invalid');
      phForm.phTable.phT0.removeClass(i, '22', 'invalid');
      phForm.phTable.phT0.removeClass(i, '23', 'invalid');
      phForm.phTable.phT0.removeClass(i, '24', 'invalid');
      phForm.phTable.phT0.removeClass(i, '25', 'invalid');
      phForm.phTable.phT0.removeClass(i, '26', 'invalid');
      phForm.phTable.phT0.removeClass(i, '27', 'invalid');
    }
  }
}