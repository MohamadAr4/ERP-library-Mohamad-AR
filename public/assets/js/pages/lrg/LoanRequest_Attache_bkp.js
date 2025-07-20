/* global swal */

let oBlocks = {
  "MainBlock": {
    "Name": "Borrowers",
    "URL": {
      "New": {"Method": "Post", "URL": ""},
      "Update": {"Method": "Put", "URL": ""},
      "Delete": {"Method": "Delete", "URL": ""},
      "Get": {"Method": "Get", "URL": ""},
      "List": {"Method": "Post", "URL": ""},
      "Search": {"Method": "Post", "URL": ""}
    },
    "Fields": [
      {
        "Field": "id",
        "Default": "",
        "Required": true
      }, {
        "Field": "num",
        "Default": "1",
        "Required": true
      }, {
        "Field": "name",
        "Default": "",
        "Required": true
      }, {
        "Field": "statusId",
        "Default": "0",
        "Required": true
      }, {
        "Field": "address",
        "Default": "",
        "Required": true
      }, {
        "Field": "rem",
        "Default": "1",
        "Required": true
      }
    ]
  },
  "Childs": [
    {
      "Name": "Contacts",
      "URL": {
        "New": {"Method": "", "URL": ""},
        "Update": {"Method": "", "URL": ""},
        "Delete": {"Method": "", "URL": ""},
        "Get": {"Method": "", "URL": ""},
        "List": {"Method": "", "URL": ""},
        "Search": {"Method": "", "URL": ""}
      },
      "RelationType": 0, /* 0 One2Many, 1 One2One */
      "ParentId": "borrowerId",
      "Fields": [
        {
          "Field": "id",
          "Default": "",
          "Required": true
        }, {
          "Field": "borrowerId",
          "Default": "",
          "Required": true
        }, {
          "Field": "positionId",
          "Default": "0",
          "Required": true
        }
      ]
    },
    {
      "Name": "Partners",
      "URL": {
        "New": {"Method": "", "URL": ""},
        "Update": {"Method": "", "URL": ""},
        "Delete": {"Method": "", "URL": ""},
        "Get": {"Method": "", "URL": ""},
        "List": {"Method": "", "URL": ""},
        "Search": {"Method": "", "URL": ""}
      },
      "RelationType": 0, /* 0 One2Many, 1 One2One */
      "ParentId": "borrowerId",
      "Fields": [
        {
          "Field": "id",
          "Default": "",
          "Required": true
        }, {
          "Field": "num",
          "Default": "1",
          "Required": true
        }, {
          "Field": "name",
          "Default": "",
          "Required": true
        }, {
          "Field": "statusId",
          "Default": "0",
          "Required": true
        }, {
          "Field": "address",
          "Default": "",
          "Required": true
        }, {
          "Field": "rem",
          "Default": "1",
          "Required": true
        }
      ]
    }
  ]
};
jQuery(document).ready(function () {

  $('.card-collapses').click(function () {
    if ($("#" + $(this).data('icon')).hasClass("bi-chevron-up")) {
      $("#" + $(this).data('icon')).removeClass("bi-chevron-up");
      $("#" + $(this).data('icon')).addClass("bi-chevron-down");
    } else {
      $("#" + $(this).data('icon')).removeClass("bi-chevron-down");
      $("#" + $(this).data('icon')).addClass("bi-chevron-up");
    }
    $('#' + $(this).data('section')).animate({
      height: 'toggle'
    });
  });

  $('#ph-submit').click(function (e) {
    e.preventDefault();
    $(".child").removeClass('d-none');
  });

  $('#ph-new').click(function (e) {
    e.preventDefault();
  });

  showHeaderSpinner(false);
  $('.card-toggle').animate({
    height: 'toggle'
  });

  $('.card-toolbar-new').off('click').on('click', function (e) {
    e.preventDefault();
    let blockName = $(this).data('block');
    let aBlock = oBlocks.Childs.filter(function (el) {
      return el.Name === blockName;
    });
    let oBlock = aBlock[0];
    formNew(oBlock);
  });

  $('.card-toolbar-save').off('click').on('click', function (e) {
    e.preventDefault();
    let blockName = $(this).data('block');
    let aBlock = oBlocks.Childs.filter(function (el) {
      return el.Name === blockName;
    });
    let oBlock = aBlock[0];
    formSave(oBlock);
  });

  $('.card-toolbar-delete').off('click').on('click', function (e) {
    e.preventDefault();
    let blockName = $(this).data('block');
    let aBlock = oBlocks.Childs.filter(function (el) {
      return el.Name === blockName;
    });
    let oBlock = aBlock[0];
    formDelete(oBlock);
  });

  $('.card-toolbar-attached').off('click').on('click', function (e) {
    e.preventDefault();
    let blockName = $(this).data('block');
    let aBlock = oBlocks.Childs.filter(function (el) {
      return el.Name === blockName;
    });
    let oBlock = aBlock[0];
    formAttache(oBlock);
  });

});

