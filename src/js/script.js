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
          sliderWrapper = document.querySelector('.examples__slider'),
          nextArr = document.querySelector('.examples__slider-arrow_right'),
          slides = document.querySelectorAll('.examples__slide'),
          prevArr = document.querySelector('.examples__slider-arrow_left'),
          sliderWidth = parseInt(window.getComputedStyle(slides[0]).width),
          dotsContainer = document.querySelector('.dots__container_examples'),
          dots = [],
          slidesLength = slides.length;
    
    sliderWrapper.style.width = `${sliderWidth * 2.5}px`

    let slidesCounter = 0,
        offset = 0;
    
    sliderInner.style.width = `${sliderWidth * slides.length}px`;
    
    function changeSlide(n = 0) {
        slidesCounter += n;
        offset += n;
 
        if (slidesCounter > slides.length - 1) slidesCounter = 0;
        if (slidesCounter < 0) slidesCounter = slides.length - 1;

        dots.forEach(dot => {
            dot.classList.remove('dot_active');
        });
        dots[slidesCounter].classList.add('dot_active');
    };

    nextArr.addEventListener('click', () => {
        sliderInner.append(slides[slidesCounter]);
        changeSlide(1);
    });

    prevArr.addEventListener('click', () => {
        changeSlide(-1);
        sliderInner.prepend(slides[slidesCounter])
        
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

    //hamburger menu

    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.header__nav');
        
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('header__nav_active');
        hamburger.classList.toggle('hamburger_active');
    });

    //form

    const form = document.querySelector('.form'),
          inputs = document.querySelectorAll('.form__input'),
          chekbox = document.querySelector('.form__checkbox'),
          response = {
            succes: 'Мы вам перезвоним',
            loading: 'Отправляем...',
            fail: 'Что-то пошло не так'
          },
          total = document.querySelector('.calc__total span'),
          selects = document.querySelectorAll('.calc__select'),
          calcInput = document.querySelector('.kilos-input');

    async function sendData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        })

        return await res.json();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const responseBlock = document.createElement('div');
        responseBlock.textContent = response.loading;
        form.append(responseBlock);

        if (chekbox.checked) {
            selects.forEach(select => {
                select.setAttribute('form', 'data');
            });
            calcInput.setAttribute('form', 'data');
        } else {
            selects.forEach(select => {
                select.setAttribute('form', '');
            });
            calcInput.setAttribute('form', '')
        };


        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        sendData('http://localhost:250/requests', json)
        .then((data) => {
            console.log(data);
            responseBlock.textContent = response.succes;
        })
        .catch(() => {
            responseBlock.textContent = response.fail;
        })
        .finally(() => {
            setTimeout(() => {
                responseBlock.remove();
                inputs.forEach(input => {
                    input.value = '';
                });
            }, 2000)
        })
    });

    //flavors

    const flavorWrapper = document.querySelector('.flavor__content');

    function renderFlavor(title, img, alt, lines) {
        const flavor = document.createElement('div');
        flavor.classList.add('flavor__card');
        flavor.innerHTML = `
        <div class="flavor__card-descr">
        <div class="flavor__card-title">${title}</div>

    </div>
    <img src="${img}" alt="${alt}" class="flavor__card-img">
        `;
        lines.forEach(line => {
            const l = document.createElement('div');
            l.classList.add('flavor__card-line');
            l.textContent = `${line}`;

            flavor.querySelector('.flavor__card-descr').append(l);
        });

        flavorWrapper.append(flavor);
    };


    async function getData(url) {
        const res = await fetch(url);

        return await res.json();
    };

    getData('http://localhost:250/flavors')
    .then(data => {
        data.forEach(({title, img, alt, lines}) => {
            renderFlavor(title, img, alt, lines);
        });
    });


    //calc

    function changeValue() {
    const values = [];

        selects.forEach(select => { 

        if (select.getAttribute('data-size')) {
            if (select.value === 'kilos') {
                calcInput.style.display = 'block';
                values.push(+calcInput.value * 100);
            } else {
                calcInput.style.display = 'none';
            };
        };

        if (!(select.value === 'kilos')) {
            values.push(select.getAttribute('data-price'));
            const vals = select.querySelectorAll('option')
            vals.forEach(val => {
                if (val.value === select.value) {
                    values.push(+val.getAttribute('data-price'));
                }
            })
        };
    });
    
            total.textContent = values.reduce((sum, current) => sum + current);

            document.querySelector('.total-input').value = `${total.textContent}`;
        };

    selects.forEach(select => {
        select.addEventListener('change', () => {
            select.querySelector('option').setAttribute('disabled', 'disabled');

            changeValue();
        });
    });

    calcInput.addEventListener('input', () => {
        changeValue();
    });
    

});