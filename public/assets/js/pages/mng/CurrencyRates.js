let aData = [];
let oEData = [];
let bFlg = true;

jQuery(document).ready(function () {
  getBodyList();
  $("#ph-submit").click(function (e) {
    e.preventDefault();
    if ($('#fldDate').val() !== '')
    {
      $('#fldDate').removeClass('invalid');
      saveMulti();
    } else {
      $('#fldDate').addClass('invalid');
    }
  });
});

function saveMulti() {
  if (bFlg) {
    for (let i = 1; i < aData.length; i++) {
      if ($('#fldRate' + i).val() !== '') {
        oEData[i] = {};
        oEData[i].hdate = $('#fldDate').val();
        oEData[i].curnId = aData[i].id;
        oEData[i].rate = $('#fldRate' + i).val();
        oEData[i].nmin = $('#fldRate' + i).val();
        oEData[i].nmax = $('#fldRate' + i).val();
        oEData[i].rem = '';
        save(i);
      }
    }
    showToast(getLabel('Added.Successfully'), 'SUCCESS', getLabel('Success'));
  }
  getBodyList();
}

function renderBody() {
  let vHtml = '';
  for (let i = 0; i < aData.length; i++) {
    if (aData[i].id > 1) {
      vHtml += '<tr>';
      vHtml += '  <td>' + aData[i].code + '</td>';
      vHtml += '  <td>' + aData[i].rate + '</td>';
      vHtml += '  <td style="width:25%;"><input id="fldRate' + i + '" class="form-control form-control-sm phNumberMask" type="text" data-decimal="2" value="" autocomplete="off"></td>';
      vHtml += '  <td>' + aData[i].hdate + '</td>';
      vHtml += '</tr>';
    }
  }
  $("#tableData tbody").html(vHtml);
  initNumberMasks();
}

function getBodyList() {
  let method = 'POST';
  let url = PhSettings.apiURL + '/UC/Mng/Currency/List';
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
    success: function (response) {
      let j = 0;
      for (var i = 0; i < response.data.List.length; i++) {
        if (response.data.List[i].statusId === '1') {
          aData[j] = response.data.List[i];
          j++;
        }
      }
      renderBody();
    }
  });
}

function save(i) {
  let method = 'POST';
  let url = PhSettings.apiURL + '/UC/Mng/CurrencyHistory/New';
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
    data: JSON.stringify(oEData[i]),
    success: function (response) {
      if (response.status) {
        bFlg = true;
      } else {
        bFlg = false;
        showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel(response.message));
      }
    },
    error: function (response) {
    }
  });
}
