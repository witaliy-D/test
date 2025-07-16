(() => {
  // src/js/utility/util.js
  var isHTMLElement = (val) => val instanceof HTMLElement;

  // src/components/scroll-offset/scroll-offset.js
  var SOList = [];
  function scrollOffsetEscape(e) {
    if (e.key === "Escape") {
      const $root = SOList[SOList.length - 1];
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $root } });
      $root.dispatchEvent(event);
    }
  }
  window.addEventListener("scrollOffsetOpen", (e) => {
    const data = e.detail;
    if (data && data.target && isHTMLElement(data.target)) {
      SOList.push(data.target);
      if (SOList.length === 1) {
        document.body.classList.add("scroll-offset");
        window.addEventListener("keyup", scrollOffsetEscape);
      }
    }
  });
  window.addEventListener("scrollOffsetClose", (e) => {
    const data = e.detail;
    if (data && data.target && isHTMLElement(data.target)) {
      const index = SOList.indexOf(data.target);
      if (index > -1) SOList.splice(index, 1);
      if (SOList.length === 0) {
        document.body.classList.remove("scroll-offset");
        window.removeEventListener("keyup", scrollOffsetEscape);
      }
    }
  });
  window.addEventListener("scrollOffsetAllClose", () => {
    while (SOList.length > 0) {
      const $item = SOList.pop();
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $item } });
      $item.dispatchEvent(event);
    }
  });
  var addStyleOffset = document.createElement("style");
  var bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
  window.addEventListener("scrollOffsetOpen", () => {
    addStyleOffset.innerHTML = ":root { --scroll-offset-init: " + bodyWidth + "px; }";
    document.head.appendChild(addStyleOffset);
  }, { once: true });
  window.addEventListener("resize", () => {
    if (!document.body.classList.contains("scroll-offset")) {
      bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
      addStyleOffset.innerHTML = ":root { --scroll-offset-init: " + bodyWidth + "px; }";
    }
  });

  // src/template/header/header.js
  var menuToggle = false;
  var toggles = document.querySelectorAll(".nav-menu__toggle");
  Object.keys(toggles).forEach((index) => {
    let $menuToggle = toggles[index];
    $menuToggle.addEventListener("click", function() {
      document.querySelector(".nav-menu").classList.toggle("nav-menu--open");
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
    window.addEventListener("resize", function() {
      if (window.innerWidth > 992) {
        menuClose();
      }
    });
  });
  $(".menu__item-parent > span").on("click", function() {
    const that = $(this);
    $(this).siblings("div").removeClass("hide");
    $(this).siblings("div").addClass("open");
    $(this).addClass("hide");
    $(this).siblings("a").addClass("hide");
    $(this).parent("li").siblings("li").addClass("hide");
    $(".back").fadeOut(300);
    $(this).siblings("div").children("span").fadeIn(300);
    setTimeout(function() {
      that.parent("li").parent("ul").addClass("haschild");
    }, 300);
  });
  $(".back").on("click", function() {
    const that = $(this);
    $(this).parent("div").addClass("hide");
    $(this).parent("div").removeClass("open");
    $(this).parent("div").siblings("a").removeClass("hide");
    $(this).parent("div").siblings("span").removeClass("hide");
    $(this).parents(".menu__item-parent").siblings("li").removeClass("hide");
    if ($(this).closest(".haschild").siblings(".back").length == 0) {
      $(this).fadeOut(300);
      $(this).closest(".haschild").siblings(".back").fadeIn(300);
    } else {
      $(this).fadeOut(0);
      $(this).closest(".haschild").siblings(".back").fadeIn(0);
    }
    setTimeout(function() {
      that.parent("div").parent("li").parent("ul").removeClass("haschild");
    }, 300);
  });
})();
