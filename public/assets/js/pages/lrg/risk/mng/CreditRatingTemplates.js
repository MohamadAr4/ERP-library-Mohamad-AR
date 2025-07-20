/* global PhSettings */
let form;
let aStatus = PhSettings.PhsCodes.PhsStatus,
        aCategory = PhSettings.UsrCodes.LrgCodeCategory,
        aKind = PhSettings.UsrCodes.LrgCodeFinanceKind,
        aPointerType = PhSettings.UsrCodes.LrgPointerType,
        aTable = PhSettings.UsrCodes.LrgPointerTables;
let aPointers = [];
let pointerTypeId = 0;
let indexPointerType = -1;
let pointerTableId = 0;
let indexPointerTable = -1;
let pointerItemId = 0;
jQuery(document).ready(function () {
  form = new PhsForm();
  $('#addPointerType').click(function (e) {
    e.preventDefault();
    openNewPointersType();
  });
  $('#ph-pointerType-submit').click(function (e) {
    e.preventDefault();
    savePointerTypeData();
  });
  $('#ph-pointerTable-submit').click(function (e) {
    e.preventDefault();
    savePointerTableData();
  });
  $('#ph-pointerItem-submit').click(function (e) {
    e.preventDefault();
    savePointerItemData();
  });
  form.addBlock("PointersMst", getPointersMstBlock());
  form.render();
  showHeaderSpinner(false);
});

function afterGetPointerMst() {
  aPointers = [];
  if (form.ResultData.hasOwnProperty('List')) {
    aPointers = form.ResultData.List[0].aList;
  } else if (form.ResultData.hasOwnProperty('Obj')) {
    aPointers = form.ResultData.Obj.aList;
  }
  $('#addPointerType').removeClass('d-none');
  renderPointers();
}

function afterDeletePointerMst() {
  aPointers = [];
  $('#tablePointers').html('');
  $('#addPointerType').addClass('d-none');
}

function getPointersMstBlock() {
  let oBlock = {};
  oBlock.Name = "PointersMst";
  oBlock.Label = getLabel("PointersMst");
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Enter;
  oBlock.Filter = {
    Cols: 2,
    LabelCols: 3
  };
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/PointersMst/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/PointersMst/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/PointersMst/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/PointersMst/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/PointersMst/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/PointersMst/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeGet": "",
    "AfterGet": afterGetPointerMst,
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeEdit": "",
    "AfterEdit": "",
    "BeforeDelete": "",
    "AfterDelete": afterDeletePointerMst
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 0
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "fld-PointersMst-id",
    "Field": "id",
    "Default": "0"
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-PointersMst-name",
    "Field": "name",
    "RelField": "",
    "Default": "",
    "Component": {
      "TranslateLabel": false,
      "Label": getLabel("name")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("name"),
      "hasSecondField": false,
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-PointersMst-catId",
    "Field": "catId",
    "RelField": "catName",
    "Default": "0",
    "Component": {
      "Type": PhFC_Select,
      "TranslateLabel": false,
      "Label": getLabel("Pionter.Category")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Label": getLabel("Pionter.Category"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aCategory
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-PointersMst-statusId",
    "Field": "statusId",
    "RelField": "statusName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "TranslateLabel": true,
      "Label": getLabel("status")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Label": getLabel("status"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aStatus
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-PointersMst-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "TranslateLabel": false,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "hasSecondField": false,
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getPointers() {
  let aData = [];
  aData[0] = {};
  aData[0].dataType = PhFC_Number;
  aData[0].fieldName = 'pointerId';
  aData[0].operation = '=';
  aData[0].value1 = $('#fld-PointersMst-id').val();
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/PointersType/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aPointers = response.data.List;
        renderPointers();
      }
    }
  });
}

