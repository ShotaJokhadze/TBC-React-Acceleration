function renderBanner(container, banner) {
  container.innerHTML = `
      <div class="container">
          <div class="banner" style="background-image: url(${banner.imgPath});">
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

export const initializeBanners = (data) => {
  const homeHeroSections = document.querySelectorAll(".hero-banner");

  homeHeroSections.forEach((section, index) => {
    renderBanner(section, data.banners[index]);
  });
};
