/* global PhSettings, Labels, swal, Swal, Toast, TOAST_STATUS, direction, bootstrap, IMask */
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
let aReferans = [];

const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
}
};

const isValidForm = (formId) => {
  let isValid = false;
  let form = select('#' + formId);
  if (form) {
    form.classList.remove('was-validated');
    isValid = form.checkValidity();
    if (!isValid) {
      form.classList.add('was-validated');
      let formControl = select('#' + formId + ' .form-control:invalid,.form-select:invalid', true);
      formControl.forEach(formcontrol => {
        formcontrol.classList.add('invalid');
      });
    } else {
      $('.was-validated').removeClass('was-validated');
      $('.invalid').removeClass('invalid');
    }
  }
  return isValid;
};

function prepareErrorMessage(vMsg) {
  let aMsgs = vMsg.split("#");
  let vMessage = '';
  for (var msg in aMsgs) {
    vMessage += ' ' + getLabel(aMsgs[msg]);
  }
  return vMessage.trim();
}

function initPhTApp() {
  let arrows;
  let isRtl = true;
  if (PhSettings.display.vDir === 'ltr') {
    isRtl = false;
    arrows = {
      leftArrow: '<i class="bi bi-arrow-right-short"></i>',
      rightArrow: '<i class="bi bi-arrow-left-short"></i>'
    };
  } else {
    arrows = {
      leftArrow: '<i class="bi bi-arrow-left-short"></i>',
      rightArrow: '<i class="bi bi-arrow-right-short"></i>'
    };
  }
//  $('.ph_datepicker').datepicker({
//    isRTL: isRtl,
//    dateFormat: 'dd-mm-yy',
//    minDate: new Date(2023, 0, 1),
//    maxDate: new Date(2023, 11, 31),
//    timepicker: true,
//    changeMonth: true,
//    changeYear: true,
//    showOtherMonths: true,
//    selectOtherMonths: true
//  });
  $('.ph_datepicker').datepicker({
    isRTL: isRtl,
    dateFormat: 'dd-mm-yy',
    timepicker: true,
    changeMonth: true,
    changeYear: true,
    showOtherMonths: true,
    selectOtherMonths: true
  });
  $('.datepicker-btn').off('click').on('click', function () {
    $(this).prev('.ph_datepicker').datepicker('show');
  });

  $('.logout').off('click').on('click', (e) => {
    e.preventDefault();
    $.ajax({
      type: PhSettings.logout.Method,
      async: false,
      url: PhSettings.logout.URL,
      success: function (response) {
        location.href = PhSettings.rootPath;
      }
    });
  });
}

const on = (type, el, listener, all = false) => {
  if (all) {
    select(el, all).forEach(e => e.addEventListener(type, listener));
  } else {
    select(el, all).addEventListener(type, listener);
}
};

let integerFormat = function (nValue) {
  return nValue;
  return (new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}).format(nValue));
};

let decimalFormat = function (nValue) {
  return nValue;
  return (new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(nValue));
};

function currentTime() {
  return formatDate(new Date(), 'hh:ii');
}

function currentDate() {
  return formatDate(new Date(), 'dd-mm-yyyy');
}

function currentDateTime() {
  return formatDate(new Date(), 'dd-mm-yyyy hh:ii');
}

function stringToDate(vDate) {
  var from = vDate.split("-");
  return new Date(from[2], from[1] - 1, from[0]);
}

function addDaysToDate(sDate, nDays) {
  var date = new Date(sDate);
  return new Date(date.setDate(date.getDate() + nDays));
}