function renderPointers() {
  let vHtml = '';
  let aPointerTables = [];
  let aPointerItems = [];
  vHtml += '<table class="table table-bordered table-sm">';
  vHtml += '  <thead>';
  vHtml += '  </thead>';
  vHtml += '  <tbody id="typeDataTable" class="">';
  for (let i = 0; i < aPointers.length; i++) {
    aPointerTables = aPointers[i].aList;
    vHtml += '  <tr class="table-light">';
    vHtml += '    <td>';
    vHtml += '      <a href="javascript:;"class="btn btn-light btn-sm toggle-item" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="tooltip-primary-bg" data-bs-title="Add New" title="' + getLabel("ToggleView") + '" data-index="' + i + '" data-block="toggle-table">';
    vHtml += '        <i id="icon-toggle-table-' + i + '"  class="bi bi-arrow-bar-up"></i>';
    vHtml += '      </a>';
    vHtml += '    </td>';
    vHtml += '    <td style="width: 900px !important;">' + getLabel('Type') + '</td>';
    vHtml += '    <td style="width: 100px !important;">' + getLabel('weight') + '</td>';
    vHtml += '    <td style="width: 600px !important;">' + getLabel('Rem') + '</td>';
    vHtml += '    <td>';
    vHtml += '      <a href="javascript:;"class="btn btn-warning btn-sm new-table" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="tooltip-primary-bg" data-bs-title="Add New" title="' + getLabel("New") + '" data-type-index="' + i + '">';
    vHtml += '        <i class="bi bi-plus-lg"></i>';
    vHtml += '      </a>';
    vHtml += '    </td>';
    vHtml += '  </tr>';
    vHtml += '  <tr class="table-primary">';
    vHtml += '    <td style="width: 20px !important;">';
    vHtml += '      <a href="javascript:;" class="btn btn-primary btn-sm edit-type" data-bs-title="Edit" title="' + getLabel("Edit") + '" data-index="' + i + '" data-id="' + aPointers[i].id + '">';
    vHtml += '        <i class="bi bi-pencil"></i>';
    vHtml += '      </a>';
    vHtml += '    </td>';
    vHtml += '    <td>' + aPointers[i].typeName + '</td>';
    vHtml += '    <td>' + aPointers[i].weight + '</td>';
    vHtml += '    <td>' + aPointers[i].rem + '</td>';
    vHtml += '    <td style="width: 20px !important;">';
    vHtml += '      <a href="javascript:;" class="btn btn-danger btn-sm delete-type" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + i + '" data-id="' + aPointers[i].id + '">';
    vHtml += '        <i class="bi bi-trash"></i>';
    vHtml += '      </a>';
    vHtml += '    </td>';
    vHtml += '  </tr>';
    if (aPointerTables.length > 0) {
      vHtml += '<tr id="toggle-table-' + i + '">';
      vHtml += '  <td class="px-5" colspan="5">';
      vHtml += '    <table id="tableDataTable" class="table table-bordered p-2 table-sm my-1">';
      for (let j = 0; j < aPointerTables.length; j++) {
        aPointerItems = aPointerTables[j].aList;
        let aTmpTable = aTable.filter(function (el) {
          return  parseInt(el.id) === parseInt(aPointerTables[j].tableId);
        });
        let kindId = parseInt(aTmpTable[0].kindId);
        vHtml += '    <thead>';
        vHtml += '      <tr class="table-light">';
        vHtml += '        <td>';
        vHtml += '          <a href="javascript:;"class="btn btn-light btn-sm toggle-item" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="tooltip-primary-bg" data-bs-title="Add New" title="' + getLabel("ToggleView") + '" data-type-index="' + i + '" data-index="' + j + '" data-block="toggle-table-item">';
        vHtml += '            <i id="icon-toggle-table-item-' + i + '-' + j + '"  class="bi bi-arrow-bar-up"></i>';
        vHtml += '          </a>';
        vHtml += '        </td>';
        vHtml += '        <td style="width: 800px !important;">' + getLabel('TableName') + '</td>';
        vHtml += '        <td style="width: 100px !important;">' + getLabel('weight') + '</td>';
        vHtml += '        <td style="width: 100px !important;">' + getLabel('Status') + '</td>';
        vHtml += '        <td style="width: 600px !important;">' + getLabel('Rem') + '</td>';
        vHtml += '        <td>';
        vHtml += '          <a href="javascript:;"class="btn btn-info btn-sm new-item" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="tooltip-primary-bg" data-bs-title="Add New" title="' + getLabel("New") + '" data-type-index="' + i + '" data-table-index="' + j + '" data-kindid="' + kindId + '">';
        vHtml += '            <i class="bi bi-plus-lg"></i>';
        vHtml += '          </a>';
        vHtml += '        </td>';
        vHtml += '      </tr>';
        vHtml += '    </thead>';
        vHtml += '    <tbody>';
        vHtml += '      <tr class="table-warning">';
        vHtml += '        <td style="width: 20px !important;">';
        vHtml += '          <a href="javascript:;" class="btn btn-primary btn-sm edit-table" data-bs-title="Edit" title="' + getLabel("Edit") + '" data-type-index="' + i + '" data-index="' + j + '" data-id="' + aPointerTables[j].id + '">';
        vHtml += '            <i class="bi bi-pencil"></i>';
        vHtml += '          </a>';
        vHtml += '        </td>';
        vHtml += '        <td>' + aPointerTables[j].tableName + '</td>';
        vHtml += '        <td>' + aPointerTables[j].weight + '</td>';
        vHtml += '        <td>' + getLabel(aPointerTables[j].statusName) + '</td>';
        vHtml += '        <td>' + aPointerTables[j].rem + '</td>';
        vHtml += '        <td style="width: 20px !important;">';
        vHtml += '          <a href="javascript:;" class="btn btn-danger btn-sm delete-table" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + j + '" data-id="' + aPointerTables[j].id + '">';
        vHtml += '            <i class="bi bi-trash"></i>';
        vHtml += '          </a>';
        vHtml += '        </td>';
        vHtml += '      </tr>';
        if (aPointerItems.length > 0) {
          vHtml += '    <tr class="" id="toggle-table-item-' + i + '-' + j + '">';
          vHtml += '      <td class="px-5" colspan="6">';
          vHtml += '        <table id="itemDataTable" class="table table-bordered table-sm p-5 my-1">';
          vHtml += '          <thead>';
          vHtml += '            <tr class="table-light">';
          vHtml += '              <td></td>';
          if (kindId === 1) {
            vHtml += '            <td style="width: 600px !important;">' + getLabel('Lrg.ItemName') + '</td>';
          } else if (kindId === 2) {
            vHtml += '            <td style="width: 300px !important;">' + getLabel('From.date') + '</td>';
            vHtml += '            <td style="width: 300px !important;">' + getLabel('To.date') + '</td>';
          } else if (kindId === 3 || kindId === 4) {
            vHtml += '            <td style="width: 300px !important;">' + getLabel('From.Value') + '</td>';
            vHtml += '            <td style="width: 300px !important;">' + getLabel('To.Value') + '</td>';
          } else if (kindId === 5) {
            vHtml += '            <td style="width: 600px !important;">' + getLabel('Text') + '</td>';
          }
          vHtml += '              <td style="width: 100px !important;">' + getLabel('weight') + '</td>';
          vHtml += '              <td>' + getLabel('Rem') + '</td>';
          vHtml += '              <td>';
          vHtml += '              </td>';
          vHtml += '            </tr>';
          vHtml += '          </thead>';
          vHtml += '          <tbody>';
          for (let k = 0; k < aPointerItems.length; k++) {
            vHtml += '          <tr class="table-info">';
            vHtml += '            <td style="width: 20px !important;">';
            vHtml += '              <a href="javascript:;" class="btn btn-primary btn-sm edit-items" data-bs-title="Edit" title="' + getLabel("Edit") + '" data-type-index="' + i + '" data-table-index="' + j + '" data-index="' + k + '" data-kindid="' + kindId + '" data-id="' + aPointerItems[k].id + '">';
            vHtml += '                <i class="bi bi-pencil"></i>';
            vHtml += '              </a>';
            vHtml += '            </td>';
            if (kindId === 1) {
              vHtml += '          <td>' + aPointerItems[k].itemName + '</td>';
            } else if (kindId === 2) {
              vHtml += '          <td>' + aPointerItems[k].fdate + '</td>';
              vHtml += '          <td>' + aPointerItems[k].tdate + '</td>';
            } else if (kindId === 3 || kindId === 4) {
              vHtml += '          <td>' + aPointerItems[k].nfvalue + '</td>';
              vHtml += '          <td>' + aPointerItems[k].ntvalue + '</td>';
            } else if (kindId === 5) {
              vHtml += '          <td>' + aPointerItems[k].vfvalue + '</td>';
            }
            vHtml += '            <td>' + aPointerItems[k].weight + '</td>';
            vHtml += '            <td>' + aPointerItems[k].rem + '</td>';
            vHtml += '            <td style="width: 20px !important;">';
            vHtml += '              <a href="javascript:;" class="btn btn-danger btn-sm delete-item" data-bs-title="Delete" title="' + getLabel("Delete") + '" data-index="' + k + '" data-id="' + aPointerItems[k].id + '">';
            vHtml += '                <i class="bi bi-trash"></i>';
            vHtml += '              </a>';
            vHtml += '            </td>';
            vHtml += '          </tr>';
          }
          vHtml += '          </tbody>';
          vHtml += '        </table>';
          vHtml += '      </td>';
          vHtml += '    </tr>';
        }
      }
      vHtml += '      </tbody>';
      vHtml += '    </table>';
      vHtml += '  </td>';
      vHtml += '</tr>';
    }
  }
  vHtml += '  </tbody>';
  vHtml += '</table>';
  $('#tablePointers').html(vHtml);
  $('.toggle-item').click(function (e) {
    e.preventDefault();
    let index = $(this).data('index');
    let typeIndex = $(this).data('type-index');
    let block = $(this).data('block');
    let idIndex = index;
    if (typeIndex != undefined) {
      idIndex = typeIndex + '-' + index;
    }
    $('#' + block + '-' + idIndex).animate({
      height: 'toggle'
    });
    if ($('#icon-' + block + '-' + idIndex).hasClass('bi-arrow-bar-up')) {
      $('#icon-' + block + '-' + idIndex).removeClass('bi-arrow-bar-up');
      $('#icon-' + block + '-' + idIndex).addClass('bi-arrow-bar-down');
    } else {
      $('#icon-' + block + '-' + idIndex).addClass('bi-arrow-bar-up');
      $('#icon-' + block + '-' + idIndex).removeClass('bi-arrow-bar-down');
    }
  });
  $('.new-table').click(function (e) {
    e.preventDefault();
    indexPointerType = $(this).data('type-index');
    pointerTypeId = aPointers[indexPointerType].id;
    openNewPointersTable();
  });
  $('.new-item').click(function (e) {
    e.preventDefault();
    indexPointerType = $(this).data('type-index');
    indexPointerTable = $(this).data('table-index');
    pointerTableId = aPointers[indexPointerType].aList[indexPointerTable].id;
    toggleFields($(this).data('kindid'));
    openNewPointersItem();
  });
  $('.delete-type').click(function (e) {
    let id = $(this).data('id');
    e.preventDefault();
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
        deletePointerType(id);
      } else if (result.dismiss === "cancel") {
      }
    });
  });
  $('.delete-table').click(function (e) {
    let id = $(this).data('id');
    e.preventDefault();
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
        deletePointerTable(id);
      } else if (result.dismiss === "cancel") {
      }
    });
  });
  $('.delete-item').click(function (e) {
    let id = $(this).data('id');
    e.preventDefault();
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
        deletePointerItem(id);
      } else if (result.dismiss === "cancel") {
      }
    });
  });
  $('.edit-type').click(function (e) {
    let id = $(this).data('id');
    editPointerType(id);
  });
  $('.edit-table').click(function (e) {
    let id = $(this).data('id');
    indexPointerType = $(this).data('type-index');
    editPointerTable(id);
  });
  $('.edit-items').click(function (e) {
    let id = $(this).data('id');
    indexPointerType = $(this).data('type-index');
    indexPointerTable = $(this).data('table-index');
    toggleFields($(this).data('kindid'));
    editPointerItem(id);
  });
}

