let phForm;
let bToogle = false;
let aMFields = [];
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
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Fix/InputMaster';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {
    beforNew: '', afterNew: resetFilter,
    beforSave: '', afterSave: resetFilter,
    beforDelete: '', afterDelete: resetFilter,
    beforQuery: '', afterQuery: '',
    aURL: aURL, aFields: getFields(),
    aQFields: getaQFields(), phTable: phTable};
  phForm = new PhForm('Addition', metta, options);
  $('#ph-new').click(function () {
    openNew();
  });
  $('#ph-Open').click(function (e) {
    if ($('#ph-Open-Icon').hasClass('bi-arrow-bar-up')) {
      addArrowBarDownIcon();
    } else {
      addArrowBarUpIcon();
    }
    $('#AdditionFilter').removeClass('d-none');
    $('#AdditionFilter').animate({
      height: 'toggle'
    });
  });
  $('#ph-dExecute').click(function (e) {
    e.preventDefault();
    validatForm();
  });
  $('#fldQnt,#fldPrice').on('change', function (e) {
    e.preventDefault();
    calcAmount();
  });
  $('#fldPerc,#fldSdate').on('change', function (e) {
    e.preventDefault();
    changeEDate();
  });
  $('#fldFixdName').focusout(function () {
    getFixdPercentage();
  });
  $('#AdditionFilter').hide();
  getaMFields();
  getSelect();
  openNew();
  showHeaderSpinner(false);
});

function acParams() {
  return {systemId: SystemFIX};
}

function getFixdPercentage() {
  showHeaderSpinner(true);
  if (!isNaN(parseInt($('#fldFixdId').val()))) {
    $.ajax({
      type: 'GET',
      async: false,
      url: PhSettings.apiURL + '/UC/Fix/FixedsItems/' + parseInt($('#fldFixdId').val()),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      }, success: function (response) {
        if (response.status) {
          $('#fldPerc').val(response.data.Obj.perc);
          changeEDate();
        }
      }
    });
  }
  showHeaderSpinner(false);
}

