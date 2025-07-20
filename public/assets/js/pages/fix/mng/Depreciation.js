jQuery(document).ready(function () {
  $('#ph-execute').click(function () {
    swal.fire({
      title: getLabel('The Depreciation will be Calculated') + ' !!',
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
        calcDepreciation();
      } else if (result.dismiss === "cancel") {
      }
    });
  });
  defaultDate();
  showHeaderSpinner(false);
});

function defaultDate() {
  let month = currentDate();
  $('#fldYear').val(PhSettings.Period.SDate.slice(6, 10));
  $('#fldMonth').val(month.slice(3, 5));
}

function calcDepreciation() {
  let year = $('#fldYear').val();
  let month = $('#fldMonth').val();
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/Fix/CalculateDepreciation/' + year + '/' + month,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        let message = '<h4 class="text-center text-danger pt-4">' + getLabel(response.data.report.message) + '</h4>';
        $('#Depreciation').html(message);
        if (response.data.report.result == 1) {
          $.redirect("/app/fix/qry/Depreciation", {'nYear': year, 'nMonth': month}, 'POST', '_BLANK');
        }
      }
    }, error: function (response) {
//      let message = '<h4 class="text-center text-danger pt-4">' + getLabel(response.data.report.message) + '</h4>';
//      $('#Depreciation').html(message);
    }
  });
  showHeaderSpinner(false);
}