function toggleFields(kind) {
  $('.was-validated').removeClass('was-validated');
  $('.invalid').removeClass('invalid');
  $('#item-row').addClass('d-none');
  $('#date-row').addClass('d-none');
  $('#number-row').addClass('d-none');
  $('#text-row').addClass('d-none');
  $('#fld-PointersItem-fdate').attr('required', false);
  $('#fld-PointersItem-tdate').attr('required', false);
  $('#fld-PointersItem-nfvalue').attr('required', false);
  $('#fld-PointersItem-ntvalue').attr('required', false);
  $('#fld-PointersItem-vfvalue').attr('required', false);
  $('#fld-PointersItem-itemId').val($('#fld-PointersItem-itemId option:first').val());
  $('#fld-PointersItem-fdate').val('30-12-1999');
  $('#fld-PointersItem-tdate').val('30-12-1999');
  $('#fld-PointersItem-nfvalue').val(0);
  $('#fld-PointersItem-ntvalue').val(0);
  $('#fld-PointersItem-vfvalue').val('');
  if (kind === 1) {
    $('#item-row').removeClass('d-none');
  } else if (kind === 2) {
    $('#date-row').removeClass('d-none');
    $('#fld-PointersItem-fdate').attr('required', true);
    $('#fld-PointersItem-tdate').attr('required', true);
    $('#fld-PointersItem-fdate').val(currentDate());
    $('#fld-PointersItem-tdate').val(currentDate());
  } else if (kind === 3 || kind === 4) {
    $('#number-row').removeClass('d-none');
    $('#fld-PointersItem-nfvalue').attr('required', true);
    $('#fld-PointersItem-ntvalue').attr('required', true);
  } else if (kind === 5) {
    $('#text-row').removeClass('d-none');
    $('#fld-PointersItem-vfvalue').attr('required', true);
  }
}

