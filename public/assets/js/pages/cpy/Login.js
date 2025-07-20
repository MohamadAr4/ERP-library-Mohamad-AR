/* global PhSettings, KTUtil, swal, FormValidation, select */

"use strict";

jQuery(document).ready(function () {
  hideSpinner();
  $('#loginStatus').html('');
  $('#ph-login').on('click', function (e) {
    e.preventDefault();
    doSignIn();
  });
  $('#username, #password').on('keyup', function (e) {
    e.preventDefault();
    if (e.which === 13) {
      doSignIn();
    }
  });
});

function doSignIn() {
  let vCopy = "Demo";
  let vUsername = $('#username').val();
  let vPassword = $('#password').val();
  if (PhSettings.Copy !== undefined) {
    vCopy = PhSettings.Copy;
  }
  if (isValidForm('login-form')) {
    $('#loginStatus').html(getLabel('Please.wait...'));
    showSpinner();
    $.ajax({
      type: PhSettings.login.Method,
      async: false,
      url: PhSettings.login.URL,
      data: {
        "copy": vCopy,
        "username": vUsername,
        "password": vPassword
      },
      success: function (response) {
        let res = JSON.parse(response.trim());
        hideSpinner();
        if (res.status) {
          location.href = PhSettings.rootPath;
        } else {
          $('#loginStatus').text(res.message);
        }
      }
    });
  } else {
    $('#login-form').removeClass('needs-validation');
    $('#login-form').addClass('was-validated');
    hideSpinner();
  }
}

function hideSpinner() {
  $('#login-spinner').addClass('d-none');
}
function showSpinner() {
  $('#login-spinner').removeClass('d-none');
}
function toggleSpinner(id) {
  $('#' + id).toggleClass('d-none');
}
