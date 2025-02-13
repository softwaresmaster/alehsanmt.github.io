if ($(".listing-top__map-show-hide").length) {
  $(".listing-top__map-show-hide").on("click", function () {
    $(this).toggleClass("hidden");
    var textElement = $(this).find(".listing-top__map-show-hide-text span");
    if (textElement.text() == textElement.data("text")) {
      textElement.text(textElement.data("toggle-text"));
    } else {
      textElement.text(textElement.data("text"));
    }
    $(".listing__map").toggleClass("hidden");
    $(".listing__content").toggleClass("hidden");
  });
}
