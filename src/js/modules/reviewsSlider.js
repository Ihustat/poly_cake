import checkCounter from "./checkCounter";

const reviewsSlider = () => {
    const slides = document.querySelectorAll('.reviews__slide'),
    dotsContainer = document.querySelector('.reviews__dots'),
    dots = [];

    let dotsCounter = 0;
    let sliderTimer = setInterval(() => {
        changeSlide(++dotsCounter);
    }, 5000);
    let touchStart, touchEnd;

    function changeSlideByTouch() {
console.log(touchStart, touchEnd)
        if (touchStart > touchEnd) {
            changeSlide(dotsCounter + 1);
        } else {
            changeSlide(dotsCounter - 1);
        };
    };

    slides.forEach(() => {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    dots.push(dot);

    dotsContainer.append(dot);
    });

    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            clearInterval(sliderTimer);
        });

        slide.addEventListener('touchstart', (e) => {
            touchStart = e.changedTouches[0].screenX;
            console.log('start')
        });
    });

    slides.forEach(slide => {
        slide.addEventListener('mouseleave', () => {
            sliderTimer = setInterval(() => {
                changeSlide(++dotsCounter);
            }, 5000);
        });

        slide.addEventListener('touchend', (e) => {
            touchEnd = e.changedTouches[0].screenX;
             changeSlideByTouch();
             console.log('end')
         });
    });

    function changeSlide(n) {
        dotsCounter = n;

        dotsCounter = checkCounter(dotsCounter, slides.length - 1);
       
        dots.forEach(dot => {
            dot.classList.remove('dot_active');
        });

        dots[dotsCounter].classList.add('dot_active');

        slides.forEach(slide => {
            slide.style.opacity = '0';
        });

        slides[dotsCounter].style.opacity = '1';
    };

    dotsContainer.addEventListener('click', (e) => {
    const target = e.target;

    dots.forEach((dot, i) => {
        if (target && dot === target) {
                changeSlide(i);
            };
        });
    });

    dots[0].click();

};

export default reviewsSlider;