function isNewRecord(blockName) {
  return (parseInt($('#fld-' + blockName + '-id').val()) > 0);
}

function formSave(oBlock) {
  if (isValidForm(oBlock.Name + "-Form")) {
    let aData = {};
    oBlock.Fields.forEach((fld) => {
      aData[fld.Field] = $('#fld-' + oBlock.Name + '-' + fld.Field).val();
    });
    let urlMethod = oBlock.URL.New.Method;
    let urlURL = oBlock.URL.New.URL;
    let vSuccessMessage = 'Added.Successfully';
    let vFailedMessage = 'Failed.To.Add';
    if (isNewRecord(oBlock.Name)) {
      urlMethod = oBlock.URL.Update.Method;
      urlURL = oBlock.URL.Update.URL;
      vSuccessMessage = 'Updated.Successfully';
      vFailedMessage = 'Failed.To.Update';
    }
    $.ajax({
      type: urlMethod,
      async: false,
      url: PhSettings.apiURL + urlURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      },
      data: JSON.stringify(aData),
      success: function (response) {
        if (response.status && response.code === 200) {
          if (isNewRecord(oBlock.Name)) {
            formGet(oBlock, response.data.InsertedId);
          }
          showToast(getLabel(vSuccessMessage), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel(vFailedMessage), 'DANGER', prepareErrorMessage(response.message));
        }
      },
      error: function (response) {
      }
    });
  }
}

function formGet(oBlock, nId) {
  let urlMethod = oBlock.URL.Get.Method;
  let urlURL = oBlock.URL.Get.URL + "/" + nId;
  let vFailedMessage = 'Failed.To.Get';
  $.ajax({
    type: urlMethod,
    async: false,
    url: PhSettings.apiURL + urlURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    success: function (response) {
      if (response.status && response.code === 200) {
        if (isNewRecord(oBlock.Name)) {
          $('#fld-' + oBlock.Name + '-id').val(response.data.Obj);
          oBlock.Fields.forEach((fld) => {
            if (response.data.Obj.hasOwnProperty(fld.Field)) {
              $('#fld-' + oBlock.Name + '-' + fld.Field).val(response.data.Obj[fld.Field]);
            }
          });
        }
      } else {
        showToast(getLabel(vFailedMessage), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
      showToast(getLabel(vFailedMessage), 'DANGER', prepareErrorMessage(response.message));
    }
  });
}

function formNew(oBlock) {
  swal.fire({
    title: getLabel('The.Form.Will.be.Clear') + ' !!',
    text: getLabel('Are.You.Sure.?'),
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "<i class='flaticon2-check-mark'></i> " + getLabel('Yes'),
    cancelButtonText: "<i class='flaticon2-cross'></i> " + getLabel('No'),
    reverseButtons: true,
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-default"
    }
  }).then(function (result) {
    if (result.value) {
      doNew(oBlock);
    } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
    }
  });
}
function doNew(oBlock) {
  $('#' + oBlock.Name + "-Form")[0].reset();
  oBlock.Fields.forEach((fld) => {
    $('#fld-' + oBlock.Name + '-' + fld.Field).val(fld.defValue);
  });

}
function formDelete(oBlock) {
  swal.fire({
    title: getLabel('Delete.!!'),
    text: getLabel('Are.you.sure.?'),
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "<i class='flaticon2-check-mark'></i> " + getLabel('Yes'),
    cancelButtonText: "<i class='flaticon2-cross'></i> " + getLabel('No'),
    reverseButtons: true,
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-default"
    }
  }).then(function (result) {
    if (result.value) {
      let urlMethod = oBlock.URL.Delete.Method;
      let urlURL = oBlock.URL.Delete.URL + "/" + $('#fld-' + oBlock.Name + '-id').val();
      let vSuccessMessage = 'Deleted.Successfully';
      let vFailedMessage = 'Failed.To.Delete';
      $.ajax({
        type: urlMethod,
        url: urlURL,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': PhSettings.Headers.Authorization,
          'periodId': PhSettings.Period.Id,
          'gId': PhSettings.GUId.GId,
          'vLang': PhSettings.display.vLang
        },
        success: function (response) {
          if (response.status) {
            showToast(getLabel(vSuccessMessage), 'SUCCESS', getLabel(response.message));
            doNew(oBlock);
          } else {
            showToast(getLabel(vFailedMessage), 'DANGER', prepareErrorMessage(response.message));
          }
        },
        error: function (response) {
          showToast(getLabel(vFailedMessage), 'DANGER', prepareErrorMessage(response.message));
        }
      });
    } else if (result.dismiss === "cancel") {
    }
  });
}

function formAttache(oBlock) {

}

