import checkCounter from "./checkCounter";

const exampleSlider = (sliderInn, slides, prArr, nxtArr,) => {
    const sliderInner = document.querySelector(sliderInn),
          allSlides = document.querySelectorAll(slides),
          prevArr = document.querySelector(prArr),
          nextArr = document.querySelector(nxtArr),
          sliderWidth = parseInt(window.getComputedStyle(allSlides[0]).width);
        
    let slidesCounter = 0;

    sliderInner.style.width = `${sliderWidth * slides.length}px`;

    function changeSlide(n = 0) {
        slidesCounter += n;
 
        slidesCounter = checkCounter(slidesCounter, allSlides.length - 1);
    };

        nextArr.addEventListener('click', () => {
            sliderInner.append(allSlides[slidesCounter]);
            changeSlide(1);
        });

        prevArr.addEventListener('click', () => {
            changeSlide(-1);
            sliderInner.prepend(allSlides[slidesCounter]);
        });

    changeSlide();
};

export default exampleSlider;