function formatDate(date, format) {
  const map = {
    mm: String(date.getMonth() + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear().toString(),
    hh: String(date.getHours()).padStart(2, '0'),
    ii: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0')
  };
  return format.replace(/mm|dd|yyyy|yy|hh|ii|ss/gi, matched => map[matched]);
}

function process(date) {
  var parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

function reverseString(str, char = '-') {
  return str.split(char).reverse().join(char);
}

function getLabel(vKey) {
  let vRet = vKey;
  if (vKey !== null) {
    let vSearchKey = vKey.toLowerCase().replaceAll(" ", ".").trim();
    if (PhSettings.Labels.hasOwnProperty(vSearchKey)) {
      vRet = PhSettings.Labels[vSearchKey];
    }
  } else {
    vRet = '';
  }
  return (vRet);
}

function refreshLabels() {
  $.ajax({
    type: PhSettings.getLabels.Method,
    async: false,
    url: PhSettings.getLabels.URL,
    data: {"language": direction.dir[1 - direction.nDir]},
    success: function (response) {
      Labels = JSON.parse(response.trim());
      $(".ph-label").each(function (index) {
        if ($(this).data('label')) {
          $(this).text(getLabel($(this).data('label')));
        }
      });
    }
  });
}

function swalToast(message, icon, position) {
  /*
   * icon: success, error, warning, info, question
   * position: top-start, top, top-end,
   *           center-start, center, center-end
   *           bottom-start, bottom, bottom-end
   */
  if (position === undefined) {
    position = 'bottom-end';
  }
  swal.fire({
    position: position,
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
}

function showToast(title, color, message) {
  /*
   * position: top-left, top-center, top-eight,
   *           middle-left, middle-center, middle-right
   *           bottom-left, bottom-center, bottom-right
   */
  let toast = {
    title: title,
    message: message,
    status: TOAST_STATUS[color],
    timeout: 5000
  };
  Toast.enableQueue(true);
  Toast.setPlacement(TOAST_PLACEMENT.BOTTOM_RIGHT);
  Toast.create(toast);
}

function phAutocomplete() {
  $('.phAutocomplete').each(function (i, el) {
    let $this = $(el);
    let vOperation = $this.data('acoperation');
    let vCallback = $this.data('callback');
    let vParams = $this.data('params');
    $this.autocomplete({
      source: function (request, response) {
        let oAjaxData = {};
        if (vParams !== "") {
          if (typeof window[vParams] === "function") {
            oAjaxData = window[vParams]($this);
          }
        }
        oAjaxData.term = request.term;
        $.ajax({
          type: 'POST',
          async: false,
          url: PhSettings.apiURL + vOperation,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': PhSettings.Headers.Authorization
          },
          data: JSON.stringify(oAjaxData),
          success: function (ajaxResponse) {
            response(ajaxResponse.data.List);
          }
        });
      },
      minLength: 0,
      focus: function (event, ui) {
        return false;
      },
      select: function (event, ui) {
        $(this).val(ui.item.label);
        let vField = $(this).data('acrel');
        if (vField !== undefined) {
          $('#' + vField).val('');
          $('#' + vField).val(ui.item.value);
          if (vCallback !== "") {
            if (typeof window[vCallback] === "function") {
              window[vCallback](event, ui);
            }
          }
        }
        return false;
      },
      change: function (event, ui) {
        let vField = $(this).data('acrel');
        if (!ui.item) {
          $(this).val('');
          $('#' + vField).val('');
        }
        if (vField !== undefined && $(this).val() === "") {
          $('#' + vField).val('');
        }
      }
    });
  });
  $('.phAutocomplete').off('change').on('change', function () {
    let vField = $(this).data('acrel');
    if (vField !== undefined && $(this).val() === "") {
      $('#' + vField).val('');
    }
  });
}

function showHeaderSpinner(show) {
  if (show) {
    $('#head-spinner').removeClass('d-none');
  } else {
    $('#head-spinner').addClass('d-none');
  }
}

function downloadFile(base64Data, contentType, fileName) {
  let vFile;
  let downloadLink;
  vFile = new Blob(["\uFEFF" + base64Data], {type: contentType});
  downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.href = base64Data;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

function returnIconFile(ext) {
  let vIcon = PhFileExt[ext];
  if (vIcon === undefined) {
    vIcon = PhFileExt['other'];
  }
  return vIcon;
}

function initMask() {
//  initNumberMasks();
//  initPhoneNumberMasks();
//  initPercentNumberMasks();
}

function initNumberMasks() {
  $('.phNumberMask').each(function (i, element) {
    let nDecimal = element.dataset.decimal;
    let vMask = element.dataset.mask;
    let nMin = element.dataset.min;
    let nMax = element.dataset.max;
    let vThousandsSeparator = element.dataset.thseparator;
    setNumberMasks(element, vMask, nDecimal, nMin, nMax, vThousandsSeparator);
  });
}

function initPhoneNumberMasks() {
  $('.phPhoneNumberMask').each(function (i, element) {
    setNumberMasks(element, Number, 0, 0, 9999999999, '');
  });
}

function initPercentNumberMasks() {
  $('.phPercentNumberMask').each(function (i, element) {
    setNumberMasks(element, Number, 0, 0, 100, '');
  });
}

function setNumberMasks(element, vMask = Number, nDecimal = 0, nMin = 0, nMax = 999999999999, thSeparator = ',') {
  const numberMask = IMask(element, {
    mask: vMask,
    thousandsSeparator: thSeparator,
    radix: '.',
    scale: parseInt(nDecimal),
    normalizeZeros: true,
    padFractionalZeros: true,
    min: parseInt(nMin),
    max: parseInt(nMax)
  }).on('accept', function () {
    element.dataset.unmasked = numberMask.unmaskedValue;
  });
}



function removeSelectsOption(array, elementId) {
  $(".select-option").each(function () {
    let vHtml = '';
    for (let i = 0; i < array.length; i++) {
      if (array[i].statusId === 1) {
        vHtml += '<option value="' + array[i].id + '">' + array[i].name + '</option>';
      }
      $('#' + elementId).html(vHtml);
    }
  });
}

function removeNewSelectOption(array, elementId) {
  let vHtml = '';
  for (let i = 0; i < array.length; i++) {
    if (parseInt(array[i].statusId) === 1) {
      vHtml += '<option value="' + array[i].id + ' ">' + array[i].name + '</option>';
    }
    $('#' + elementId).html(vHtml);
  }
}

function removeEditSelectOption(array, elementId, value = - 1) {
  let vHtml = '';
  for (let i = 0; i < array.length; i++) {
    if (parseInt(array[i].statusId) === 1 || (parseInt(array[i].id) === parseInt(value)) && parseInt(value) !== -1) {
      vHtml += '<option value="' + array[i].id + '"' + ((parseInt(array[i].id) === parseInt(value)) ? ' selected' : '') + '>' + array[i].name + '</option>';
    }
    $('#' + elementId).html(vHtml);
}
}

initPhTApp();
phAutocomplete();
initMask();
$('#setting-tab').ready(function () {
//  getPreferences();
});
$('#uprefs-tab').ready(function () {
//  getCpy();
});
$('#bprefs-tab').ready(function () {
//  getSys();
});
/////// referens////
function getPreferences() {
  $.ajax({
    type: 'OPTIONS',
    async: false,
    url: PhSettings.apiURL + '/CC/Phs/Preferences/User',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        renderRefernce("User", response.data.Obj);
      }
    }
  });
}

function getCpy() {
  $.ajax({
    type: 'OPTIONS',
    async: false,
    url: PhSettings.apiURL + '/CC/Phs/Preferences/Cpy',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        renderRefernce("Cpy", response.data.Obj);
      }
    }
  });
}

