import checkCounter from "./checkCounter";

const exampleSlider = (sliderInn, slides, prArr, nxtArr,) => {
    const sliderInner = document.querySelector(sliderInn),
          allSlides = document.querySelectorAll(slides),
          prevArr = document.querySelector(prArr),
          nextArr = document.querySelector(nxtArr),
          sliderWidth = parseInt(window.getComputedStyle(allSlides[0]).width);
        
    let slidesCounter = 0,
        touchStart, touchEnd;

    sliderInner.style.width = `${sliderWidth * slides.length}px`;

    function changeSlide(n = 0) {
        slidesCounter += n;
 
        slidesCounter = checkCounter(slidesCounter, allSlides.length - 1);
    };

    function changeSlideByTouch() {

        if (touchStart > touchEnd) {
            sliderInner.append(allSlides[slidesCounter]);
            changeSlide(1);
        } else {
            changeSlide(-1);
            sliderInner.prepend(allSlides[slidesCounter]);
        };
    };

        nextArr.addEventListener('click', () => {
            sliderInner.append(allSlides[slidesCounter]);
            changeSlide(1);
        });

        prevArr.addEventListener('click', () => {
            changeSlide(-1);
            sliderInner.prepend(allSlides[slidesCounter]);
        });

        sliderInner.addEventListener('touchstart', (e) => {
            touchStart = e.changedTouches[0].screenX;
        });
        sliderInner.addEventListener('touchend', (e) => {
           touchEnd = e.changedTouches[0].screenX;
            changeSlideByTouch();
        });


    changeSlide();
};

export default exampleSlider;