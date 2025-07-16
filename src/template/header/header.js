let menuToggle = false;

let toggles = document.querySelectorAll(".nav-menu__toggle");
Object.keys(toggles).forEach((index) => {

  let $menuToggle = toggles[index];

  $menuToggle.addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("nav-menu--open");
    //$menuToggle.classList.toggle("burger--close");

    if (!menuToggle) {
      menuToggle = true;
      const event = new CustomEvent("scrollOffsetOpen", { detail: { target: $menuToggle } });
      window.dispatchEvent(event);
    } else {
      menuToggle = false;
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $menuToggle } });
      window.dispatchEvent(event);
    }
  });

  function menuClose() {
    document.querySelector(".nav-menu").classList.remove("nav-menu--open");
    $menuToggle.classList.remove("burger--close");
    const event = new CustomEvent("scrollOffsetClose", { detail: { target: $menuToggle } });
    window.dispatchEvent(event);
    menuToggle = false;
    return false;
  }

  $menuToggle.addEventListener("scrollOffsetClose", menuClose);

  document.querySelector(".nav-menu__toggle--close").addEventListener("click", menuClose);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      menuClose();
    }
  });


});




$('.menu__item-parent > span').on('click', function () {
  const that = $(this);

  $(this).siblings('div').removeClass('hide');
  $(this).siblings('div').addClass('open');
  $(this).addClass('hide');
  $(this).siblings('a').addClass('hide');
  $(this).parent('li').siblings('li').addClass('hide');
  $('.back').fadeOut(300);
  $(this).siblings('div').children('span').fadeIn(300);

  setTimeout(function () {
    that.parent('li').parent('ul').addClass('haschild');
  }, 300);
});

$('.back').on('click', function () {
  const that = $(this);

  $(this).parent('div').addClass('hide');
  $(this).parent('div').removeClass('open');
  $(this).parent('div').siblings('a').removeClass('hide');
  $(this).parent('div').siblings('span').removeClass('hide');
  $(this).parents('.menu__item-parent').siblings('li').removeClass('hide');
  if ($(this).closest('.haschild').siblings('.back').length == 0 ) {
    $(this).fadeOut(300);
    $(this).closest('.haschild').siblings('.back').fadeIn(300);
  } else {
    $(this).fadeOut(0);
    $(this).closest('.haschild').siblings('.back').fadeIn(0);
  }

  setTimeout(function () {
    that.parent('div').parent('li').parent('ul').removeClass('haschild');
  }, 300);

})