function getaQFields() {
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
    element: 'dDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Account'),
    element: 'Acc',
    field: 'accId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Acc/GrantedAccount/Autocomplete',
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
    defValue: 0
  };
  aFields[idx++] = {
    element: 'fldVhrId',
    field: 'vhrId',
    defValue: null,
    alert: {
      isOk: alertCheck,
      message: getLabel('The.document.cannot.be.deleted.or.modified'),
      action: alertAction
    }
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
    label: getLabel('Account'),
    element: 'fldAccId',
    rElement: 'fldAccName',
    field: 'accId',
    rField: 'accName',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: '',
    tableWidth: '700px'
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
    field: 'mstId',
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
    title: getLabel('Asset'),
    field: 'fixdId',
    rfield: 'fixdName',
    datatype: 'integer',
    width: '250px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: -1,
    defLabel: '',
    autocomplete: true,
    ajax: true,
    ajaxType: 'POST',
    ajaxAsync: false,
    ajaxURL: PhSettings.apiURL + '/UC/Fix/FixedsItems/Autocomplete'
  };
  aColumns[nIdx++] = {
    title: getLabel('Quantity'),
    field: 'qnt',
    datatype: 'decimal',
    width: '100px',
    aggregate: 'sum',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 1,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeQntPrice
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Price'),
    field: 'price',
    datatype: 'decimal',
    width: '100px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeQntPrice
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Amount'),
    field: 'amt',
    datatype: 'decimal',
    width: '100px',
    aggregate: 'sum',
    component: 'input',
    enabled: false,
    required: true,
    defValue: 0,
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': ''
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('Perc') + ' %',
    field: 'perc',
    datatype: 'decimal',
    width: '100px',
    component: 'input',
    enabled: true,
    required: true,
    defValue: '',
    classes: 'text-start',
    callback: {'event': 'change',
      'callback': onChangeEDate
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('S.Date'),
    field: 'sdate',
    datatype: 'date',
    width: '150px',
    component: 'input',
    componentType: 'date',
    enabled: true,
    required: true,
    defValue: currentDate(),
    callback: {'event': 'change',
      'callback': onChangeEDate
    }
  };
  aColumns[nIdx++] = {
    title: getLabel('E.Date'),
    field: 'edate',
    datatype: 'date',
    width: '150px',
    component: 'input',
    componentType: 'date',
    enabled: false,
    required: true,
    defValue: currentDate()
  };
  aColumns[nIdx++] = {
    title: getLabel('Location') + ' 1',
    field: 'loc1Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aLocation1
  };
  aColumns[nIdx++] = {
    title: getLabel('Location') + ' 2',
    field: 'loc2Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aLocation2
  };
  aColumns[nIdx++] = {
    title: getLabel('Location') + ' 3',
    field: 'loc3Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aLocation3
  };
  aColumns[nIdx++] = {
    title: getLabel('F.Total'),
    field: 'ftot',
    datatype: 'decimal',
    width: '125px',
    component: 'input',
    enabled: false,
    required: false,
    defValue: 0,
    classes: 'text-start'
  };
  aColumns[nIdx++] = {
    title: getLabel('F.Amount'),
    field: 'famt',
    datatype: 'decimal',
    width: '100px',
    component: 'input',
    enabled: false,
    required: false,
    defValue: 0,
    classes: 'text-start'
  };
//  aColumns[nIdx++] = {
//    title: getLabel('RTot'),
//    field: 'rtot',
//    datatype: 'decimal',
//    width: '100px',
//    component: 'input',
//    enabled: false,
//    required: false,
//    defValue: 0,
//    classes: 'text-start'
//  };
//  aColumns[nIdx++] = {
//    title: getLabel('RAmt'),
//    field: 'ramt',
//    datatype: 'decimal',
//    width: '100px',
//    component: 'input',
//    enabled: false,
//    required: false,
//    defValue: 0,
//    classes: 'text-start'
//  };
  aColumns[nIdx++] = {
    title: getLabel('Status'),
    field: 'statusId',
    datatype: 'integer',
    width: '100px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aStatus
  };
  aColumns[nIdx++] = {
    title: getLabel('Spec') + ' 1',
    field: 'spc1Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aSpec1
  };
  aColumns[nIdx++] = {
    title: getLabel('Spec') + ' 2',
    field: 'spc2Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aSpec2
  };
  aColumns[nIdx++] = {
    title: getLabel('Spec') + ' 3',
    field: 'spc3Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aSpec3
  };
  aColumns[nIdx++] = {
    title: getLabel('Spec') + ' 4',
    field: 'spc4Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aSpec4
  };
  aColumns[nIdx++] = {
    title: getLabel('Spec') + ' 5',
    field: 'spc5Id',
    datatype: 'integer',
    width: '150px',
    component: 'select',
    enabled: true,
    required: true,
    defValue: 0,
    options: aSpec5
  };
  aColumns[nIdx++] = {
    title: getLabel('Spec') + ' 6',
    field: 'spc6',
    width: '250px',
    component: 'input',
    componentType: 'text',
    enabled: true,
    required: false,
    defValue: '',
    defLabel: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Description'),
    field: 'rem',
    width: '250px',
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
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function onChangeQntPrice() {
  let nRow = $(this).data('row');
  let nQnt = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'qnt'));
  let nPrice = phForm.phTable.phT0.getFieldValue(nRow, 'price');
  if (isNaN(nPrice)) {
    phForm.phTable.phT0.setFieldValue(nRow, 'amt', 0);
    phForm.phTable.phT0.setFieldValue(nRow, 'price', 0);
  } else {
    phForm.phTable.phT0.setFieldValue(nRow, 'amt', nQnt * nPrice);
  }
}

function onChangeEDate() {
  let nRow = $(this).data('row');
  let nPerc = parseFloat(phForm.phTable.phT0.getFieldValue(nRow, 'perc'));
  let dSDate = phForm.phTable.phT0.getFieldValue(nRow, 'sdate');
  if (nPerc <= 0 || isNaN(nPerc)) {
    nPerc = 10;
    phForm.phTable.phT0.setFieldValue(nRow, 'perc', nPerc);
  } else if (nPerc > 100) {
    nPerc = 100;
    phForm.phTable.phT0.setFieldValue(nRow, 'perc', nPerc);
  }
  let nDays = (100 / nPerc) * 365;
  let dDate = addDaysToDate(stringToDate(dSDate), nDays);
  dDate = formatDate(dDate, 'dd-mm-yyyy');
  phForm.phTable.phT0.setFieldValue(nRow, 'edate', dDate);
}

