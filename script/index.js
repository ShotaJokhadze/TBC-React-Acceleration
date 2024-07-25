const menus = async () => {
  try {
    const response = await fetch("../data/data.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    fillNavbarMenu(data.menu, ".menu-desktop", {
      containerClass: "dropdown",
      titleClass: "dropdown-title",
      contentClass: "dropdown-list",
      itemClass: "dropdown-item",
    });

    fillNavbarMenu(data.menu, ".accordion", {
      containerClass: "accordion-item",
      titleClass: "accordion-header",
      contentClass: "accordion-content",
      itemClass: "",
    });
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
};
menus();

function fillNavbarMenu(menuData, containerSelector, classes) {
  const container = document.querySelector(containerSelector);

  menuData.forEach((section) => {
    const itemContainer = document.createElement("div");
    itemContainer.className = classes.containerClass;

    const dropdownTitle = document.createElement("div");
    dropdownTitle.className = classes.titleClass;
    dropdownTitle.innerHTML = `<p>${section.title}</p>`;

    const list = document.createElement("ul");
    list.className = classes.contentClass;

    section.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = classes.itemClass;
      listItem.innerHTML = `<a href="${item.link}">${item.name}</a>`;
      list.appendChild(listItem);
    });

    itemContainer.appendChild(dropdownTitle);
    itemContainer.appendChild(list);
    container.appendChild(itemContainer);

    dropdownTitle.addEventListener("click", function () {
      const allItems = container.querySelectorAll(`.${classes.containerClass}`);
      const dropdownBackground = document.querySelector(".dropdown-bg");

      allItems.forEach((item) => {
        if (item !== this.parentElement) {
          item.classList.remove("open");
        }
      });
      this.parentElement.classList.toggle("open");

      if (dropdownBackground) {
        const anyOpen = container.querySelector(".dropdown.open") !== null;
        if (anyOpen) {
          dropdownBackground.classList.add("open");
        } else {
          dropdownBackground.classList.remove("open");
        }
      }
    });
  });
}

//! toggle button
const hamburger = document.querySelector(".hamburger");
const toggleMenu = document.querySelector(".toggle");
const mobileMenu = document.querySelector(".menu-mobile");

toggleMenu.addEventListener("click", function () {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});
// ! toggle button

// ! mobile nav-menu
const accordions = document.querySelectorAll(".accordion-item");

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
// ! mobile nav-menu

// ! banners
function renderBanner(container, banner) {
  container.innerHTML = `
      <div class="container">
          <div class="banner" style="background: url(${banner.imgPath});">
              <div class="banner-content">
                  <div class="banner-inner">
                      <h1>${banner.title}</h1>
                      <p>${banner.description}</p>
                      <a href="${banner.buttonLink}" class="blue-button">
                          <i class="fa-solid fa-arrow-right-long"></i>
                          ${banner.buttonText}
                      </a>
                  </div>
              </div>
          </div>
      </div>
  `;
}

function loadBanners() {
  fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const homeHeroSections = document.querySelectorAll(".home-hero");

      // Ensure we have enough data and sections
      if (homeHeroSections.length >= 2 && data.banners.length >= 2) {
        homeHeroSections.forEach((section, index) => {
          if (data.banners[index]) {
            renderBanner(section, data.banners[index]);
          }
        });
      } else {
        console.error("Not enough banners or .home-hero sections");
      }
    })
    .catch((error) => console.error("Error loading data:", error));
}

loadBanners();
// !banners end

// ! number counter
const container = document.querySelector(".numbers-content");

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function animateValue(number, endValue, duration, index) {
  let startValue = 0;
  const increment = endValue > 20000 ? 450 : endValue > 100 ? 3 : 1;
  const timer = setInterval(() => {
    startValue = Math.min(startValue + increment, endValue);
    const formattedNumber = formatNumber(startValue).padStart(
      formatNumber(endValue).length,
      "0"
    );
    number.textContent = formattedNumber;

    if (index === 1 || index === 2) {
      number.textContent = `${formattedNumber}+`;
    }

    if (startValue === endValue) clearInterval(timer);
  }, duration / (endValue / increment));
}

