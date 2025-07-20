let phForm;
let nEditId = 0;
let nEditIndex = -1;
let aFinancialList = [];
let aFormula = [];
let aTrnData = [];
let aDeleteFormula = [];
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aKind = PhSettings.UsrCodes.LrgValueKind,
        aType = PhSettings.UsrCodes.LrgValueType,
        aGroup = PhSettings.UsrCodes.LrgFinanceGroup,
        aItem = PhSettings.UsrCodes.LrgFinanceItem;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/FinancialLists';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', afterNew: afterNew, afterGet: afterGetPager, afterPagerClick: afterGetPager};
  phForm = new PhForm('FinancialStatementsTmplt', metta, options);
  $('#ph-Add-Trn').click(function () {
    saveItemData();
  });
  $('#ph-New-Trn').click(function () {
    swal.fire({
      title: getLabel('The.Form.Will.be.Clear') + ' !!',
      text: getLabel('Are.You.Sure.?'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      }
    }).then(function (result) {
      if (result.value) {
        openTrnNew();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
  $('#fldTypeId').change(function (e) {
    showCalculator();
  });
  $('#backspace').click(function (e) {
    e.preventDefault();
    if (aFormula.length > 0 && aFormula[aFormula.length - 1].id != 0) {
      aDeleteFormula[aDeleteFormula.length] = aFormula[aFormula.length - 1].id;
    }
    aFormula.pop();
    $('#fldFormula').val(aFormula.map(el => el.rflitmName).join(''));
  });
  $('#clear').click(function (e) {
    e.preventDefault();
    for (let i = 0; i < aFormula.length; i++) {
      if (aFormula[i].id > 0) {
        aDeleteFormula[aDeleteFormula.length] = aFormula[i].id;
      }
    }
    aFormula = [];
    $('#fldFormula').val('');
  });
  $('.btn-operation').click(function (e) {
    e.preventDefault();
    addToFormula($(this).data('value'), $(this).data('formula-id'));
  });
  renderSelect();
  $('#calc-card').removeClass('d-none');
  $('#calc-card').hide();
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
    label: getLabel('StatusId'),
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
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '650px'
  };
  return aFields;
}

function renderSelect() {
  let vHtml = '';
  for (let i = 0; i < aKind.length; i++) {
    vHtml += '<option value="' + aKind[i].id + '">' + aKind[i].name + '</option>';
  }
  $('#fldKindId').html(vHtml);
  vHtml = '';
  for (let i = 0; i < aType.length; i++) {
    vHtml += '<option value="' + aType[i].id + '">' + aType[i].name + '</option>';
  }
  $('#fldTypeId').html(vHtml);
  vHtml = '';
  for (let i = 0; i < aGroup.length; i++) {
    vHtml += '<option value="' + aGroup[i].id + '">' + aGroup[i].name + '</option>';
  }
  $('#fldGrpId').html(vHtml);
  vHtml = '';
  for (let i = 0; i < aItem.length; i++) {
    vHtml += '<option value="' + aItem[i].id + '">' + aItem[i].name + '</option>';
  }
  $('#fldItemId').html(vHtml);
}

function showCalculator() {
  if (parseInt($('#fldTypeId').val()) === 1) {
    $('#calc-card').animate({
      height: 'show'
    });
  } else {
    $('#calc-card').animate({
      height: 'hide'
    });
  }
}

function afterNew() {
  aTrnData = [];
  nEditIndex = -1;
  nEditId = 0;
  $("#trnCard").addClass('d-none');
  $("#trnDataEntryForm")[0].reset();
  $("#fldFormula").val('');
  $('#trnDataTable tbody').html('');
}

function afterGetPager() {
  openTrnNew();
  $('#fldId').val(phForm.aResultData.id);
  getListItem();
  $("#trnCard").removeClass('d-none');
}

function getListItem() {
  let aQData = [];
  let vHtml = '';
  aQData[0] = {
    fieldName: 'flistId',
    dataType: PhFC_Number,
    operation: '=',
    value1: $('#fldId').val(),
    value2: ''
  };
  aQData[1] = {
    fieldName: 'id',
    dataType: PhFC_Number,
    operation: '>',
    value1: '0',
    value2: ''
  };
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/FinancialListItems/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code == 200) {
        aTrnData = response.data.List;
        renderTrnTable();
        for (let i = 0; i < response.data.List.length; i++) {
          aFinancialList[i] = {};
          aFinancialList[i].id = response.data.List[i].id;
          aFinancialList[i].name = response.data.List[i].kindName + ' - ' + response.data.List[i].grpName + ' - ' + response.data.List[i].itmName;
          vHtml += '<option value="' + aFinancialList[i].id + '">' + aFinancialList[i].name + '</option>';
        }
        $('#fldFinListItem').html(vHtml);
        $('#fldFinListItem option').dblclick(function () {
          addToFormula($(this).val(), 0, $(this).val());
        });
      } else {
        $('#trnDataTable tbody').html('');
      }
    }
  });
}

