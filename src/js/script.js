'use stirct'
document.addEventListener('DOMContentLoaded', () => {

 ///accordeon
 
    const questionsWrapper = document.querySelector('.questions__content'),
          questionsText = document.querySelectorAll('.questions__text'),
          questionsArrow = document.querySelectorAll('.questions__line-arrow'),
          heights = [];

    questionsText.forEach(text => {
        heights.push(parseInt(window.getComputedStyle(text).height));
        text.style.height = 0;
    });

    questionsWrapper.addEventListener('click', (e) => {
        const target = e.target;
        questionsArrow.forEach((arrow, i) => {
            if (target && target === arrow) {
                questionsText[i].classList.toggle('questions__text-active');
                arrow.classList.toggle('rotate');
                if (questionsText[i].classList.contains('questions__text-active')) {
                    questionsText[i].style.height = `${heights[i] + 13}px`;
                } else {
                    questionsText[i].style.height = 0;
                };
            };
        });
    });
});