function toggleCounters(startValue) {
  container.querySelectorAll(".value").forEach((number, i) => {
    const value = counterData[i].value;
    startValue
      ? animateValue(number, value, 2000, i)
      : (number.textContent = "0".repeat(formatNumber(value).length));
  });
}

fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    counterData = data.counters;
    container.innerHTML = counterData
      .map(
        ({ value, label }, index) =>
          `<div class="number">
        <h3 class="value">${"0".repeat(formatNumber(value).length)}</h3>
        <p>${label}</p>
      </div>`
      )
      .join("");

    new IntersectionObserver(
      (entries) => toggleCounters(entries[0].isIntersecting),
      { threshold: 0.1 }
    ).observe(container);
  })
  .catch((error) => console.error("Error loading data:", error));
// ! number counter end

fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Populate bundle-slider
    const bundleSliderContainer = document.querySelector(
      ".choose-bundle .slider"
    );
    if (bundleSliderContainer && data["bundle-slider"]) {
      data["bundle-slider"].forEach((bundle) => {
        const bundleDiv = document.createElement("div");
        bundleDiv.className = `bundle ${bundle.class}`;
        bundleDiv.innerHTML = `
            <img src="${bundle.image}" alt="">
            <div class="bundle-content">
              <h3>${bundle.heading}</h3>
              <a href="${bundle.link}">
                <i class="fa-solid fa-arrow-right-long"></i>
                <span>${bundle.linkText}</span>
              </a>
            </div>
          `;
        bundleSliderContainer.appendChild(bundleDiv);
      });
    } else {
      console.error("Bundle slider container or data not found.");
    }

    // Populate offer-slider
    const offersSliderContainer = document.querySelector(
      ".offers .slider-inner"
    );
    if (offersSliderContainer && data["offer-slider"]) {
      data["offer-slider"].forEach((offer) => {
        const offerDiv = document.createElement("div");
        offerDiv.className = "offer";
        offerDiv.innerHTML = `
            <a href="#">
              <img src="${offer.img}" alt="">
              <div class="offer-text">
                <p>${offer.category}</p>
                <h3>${offer.title}</h3>
              </div>
            </a>
            ${
              offer.logo
                ? `<div class="logo"><img src="${offer.logo}" alt=""></div>`
                : ""
            }
          `;
        offersSliderContainer.appendChild(offerDiv);
      });
    } else {
      console.error("Offers slider container or data not found.");
    }

    // Initialize sliders
    initSlider("bundle-slider", true);
    initSlider("offers-slider", true);
  })
  .catch((error) => console.error("Error fetching data:", error));

// ! slider
function initSlider(sliderClass, hasProgressBar) {
  // Find the slider and buttons
  const slider = document.querySelector("." + sliderClass);
  const prevButton = document.querySelector(
    '[data-slider="' + sliderClass + '"] .prev-slide'
  );
  const nextButton = document.querySelector(
    '[data-slider="' + sliderClass + '"] .next-slide'
  );
  console.log(slider.clientWidth, slider);

  const slides = slider.querySelectorAll(".offer");
  if (slides.length === 0) {
    console.log("No slides found in " + sliderClass);
    return;
  }

  // Calculate the width of one slide
  const slideWidth = slides[0].clientWidth;

  // Find the progress bar if needed
  let progressBar = null;
  if (hasProgressBar) {
    progressBar = document.querySelector(
      '[data-slider="' + sliderClass + '"] + .progress-bar .progress-inner'
    );
    if (!progressBar) {
      console.log("Couldn't find progress bar for " + sliderClass);
      return;
    }
  }

  // Function to update progress bar
  function updateProgressBar() {
    if (progressBar) {
      let scrollPercent =
        (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
      progressBar.style.width = scrollPercent + "%";
    }
  }

  // Add click events to buttons
  prevButton.onclick = function () {
    slider.scrollLeft -= slideWidth * 2;
  };

  nextButton.onclick = function () {
    slider.scrollLeft += slideWidth * 2;
  };

  // Update progress bar when scrolling
  slider.onscroll = updateProgressBar;

  // Initial progress bar update
  updateProgressBar();
}

// initSlider("bundle-slider", true);
// initSlider("offers-slider", true);
// ! slider