/****************************************************************************/
function renderAttacheModal(oBlock) {
  let vHtml = '';
  vHtml += '<div class="modal fade" id="' + oBlock.Name + 'AttacheModal" aria-labelledby="' + oBlock.Name + 'AttacheModalLabel" aria-hidden="true">';
  vHtml += '  <div class="modal-dialog modal-dialog-centered modal-lg">';
  vHtml += '    <div class="modal-content">';
  vHtml += '      <div class="modal-header">';
  vHtml += '        <h1 class="modal-title fs-5" id="attacheModalLabel">' + getLabel("Attachments") + '</h1>';
  vHtml += '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + getLabel("Close") + '"></button>';
  vHtml += '      </div>';
  vHtml += '      <div class="modal-body">';
  vHtml += '        <form id="' + oBlock.Name + 'AttacheForm">';
  vHtml += '          <div class="row d-flex align-items-center">';
  vHtml += '            <div class="col-sm-4">';
  vHtml += '              <input id="fld' + oBlock.Name + 'File" class="form-control form-control-sm" type="file">';
  vHtml += '              <input id="fld' + oBlock.Name + 'AttacheFile" type="hidden" value="">';
  vHtml += '              <input id="fld' + oBlock.Name + 'ONameFile" type="hidden" value="">';
  vHtml += '            </div>';
  vHtml += '            <label for="fld' + oBlock.Name + 'NNameFile" class="col-sm-1 form-label ph-label text-start text-sm-end" data-label="Name">' + getLabel("Name") + '</label>';
  vHtml += '            <div class="col-sm-6">';
  vHtml += '              <input id="fld' + oBlock.Name + 'NNameFile" class="form-control form-control-sm" type="text">';
  vHtml += '            </div>';
  vHtml += '            <div class="col-sm-1">';
  vHtml += '              <button id="fld' + oBlock.Name + 'UploadFile" class="btn btn-success toolbar-btn mx-1" type="button" data-bs-title="Upload" title="' + getLabel('Upload') + '">';
  vHtml += '                <i class="bi bi-upload"></i>';
  vHtml += '              </button>';
  vHtml += '            </div>';
  vHtml += '          </div>';
  vHtml += '        </form>';
  vHtml += '        <div id="' + oBlock.Name + 'AttacheTable" class="row d-flex align-items-center">';
  vHtml += '        </div>';
  vHtml += '      </div>';
  vHtml += '    </div>';
  vHtml += '  </div>';
  vHtml += '</div>';
  $("section").append(vHtml);
  $('#' + phF.options.btns.attache).click(function (e) {
    e.preventDefault();
    phF.getSearchAttache();
  });
  $('#fld' + oBlock.Name + 'UploadFile').click(function (e) {
    e.preventDefault();
    phF.doSaveAttache();
  });
  $('#fld' + oBlock.Name + 'File').change(function (e) {
    e.preventDefault();
    phF.getAttache(e);
  });
}

function getQueryDataAttache(oBlock) {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'rid';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = parseInt($('#fldId').val());
  aQData[nIdx].value2 = '';
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'MPrgId';
  aQData[nIdx].dataType = PhFC_Number;
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = PhSettings.MPrg.id;
  aQData[nIdx].value2 = '';
  return aQData;
}

