/* global PhSettings, KTUtil, swal, FormValidation, select */

"use strict";

jQuery(document).ready(function () {

  $('#changePwd').on('click', function (e) {
    e.preventDefault();
    ChangePassword();
  });

});

function ChangePassword() {
  let vOPassword = $('#oldPassword').val();
  let vNPassword = $('#newPassword').val();
  let vCPassword = $('#confirmPassword').val();
  if (isValidForm('changePassword-form')) {
    $.ajax({
      type: PhSettings.changePassword.Method,
      async: false,
      url: PhSettings.changePassword.URL,
      data: {
        "OPassword": vOPassword,
        "NPassword": vNPassword,
        "CPassword": vCPassword
      },
      success: function (response) {
        console.log(response);
      }
    });
  }
}
