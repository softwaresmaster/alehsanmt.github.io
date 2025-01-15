/* ----------------------------------

Name: custom.js

------------------------------------- */

/*====================================================


	Table of Contents
	
	

		01. Pie Charts

			+ Pie Chart Style 01
			+ Pie Chart Style 02
			+ Pie Chart Style 03

		02. Counter

		03. Scroll to top
		
		04. Loading Screen

    05. Contact Form

*/

jQuery(document).ready(function ($) {
  "use strict";

  /*======================
	
		01. Pie Charts
	
	========================*/

  /* Pie Chart Style 01 
	-------------------------*/

  0 < $(".chart-style-1").length &&
    $(".chart-style-1").easyPieChart({
      lineCap: "round",
      barColor: "#9d9d9d",
      trackColor: "#fff",
      lineWidth: 2,
      size: 130,
      scaleColor: !1,
      easing: "easeOutBounce",
      scaleLength: 1,
      animate: {
        duration: 1500,
        enabled: !0,
      },
      onStep: function (a, b, c) {
        $(this.el).find(".percent").text(Math.round(c));
      },
    });

  /* Pie Chart Style 02 
	-------------------------*/

  0 < $(".chart-style-2").length &&
    $(".chart-style-2").easyPieChart({
      barColor: "#1769ff",
      scaleLength: 1,
      lineCap: "round",
      trackColor: "#232323",
      scaleColor: !1,
      easing: "easeOutCirc",
      lineWidth: 20,
      size: 150,
      animate: {
        duration: 2e3,
        enabled: !0,
      },
      onStep: function (a, b, c) {
        $(this.el).find(".chart-style-2").text(Math.round(c));
      },
    });

  /* Pie Chart Style 03 
	-------------------------*/

  0 < $(".chart-style-3").length &&
    $(".chart-style-3").easyPieChart({
      size: 200,
      trackColor: "",
      lineWidth: 2,
      scaleColor: !1,
      scaleLength: 1,
      lineCap: "round",
      easing: "easeOutCirc",
      barColor: "#232323",
      animate: {
        duration: 2e3,
        enabled: !0,
      },
      onStep: function (a, b, c) {
        $(this.el).find(".percent").text(Math.round(c));
      },
    });

  /*======================
	
		02. Counter
	
	========================*/

  $(function () {
    animatecounters();
  });

  function animatecounters() {
    $(".timer").each(function (a) {
      var b = $(this);
      (a = $.extend({}, a || {}, b.data("countToOptions") || {})), b.countTo(a);
    });
  }
  $(".timer").appear(),
    $(document.body).on("appear", ".timer", function () {
      $(this).hasClass("appear") ||
        (animatecounters(), $(this).addClass("appear"));
    });

  /*======================
	
		03. Scroll to top
	
	========================*/

  $(window).scroll(function () {
    50 <= $(this).scrollTop()
      ? $("#return-to-top").fadeIn(200)
      : $("#return-to-top").fadeOut(200);
  }),
    $("#return-to-top").on("click", function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });

  /*======================
	
		04. Loading Screen
	
	========================*/

  setTimeout(function () {
    $("body").addClass("loaded");
  }, 0);
});

function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function setIFrameHeight() {
  var height = 500;
  if (isMobile()) {
    if (window.innerHeight > window.innerWidth) {
      var navbarHeight = $(".uk-navbar-container").height();
      var windowHeight = $(window).height();
      height = windowHeight - navbarHeight - 30;
    }
  }
  $("iframe").attr("height", height);
}

(function ($) {
  $(window).bind("load", function () {
    setIFrameHeight();
  });
})(jQuery);

// window.onorientationchange = setIFrameHeight();
$(window).on("orientationchange", function (event) {
  setIFrameHeight();
});

function sendMailJS() {
  var to = "contact@alehsanmt.com";
  var subject = "New Admission";
  var firstName = $("input[name=fname]").val();
  var lastName = $("input[name=lname]").val();
  var phone = $("input[name=phone]").val();
  var message = $("textarea[name=message]").val();
  var body =
    "Name: " +
    firstName +
    " " +
    lastName +
    " , Phone: " +
    phone +
    " , Message: " +
    message;
  window.open("mailto:" + to + " ?subject=" + subject + "&body=" + body);
}