function openTrnNew() {
  nEditId = 0;
  aFormula = [];
  aDeleteFormula = [];
  $("#trnDataEntryForm")[0].reset();
  $("#fldFormula").val('');
  $('.trow').removeClass('table-active');
  showCalculator();
}

function saveItemData() {
  if (aFormula.at(-1) !== undefined) {
    if (aFormula.at(-1).rflitmName === '+' || aFormula.at(-1).rflitmName === '-'
            || aFormula.at(-1).rflitmName === '*' || aFormula.at(-1).rflitmName === '/'
            || aFormula.at(-1).rflitmName === '^' || aFormula.at(-1).rflitmName === '.') {
      showToast(getLabel('Failed.To.Add'), 'DANGER', 'Check for formula');
      return false;
    }
  }
  let method = 'POST';
  let url = 'New';
  let oData = {};
  if (nEditId > 0) {
    method = 'PUT';
    url = '';
  }
  oData.id = nEditId;
  oData.flistId = $('#fldId').val();
  oData.lord = $('#fldOrd').val();
  oData.vtypeId = $('#fldTypeId').val();
  oData.kindId = $('#fldKindId').val();
  oData.itmId = $('#fldItemId').val();
  oData.grpId = $('#fldGrpId').val();
  oData.val = $('#fldVal').val();
  oData.rem = $('#fldTrnRem').val();
  oData.childs = {};
  oData.childs.child = {};
  oData.childs.child.aRows = [];
  oData.childs.child.forDelete = [];
  for (let i = 0; i < aFormula.length; i++) {
    oData.childs.child.aRows[i] = {};
    oData.childs.child.aRows[i].id = aFormula[i].id;
    oData.childs.child.aRows[i].flitmId = aFormula[i].flitmId;
    oData.childs.child.aRows[i].rflitmId = aFormula[i].rflitmId;
    oData.childs.child.aRows[i].formulaId = aFormula[i].formulaId;
    oData.childs.child.aRows[i].vtypeId = aFormula[i].vtypeId;
    oData.childs.child.aRows[i].val = aFormula[i].val;
    oData.childs.child.aRows[i].ford = 0;
  }
  if (aDeleteFormula.length > 0) {
    oData.childs.child.forDelete = aDeleteFormula;
  }
  $.ajax({
    type: method,
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/FinancialListItems/' + url,
    headers: PhSettings.Headers,
    data: JSON.stringify(oData),
    success: function (response) {
      if (response.status) {
        if (nEditId > 0) {
          showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Updated.Successfully'), 'SUCCESS', getLabel(response.message));
        }
        openTrnNew();
        getListItem();
      } else {
        if (nEditId > 0) {
          showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
        } else {
          showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
        }
      }
    },
    error: function (response) {
      if (nEditId > 0) {
        showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
      } else {
        showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
      }
    }
  });
}

function renderTrnTable() {
  let vHtml = '';
  for (let i = 0; i < aTrnData.length; i++) {
    if (!aTrnData[i].isDeleted) {
      vHtml += '<tr id="table-row-' + i + '" class="trow">';
      vHtml += '  <td>';
      vHtml += '    <a href="javascript:;" class="btn btn-primary toolbar-btn btn-sm edit-item" data-bs-title="Edit" title="' + getLabel("Edit") + '" data-index="' + i + '" data-id="' + aTrnData[i].id + '">';
      vHtml += '      <i class="bi bi-pencil"></i>';
      vHtml += '    </a>';
      vHtml += '  </td>';
      vHtml += '  <td>' + aTrnData[i].lord + '</td>';
      vHtml += '  <td>' + aTrnData[i].vtypeName + '</td>';
      vHtml += '  <td>' + aTrnData[i].kindName + '</td>';
      vHtml += '  <td>' + aTrnData[i].grpName + '</td>';
      vHtml += '  <td>' + aTrnData[i].itmName + '</td>';
      vHtml += '  <td>' + (aTrnData[i].val == null || aTrnData[i].val == 'null' ? '' : aTrnData[i].val) + '</td>';
      vHtml += '  <td>' + (aTrnData[i].rem == null || aTrnData[i].rem == 'null' ? '' : aTrnData[i].rem) + '</td>';
      vHtml += '  <td>';
      vHtml += '    <a href="javascript:;" class="btn btn-danger toolbar-btn btn-sm delete-item" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + i + '" data-id="' + aTrnData[i].id + '">';
      vHtml += '      <i class="bi bi-trash"></i>';
      vHtml += '    </a>';
      vHtml += '  </td>';
      vHtml += '</tr>';
    }
  }
  $('#trnDataTable tbody').html(vHtml);
  $('.edit-item').click(function () {
    let nIdx = $(this).data('index');
    $('.trow').removeClass('table-active');
    $('#table-row-' + nIdx).addClass('table-active');
    editItemRow(nIdx);
  });
  $('.delete-item').click(function () {
    let nIdx = $(this).data('index');
    swal.fire({
      title: getLabel('Delete.!!'),
      text: getLabel('Are.you.sure.?'),
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "<i class='bi bi-check2-square'></i> " + getLabel('Yes'),
      cancelButtonText: "<i class='bi bi-x-octagon'></i> " + getLabel('No'),
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      }
    }).then(function (result) {
      if (result.value) {
        deleteItemRow(nIdx);
      } else if (result.dismiss === "cancel") {
      }
    });
  });
}

