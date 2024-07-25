const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //   console.log(entry.target);
      entry.target.classList.add("showing");
    } else entry.target.classList.remove("showing");
  });
});

const hiddenElements = document.querySelectorAll(".hide");
hiddenElements.forEach((element) => observer.observe(element));
