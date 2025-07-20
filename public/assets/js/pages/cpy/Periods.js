/* global PhSettings, PhTabulatorLocale, KTUtil, swal, PhUtility */
let table;
jQuery(document).ready(function () {

  $('.ph_export').on('click', function () {
    let type = parseInt($(this).data('type'));
    let fileName = $(this).data('file');
    ph_export(table, type, fileName);
  });

  $('#ph_add').on('click', function () {
    $("#ph_form").trigger("reset");
    $('#editId').val(0);
    $('#pageModal').modal('show');
  });

  $('#ph_edit_submit').on('click', function () {
    save();
  });

  refreshList();
});

function cellEditClick(e, cell) {
  let data = cell.getData();
  $('#editId').val(data.Id);
  $('#editOrd').val(data.Order);
  $('#editName').val(data.Name);
  $('#editSDate').val(data.SDate);
  $('#editEDate').val(data.EDate);
  $('#editRem').val(data.Rem);
  $('#pageModal').modal('show');
}

function cellDeleteClick(e, cell) {
  let data = cell.getData();
  PhUtility.doDelete(data.Name, {"vOperation": "cpy-Copy-Workperiod-Delete", "nId": data.Id});
}

function save() {
  let form = KTUtil.getById('ph_form');
  form.classList.remove('was-validated');
  if (form.checkValidity()) {
    PhUtility.doSave({
      "vOperation": "cpy-Copy-Workperiod-Save",
      "nId": $('#editId').val(),
      "order": $('#editOrd').val(),
      "name": $('#editName').val(),
      "sdate": $('#editSDate').val(),
      "edate": $('#editEDate').val(),
      "rem": $('#editRem').val()
    }, refreshList, false);
  } else {
    form.classList.add('was-validated');
  }
}

function refreshList() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.serviceURL,
    data: {
      "vCopy": PhSettings.copy,
      "vCDId": PhSettings.CDId,
      "vGUId": PhSettings.GUId,
      "vOperation": "cpy-Copy-Workperiod-ListPeriods"
    },
    success: function (response) {
      try {
        let res = response;
        if (res.Status) {
          let aColumns = [
            {title: getLabel('Edit'),
              width: "5%",
              headerSort: false,
              formatter: function (cell, formatterParams) {
                return PhUtility.editButton();
              },
              cellClick: cellEditClick
            },
            {title: getLabel('Number'),
              field: "Order",
              width: "10%",
              hozAlign: "left",
              headerFilter: "input"
            },
            {title: getLabel('Name'),
              field: "Name",
              width: "30%",
              hozAlign: "left",
              headerFilter: "input"
            },
            {title: getLabel('Start'),
              field: "SDate",
              width: "10%",
              hozAlign: "left",
              headerFilter: "input"
            },
            {title: getLabel('End'),
              field: "EDate",
              width: "10%",
              hozAlign: "left",
              headerFilter: "input"
            },
            {title: getLabel('Remarks'),
              field: "Rem",
              width: "30%",
              hozAlign: "left",
              headerFilter: "input"
            },
            {title: getLabel('Delete'),
              width: "5%",
              headerSort: false,
              formatter: function (cell, formatterParams) {
                return PhUtility.deleteButton();
              },
              cellClick: cellDeleteClick
            }
          ];
          table = getTabulator(aColumns, res.Data);
          window.addEventListener('resize', function () {
            table.redraw(true);
          });
        } else {
          swal.fire({
            text: res.Message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: getLabel('OK'),
            confirmButtonClass: "btn font-weight-bold btn-light-primary"
          }).then(function () {
            KTUtil.scrollTop();
          });
        }
      } catch (ex) {
      }
    },
    error: function (response) {
      try {
        let res = JSON.parse(response);
        swal.fire({
          text: res.Message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: getLabel('OK'),
          confirmButtonClass: "btn font-weight-bold btn-light-primary"
        }).then(function () {
          KTUtil.scrollTop();
        });
      } catch (ex) {
      }
    }
  });
}