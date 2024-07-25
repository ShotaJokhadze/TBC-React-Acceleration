export function initializeSlider(sliderClass) {
  const slider = document.querySelector(sliderClass);

  const sliderInner = slider.querySelector(".slider-inner");

  const scrollbarButtons = document.querySelector(
    `[data-slider="${sliderClass.slice(1)}"]`
  );

  const prevButton = scrollbarButtons.querySelector(".prev-slide");
  const nextButton = scrollbarButtons.querySelector(".next-slide");

  const slides = sliderInner.querySelectorAll(".product, .offer, .award");

  let slideWidth;
  let scrollAmount;
  let visibleWidth;

  function calculateSlideWidth() {
    slideWidth = slides[0].getBoundingClientRect().width + 20; // Gap
    visibleWidth = slider.getBoundingClientRect().width;
    if (window.innerWidth >= 992) {
      scrollAmount = Math.max(slideWidth, visibleWidth / 2);
    } else {
      scrollAmount = slideWidth;
    }
  }

  calculateSlideWidth();

  window.addEventListener("resize", calculateSlideWidth);

  prevButton.onclick = function () {
    sliderInner.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  nextButton.onclick = function () {
    // console.log(scrollAmount);
    sliderInner.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  let progressBar = null;
  if (scrollbarButtons.nextElementSibling) {
    progressBar =
      scrollbarButtons.nextElementSibling.querySelector(".progress-inner");
  }

  function updateProgressBar() {
    if (progressBar) {
      const maxScroll = sliderInner.scrollWidth - sliderInner.clientWidth;
      const scrollPercent = (sliderInner.scrollLeft / maxScroll) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }
  }

  sliderInner.onscroll = updateProgressBar;
  updateProgressBar();
}
