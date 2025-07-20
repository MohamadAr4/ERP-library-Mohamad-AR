let curDate = currentDate();
let aDoc = PhSettings.UsrCodes.LrgCodeFollowDoc,
        aPeriod = PhSettings.UsrCodes.LrgCodePeriodicDoc,
        aData = [];
jQuery(document).ready(function () {
  $('#ph-execute').click(function () {
    doSearch();
  });
  $("#ph-new").click(function (e) {
    e.preventDefault();
    openNew();
  });
  $('#fldNFileName').change(function (e) {
    getAttache(e);
  });
  $('#ph-modal-submit').click(function () {
    save();
  });
  renderSelect();
});

function renderSelect() {
  $('#qfldDocId').append('<option value=""></option>');
  $.each(aDoc, function (i, Doc) {
    $('#qfldDocId').append($('<option>', {
      value: Doc.id,
      text: Doc.name
    }));
    $('#fldDocId').append($('<option>', {
      value: Doc.id,
      text: Doc.name
    }));
  });
  $('#qfldPeriodId').append('<option value=""></option>');
  $.each(aPeriod, function (i, Period) {
    $('#qfldPeriodId').append($('<option>', {
      value: Period.id,
      text: Period.name
    }));
    $('#fldPeriodId').append($('<option>', {
      value: Period.id,
      text: Period.name
    }));
  });
}

function openNew() {
  $('#fldId').val(0);
  $('#fldAttacheFile').val('');
  $('#fldName').val('');
  $('#fldDocId').val($('#fldDocId :first').val());
  $('#fldNFileName').val('');
  $('#fldNYear').val(curDate.slice(6, 10));
  $('#fldOFileName').val('');
  $('#fldDdate').val(currentDate());
  $('#fldPeriodId').val($('#fldPeriodId :first').val());
  $('#fldRem').val('');
  $('.was-validated').removeClass('was-validated');
  $('.invalid').removeClass('invalid');
  $('#groupModal').modal('show');
}

function  getAttache(e) {
  base64Encoder(e.target.files[0]);
  $('#fldOFileName').val(e.target.files[0].name);
}

function base64Encoder(blob) {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    $('#fldAttacheFile').val(reader.result);
  };
}

function save() {
  let oData = {};
  oData.id = $('#fldId').val();
  oData.newName = $('#fldName').val();
  oData.docId = $('#fldDocId').val();
  oData.nyear = $('#fldNYear').val();
  oData.file = $('#fldAttacheFile').val();
  oData.oldName = $('#fldOFileName').val();
  oData.ddate = $('#fldDdate').val();
  oData.periodId = $('#fldPeriodId').val();
  oData.rem = $('#fldRem').val();
  if (isValidForm('groupModalForm')) {
    $.ajax({
      type: 'POST',
      url: PhSettings.apiURL + '/UC/Lrg/PeriodicDocument/New',
      async: false,
      headers: PhSettings.Headers,
      data: JSON.stringify(oData),
      success: function (response) {
        if (response.status && response.code === 200) {
          $('#groupModal').modal('hide');
          showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel(response.message));
        } else {
          showToast(getLabel('Failed.To.Add'), 'DANGER', prepareErrorMessage(response.message));
        }
      },
      error: function (response)
      {
      }
    });
  }
}

function getQueryData() {
  let aQData = [];
  let nIdx = 0;
  if ($('#qfldName').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'name';
    aQData[nIdx].dataType = PhFC_Number;
    aQData[nIdx].operation = $('#Name').val();
    aQData[nIdx].value1 = $('#qfldName').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#qfldDocId').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'docId';
    aQData[nIdx].dataType = PhFC_Select;
    aQData[nIdx].operation = $('#DocId').val();
    aQData[nIdx].value1 = $('#qfldDocId').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#qfldNYear').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'nyear';
    aQData[nIdx].dataType = PhFC_Number;
    aQData[nIdx].operation = $('#NYear').val();
    aQData[nIdx].value1 = $('#qfldNYear').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#qfldOFileName').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'ofilename';
    aQData[nIdx].dataType = PhFC_Number;
    aQData[nIdx].operation = $('#OFileName').val();
    aQData[nIdx].value1 = $('#qfldOFileName').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#qfldDdate').val() !== '') {
    aQData[++nIdx] = {};
    aQData[nIdx].fieldName = 'ddate';
    aQData[nIdx].dataType = PhFC_DatePicker;
    aQData[nIdx].operation = $('#Ddate').val();
    aQData[nIdx].value1 = $('#qfldDdate').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#qfldPeriodId').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'periodId';
    aQData[nIdx].dataType = PhFC_Select;
    aQData[nIdx].operation = $('#PeriodId').val();
    aQData[nIdx].value1 = $('#qfldPeriodId').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  if ($('#qfldRem').val() !== '') {
    aQData[nIdx] = {};
    aQData[nIdx].fieldName = 'rem';
    aQData[nIdx].dataType = PhFC_Number;
    aQData[nIdx].operation = $('#Rem').val();
    aQData[nIdx].value1 = $('#qfldRem').val();
    aQData[nIdx].value2 = '';
    nIdx++;
  }
  return aQData;
}

function doSearch() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/PeriodicDocument/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(getQueryData()),
    success: function (response) {
      aData = response.data.List;
      renderTable();
    }
  });
}

function renderTable() {
  let vHtml = '';
  for (let index = 0; index < aData.length; index++) {
    vHtml += '<tr>';
    vHtml += '  <td>';
    vHtml += '      <a class="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">';
    vHtml += '        <i class="bi bi-three-dots-vertical nav-item"></i>';
    vHtml += '      </a>';
    vHtml += '      <ul class="dropdown-menu">';
    vHtml += '        <li id="fileAttach0">';
    vHtml += '          <a class="dropdown-item download-item" href="javascript:;" data-index="' + index + '">' + getLabel('Download') + '</a>';
    vHtml += '        </li>';
    vHtml += '        <li>';
    vHtml += '          <a class="dropdown-item delete-item" href="javascript:;" data-index="' + index + '" data-id="' + aData[index].id + '">' + getLabel('Delete') + '</a>';
    vHtml += '        </li>';
    vHtml += '      </ul>';
    vHtml += '    </td>';
    vHtml += '  <td>' + parseInt(index + 1) + '</td>';
    vHtml += '  <td>' + aData[index].name + '</td>';
    vHtml += '  <td>' + aData[index].ddate + '</td>';
    vHtml += '  <td>' + aData[index].ofilename + '</td>';
    vHtml += '  <td>' + aData[index].docName + '</td>';
    vHtml += '  <td>' + aData[index].nyear + '</td>';
    vHtml += '  <td>' + aData[index].periodName + '</td>';
    vHtml += '  <td>' + ((aData[index].rem === null || aData[index].rem === 'null') ? '' : aData[index].rem) + '</td>';
    vHtml += '</tr>';
  }
  $("#tableData tbody").html(vHtml);
  $('.delete-item').click(function () {
    swal.fire({
      title: getLabel('Delete.!!'),
      text: getLabel('Are.you.sure.?'),
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
        doDelete($(this).data('id'));
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
}

function doDelete(id) {
  $.ajax({
    type: 'DELETE',
    async: false,
    url: PhSettings.apiURL + '/CC/LRG/attachedPeriodic/' + id,
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        showToast(getLabel('Deleted.Successfully'), 'SUCCESS', getLabel(response.message));
      } else {
        showToast(getLabel('Failed.To.Delete'), 'DANGER', getLabel(response.message));
      }
    },
    error: function (response) {
    }
  });
}