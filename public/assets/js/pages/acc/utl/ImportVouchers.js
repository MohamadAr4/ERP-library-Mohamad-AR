let aSystem = PhSettings.PhsCodes.PhsSystem;
let aTrn = [
  {id: 0, name: 'حسب نوع الحركة وتاريخها'},
  {id: 1, name: 'حسب التاريخ'},
  {id: 2, name: 'حسب النوع'},
  {id: 3, name: getLabel('Depreciation')}];
jQuery(document).ready(function () {
  $('#ph-execute').click(function () {
    importVouchers();
  });
  $('#fldSystemId').click(function () {
    changeName();
  });
  opennew();
});

function changeName() {
  if ($('#fldSystemId').val() == SystemFIX) {
    aTrn[3].name = getLabel('Depreciation');
  } else {
    aTrn[3].name = getLabel('All');
  }
  renderTrnSelect();
}

function renderTrnSelect() {
  let vHtml = '';
  for (let i = 0; i < aTrn.length; i++) {
    vHtml += '<option value="' + aTrn[i].id + '">' + getLabel(aTrn[i].name) + ' </option>';
  }
  $('#fldTrnId').html(vHtml);
}

function opennew() {
  let vHtml = '';
  for (let i = 0; i < aSystem.length; i++) {
    if (aSystem[i].id != 1100) {
      vHtml += '<option value="' + aSystem[i].id + '">' + getLabel(aSystem[i].name) + ' </option>';
    }
  }
  $('#fldSystemId').html(vHtml);
  $('#fldSDate').val(currentDate());
  $('#fldEDate').val(currentDate());
  renderTrnSelect();
  showHeaderSpinner(false);
}

function getData() {
  let aData = {};
  aData.systemId = $('#fldSystemId').val();
  aData.sdate = $('#fldSDate').val();
  aData.edate = $('#fldEDate').val();
  aData.trnId = $('#fldTrnId').val();
  aData.rem = $('#fldRem').val();
  return aData;
}

function importVouchers() {
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/Acc/GetVouchers',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(getData()),
    success: function (response) {
      $('#message').removeClass('d-none');
      if (response.status) {
        let message = '<h4 class="text-center text-danger">' + getLabel(response.message) + '</h4>';
        $('#ImportVouchers').html(message);
      }
    }, error: function (response) {
      let message = '<h4 class="text-center text-danger">' + getLabel(response.message) + '</h4>';
      $('#ImportVouchers').html(message);
    }
  });
  showHeaderSpinner(false);
}
