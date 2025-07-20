let aData = [];
jQuery(document).ready(function () {
  $('#ph-refresh-execute').click(function () {
    getQuery();
  });
  getQuery();
  showHeaderSpinner(false);
});

function getQuery() {
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/Acc/MissingVoucherNumber',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      showHeaderSpinner(false);
      if (response.status && response.data.report.rows.length > 0) {
        aData = response.data.report;
        renderData();
      } else {
        let queryAlert = '<h4 class="text-center text-danger">' + getLabel('There.are.no.Missing.Voucher.Numbers') + '</h4>';
        $('#MissingVoucher').html(queryAlert);
      }
    }, error: function (response) {
      showHeaderSpinner(false);
      let queryAlert = '<h4 class="text-center text-danger">' + getLabel('There.are.no.results.matching.search.options') + '</h4>';
      $('#MissingVoucher').html(queryAlert);
    }
  });
}

function  getTableStyle(obj) {
  let vStyle = '';
  if (obj !== undefined) {
    Object.keys(obj).forEach(key => {
      vStyle += key + ':' + obj[key] + ' !important;';
    });
  }
  return vStyle;
}

function renderData() {
  let vHtml = '';
  vHtml += '<div class="row d-flex justify-content-center">';
  vHtml += '  <div class="col-sm-3" style="display:inline-block !important; overflow:auto !important; height: 65vh !important;">';
  vHtml += '    <table class="table table-bordered table-striped table-bordered">';
  vHtml += '      <thead style="' + getTableStyle(aData.header.style) + '">';
  vHtml += '        <tr>';
  for (let i = 0; i < aData.header.length; i++) {
    for (let j = 0; j < aData.header[i].cells.length; j++) {
      vHtml += '      <td style="' + getTableStyle(aData.header[i].cells[j].style) + '">' + getLabel(aData.header[i].cells[j].name) + '</td>';
    }
  }
  vHtml += '        </tr>';
  vHtml += '      </thead>';
  vHtml += '      <tbody>';
  for (let i = 0; i < aData.rows.length; i++) {
    vHtml += '      <tr style="' + getTableStyle(aData.rows[i].style) + '">';
    for (let j = 0; j < aData.rows[i].cells.length; j++) {
      vHtml += '      <td style="' + getTableStyle(aData.rows[i].cells[j].style) + '"> ' + aData.rows[i].cells[j].value + '</td>';
    }
    vHtml += '      </tr>';
  }
  vHtml += '      </tbody>';
  vHtml += '    </table>';
  vHtml += '  </div>';
  vHtml += '  <div class="col-sm-4">';
  vHtml += '    <table class="table table-bordered table-bordered">';
  vHtml += '      <tbody>';
  vHtml += '        <tr>';
  vHtml += '          <td>' + getLabel('smallest.Number') + '</td>';
  vHtml += '          <td>' + aData.smallestNumber + '</td>';
  vHtml += '        </tr>';
  vHtml += '        <tr>';
  vHtml += '          <td>' + getLabel('total.Number') + '</td>';
  vHtml += '          <td>' + aData.totalNumber + '</td>';
  vHtml += '        </tr>';
  vHtml += '        <tr>';
  vHtml += '          <td>' + getLabel('largest.Number') + '</td>';
  vHtml += '          <td>' + aData.largestNumber + '</td>';
  vHtml += '        </tr>';
  vHtml += '      </tbody>';
  vHtml += '    </table>';
  vHtml += '  </div>';
  vHtml += '</div>';
  $('#MissingVoucher').html(vHtml);
}