function changeEDate() {
  let nRow = $(this).data('row');
  let nPerc = $('#fldPerc').val();
  let dSDate = $('#fldSdate').val();
  if (nPerc <= 0 || isNaN(nPerc)) {
    nPerc = 10;
    $('#fldPerc').val(nPerc);
  } else if (nPerc > 100) {
    nPerc = 100;
    $('#fldPerc').val(nPerc);
  }
  let nDays = (100 / nPerc) * 365.25;
  let dDate = addDaysToDate(stringToDate(dSDate), nDays);
  dDate = formatDate(dDate, 'dd-mm-yyyy');
  $('#fldEdate').val(dDate);
}

function getaMFields() {
  let idx = 0;
  aMFields = [];
  aMFields[idx++] = {
    label: getLabel('Item'),
    element: 'fldFixId',
    field: 'fixdId',
    rField: 'fixdName',
    isAutocomplete: true,
    isRequired: true
  };
  aMFields[idx++] = {
    label: getLabel('Quantity'),
    element: 'fldQnt',
    field: 'qnt',
    isRequired: true
  };
  aMFields[idx++] = {
    label: getLabel('Price'),
    element: 'fldPrice',
    field: 'price',
    isRequired: true
  };
  aMFields[idx++] = {
    label: getLabel('Amount'),
    element: 'fldAmt',
    field: 'amt',
    isRequired: true
  };
  aMFields[idx++] = {
    label: getLabel('Perc'),
    element: 'fldPerc',
    field: 'perc',
    isRequired: true
  };
  aMFields[idx++] = {
    label: getLabel('S.date'),
    element: 'fldSdate',
    field: 'sdate',
    isRequired: true
  };
  aMFields[idx++] = {
    label: getLabel('E.date'),
    element: 'fldEdate',
    field: 'edate'
  };
  aMFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    options: aStatus
  };
  aMFields[idx++] = {
    label: getLabel('Loc') + '1',
    element: 'fldLoc1Id',
    field: 'loc1Id',
    rField: 'loc1Name',
    options: aLocation1
  };
  aMFields[idx++] = {
    label: getLabel('Loc') + '2',
    element: 'fldLoc2Id',
    field: 'loc2Id',
    rField: 'loc2Name',
    options: aLocation2
  };
  aMFields[idx++] = {
    label: getLabel('Loc') + '3',
    element: 'fldLoc3Id',
    field: 'loc3Id',
    rField: 'loc3Name',
    options: aLocation3
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + '1',
    element: 'fldSpc1Id',
    field: 'spc1Id',
    rField: 'spc1Name',
    options: aSpec1
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + '2',
    element: 'fldSpc2Id',
    field: 'spc2Id',
    rField: 'spc2Name',
    options: aSpec2
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + '3',
    element: 'fldSpc3Id',
    field: 'spc3Id',
    rField: 'spc3Name',
    options: aSpec3
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + '4',
    element: 'fldSpc4Id',
    field: 'spc4Id',
    rField: 'spc4Name',
    options: aSpec4
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + '5',
    element: 'fldSpc5Id',
    field: 'spc5Id',
    rField: 'spc5Name',
    options: aSpec5
  };
  aMFields[idx++] = {
    label: getLabel('Spec') + '6',
    element: 'fldSpc6',
    field: 'spc6'
  };
  aMFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldDRem',
    field: 'rem'
  };
}

function getSelect() {
  let vHtml = '';
  for (let i = 0; i < aMFields.length; i++) {
    if (aMFields[i].hasOwnProperty('options')) {
      vHtml = '';
      for (let j = 0; j < aMFields[i].options.length; j++) {
        vHtml += '<option value="' + aMFields[i].options[j].id + '">' + aMFields[i].options[j].name + '</option>';
      }
      $('#' + aMFields[i].element).html(vHtml);
    }
  }
}