function openNewPointersType() {
  indexPointerType = -1;
  pointerTypeId = 0;
  $('#pointerType-Form')[0].reset();
  $('#pointerType-Modal').modal('show');
}

function openNewPointersTable() {
  pointerTableId = 0;
  $('#pointerTable-Form')[0].reset();
  $('#pointerTable-Modal').modal('show');
}

function openNewPointersItem() {
  pointerItemId = 0;
  $('#pointerItem-Form')[0].reset();
  $('#pointerItem-Modal').modal('show');
}

function savePointerTypeData() {
  let method = 'POST';
  let url = 'New';
  let oData = {};
  let weight = 0;
  for (let i = 0; i < aPointers.length; i++) {
    if (pointerTypeId != parseInt(aPointers[i].id)) {
      weight += parseInt(aPointers[i].weight);
    }
  }
  weight += parseInt($('#fld-PointersType-weight').val());
  if (weight <= 100) {
    if (pointerTypeId > 0) {
      method = 'PUT';
      url = '';
    }
    oData.id = pointerTypeId;
    oData.pointerId = $('#fld-PointersMst-id').val();
    oData.typeId = $('#fld-PointersType-typeId').val();
    oData.weight = $('#fld-PointersType-weight').val();
    oData.rem = $('#fld-PointersType-rem').val();
    if (isValidForm('pointerType-Form')) {
      $.ajax({
        type: method,
        async: false,
        url: PhSettings.apiURL + '/UC/Lrg/PointersType/' + url,
        headers: PhSettings.Headers,
        data: JSON.stringify(oData),
        success: function (response) {
          if (response.status) {
            if (pointerTypeId > 0) {
              showToast(getLabel('Added.Successfully') + ' / ' + getLabel('Pointers.Type'), 'SUCCESS', getLabel(response.message));
            } else {
              showToast(getLabel('Updated.Successfully') + ' / ' + getLabel('Pointers.Type'), 'SUCCESS', getLabel(response.message));
            }
            $('#pointerType-Modal').modal('hide');
            getPointers();
          } else {
            if (pointerTypeId > 0) {
              showToast(getLabel('Failed.To.Add') + ' / ' + getLabel('Pointers.Type'), 'DANGER', prepareErrorMessage(response.message));
            } else {
              showToast(getLabel('Failed.To.Update') + ' / ' + getLabel('Pointers.Type'), 'DANGER', prepareErrorMessage(response.message));
            }
          }
        },
        error: function (response) {
          if (pointerTypeId > 0) {
            showToast(getLabel('Failed.To.Add') + ' / ' + getLabel('Pointers.Type'), 'DANGER', prepareErrorMessage(response.message));
          } else {
            showToast(getLabel('Failed.To.Update') + ' / ' + getLabel('Pointers.Type'), 'DANGER', prepareErrorMessage(response.message));
          }
        }
      });
    }
  } else {
    showToast(getLabel('Failed.To.Add') + ' / ' + getLabel('Pointers.Type'), 'DANGER', 'Total Weight Type Grater than 100');
  }
}

