(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (!toggle || !nav) {
    return;
  }

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
  }

  function openNav() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
  }

  toggle.addEventListener("click", function () {
    if (nav.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      closeNav();
    }
  });

  document.addEventListener("click", function (event) {
    if (nav.classList.contains("is-open") && !nav.contains(event.target) && !toggle.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) {
      closeNav();
    }
  });
})();

/* 更新情報の「もっと見る」 */
(function () {
  "use strict";

  var list = document.getElementById("updates-list");
  var more = document.getElementById("updates-more");

  if (!list || !more) {
    return;
  }

  // 件数はHTMLに埋め込まず、その場で数える（更新を足しても直さなくて済むように）
  var hiddenCount = list.querySelectorAll(".update-item.is-extra").length;
  var closedLabel = hiddenCount > 0
    ? "過去の更新情報を見る（あと" + hiddenCount + "件）"
    : "過去の更新情報を見る";

  if (hiddenCount === 0) {
    more.parentNode.style.display = "none";
    return;
  }

  more.textContent = closedLabel;

  more.addEventListener("click", function () {
    if (list.classList.contains("is-collapsed")) {
      list.classList.remove("is-collapsed");
      more.setAttribute("aria-expanded", "true");
      more.textContent = "過去の更新情報を閉じる";
    } else {
      list.classList.add("is-collapsed");
      more.setAttribute("aria-expanded", "false");
      more.textContent = closedLabel;
      list.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
})();
