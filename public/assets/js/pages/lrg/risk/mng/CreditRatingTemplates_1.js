let phForm;
let nEditIndex = -1;
let nEditId = 0;
let aStatus = PhSettings.PhsCodes.PhsStatus, aAge = PhSettings.UsrCodes.LrgCodeAge,
        aLegal = PhSettings.UsrCodes.LrgBorrowerLegal, aTable = PhSettings.UsrCodes.LrgPointerTables,
        aItem = PhSettings.UsrCodes.LrgPointerItems, aSrc = PhSettings.UsrCodes.LrgPointerSource,
        aType = PhSettings.UsrCodes.LrgPointerType,
        aCat = PhSettings.UsrCodes.LrgCategory,
        aPointerTrn = [];
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/CodePointersMst';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: afterNew, beforSave: saveTrnData, afterGet: afterGetPager, afterPagerClick: afterGetPager};
  phForm = new PhForm('CreditRatingTemplates', metta, options);
  $('#fldTableId').change(function () {
    toggleFields($(this).find(':selected').data('kind'));
  });
  $('#ph-Add-Trn').click(function () {
    addTrnData();
  });
  rednerSelect();
  toggleFields($('#fldTableId :selected').data('kind'));
});

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('LegalName'),
    element: 'LegalId',
    field: 'legalId',
    component: PhFC_Select,
    defValue: '',
    options: aLegal,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('AgeName'),
    element: 'AgeId',
    field: 'ageId',
    component: PhFC_Select,
    defValue: '',
    options: aAge,
    aOpers: aSAOpers
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
    label: getLabel('CatId'),
    element: 'CatId',
    field: 'catId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aCat,
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
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('LegalName'),
    element: 'fldLegalId',
    field: 'legalId',
    rField: 'legalName',
    isRequired: true,
    defValue: '',
    options: aLegal,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('AgeName'),
    element: 'fldAgeId',
    field: 'ageId',
    rField: 'ageName',
    isRequired: true,
    defValue: '',
    options: aAge,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aStatus,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('CatId'),
    element: 'fldCatId',
    field: 'catId',
    rField: 'catName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aCat,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  return aFields;
}

function afterNew() {
  aPointerTrn = [];
  nEditIndex = -1;
  nEditId = 0;
  $("#TrnForm")[0].reset();
  toggleFields($('#fldTableId :selected').data('kind'));
  $('#TrnTable tbody').html('');
}

function afterGetPager() {
  aPointerTrn = [];
  aPointerTrn = phForm.aResultData.aList;
  renderTrnTable();
}

function rednerSelect() {
  let vHtml = '';
  for (var i = 0; i < aTable.length; i++) {
    vHtml += '<option value="' + aTable[i].id + '" data-kind="' + aTable[i].kindId + '">' + aTable[i].name + '</option>';
  }
  $('#fldTableId').html(vHtml);
  vHtml = '';
  for (var i = 0; i < aItem.length; i++) {
    vHtml += '<option value="' + aItem[i].id + '">' + aItem[i].name + '</option>';
  }
  $('#fldItemId').html(vHtml);
  vHtml = '';
  for (var i = 0; i < aStatus.length; i++) {
    vHtml += '<option value="' + aStatus[i].id + '">' + getLabel(aStatus[i].name) + '</option>';
  }
  $('#fldStatusTrnId').html(vHtml);
  vHtml = '';
  for (var i = 0; i < aSrc.length; i++) {
    vHtml += '<option value="' + aSrc[i].id + '">' + getLabel(aSrc[i].name) + '</option>';
  }
  $('#fldSourceId').html(vHtml);
  vHtml = '';
  for (var i = 0; i < aType.length; i++) {
    vHtml += '<option value="' + aType[i].id + '">' + getLabel(aType[i].name) + '</option>';
  }
  $('#fldTypeId').html(vHtml);
}

function openTrnNew() {
  $("#TrnForm")[0].reset();
  toggleFields($('#fldTableId :selected').data('kind'));
  nEditIndex = -1;
  nEditId = 0;
}

function toggleFields(kind) {
  $('#fldItemId').attr('disabled', true);
  $('#fldFDate').attr('required', false);
  $('#fldTDate').attr('required', false);
  $('#fldNFValue').attr('required', false);
  $('#fldNTValue').attr('required', false);
  $('#fldVFValue').attr('required', false);
  $('.was-validated').removeClass('was-validated');
  $('.invalid').removeClass('invalid');
  if (kind === 1) {
    $('.type-text').addClass('d-none');
    $('.type-number').addClass('d-none');
    $('.type-date').addClass('d-none');
    $('#fldItemId').attr('disabled', false);
  } else if (kind === 2) {
    $('.type-text').addClass('d-none');
    $('.type-number').addClass('d-none');
    $('.type-date').removeClass('d-none');
    $('#fldFDate').attr('required', true);
    $('#fldTDate').attr('required', true);
  } else if (kind === 3 || kind === 4) {
    $('.type-text').addClass('d-none');
    $('.type-number').removeClass('d-none');
    $('.type-date').addClass('d-none');
    $('#fldNFValue').attr('required', true);
    $('#fldNTValue').attr('required', true);
  } else if (kind === 5) {
    $('.type-text').removeClass('d-none');
    $('.type-number').addClass('d-none');
    $('.type-date').addClass('d-none');
    $('#fldVFValue').attr('required', true);
  }
}