function savePointerTableData() {
  let method = 'POST';
  let url = 'New';
  let oData = {};
  let weight = 0;
  for (let i = 0; i < aPointers[indexPointerType].aList.length; i++) {
    if (pointerTableId != parseInt(aPointers[indexPointerType].aList[i].id)) {
      weight += parseInt(aPointers[indexPointerType].aList[i].weight);
    }
  }
  weight += parseInt($('#fld-PointersTable-weight').val());
  if (weight <= aPointers[indexPointerType].weight) {
    if (pointerTableId > 0) {
      method = 'PUT';
      url = '';
    }
    oData.id = pointerTableId;
    oData.typId = pointerTypeId;
    oData.tableId = $('#fld-PointersTable-tableId').val();
    oData.statusId = $('#fld-PointersTable-statusId').val();
    oData.weight = $('#fld-PointersTable-weight').val();
    oData.rem = $('#fld-PointersTable-rem').val();
    if (isValidForm('pointerTable-Form')) {
      $.ajax({
        type: method,
        async: false,
        url: PhSettings.apiURL + '/UC/Lrg/PointersTable/' + url,
        headers: PhSettings.Headers,
        data: JSON.stringify(oData),
        success: function (response) {
          if (response.status) {
            if (pointerTableId > 0) {
              showToast(getLabel('Added.Successfully') + ' / ' + getLabel('Pointers.Table'), 'SUCCESS', getLabel(response.message));
            } else {
              showToast(getLabel('Updated.Successfully') + ' / ' + getLabel('Pointers.Table'), 'SUCCESS', getLabel(response.message));
            }
            $('#pointerTable-Modal').modal('hide');
            getPointers();
          } else {
            if (pointerTableId > 0) {
              showToast(getLabel('Failed.To.Add') + ' / ' + getLabel('Pointers.Table'), 'DANGER', prepareErrorMessage(response.message));
            } else {
              showToast(getLabel('Failed.To.Update') + ' / ' + getLabel('Pointers.Table'), 'DANGER', prepareErrorMessage(response.message));
            }
          }
        },
        error: function (response) {
          if (pointerTableId > 0) {
            showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
          } else {
            showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
          }
        }
      });
    }
  } else {
    showToast(getLabel('Failed.To.Add') + ' / ' + getLabel('Pointers.Table'), 'DANGER', 'Total Weight Tables Grater than Weight Type');
  }
}

