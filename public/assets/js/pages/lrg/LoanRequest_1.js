jQuery(document).ready(function () {

  $('.side-Item').click(function () {
    //$('.side-Item').removeClass('active');
    $(this).toggleClass('active');
    //$('.child').addClass('d-none');
    $('#' + $(this).data('rel-section')).toggleClass('d-none');
    $("#side-menu").toggle("slide", {direction: "right"});
  });

  $('.card-collapses').click(function () {
    if ($("#" + $(this).data('icon')).hasClass("bi-chevron-up")) {
      $("#" + $(this).data('icon')).removeClass("bi-chevron-up");
      $("#" + $(this).data('icon')).addClass("bi-chevron-down");
    } else {
      $("#" + $(this).data('icon')).removeClass("bi-chevron-down");
      $("#" + $(this).data('icon')).addClass("bi-chevron-up");
    }
    $('#' + $(this).data('section')).animate({
      height: 'toggle'
    });
  });

  $('#ph-toggle-side-menu').click(function (e) {
    e.preventDefault();
    $("#side-menu").toggle("slide", {direction: "right"});
  });

  $('#ph-submit').click(function (e) {
    e.preventDefault();
    $("#side-menu").removeClass('d-none');
    $("#ph-toggle-side-menu").removeClass('d-none');
  });

  $('#ph-new').click(function (e) {
    e.preventDefault();
    $("#side-menu").hide();
    $("#ph-toggle-side-menu").addClass('d-none');
  });

  $("#side-menu").hide();
  showHeaderSpinner(false);

});
