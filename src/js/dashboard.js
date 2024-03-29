(function($) {
  ("use strict");

  var cfg = { scrollDuration: 800, mailChimpURL: "" }, // smoothscroll duration // mailchimp url
    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  /* preloader
    * -------------------------------------------------- */
  var ssPreloader = function() {
    $("html").addClass("ss-preload");

    $WIN.on("load", function() {
      //force page scroll position to top at page refresh
      // $('html, body').animate({ scrollTop: 0 }, 'normal');

      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function() {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };

  /* menu
    * ------------------------------------------------------ */
  var ssMenu = function() {
    var menuToggle = $(".header__menu-toggle"),
      siteBody = $("body");

    menuToggle.on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      menuToggle.toggleClass("is-clicked");
      siteBody.toggleClass("nav-wrap-is-visible");
    });

    $(".header__nav .has-children").children("a").on("click", function(e) {
      e.preventDefault();

      $(this)
        .toggleClass("sub-menu-is-open")
        .next("ul")
        .slideToggle(200)
        .end()
        .parent(".has-children")
        .siblings(".has-children")
        .children("a")
        .removeClass("sub-menu-is-open")
        .next("ul")
        .slideUp(200);
    });
  };

  /* Initialize
    * ------------------------------------------------------ */
  (function clInit() {
    ssPreloader();
    ssMenu();
  })();
})(jQuery);
