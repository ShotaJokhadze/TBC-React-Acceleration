const accordions = document.querySelectorAll(
  ".accordion-item",
  "./footer-item"
);

accordions.forEach((accordion) => {
  accordion.addEventListener("click", function () {
    accordions.forEach((item) => {
      if (item !== this) {
        item.classList.remove("open");
      }
    });
    this.classList.toggle("open");
  });
});
