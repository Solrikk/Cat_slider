document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");
  let currentSectionIndex = 0;
  let isAnimating = false;

  function scrollToSection(index) {
    if (isAnimating) return;
    isAnimating = true;

    const currentSection = sections[currentSectionIndex];
    const nextSection = sections[index];
    const direction = index > currentSectionIndex ? "next" : "prev";

    currentSection.classList.add(`slide-out-${direction}`);
    nextSection.classList.add(`slide-in-${direction}`);

    nextSection.style.display = "flex";
    nextSection.style.opacity = 0;

    setTimeout(function() {
      currentSection.classList.remove(`slide-out-${direction}`);
      nextSection.classList.remove(`slide-in-${direction}`);
      currentSection.style.display = "none";
      nextSection.style.opacity = 1;
      isAnimating = false;
      currentSectionIndex = index;
    }, 1000);
  }

  scrollToSection(currentSectionIndex);

  window.addEventListener("wheel", function(event) {
    if (event.deltaY > 0) {
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < sections.length) {
        scrollToSection(nextSectionIndex);
      }
    } else if (event.deltaY < 0) {
      const prevSectionIndex = currentSectionIndex - 1;
      if (prevSectionIndex >= 0) {
        scrollToSection(prevSectionIndex);
      }
    }
  });
});