function savePointerItemData() {
  let method = 'POST';
  let url = 'New';
  let oData = {};
  let weight = 0;
  for (let i = 0; i < aPointers[indexPointerType].aList[indexPointerTable].aList.length; i++) {
    if (pointerItemId != parseInt(aPointers[indexPointerType].aList[indexPointerTable].aList[i].id)) {
      weight += parseInt(aPointers[indexPointerType].aList[indexPointerTable].aList[i].weight);
    }
  }
  weight += parseInt($('#fld-PointersItem-weight').val());
  if (weight <= aPointers[indexPointerType].aList[indexPointerTable].weight) {
    if (pointerItemId > 0) {
      method = 'PUT';
      url = '';
    }
    oData.id = pointerItemId;
    oData.tblId = pointerTableId;
    oData.itemId = $('#fld-PointersItem-itemId').val();
    oData.fdate = $('#fld-PointersItem-fdate').val();
    oData.tdate = $('#fld-PointersItem-tdate').val();
    oData.nfvalue = $('#fld-PointersItem-nfvalue').val();
    oData.ntvalue = $('#fld-PointersItem-ntvalue').val();
    oData.vfvalue = $('#fld-PointersItem-vfvalue').val();
    oData.vtvalue = '';
    oData.weight = $('#fld-PointersItem-weight').val();
    oData.rem = $('#fld-PointersItem-rem').val();
    if (isValidForm('pointerItem-Form')) {
      $.ajax({
        type: method,
        async: false,
        url: PhSettings.apiURL + '/UC/Lrg/PointersItem/' + url,
        headers: PhSettings.Headers,
        data: JSON.stringify(oData),
        success: function (response) {
          if (response.status) {
            if (pointerItemId > 0) {
              showToast(getLabel('Added.Successfully') + ' / ' + getLabel('Pointers.Item'), 'SUCCESS', getLabel(response.message));
            } else {
              showToast(getLabel('Updated.Successfully') + ' / ' + getLabel('Pointers.Item'), 'SUCCESS', getLabel(response.message));
            }
            $('#pointerItem-Modal').modal('hide');
            getPointers();
          } else {
            if (pointerItemId > 0) {
              showToast(getLabel('Failed.To.Add') + ' / ' + getLabel('Pointers.Item'), 'DANGER', prepareErrorMessage(response.message));
            } else {
              showToast(getLabel('Failed.To.Update') + ' / ' + getLabel('Pointers.Item'), 'DANGER', prepareErrorMessage(response.message));
            }
          }
        },
        error: function (response) {
          if (pointerItemId > 0) {
            showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
          } else {
            showToast(getLabel('Failed.To.Update'), 'DANGER', prepareErrorMessage(response.message));
          }
        }
      });
    }
  } else {
    showToast(getLabel('Failed.To.Add') + ' / ' + getLabel('Pointers.Item'), 'DANGER', 'Total Weight Items Grater than Weight Table');
  }
}

