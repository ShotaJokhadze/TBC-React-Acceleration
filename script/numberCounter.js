const container = document.querySelector(".numbers-content");

export const renderCounters = (data) => {
  const { counters } = data;

  container.innerHTML = counters
    .map(
      ({ value, label }) =>
        `<div class="number">
          <h3 class="value">${"0".repeat(value.toLocaleString().length)}</h3>
          <p>${label}</p>
        </div>`
    )
    .join("");

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });
  observer.observe(container);

  function handleIntersection([entry]) {
    entry.isIntersecting ? startCounters(counters) : resetCounters(counters);
  }
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const animateValue = (number, endValue, addPlusSign = false) => {
  let startValue = 0;
  const duration = 2000;
  const increment = endValue > 20000 ? 450 : endValue > 100 ? 4 : 1;
  const steps = Math.ceil(endValue / increment);
  const stepDuration = duration / steps;

  const timer = setInterval(() => {
    startValue = Math.min(startValue + increment, endValue);

    if (startValue === endValue) {
      clearInterval(timer);
    }

    number.textContent = formatNumber(startValue) + (addPlusSign ? "+" : "");
  }, stepDuration);
};

const startCounters = (counterData) => {
  container.querySelectorAll(".value").forEach((number, index) => {
    const { value } = counterData[index];
    animateValue(number, value, index === 1 || index === 2);
  });
};

const resetCounters = (counterData) => {
  container.querySelectorAll(".value").forEach((number, index) => {
    const { value } = counterData[index];
    number.textContent = "0".repeat(formatNumber(value).length);
  });
};