function getSearchAttache(oBlock) {
  let method = phF.aURL.Search.Method;
  let url = PhSettings.apiURL + '/UC/Cpy/AttachedFiles/Search/0/0';
  showHeaderSpinner(true);
  $.ajax({
    type: method,
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(phF.getQueryDataAttache()),
    success: function (response) {
      showHeaderSpinner(false);
      if (response.status) {
        phF.aAttachData = response.data.List;
        phF.renderAttachTable();
      } else {
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
  $('#' + oBlock.Name + 'AttacheModal').modal('show');
  $('#fld' + oBlock.Name + 'File').removeClass('invalid');
  $('#fld' + oBlock.Name + 'NNameFile').removeClass('invalid');
}

function renderAttachTable(oBlock) {
  let vHtml = '';
  vHtml += '<table class="table table-bordered table-striped table-details mt-2">';
  vHtml += '  <thead>';
  vHtml += '    <tr>';
  vHtml += '      <td style="width: 5%;"></td>';
  vHtml += '      <td style="width: 5%;">#</td>';
  vHtml += '      <td style="width: 5%;"></td>';
  vHtml += '      <td>' + getLabel('Basic.Name') + '</td>';
  vHtml += '      <td>' + getLabel('Name') + '</td>';
  vHtml += '    </tr>';
  vHtml += '  </thead>';
  vHtml += '  <tbody>';
  if (phF.aAttachData !== undefined && phF.aAttachData.length > 0) {
    for (let i = 0; i < phF.aAttachData.length; i++) {
      vHtml += '  <tr>';
      vHtml += '    <td>';
      vHtml += '      <a class="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">';
      vHtml += '        <i class="bi bi-three-dots-vertical nav-item"></i>';
      vHtml += '      </a>';
      vHtml += '      <ul class="dropdown-menu">';
      vHtml += '        <li id="fileAttach0">';
      vHtml += '          <a class="dropdown-item download-item" href="javascript:;" data-index="' + i + '">' + getLabel('Download') + '</a>';
      vHtml += '        </li>';
      vHtml += '        <li>';
      vHtml += '          <a class="dropdown-item delete-item" href="javascript:;" data-index="' + i + '">' + getLabel('Delete') + '</a>';
      vHtml += '        </li>';
      vHtml += '      </ul>';
      vHtml += '    </td>';
      vHtml += '    <td>' + parseInt(i + 1) + '</td>';
      vHtml += '    <td> <i class="' + returnIconFile(phF.aAttachData[i].ext) + ' fs-5"></i> </td>';
      vHtml += '    <td>' + phF.aAttachData[i].oname + '</td>';
      vHtml += '    <td>' + phF.aAttachData[i].name + '.' + phF.aAttachData[i].ext + '</td>';
      vHtml += '  </tr>';
    }
  }
  vHtml += '  </tbody>';
  vHtml += '</table>';
  $('#' + oBlock.Name + 'AttacheTable').html(vHtml);
  $('.download-item').click(function (e) {
    e.preventDefault();
    let index = $(this).data('index');
    phF.doDownloadAttache(index);
  });
  $('.delete-item').click(function (e) {
    e.preventDefault();
    let index = $(this).data('index');
    phF.doDeleteAttache(index);
  });
}

function getAttache(e) {
  phF.base64Encoder(e.target.files[0]);
  $('#fld' + oBlock.Name + 'ONameFile').val(e.target.files[0].name);
}

function base64Encoder(blob) {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    $('#fld' + oBlock.Name + 'AttacheFile').val(reader.result);
  };
}

function openNewAttacheModal(oBlock) {
  $('#fld' + oBlock.Name + 'AttacheFile').val('');
  $('#fld' + oBlock.Name + 'ONameFile').val('');
  $('#' + oBlock.Name + 'AttacheForm')[0].reset();
  $('#fld' + oBlock.Name + 'File').removeClass('invalid');
  $('#fld' + oBlock.Name + 'NNameFile').removeClass('invalid');
  phF.getSearchAttache();
}

function doSaveAttache(oBlock) {
  if ($('#fld' + oBlock.Name + 'NNameFile').val().trim() !== ''
    && $('#fld' + oBlock.Name + 'AttacheFile').val() !== '') {
    $('#fld' + oBlock.Name + 'File').removeClass('invalid');
    $('#fld' + oBlock.Name + 'NNameFile').removeClass('invalid');
    showHeaderSpinner(true);
    $.ajax({
      type: 'POST',
      async: false,
      url: PhSettings.apiURL + '/CC/attached/new',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': PhSettings.Headers.Authorization,
        'periodId': PhSettings.Period.Id,
        'gId': PhSettings.GUId.GId,
        'vLang': PhSettings.display.vLang
      },
      data: JSON.stringify({
        rid: $('#fldId').val(),
        file: $('#fld' + oBlock.Name + 'AttacheFile').val(),
        oldName: $('#fld' + oBlock.Name + 'ONameFile').val(),
        newName: $('#fld' + oBlock.Name + 'NNameFile').val(),
        MPrg: PhSettings.MPrg
      }),
      success: function (response) {
        showHeaderSpinner(false);
        if (response.status) {
          phF.openNewAttacheModal();
          showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
        }
      },
      error: function (response) {
        showHeaderSpinner(false);
      }
    });
  } else {
    $('#fld' + oBlock.Name + 'File').addClass('invalid');
    $('#fld' + oBlock.Name + 'NNameFile').addClass('invalid');
  }
}

function doDownloadAttache(index) {
  showHeaderSpinner(true);
  $.ajax({
    type: 'Get',
    async: false,
    url: PhSettings.apiURL + '/CC/attached/' + phF.aAttachData[index].id,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    success: function (response) {
      if (response.status) {
        downloadFile(response.data.vFile, response.data.ftype, response.data.name + '.' + response.data.ext);
      } else {
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
  showHeaderSpinner(false);
}

function doDeleteAttache(index) {
  showHeaderSpinner(true);
  $.ajax({
    type: 'DELETE',
    async: false,
    url: PhSettings.apiURL + '/CC/attached/' + phF.aAttachData[index].id,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
        phF.openNewAttacheModal();
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', prepareErrorMessage(response.message));
      }
    },
    error: function (response) {
      showHeaderSpinner(false);
    }
  });
  showHeaderSpinner(false);
}
/****************************************************************************/
