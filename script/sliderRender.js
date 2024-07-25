import { initializeSlider } from "./sliderLogic.js";

export const renderSliders = (data) => {
  const {
    "offer-Slider": offerData,
    "product-Slider": productData,
    "award-Slider": awardData,
  } = data;

  renderSlider("offers", offerData, renderOfferContent);
  renderSlider("products", productData, renderGenericContent);
  renderSlider("awards", awardData, renderGenericContent);

  initializeSlider(".offers-slider");
  initializeSlider(".products-slider");
  initializeSlider(".awards-slider");
};

const renderSlider = (type, data, contentRenderer) => {
  const sliderContainer = document.querySelector(`.${type}-slider`);
  if (sliderContainer) {
    const sliderInner = sliderContainer.querySelector(".slider-inner");
    if (sliderInner) {
      sliderInner.innerHTML = data
        .map((item) => contentRenderer(type, item))
        .join("");
    }

    const scrollDiv = document.createElement("div");
    scrollDiv.className = "scroll";
    scrollDiv.innerHTML = `
      <div class="scrollbar-buttons" data-slider="${type}-slider">
        <i class="fa-solid fa-arrow-left-long prev-slide"></i>
        <i class="fa-solid fa-arrow-right-long next-slide"></i>
      </div>
      <div class="progress-bar">
        <div class="progress-inner"></div>
      </div>
    `;
    sliderContainer.parentNode.insertBefore(
      scrollDiv,
      sliderContainer.nextSibling
    );
  }
};

const renderOfferContent = (type, item) => `
  <div class="offer">

     <a href="#"> 
   
      <div class="image-container"><img src="${item.img}" alt="${
  item.title
}"></div> 
      <div class="offer-content">
        <p>${item.category}</p>
        <h3>${item.title}</h3>
      </div>
         </a>
    ${
      item.logo
        ? `
          <div class="logo">
            <img src="${item.logo}" class="offer-logo" alt="">
          </div>
          `
        : ""
    }  
  </div>
`;

const renderGenericContent = (type, item) => `
  <div class="${type.slice(0, -1)}">
  <div class="image-container"> <img src="${item.img}" alt="${
  item.title
}"></div>
   
    <div class="${type.slice(0, -1)}-content">
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    </div>
  </div>
`;
