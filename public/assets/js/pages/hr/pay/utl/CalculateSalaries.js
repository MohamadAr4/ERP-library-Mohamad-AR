let aStatus = PhSettings.PhsCodes.PhsYesno;
jQuery(document).ready(function () {
  $('#ph-execute').click(function () {
    calculateSalaries();
  });
  $('#ph-commit').click(function () {
    commitSalaries();
  });
  defaultDate();
  showHeaderSpinner(false);
});

function defaultDate() {
  let month = currentDate();
  $('#fldNyear').val(PhSettings.Period.SDate.slice(6, 10));
  $('#fldNmonth').val(month.slice(3, 5));
}

function calculateSalaries() {
  let year = $('#fldNyear').val();
  let month = $('#fldNmonth').val();
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + "/CC/HR/CalculateSalaries/" + year + '/' + month,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        let message = '<h4 class="text-center text-danger pt-3">' + getLabel(response.message) + '</h4>';
        $('#CalculateSalaries').html(message);
      }
    }, error: function (response) {
      let message = '<h4 class="text-center text-danger pt-3">' + getLabel(response.message) + '</h4>';
      $('#CalculateSalaries').html(message);
    }
  });
  showHeaderSpinner(false);
}

function commitSalaries() {
  let year = $('#fldNyear').val();
  let month = $('#fldNmonth').val();
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + "/CC/HR/CommitSalaries/" + year + '/' + month,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        let message = '<h4 class="text-center text-danger pt-3">' + getLabel(response.message) + '</h4>';
        $('#CalculateSalaries').html(message);
      }
    }, error: function (response) {
      let message = '<h4 class="text-center text-danger pt-3">' + getLabel(response.message) + '</h4>';
      $('#CalculateSalaries').html(message);
    }
  });
  showHeaderSpinner(false);
}