let menuToggle = false;

$(".burger--menu").each((index, $menuToggle) => {
  $($menuToggle).on("click", function () {
    $($menuToggle).toggleClass("burger--close");
    $(".nav-menu").toggleClass("nav-menu--open");
    $("html, body").animate({ scrollTop: 0 }, 0);
    if (!menuToggle) {
      menuToggle = true;
      $(window).trigger("scrollOffsetOpen", { target: $menuToggle });
    } else {
      menuToggle = false;
      $(window).trigger("scrollOffsetClose", { target: $menuToggle });
    }
  });

  function menuClose() {
    $(".burger--menu").removeClass("burger--close");
    $(".nav-menu").removeClass("nav-menu--open");
    $(window).trigger("scrollOffsetClose", { target: $menuToggle });
    menuToggle = false;
    return false;
  }

  $($menuToggle).on("scrollOffsetClose", menuClose);

  $(".menu-modal__link.scroll").on("click", menuClose);

  $(window).on("resize", function () {
    if (window.innerWidth > 992) {
      menuClose();
    }
  });
});

