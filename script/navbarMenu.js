export const initializeMenus = (data) => {
  const { menu, footer } = data;

  setupMenu(menu, ".menu-desktop", {
    containerClass: "dropdown",
    titleClass: "dropdown-title",
    contentClass: "dropdown-list",
    itemClass: "dropdown-item",
  });

  setupMenu(menu, ".accordion", {
    containerClass: "accordion-item",
    titleClass: "accordion-header",
    contentClass: "accordion-content",
    itemClass: "",
  });

  setupMenu(footer, ".footer-main", {
    containerClass: "footer-item",
    titleClass: "footer-header",
    contentClass: "footer-content",
    itemClass: "",
  });
};

function setupMenu(menu, containerSelector, classes) {
  const menuItem = document.querySelector(containerSelector);
  const background = document.querySelector(".dropdown-bg");

  menu.forEach((dropdown) => {
    const dropdownElement = document.createElement("div");
    dropdownElement.className = classes.containerClass;

    dropdownElement.innerHTML = `
      <div class="${classes.titleClass}"> 
        <p>${dropdown.title}</p>
      </div>
      <ul class="${classes.contentClass}">
        ${dropdown.items
          .map(
            (item) => `
          <li><a href="${item.link}">${item.name}</a></li>
        `
          )
          .join("")}
      </ul>
    `;

    menuItem.insertBefore(dropdownElement, menuItem.firstChild);

    dropdownElement
      .querySelector(`.${classes.titleClass}`)
      .addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = dropdownElement.classList.contains("open");
        closeAllDropdowns();
        if (!isOpen) {
          dropdownElement.classList.add("open");
          if (background) {
            background.classList.add("open");
          }
        }
      });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  function closeAllDropdowns() {
    const allDropdowns = menuItem.querySelectorAll(
      `.${classes.containerClass}`
    );
    allDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
    if (background) {
      background.classList.remove("open");
    }
  }
}
