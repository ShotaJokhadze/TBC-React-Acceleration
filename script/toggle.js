const hamburger = document.querySelector(".hamburger");
const toggleMenu = document.querySelector(".toggle");
const mobileMenu = document.querySelector(".menu-mobile");
const fixedButton = document.querySelector(".fixed-button");
const fixedButtonIcons = document.querySelector(".buttons");
const content = document.querySelector(".page-content");

toggleMenu.addEventListener("click", function () {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");

  if (mobileMenu.classList.contains("open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

fixedButton.addEventListener("click", function (e) {
  fixedButtonIcons.classList.toggle("open");
});