function addTrnData() {
  let nIdx = 0;
  nEditId = 0;
  $('#fldWeight').val($('#fldWeight').val().trim());
  $('#fldFDate').val($('#fldFDate').val().trim());
  $('#fldTDate').val($('#fldTDate').val().trim());
  $('#fldNFValue').val($('#fldNFValue').val().trim());
  $('#fldNTValue').val($('#fldNTValue').val().trim());
  $('#fldVFValue').val($('#fldVFValue').val().trim());
  if (isValidForm('TrnForm')) {
    nIdx = aPointerTrn.length;
    if (nEditIndex !== -1) {
      nIdx = nEditIndex;
      nEditId = aPointerTrn[nIdx].id;
    }
    aPointerTrn[nIdx] = {};
    aPointerTrn[nIdx].isDeleted = false;
    aPointerTrn[nIdx].id = nEditId;
    aPointerTrn[nIdx].pointerId = $('#fldId').val();
    aPointerTrn[nIdx].statusId = $('#fldStatusTrnId').val();
    aPointerTrn[nIdx].statusName = $('#fldStatusTrnId :selected').text();
    aPointerTrn[nIdx].tableId = $('#fldTableId').val();
    aPointerTrn[nIdx].tableName = $('#fldTableId :selected').text();
    aPointerTrn[nIdx].sourceId = $('#fldSourceId').val();
    aPointerTrn[nIdx].sourceName = $('#fldSourceId :selected').text();
    aPointerTrn[nIdx].typeId = $('#fldTypeId').val();
    aPointerTrn[nIdx].typeName = $('#fldTypeId :selected').text();
    aPointerTrn[nIdx].weight = $('#fldWeight').val();
    aPointerTrn[nIdx].itemId = $("#fldItemId option:first").val();
    aPointerTrn[nIdx].itemName = $('#fldItemId :selected').text();
    aPointerTrn[nIdx].vfvalue = '';
    aPointerTrn[nIdx].vtvalue = '';
    aPointerTrn[nIdx].fdate = '01-01-1999';
    aPointerTrn[nIdx].tdate = '01-01-1999';
    aPointerTrn[nIdx].nfvalue = 0;
    aPointerTrn[nIdx].ntvalue = 0;
    aPointerTrn[nIdx].rem = $('#fldRemTrn').val();
    if ($('#fldTableId :selected').data('kind') == 1) {
      aPointerTrn[nIdx].itemId = $('#fldItemId').val();
      aPointerTrn[nIdx].itemName = $('#fldItemId :selected').text();
    } else if ($('#fldTableId :selected').data('kind') == 2) {
      aPointerTrn[nIdx].fdate = $('#fldFDate').val();
      aPointerTrn[nIdx].tdate = $('#fldTDate').val();
    } else if ($('#fldTableId :selected').data('kind') == 3 ||
            $('#fldTableId :selected').data('kind') == 4) {
      aPointerTrn[nIdx].nfvalue = $('#fldNFValue').val();
      aPointerTrn[nIdx].ntvalue = $('#fldNTValue').val();
    } else if ($('#fldTableId :selected').data('kind') == 5) {
      aPointerTrn[nIdx].vfvalue = $('#fldVFValue').val();
    }
    renderTrnTable();
    openTrnNew();
  }
}

