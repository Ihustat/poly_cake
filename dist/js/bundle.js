/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordeon.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordeon.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accordeon);



/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = () => {
    const total = document.querySelector('.calc__total span'),
          selects = document.querySelectorAll('.calc__select'),
          calcInput = document.querySelector('.kilos-input');

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
            const vals = select.querySelectorAll('option');
            vals.forEach(val => {
                if (val.value === select.value) {
                    values.push(+val.getAttribute('data-price'));
                    };
                });
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
        
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/checkCounter.js":
/*!****************************************!*\
  !*** ./src/js/modules/checkCounter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const checkCounter = (counter, length) => {
    if (counter > length) {
        return 0;
    } else if (counter < 0) {
        return length;
    } else {
        return counter;
    };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkCounter);

/***/ }),

/***/ "./src/js/modules/exampleSlider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/exampleSlider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkCounter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkCounter */ "./src/js/modules/checkCounter.js");


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
 
        slidesCounter = (0,_checkCounter__WEBPACK_IMPORTED_MODULE_0__["default"])(slidesCounter, allSlides.length - 1);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (exampleSlider);

/***/ }),

/***/ "./src/js/modules/flavors.js":
/*!***********************************!*\
  !*** ./src/js/modules/flavors.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const flavors = () => {
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
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flavors);

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const form = () => {
    const form = document.querySelector('.form'),
          inputs = document.querySelectorAll('.form__input'),
          chekbox = document.querySelector('.form__checkbox'),
          selects = document.querySelectorAll('.calc__select'),
          calcInput = document.querySelector('.kilos-input'),
          response = {
            succes: 'Мы вам перезвоним',
            loading: 'Отправляем...',
            fail: 'Что-то пошло не так'
          };

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
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/js/modules/hamburger.js":
/*!*************************************!*\
  !*** ./src/js/modules/hamburger.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const hamburger = () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.header__nav');
        
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('header__nav_active');
        hamburger.classList.toggle('hamburger_active');
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hamburger);

/***/ }),

/***/ "./src/js/modules/reviewsSlider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/reviewsSlider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkCounter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkCounter */ "./src/js/modules/checkCounter.js");


const reviewsSlider = () => {
    const slides = document.querySelectorAll('.reviews__slide'),
    dotsContainer = document.querySelector('.reviews__dots'),
    dots = [];

    let dotsCounter = 0;
    let sliderTimer = setInterval(() => {
        changeSlide(++dotsCounter);
    }, 5000);

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
    });

    slides.forEach(slide => {
        slide.addEventListener('mouseleave', () => {
            sliderTimer = setInterval(() => {
                changeSlide(++dotsCounter);
            }, 5000);
        });
    });

    function changeSlide(n) {
        dotsCounter = n;

        dotsCounter = (0,_checkCounter__WEBPACK_IMPORTED_MODULE_0__["default"])(dotsCounter, slides.length - 1);
       
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reviewsSlider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_accordeon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/accordeon */ "./src/js/modules/accordeon.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_flavors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/flavors */ "./src/js/modules/flavors.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_hamburger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/hamburger */ "./src/js/modules/hamburger.js");
/* harmony import */ var _modules_exampleSlider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/exampleSlider */ "./src/js/modules/exampleSlider.js");
/* harmony import */ var _modules_reviewsSlider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/reviewsSlider */ "./src/js/modules/reviewsSlider.js");
'use stirct'

;








document.addEventListener('DOMContentLoaded', () => {
 ///accordeon
   (0,_modules_accordeon__WEBPACK_IMPORTED_MODULE_0__["default"])();
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
   (0,_modules_flavors__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])();
   (0,_modules_hamburger__WEBPACK_IMPORTED_MODULE_4__["default"])();
   (0,_modules_exampleSlider__WEBPACK_IMPORTED_MODULE_5__["default"])(
    '.examples__slider-inner',
    '.examples__slide',
    '.examples__slider-arrow_left',
    '.examples__slider-arrow_right',
    '.dots__container_examples');
    (0,_modules_reviewsSlider__WEBPACK_IMPORTED_MODULE_6__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map