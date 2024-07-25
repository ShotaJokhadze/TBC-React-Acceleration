import "./animateOnScroll.js";
import "./toggle.js";
import "./mobileAccordion.js";
import { fetchData } from "./dataFetcher.js";
import { initializeMenus } from "./navbarMenu.js";
import { initializeBanners } from "./banner.js";
import { renderCounters } from "./numberCounter.js";
import { renderSliders } from "./sliderRender.js";

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchData();
  if (data) {
    initializeMenus(data);
    initializeBanners(data);
    renderCounters(data);
    renderSliders(data);
  }

  const loader = document.querySelector(".loader");
  const content = document.querySelector(".page-content");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";

      content.style.opacity = "1";

      document.body.style.overflow = "auto";
    }, 1000);
  }, 4000);
});
