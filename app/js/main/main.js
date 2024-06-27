(() => {
  // src/js/utility/util.js
  var isObject = (val) => toString.call(val).slice(8, -1) === "Object";
  var isString = (val) => typeof val === "string";
  var isFunction = (val) => typeof val === "function";
  var isHTMLElement = (val) => val instanceof HTMLElement;
  var isNumber = (val) => !!Number(val);

  // src/components/scroll-offset/scroll-offset.js
  var SOList = [];
  function scrollOffsetEscape(e) {
    if (e.key === "Escape") {
      const $root = SOList[SOList.length - 1];
      $($root).trigger("scrollOffsetClose", { target: $root });
    }
  }
  $(window).on("scrollOffsetOpen", (e, data) => {
    if (data && data.target) {
      if (isHTMLElement(data.target)) {
        SOList.push(data.target);
        if (SOList.length === 1) {
          document.body.classList.add("scroll-offset");
          window.addEventListener("keyup", scrollOffsetEscape);
        }
      }
    }
  });
  $(window).on("scrollOffsetClose", (e, data) => {
    if (data && data.target) {
      if (isHTMLElement(data.target)) {
        if (SOList.includes(data.target)) SOList.splice(SOList.indexOf(data.target), 1);
        if (SOList.length === 0) {
          document.body.classList.remove("scroll-offset");
          window.removeEventListener("keyup", scrollOffsetEscape);
        }
      }
    }
  });
  $(window).on("scrollOffsetAllClose", (e) => {
    const SOItems = [];
    SOList.forEach(($item) => {
      SOItems.unshift($item);
    });
    SOItems.forEach(($item) => {
      $($item).trigger("scrollOffsetClose", { target: $item });
    });
  });
  var addStyleOffset = document.createElement("style");
  var bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
  $(window).one("scrollOffsetOpen", null, () => {
    addStyleOffset.innerHTML = ":root{--scroll-offset-init: " + bodyWidth + "px;}";
    document.getElementsByTagName("head")[0].appendChild(addStyleOffset);
  });
  window.addEventListener("resize", function() {
    if (!document.body.classList.contains("scroll-offset")) {
      bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
      addStyleOffset.innerHTML = ":root{ --scroll-offset-init:" + bodyWidth + "px;}";
    }
  });

  // src/components/modal/modal.js
  var Modal = class {
    constructor(config) {
      this.config = isObject(config) ? config : {};
      if (isHTMLElement(config.root)) {
        this.init(config.root);
      } else if (config.name) {
        config.name = config.name.trim();
        if (modalList[config.name]) {
          modalList[config.name].forEach(($modal) => {
            this.init($modal);
          });
        }
      } else {
        console.log('Error: {name: "modal" || root: HTMLElement}');
      }
    }
    init($root) {
      const config = this.config;
      $($root).on("modalOpen", (e, data, $trigger) => {
        this.open($root, data, $trigger);
        return false;
      });
      $($root).on("scrollOffsetClose", (e, data, $trigger) => {
        this.close($root, data);
        return false;
      });
      $($root).on("modalClose", (e, data, $trigger) => {
        this.close($root, data, $trigger);
        return false;
      });
      $(window).on("modalCloseAll", (e, data, $trigger) => {
        this.close($root, data, $trigger);
      });
      $($root).find("[data-modal-close]").on("click", (e) => {
        this.close($root, config);
      });
      if (config.setup && isFunction(config.setup)) config.setup($root);
    }
    open($root, data, $trigger) {
      const config = this.config;
      if (config.onOpen && isFunction(config.onOpen)) config.onOpen($root, data, $trigger);
      if (config.onOpenReplace && isFunction(config.onOpenReplace)) config.onOpenReplace($root, data, $trigger);
      else {
        $($root).fadeIn(400);
      }
      $(window).trigger("scrollOffsetOpen", { target: $root });
      if (config.onOpenAfter && isFunction(config.onOpenAfter)) config.onOpenAfter($root, data, $trigger);
    }
    close($root, data, $trigger) {
      const config = this.config;
      if (config.onClose && isFunction(config.onClose)) config.onClose($root, data, $trigger);
      if (config.onCloseReplace && isFunction(config.onCloseReplace)) config.onCloseReplace($root, data, $trigger);
      else {
        $($root).fadeOut(400);
      }
      $(window).trigger("scrollOffsetClose", { target: $root });
      if (config.onCloseAfter && isFunction(config.onCloseAfter)) config.onCloseAfter($root, data, $trigger);
    }
  };
  var modalList = {};
  $("[data-modal]").each((indexModal, $modal) => {
    const modalName = $modal.dataset.modal.trim();
    if (modalName.length) {
      if (!modalList[modalName]) modalList[modalName] = [];
      modalList[modalName].push($modal);
    } else {
      new Modal({
        root: $modal
      });
    }
  });

  // src/js/modules/scroll.js
  $(".scroll").click(function() {
    var _href = $(this).attr("href");
    if (_href) {
      $("html, body").animate({
        scrollTop: $(_href).offset().top + parseInt($(_href).css("padding-top")) - 20 + "px"
      });
    }
    return false;
  });

  // src/js/modules/mask.js
  $("[data-mask]").each((index, $mask) => {
    $($mask).mask($mask.dataset.mask);
  });

  // src/js/utility/parseDataList.js
  function parseDataList(data) {
    if (isString(data)) {
      data = data.trim();
      const dataList = {};
      if (data.includes(";")) {
        data.split(";").forEach((dataItem, index) => {
          dataList[index] = dataItem.trim().split(",").filter((item) => item.trim()).map((item) => item.trim());
        });
      } else {
        dataList[0] = data.split(",").filter((item) => item.trim()).map((item) => item.trim());
      }
      return dataList;
    }
    return {};
  }

  // src/js/modules/trigger.js
  $("[data-trigger]").each((index, $trigger) => {
    trigger($trigger, $trigger.dataset.trigger, "trigger", "click");
  });
  function trigger($root, config, configName, eventName) {
    if ($root.__trigger) return;
    $root.__trigger = true;
    config = parseDataList(config);
    Object.keys(config).forEach((index) => {
      const data = config[index];
      let triggerElement = data[0] || false;
      const triggerEvent = data[1] || false;
      const triggerDelay = data[2];
      if (triggerElement === "window") triggerElement = window;
      if (triggerElement === "document") triggerElement = document;
      if (triggerElement && triggerEvent) {
        if (triggerDelay) {
          if (!isNumber(triggerDelay)) {
            console.error("trigger delay error: ", triggerDelay, " only Number");
            return;
          }
          $($root).on(eventName, () => {
            setTimeout(
              () => {
                $(triggerElement).trigger(triggerEvent, [parceDataset(), $root]);
              },
              triggerDelay
            );
          });
        } else {
          $($root).on(eventName, () => {
            $(triggerElement).trigger(triggerEvent, [parceDataset(), $root]);
          });
        }
      }
    });
    function parceDataset() {
      let triggerData = {};
      Object.keys($root.dataset).forEach((data) => {
        if (data != configName) {
          const dataValue = $root.dataset[data].trim();
          triggerData[data] = Number(dataValue) ? Number(dataValue) : dataValue === "true" ? true : dataValue === "false" ? false : dataValue;
        }
      });
      return triggerData;
    }
  }

  // src/js/plugins/lazy.js
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img.lazy");
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    let myLazyLoad = new LazyLoad();
    myLazyLoad.update();
  }

  // src/template/header/header.js
  var menuToggle = false;
  $(".burger--menu").each((index, $menuToggle) => {
    $($menuToggle).on("click", function() {
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
    $(window).on("resize", function() {
      if (window.innerWidth > 992) {
        menuClose();
      }
    });
  });

  // src/template/modal/modal-form/modal-form.js
  new Modal({
    name: "form",
    setup($modal) {
    }
    // onOpen($root, data, $trigger) {
    //     if (Object.keys(data).length) {
    //         if (data.modalTitle)    {
    //             $($root).find('[name="form-title"]').val('PopUp: ' + data.modalTitle)
    //             $($root).find('[data-modal-title]').text(data.modalTitle)
    //         }
    //         else {
    //             const textTitle = $($root).find('[data-modal-title]').data('modal-title')
    //             $($root).find('[name="form-title"]').val('PopUp: ' + textTitle)
    //             $($root).find('[data-modal-title]').text(textTitle)
    //         }
    //         if (data.info)        {
    //             $($root).find('[name="info"]').val(data.info)}
    //     }
    // },
    // onClose($root) {
    //     $($root).find('[name="info"]').val('')
    // },
  });

  // src/pages/main/banner/banner.js
  var slider = new Swiper(".banner__slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  // src/js/preloader.js
  new WOW().init();
})();
