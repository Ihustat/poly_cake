'use stirct'
document.addEventListener('DOMContentLoaded', () => {

 ///accordeon
 
    const questionsWrapper = document.querySelector('.questions__content'),
          lines = document.querySelectorAll('.questions__line'),
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

    //examples slider

    const sliderInner = document.querySelector('.examples__slider-inner'),
          nextArr = document.querySelector('.examples__slider-arrow_right'),
          slides = document.querySelectorAll('.examples__slide'),
          prevArr = document.querySelector('.examples__slider-arrow_left'),
          sliderWidth = parseInt(window.getComputedStyle(slides[0]).width),
          dotsContainer = document.querySelector('.dots__container_examples'),
          dots = [];

    let slidesCounter = 0;
    
    sliderInner.style.width = `${sliderWidth * slides.length}px`;
    
    function changeSlide(n = 0) {
        slidesCounter += n;
        if (slidesCounter > slides.length - 1) slidesCounter = 0;
        if (slidesCounter < 0) slidesCounter = slides.length - 1;

        dots.forEach(dot => {
            dot.classList.remove('dot_active');
        });
        dots[slidesCounter].classList.add('dot_active');

        sliderInner.style.transform = `translateX(-${slidesCounter * sliderWidth}px)`;
    };

    nextArr.addEventListener('click', () => {
        changeSlide(1);
    });

    prevArr.addEventListener('click', () => {
        changeSlide(-1);
    });

    slides.forEach(slide => {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        dots.push(dot);

        dotsContainer.append(dot);
    });

    dotsContainer.addEventListener('click', (e) => {
        const target = e.target;

        dots.forEach((dot, i) => {
            if (target && dot === target) {
                slidesCounter = 0;
                changeSlide(i);
            };
        });
    });

    changeSlide();

    //reviews slider

    const rSlides = document.querySelectorAll('.reviews__slide'),
          rDotsContainer = document.querySelector('.reviews__dots'),
          rDots = [];

    rSlides.forEach(slide => {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        rDots.push(dot);

        rDotsContainer.append(dot);
    });

    rDotsContainer.addEventListener('click', (e) => {
        const target = e.target;

        rDots.forEach((dot, i) => {
            dot.classList.remove('dot_active');
            if (target && dot === target) {
                dot.classList.add('dot_active');
                rSlides.forEach(slide => {
                    slide.style.display = 'none';
                });

                rSlides[i].style.display = 'flex';
            };
        });
    });

    rDots[0].click();
});