function deletePointerType(id) {
  let method = 'DELETE';
  let url = PhSettings.apiURL + '/UC/Lrg/PointersType/' + id;
  $.ajax({
    type: method,
    url: url,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        getPointers();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', getLabel(response.message));
      }
    }
  });
}

function deletePointerTable(id) {
  let method = 'DELETE';
  let url = PhSettings.apiURL + '/UC/Lrg/PointersTable/' + id;
  $.ajax({
    type: method,
    url: url,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        getPointers();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', getLabel(response.message));
      }
    }
  });
}

function deletePointerItem(id) {
  let method = 'DELETE';
  let url = PhSettings.apiURL + '/UC/Lrg/PointersItem/' + id;
  $.ajax({
    type: method,
    url: url,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        getPointers();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', getLabel(response.message));
      }
    }
  });
}

function editPointerType(id) {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/PointersType/' + id,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        pointerTypeId = response.data.Obj.id;
        $('#fld-PointersType-typeId').val(response.data.Obj.typeId);
        $('#fld-PointersType-weight').val(response.data.Obj.weight);
        $('#fld-PointersType-rem').val(response.data.Obj.rem);
        $('#pointerType-Modal').modal('show');
      }
    },
    error: function (response) {
    }
  });
}

function editPointerTable(id) {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/PointersTable/' + id,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        pointerTableId = response.data.Obj.id;
        pointerTypeId = response.data.Obj.typId;
        $('#fld-PointersTable-tableId').val(response.data.Obj.tableId);
        $('#fld-PointersTable-statusId').val(response.data.Obj.statusId);
        $('#fld-PointersTable-weight').val(response.data.Obj.weight);
        $('#fld-PointersTable-rem').val(response.data.Obj.rem);
        $('#pointerTable-Modal').modal('show');
      }
    },
    error: function (response) {
    }
  });
}

function editPointerItem(id) {
  $.ajax({
    type: 'GET',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/PointersItem/' + id,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status && response.code === 200) {
        pointerItemId = response.data.Obj.id;
        pointerTableId = response.data.Obj.tblId;
        $('#fld-PointersItem-itemId').val(response.data.Obj.itemId);
        $('#fld-PointersItem-fdate').val(response.data.Obj.fdate);
        $('#fld-PointersItem-tdate').val(response.data.Obj.tdate);
        $('#fld-PointersItem-nfvalue').val(response.data.Obj.nfvalue);
        $('#fld-PointersItem-ntvalue').val(response.data.Obj.ntvalue);
        $('#fld-PointersItem-vfvalue').val(response.data.Obj.vfvalue);
        $('#fld-PointersItem-weight').val(response.data.Obj.weight);
        $('#fld-PointersItem-rem').val(response.data.Obj.rem);
        $('#pointerItem-Modal').modal('show');
      }
    },
    error: function (response) {
    }
  });
}
