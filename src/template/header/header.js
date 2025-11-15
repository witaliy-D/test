let menuToggle = false;

let toggles = document.querySelectorAll(".nav-menu__toggle");
Object.keys(toggles).forEach((index) => {

  let $menuToggle = toggles[index];

  $menuToggle.addEventListener("click", function () {
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
    const event = new CustomEvent("scrollOffsetClose", { detail: { target: $menuToggle } });
    window.dispatchEvent(event);
    menuToggle = false;
    return false;
  }

  $menuToggle.addEventListener("scrollOffsetClose", menuClose);

  document.querySelector(".nav-menu__toggle--close").addEventListener("click", menuClose);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1440) {
      menuClose();
    }
  });

  document.querySelector(".nav-menu").addEventListener("click", function (e) {
    if (this.classList.contains("nav-menu--open") && e.currentTarget === e.target) {
      menuClose();
    }
  });
});


let togglesLinks = document.querySelectorAll(".nav-menu__link-toggel");

Object.keys(togglesLinks).forEach((index) => {
  let togglesLink = togglesLinks[index];
  togglesLink.addEventListener("click", function () {
    togglesLink.parentNode.parentNode.classList.toggle("open");
  });
});