function openNew() {
  $('#fldFixdId').val('');
  $('#fldFixdName').val('');
  $('#fldSdate').val(currentDate());
  $('#fldEdate').val(currentDate());
  $('#fldQnt').val(1);
  $('#fldPrice').val(0);
  $('#fldAmt').val(0);
  $('#fldPerc').val(0);
  $('#fldFtot').val(0);
  $('#fldFamt').val(0);
  $('#fldRtot').val(0);
  $('#fldRamt').val(0);
  $('#fldLoc1Id').val($('#fldLoc1Id :first').val());
  $('#fldLoc2Id').val($('#fldLoc2Id :first').val());
  $('#fldLoc3Id').val($('#fldLoc3Id :first').val());
  $('#fldStatusId').val($('#fldStatusId :first').val());
  $('#fldSpc1Id').val($('#fldSpc1Id :first').val());
  $('#fldSpc2Id').val($('#fldSpc2Id :first').val());
  $('#fldSpc3Id').val($('#fldSpc3Id :first').val());
  $('#fldSpc4Id').val($('#fldSpc4Id :first').val());
  $('#fldSpc5Id').val($('#fldSpc5Id :first').val());
  $('#fldSpc6').val('');
  $('#fldDRem').val('');
}

function calcAmount() {
  let nAmount = parseFloat($('#fldQnt').val()) * parseFloat($('#fldPrice').val());
  if (isNaN(nAmount)) {
    $('#fldAmt').val(0);
  } else {
    $('#fldAmt').val(nAmount);
  }
}

function validatForm() {
  let form = select('#AdditionFilterForm');
  form.classList.remove('was-phF.validated');
  if (isValidForm('AdditionFilterForm')) {
    drawData(parseInt($('#fldQnt').val()));
    form.classList.remove('was-phF.validated');
  } else {
    form.classList.add('was-phF.validated');
  }
}

function drawData(nQnt) {
  let nRow = '';
  for (let i = 0; i < nQnt; i++) {
    phForm.phTable.phT0.addEmptyRow();
    nRow = parseInt(phForm.phTable.phT0.getRowCount()) - 1;
    phForm.phTable.phT0.setFieldValueLabel(nRow, 'fixdId', parseInt($('#fldFixdId').val()), $('#fldFixdName').val());
    phForm.phTable.phT0.setFieldValue(nRow, 'qnt', 1);
    phForm.phTable.phT0.setFieldValue(nRow, 'price', parseFloat($('#fldPrice').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'amt', parseFloat($('#fldPrice').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'perc', parseFloat($('#fldPerc').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'sdate', $('#fldSdate').val());
    phForm.phTable.phT0.setFieldValue(nRow, 'edate', $('#fldEdate').val());
    phForm.phTable.phT0.setFieldValue(nRow, 'rem', $('#fldDRem').val());
    phForm.phTable.phT0.setFieldValue(nRow, 'loc1Id', parseInt($('#fldLoc1Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'loc2Id', parseInt($('#fldLoc2Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'loc3Id', parseInt($('#fldLoc3Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'ftot', parseFloat($('#fldFtot').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'famt', parseFloat($('#fldFamt').val()));
//    phForm.phTable.phT0.setFieldValue(nRow, 'rtot', parseFloat($('#fldRtot').val()));
//    phForm.phTable.phT0.setFieldValue(nRow, 'ramt', parseFloat($('#fldRamt').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'statusId', parseInt($('#fldStatusId').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'spc1Id', parseInt($('#fldSpc1Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'spc2Id', parseInt($('#fldSpc2Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'spc3Id', parseInt($('#fldSpc3Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'spc4Id', parseInt($('#fldSpc4Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'spc5Id', parseInt($('#fldSpc5Id').val()));
    phForm.phTable.phT0.setFieldValue(nRow, 'spc6', $('#fldSpc6').val());
  }
  phForm.phTable.phT0.render();
  openNew();
}

function addArrowBarUpIcon() {
  $('#ph-Open-Icon').removeClass('bi-arrow-bar-down');
  $('#ph-Open-Icon').addClass('bi-arrow-bar-up');
}

function addArrowBarDownIcon() {
  $('#ph-Open-Icon').removeClass('bi-arrow-bar-up');
  $('#ph-Open-Icon').addClass('bi-arrow-bar-down');
}

function resetFilter() {
  $('#AdditionFilter').hide();
  addArrowBarDownIcon();
  $('#AdditionFilterForm').removeClass('was-validated was-phF.validated');
}

function alertCheck() {
  let isOk = false;
  if ($('#fldVhrId').val() != '' && $('#fldVhrId').val() != null && $('#fldVhrId').val() != 'null') {
    isOk = true;
  }
  return isOk;
}

function alertAction() {
  $('#ph-submit').addClass('d-none');
  $('#ph-delete').addClass('d-none');
  phForm.saveValidated = false;
  phForm.deleteValidated = false;
}