function editItemRow(nIdx) {
  nEditId = aTrnData[nIdx].id;
  aFormula = [];
  $('#fldTrnId').val(aTrnData[nIdx].id);
  $('#fldId').val(aTrnData[nIdx].flistId);
  $('#fldOrd').val(aTrnData[nIdx].lord);
  $('#fldTypeId').val(aTrnData[nIdx].vtypeId);
  $('#fldKindId').val(aTrnData[nIdx].kindId);
  $('#fldItemId').val(aTrnData[nIdx].itmId);
  $('#fldGrpId').val(aTrnData[nIdx].grpId);
  $('#fldVal').val(aTrnData[nIdx].val);
  $('#fldTrnRem').val(aTrnData[nIdx].rem);
  for (let i = 0; i < aTrnData[nIdx].aList.length; i++) {
    aFormula[i] = {};
    aFormula[i].id = aTrnData[nIdx].aList[i].id;
    aFormula[i].flitmId = nEditId;
    aFormula[i].rflitmId = aTrnData[nIdx].aList[i].rflitmId;
    aFormula[i].rflitmName = '';
    aFormula[i].formulaId = aTrnData[nIdx].aList[i].formulaId;
    aFormula[i].formulaName = aTrnData[nIdx].aList[i].formulaName;
    aFormula[i].vtypeId = aTrnData[nIdx].aList[i].vtypeId;
    aFormula[i].val = aTrnData[nIdx].aList[i].val;
    if (parseInt(aFormula[i].formulaId) === 0 && parseInt(aFormula[i].rflitmId) === 0) {
      aFormula[i].rflitmName = aTrnData[nIdx].aList[i].val;
    } else if (parseInt(aFormula[i].formulaId) > 0 && parseInt(aFormula[i].rflitmId) === 0) {
      aFormula[i].rflitmName = aTrnData[nIdx].aList[i].formulaName;
    } else if (parseInt(aFormula[i].formulaId) === 0 && parseInt(aFormula[i].rflitmId) > 0) {
      let newArray = aFinancialList.filter(function (el) {
        return parseInt(el.id) === parseInt(aFormula[i].rflitmId);
      });
      aFormula[i].rflitmName = '[' + newArray[0].name + ']';
    }
  }
  $('#fldFormula').val(aFormula.map(el => el.rflitmName).join(''));
  showCalculator();
}

function deleteItemRow(nIdx) {
  $.ajax({
    type: "DELETE",
    url: PhSettings.apiURL + '/UC/Lrg/FinancialListItems/' + aTrnData[nIdx].id,
    headers: PhSettings.Headers,
    success: function (response) {
      showHeaderSpinner(false);
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        openTrnNew();
        getListItem();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
    }
  }
  );
  renderTrnTable();
}

function addToFormula(value = 0, formulaId = 0, rFildId = 0) {
  let i = aFormula.length;
  if ((value == '1' || value == '2' || value == '3'
          || value == '4' || value == '5' || value == '6'
          || value == '7' || value == '8' || value == '9'
          || value == '0' || value == '.') && rFildId == 0 && aFormula.length > 0 && rFildId == 0) {
    let tempFormula = aFormula.slice(-1);
    if (tempFormula[0].formulaId == 0 && tempFormula[0].rflitmId == 0) {
      value = tempFormula[0].val.toString() + value.toString();
      i = aFormula.length - 1;
    }
  }
  aFormula[i] = {};
  aFormula[i].id = 0;
  aFormula[i].flitmId = nEditId;
  aFormula[i].rflitmId = rFildId;
  aFormula[i].rflitmName = value;
  aFormula[i].formulaId = formulaId;
  aFormula[i].formulaName = '';
  aFormula[i].vtypeId = 0;
  aFormula[i].val = value;
  if (parseInt(formulaId) > 0 && parseInt(rFildId) === 0) {
    aFormula[i].val = 0;
  }
  if (parseInt(formulaId) === 0 && parseInt(rFildId) > 0) {
    let newArray = aFinancialList.filter(function (el) {
      return parseInt(el.id) === parseInt(aFormula[i].rflitmId);
    });
    aFormula[i].rflitmName = '[' + newArray[0].name + ']';
  }
  $('#fldFormula').val(aFormula.map(el => el.rflitmName).join(''));
}
