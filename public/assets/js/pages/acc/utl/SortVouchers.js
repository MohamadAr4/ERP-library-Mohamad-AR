jQuery(document).ready(function () {
  $('#ph-execute').click(function () {
    swal.fire({
      title: getLabel('This process cannot be undone Do you want to continue') + ' !!',
      text: getLabel('Are.You.Sure.?'),
      icon: "warning",
      async: true,
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
        sortVouchers();
      } else if (result.dismiss === "cancel" || result.dismiss === "backdrop") {
      }
    });
  });
  $('#fldDate').val(currentDate());
  showHeaderSpinner(false);
});

function sortVouchers() {
  let oQData = {};
  oQData.fieldName = 'sdate';
  oQData.dataType = '3';
  oQData.operation = '<';
  oQData.value1 = $('#fldDate').val();
  oQData.value2 = '';
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/Acc/SortVouchers',
    headers: PhSettings.Headers,
    data: JSON.stringify(oQData),
    success: function (response) {
      if (response.status) {
        let message = '<h4 class="text-center text-danger">' + getLabel(response.data.report.count) + ' ' + response.data.report.message + '</h4>';
        $('#SortVouchers').html(message);
      }
    }, error: function (response) {
      let message = '<h4 class="text-center text-danger">' + getLabel(response.data.report.message) + '</h4>';
      $('#SortVouchers').html(message);
    }
  });
  showHeaderSpinner(false);
}