const accordeon = () => {
    const lines = document.querySelectorAll('.questions__line'),
          questionsText = document.querySelectorAll('.questions__text'),
          questionsArrow = document.querySelectorAll('.questions__line-arrow'),
          heights = [];

questionsText.forEach(text => {
  heights.push(parseInt(window.getComputedStyle(text).height));
  text.style.height = 0;
});

lines.forEach((line, i) => {
  line.addEventListener('click', (e) => {
      questionsText[i].classList.toggle('questions__text-active');
      questionsArrow[i].classList.toggle('rotate');
      if (questionsText[i].classList.contains('questions__text-active')) {
          questionsText[i].style.height = `${heights[i] + 13}px`;
      } else {
          questionsText[i].style.height = 0;
      };
  });
});
};

export default accordeon;