function renderTrnTable() {
  let vHtml = '';
  for (let i = 0; i < aPointerTrn.length; i++) {
    if (!aPointerTrn[i].isDeleted) {
      vHtml += '<tr id="table-row-' + i + '" class="trow">';
      vHtml += '  <td>';
      vHtml += '    <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm edit-item" data-bs-title="Edit" title="' + getLabel("Edit") + '" data-index="' + i + '" data-id="' + aPointerTrn[i].id + '">';
      vHtml += '      <i class="bi bi-pencil"></i>';
      vHtml += '    </a>';
      vHtml += '  </td>';
      vHtml += '  <td>' + aPointerTrn[i].tableName + '</td>';
      vHtml += '  <td>' + aPointerTrn[i].itemName + '</td>';
      vHtml += '  <td>' + getLabel(aPointerTrn[i].statusName) + '</td>';
      vHtml += '  <td>' + aPointerTrn[i].sourceName + '</td>';
      vHtml += '  <td>' + aPointerTrn[i].typeName + '</td>';
      vHtml += '  <td>' + aPointerTrn[i].weight + '</td>';
      if (aPointerTrn[i].vfvalue != null) {
        vHtml += '  <td>' + aPointerTrn[i].vfvalue + '</td>';
      } else {
        vHtml += '  <td></td>';
      }
      if (aPointerTrn[i].fdate != '01-01-1999' || aPointerTrn[i].tdate != '01-01-1999') {
        vHtml += '  <td>' + aPointerTrn[i].fdate + '</td>';
        vHtml += '  <td>' + aPointerTrn[i].tdate + '</td>';
      } else {
        vHtml += '  <td></td>';
        vHtml += '  <td></td>';
      }
      if (aPointerTrn[i].nfvalue != 'null' || aPointerTrn[i].ntvalue != 'null' || (aPointerTrn[i].nfvalue != 0 && aPointerTrn[i].ntvalue != 0)) {
        vHtml += '  <td>' + aPointerTrn[i].nfvalue + '</td>';
        vHtml += '  <td>' + aPointerTrn[i].ntvalue + '</td>';
      } else {
        vHtml += '  <td></td>';
        vHtml += '  <td></td>';
      }
      if (aPointerTrn[i].rem != 'null') {
        vHtml += '  <td>' + aPointerTrn[i].rem + '</td>';
      } else {
        vHtml += '  <td></td>';
      }
      vHtml += '  <td>';
      vHtml += '    <a href="javascript:;" class="btn btn-danger toolbar-btn btn-sm delete-item" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + i + '" data-id="' + aPointerTrn[i].id + '">';
      vHtml += '      <i class="bi bi-trash"></i>';
      vHtml += '    </a>';
      vHtml += '  </td>';
      vHtml += '</tr>';
    }
  }
  $('#TrnTable tbody').html(vHtml);
  $('.edit-item').click(function () {
    let nIdx = $(this).data('index');
    $('.trow').removeClass('table-active');
    $('#table-row-' + nIdx).addClass('table-active');
    nEditIndex = nIdx;
    editTrnRow(nIdx);
  });
  $('.delete-item').click(function () {
    let nIdx = $(this).data('index');
    deleteTrnRow(nIdx);
  });
}

function editTrnRow(nIdx) {
  $('#fldTrnId').val(aPointerTrn[nIdx].id);
  $('#fldId').val(aPointerTrn[nIdx].pointerId);
  $('#fldTableId').val(aPointerTrn[nIdx].tableId);
  $('#fldStatusTrnId').val(aPointerTrn[nIdx].statusId);
  $('#fldItemId').val(aPointerTrn[nIdx].itemId);
  $('#fldSourceId').val(aPointerTrn[nIdx].sourceId);
  $('#fldTypeId').val(aPointerTrn[nIdx].typeId);
  $('#fldWeight').val(aPointerTrn[nIdx].weight);
  $('#fldRemTrn').val(aPointerTrn[nIdx].rem);
  $('#fldVFValue').val(aPointerTrn[nIdx].vfvalue);
  $('#fldNFValue').val(aPointerTrn[nIdx].nfvalue);
  $('#fldNTValue').val(aPointerTrn[nIdx].ntvalue);
  $('#fldFDate').val(aPointerTrn[nIdx].fdate);
  $('#fldTDate').val(aPointerTrn[nIdx].tdate);
  toggleFields($('#fldTableId :selected').data('kind'));
}

function deleteTrnRow(nIdx) {
  if (aPointerTrn[nIdx].id > 0) {
    aPointerTrn[nIdx].isDeleted = true;
  } else {
    nEditIndex = -1;
    aPointerTrn.splice(parseInt(nIdx), 1);
  }
  renderTrnTable();
}

function saveTrnData() {
  let nIdx = 0;
  phForm.aData.childs = {};
  phForm.aData.childs.child = {};
  phForm.aData.childs.child.aRows = [];
  phForm.aData.childs.child.forDelete = [];
  for (let i = 0; i < aPointerTrn.length; i++) {
    phForm.aData.childs.child.aRows[i] = {};
    phForm.aData.childs.child.aRows[i].id = aPointerTrn[i].id;
    phForm.aData.childs.child.aRows[i].pointerId = aPointerTrn[i].pointerId;
    phForm.aData.childs.child.aRows[i].statusId = aPointerTrn[i].statusId;
    phForm.aData.childs.child.aRows[i].tableId = aPointerTrn[i].tableId;
    phForm.aData.childs.child.aRows[i].itemId = aPointerTrn[i].itemId;
    phForm.aData.childs.child.aRows[i].sourceId = aPointerTrn[i].sourceId;
    phForm.aData.childs.child.aRows[i].typeId = aPointerTrn[i].typeId;
    phForm.aData.childs.child.aRows[i].weight = aPointerTrn[i].weight;
    phForm.aData.childs.child.aRows[i].fdate = aPointerTrn[i].fdate;
    phForm.aData.childs.child.aRows[i].tdate = aPointerTrn[i].tdate;
    phForm.aData.childs.child.aRows[i].nfvalue = aPointerTrn[i].nfvalue;
    phForm.aData.childs.child.aRows[i].ntvalue = aPointerTrn[i].ntvalue;
    phForm.aData.childs.child.aRows[i].vfvalue = aPointerTrn[i].vfvalue;
    phForm.aData.childs.child.aRows[i].vtvalue = aPointerTrn[i].vtvalue;
    if (aPointerTrn[i].isDeleted) {
      phForm.aData.childs.child.forDelete[nIdx] = aPointerTrn[i].id;
      nIdx++;
    }
  }
}