function getSys() {
  $.ajax({
    type: 'OPTIONS',
    async: false,
    url: PhSettings.apiURL + '/CC/Phs/Preferences/Phs',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        renderRefernce("Sys", response.data.Obj);
      }
    }
  });
}

function renderRefernce(vType, aReferans) {
  let vHtml = '';
  for (var item in aReferans) {
    if (aReferans[item].fldtype_id == 0 || aReferans[item].fldtype_id == 7 || aReferans[item].fldtype_id == 8 || aReferans[item].fldtype_id == 9) {
      vHtml += ' <div class="row py-1">';
      vHtml += ' <div class="col-12">';
      vHtml += '  <label for="name">' + aReferans[item].name + '</label>';
      vHtml += '  <div class="d-flex justify-content-between">';
      if (aReferans[item].fldtype_id == 0) {
        vHtml += '<input id="' + vType + item + '" class="form-control form-control-sm" type="text" value=""  autocomplete="off" data-index="' + item + '" data-key="' + aReferans[item].key + '" />';
      }
      if (aReferans[item].fldtype_id == 7) {
        vHtml += '<input id="' + vType + item + '" class="form-control form-control-sm" type="file"  webkitdirectory directory multiple data-index="' + item + '" data-key="' + aReferans[item].key + '"/>';
      }
      if (aReferans[item].fldtype_id == 8) {
        vHtml += '<input id="' + vType + item + '" class="form-control form-control-sm" type="file"  multiple data-index="' + item + '" data-key="' + aReferans[item].key + '"/>';
      }
      if (aReferans[item].fldtype_id == 9) {
        vHtml += '<input  id="' + vType + item + '" type="file" id="img" name="img" accept="image/*" data-index="' + item + '" data-key="' + aReferans[item].key + '"/>';
      }
      vHtml += '  <a class="btn btn-sm btn-secondary setting-save" data-index1="' + vType + item + '"  data-index2="' + vType + item + '1" data-type="' + vType + '" data-save="directionSelect" data-bs-toggle="tooltip"  data-value="" data-value1="0" data-bs-placement="bottom" data-bs-animation="true"  data-bs-custom-class="tooltip-primary-bg" data-bs-title="Save" title="Save">';
      vHtml += '  <i class="bi bi-save"></i> ';
      vHtml += ' </a>';
      vHtml += '</div>';
      vHtml += ' </div>';
      vHtml += ' </div>';
    }
    if (aReferans[item].fldtype_id == 1) {
      let aSelectData = [];
      vHtml += ' <div class="row py-1">';
      vHtml += ' <div class="col-12">';
      vHtml += '  <label for="name">' + aReferans[item].name + '</label>';
      vHtml += '  <div class="d-flex justify-content-between">';
      vHtml += ' <select  id="' + vType + item + '" class="form-control form-control-sm form-select item"  data-index="' + item + '" data-key="' + aReferans[item].key + '"/>';
      aSelectData = aReferans[item].selectedData;
      for (var option in aSelectData) {
        vHtml += '<option value="' + aSelectData[option].id + '">' + aSelectData[option].name + '</option>';
      }
      vHtml += ' </select>';
      vHtml += '  <a class="btn btn-sm btn-secondary setting-save" data-index1="' + vType + item + '"  data-index2="' + vType + item + '1" data-type="' + vType + '" data-save="directionSelect" data-bs-toggle="tooltip"  data-value="" data-value1="0" data-bs-placement="bottom" data-bs-animation="true"  data-bs-custom-class="tooltip-primary-bg" data-bs-title="Save" title="Save">';
      vHtml += '  <i class="bi bi-save"></i> ';
      vHtml += ' </a>';
      vHtml += '</div>';
      vHtml += ' </div>';
      vHtml += ' </div>';
    }
    if (aReferans[item].fldtype_id == 2) {
      vHtml += ' <div class="row py-1">';
      vHtml += ' <div class="col-12">';
      vHtml += '  <label for="name">' + aReferans[item].name + '</label>';
      vHtml += '  <div class="d-flex justify-content-between">';
      vHtml += ' <input  type="hidden" value=""  data-index="' + vType + item + '"  required />';
      vHtml += ' <input  id="' + vType + item + '"  class="form-control form-control-sm phAutocomplete" data-acrel="fldEmpId" data-acoperation="/' + aReferans[item].lovapi + '" data-params=""  type="text" value="' + aReferans[item].defvalue1 + '" required />';
      vHtml += '  <a class="btn btn-sm btn-secondary setting-save" data-index1="' + vType + item + '"  data-index2="' + vType + item + '1" data-type="' + vType + '" data-save="directionSelect" data-bs-toggle="tooltip"  data-value="" data-value1="0" data-bs-placement="bottom" data-bs-animation="true"  data-bs-custom-class="tooltip-primary-bg" data-bs-title="Save" title="Save">';
      vHtml += '  <i class="bi bi-save"></i> ';
      vHtml += ' </a>';
      vHtml += '</div>';
      vHtml += ' </div>';
      vHtml += ' </div>';
    }
    if (aReferans[item].fldtype_id == 3) {
      if (aReferans[item].isbetween == 0) {
        vHtml += ' <div class="row py-1">';
        vHtml += ' <div class="col-12">';
        vHtml += '  <label for="name">' + aReferans[item].name + '</label>';
        vHtml += '  <div class="d-flex justify-content-between">';
        vHtml += '  <input id="' + vType + item + '" class="form-control form-control-sm ph_datepicker" type="text" value=""  data-index="' + item + '" data-key="' + aReferans[item].key + '" />';
        vHtml += '    <div class="input-group-append input-group-sm datepicker-btn">';
        vHtml += '        <span class="input-group-text">';
        vHtml += '            <i class="bi bi-calendar4-event"></i>';
        vHtml += '        </span>';
        vHtml += '    </div>';
        vHtml += '  <a class="btn btn-sm btn-secondary setting-save" data-index1="' + vType + item + '"  data-index2="' + vType + item + '1" data-type="' + vType + '" data-save="directionSelect" data-bs-toggle="tooltip"  data-value="" data-value1="0" data-bs-placement="bottom" data-bs-animation="true"  data-bs-custom-class="tooltip-primary-bg" data-bs-title="Save" title="Save">';
        vHtml += '  <i class="bi bi-save"></i> ';
        vHtml += ' </a>';
        vHtml += '</div>';
        vHtml += ' </div>';
        vHtml += ' </div>';
      } else {
        if (aReferans[item].isbetween == 1) {
          vHtml += ' <div class="row py-1">';
          vHtml += ' <div class="col-12">';
          vHtml += '  <label for="name">' + aReferans[item].name + '</label>';
          vHtml += '  <div class="d-flex justify-content-between">';
          vHtml += '  <input  id="' + vType + item + '" class="form-control form-control-sm ph_datepicker" type="text" value=""  data-index="' + item + '" data-key="' + aReferans[item].key + '" />';
          vHtml += '               <div class="input-group-append input-group-sm datepicker-btn">';
          vHtml += '               <span class="input-group-text">';
          vHtml += '                 <i class="bi bi-calendar4-event"></i>';
          vHtml += '              </span>';
          vHtml += '          </div>';
          vHtml += '  <input id="' + vType + item + '2" class="form-control form-control-sm ph_datepicker" type="text" value=""   data-index="' + item + '" />';
          vHtml += '               <div class="input-group-append input-group-sm datepicker-btn">';
          vHtml += '               <span class="input-group-text">';
          vHtml += '                 <i class="bi bi-calendar4-event"></i>';
          vHtml += '              </span>';
          vHtml += '          </div>';
          vHtml += '  <a class="btn btn-sm btn-secondary setting-save" data-index1="' + vType + item + '"  data-index2="' + vType + item + '2" data-type="' + vType + '" data-save="directionSelect" data-bs-toggle="tooltip"  data-value="" data-value1="0" data-bs-placement="bottom" data-bs-animation="true"  data-bs-custom-class="tooltip-primary-bg" data-bs-title="Save" title="Save">';
          vHtml += '  <i class="bi bi-save"></i> ';
          vHtml += ' </a>';
          vHtml += '</div>';
          vHtml += ' </div>';
          vHtml += ' </div>';
        }
      }
    }
    if (aReferans[item].fldtype_id == 4 || aReferans[item].fldtype_id == 5 || aReferans[item].fldtype_id == 6) {
      if (aReferans[item].isbetween == 0) {
        vHtml += ' <div class="row py-1">';
        vHtml += ' <div class="col-12">';
        vHtml += '  <label for="name">' + aReferans[item].name + '</label>';
        vHtml += '  <div class="d-flex justify-content-between">';
        vHtml += '  <input id=="' + vType + item + '" class="form-control form-control-sm" type="number" value="" autocomplete="off"  data-index="' + item + '" data-key="' + aReferans[item].key + '" />';
        vHtml += '  <a class="btn btn-sm btn-secondary setting-save"  data-index1="' + vType + item + '"  data-index2="' + vType + item + '1" data-type="' + vType + '"  data-save="directionSelect" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-animation="true"  data-bs-custom-class="tooltip-primary-bg" data-bs-title="Save" title="Save">';
        vHtml += '  <i class="bi bi-save"></i> ';
        vHtml += ' </a>';
        vHtml += '</div>';
        vHtml += ' </div>';
        vHtml += ' </div>';
      } else {
        if (aReferans[item].isbetween == 1) {
          vHtml += ' <div class="row py-1">';
          vHtml += ' <div class="col-12">';
          vHtml += '  <label for="name">' + aReferans[item].name + '</label>';
          vHtml += '  <div class="d-flex justify-content-between">';
          vHtml += '  <input id="' + vType + item + '"  class="form-control form-control-sm" type="number" value="" autocomplete="off" data-index="' + item + '" data-key="' + aReferans[item].key + '" />';
          vHtml += '  <input id="' + vType + item + '2"  class="form-control form-control-sm" type="number" value="" autocomplete="off"  data-index="' + item + '"  />';
          vHtml += '  <a class="btn btn-sm btn-secondary setting-save" data-index1="' + vType + item + '"  data-index2="' + vType + item + '2" data-type="' + vType + '" data-save="directionSelect" data-bs-toggle="tooltip"  data-value="" data-value1="0" data-bs-placement="bottom" data-bs-animation="true"  data-bs-custom-class="tooltip-primary-bg" data-bs-title="Save" title="Save">';
          vHtml += '  <i class="bi bi-save"></i> ';
          vHtml += ' </a>';
          vHtml += '</div>';
          vHtml += ' </div>';
          vHtml += ' </div>';
        }
      }
    }
  }
  $('#refernce-' + vType).html(vHtml);
  initPhTApp();
  $('.setting-save').click(function (e) {
    e.preventDefault();
    let vType = $(this).data('type');
    let id = $(this).data('index1');
    let val1 = $("#" + id).val();
    let id2 = $(this).data('index2');
    let val2 = $("#" + id2).val();
    let key = $("#" + id).data('key');
    oPhs = {};
    oPhs.type = vType;
    oPhs.Key = key;
    oPhs.Value1 = val1;
    oPhs.Value2 = val2;
    save(oPhs);
  });
}
function save(oSave) {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/CC/Phs/Preferences/Phs/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    },
    data: JSON.stringify(oSave),
    success: function (response) {

    }
  });
}
