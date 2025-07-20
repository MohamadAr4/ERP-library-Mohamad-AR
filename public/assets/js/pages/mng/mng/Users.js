let phForm;
let aStatus = PhSettings.PhsCodes.PhsStatus;
let aGender = PhSettings.PhsCodes.PhsGender;
let aPgrps = [];
let oReset = {};
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Cpy/Users';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: '', beforSave: validPassword, afterGet: getEImage, afterEdit: getReset};
  phForm = new PhForm('Users', metta, options);
  $('#fldFile').change(function (e) {
    getImage(e);
  });
  $('#fldResetPass').click(function (e) {
    e.preventDefault();
    ResetPass();
  });

});

function getList() {
  getaPGrps();
  showHeaderSpinner(false);
}

function getaPGrps() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Cpy/PermissionGroups/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aPgrps[i] = {};
          aPgrps[i].id = response.data.List[i].id;
          aPgrps[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getaQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Name'),
    element: 'Name',
    field: 'name',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Q.Login'),
    element: 'LogIn',
    field: 'logIn',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Pgrp'),
    element: 'PgrpId',
    field: 'pgrpId',
    component: PhFC_Select,
    defValue: -1,
    options: aPgrps,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Gender'),
    element: 'GenderId',
    field: 'genderId',
    component: PhFC_Select,
    defValue: -1,
    options: aGender,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    getLabel: true,
    component: PhFC_Select,
    defValue: -1,
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Password'),
    element: 'Pass',
    field: 'pass',
    component: PhFC_Text,
    defValue: '',
    options: ' ',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
    dataType: PhFDT_String,
    defValue: '',
    aOpers: aTOpers
  };
  return aQFields;
}

function getFields() {
  let aFields = [];
  let idx = 0;
  aFields[idx++] = {
    element: 'fldId',
    field: 'id',
    isRequired: false,
    defValue: '0'
  };
  aFields[idx++] = {
    element: 'fldPass',
    field: 'pass',
    isRequired: true,
    defValue: ''
  };
//  aFields[idx++] = {
//    element: 'fldAttache',
//    field: 'picture',
//    isRequired: true,
//    defValue: '',
//    afterGet: true,
//    tableWidth: 10
//  };
  aFields[idx++] = {
    label: getLabel('Name'),
    element: 'fldName',
    field: 'name',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Q.Login'),
    element: 'fldLogIn',
    field: 'logon',
    isRequired: true,
    defValue: '',
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Pgrp'),
    element: 'fldPgrpId',
    field: 'pgrpId',
    rField: 'pgrpName',
    isRequired: true,
    defValue: 1,
    options: aPgrps,
    tableWidth: '15'
  };
  aFields[idx++] = {
    label: getLabel('Gender'),
    element: 'fldGenderId',
    field: 'genderId',
    rField: 'genderName',
    isRequired: true,
    defValue: 1,
    options: aGender,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: 1,
    options: aStatus,
    tableWidth: 10
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 20
  };
  return aFields;
}

function getImage(e) {
  vUrl = URL.createObjectURL(e.target.files[0]);
  $("#fldImg").attr('src', vUrl);
  base64Encoder(e.target.files[0]);
}

function base64Encoder(blob) {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    $("#fldAttache").val(reader.result);
  };
}

function validPassword() {
  if ($("#fldPass").val() === $("#fldConPass").val()) {
    $("#fldPass").removeClass("invalid");
    $("#fldConPass").removeClass("invalid");
    // $("#checkPass").text("Password is valid");
    // $("#checkPass").css("color", "green");
    // showToast(getLabel('Reset.Password.Successfully'), 'SUCCESS', getLabel('Set.Password.Successfully'));
    phForm.validated = true;
  } else {
    $("#fldPass").addClass("invalid");
    $("#fldConPass").addClass("invalid");
    $("#checkPass").text("Passwor is not valid");
    $("#checkPass").css("color", "red");
    //  showToast(getLabel('Failed.To.Reset.Password'), 'DANGER', getLabel('password.does.not.match'));
    phForm.validated = false;

  }
}

function getEImage() {
  $("#fldImg").attr('src', '');
}

function getReset() {
  $('#fldResetPass').removeClass('d-none');
}

function getData() {
  if ($("#fldPass").val() === $("#fldConPass").val()) {
    $("#fldPass").removeClass("invalid");
    $("#fldConPass").removeClass("invalid");
    oReset = {};
    oReset.newPassword = $("#fldPass").val();
    return oReset;
  } else {
    $("#fldPass").addClass("invalid");
    $("#fldConPass").addClass("invalid");
    $("#checkPass").text("Passwor is not valid");
    $("#checkPass").css("color", "red");
    showToast(getLabel('Failed.To.Reset.Password'), 'DANGER', getLabel('password.does.not.match'));
    return oReset;
  }
}

function ResetPass() {
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/UserAccount/Reset/' + parseInt($('#fldId').val()),
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
      if (response.status) {
        showToast(getLabel('Reset.Password.Successfully'), 'SUCCESS', getLabel(response.message));
        $("#fldPass").removeClass("invalid");
        $("#fldConPass").removeClass("invalid");
      } else {
        $("#fldPass").addClass("invalid");
        $("#fldConPass").addClass("invalid");
        showToast(getLabel('Failed.To.Reset.Password'), 'DANGER', getLabel(response.message));
      }
    },
    error: function (response) {
    }
  });
}
