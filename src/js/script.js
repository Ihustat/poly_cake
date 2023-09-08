'use stirct'

import accordeon from "./modules/accordeon";
import calc from "./modules/calc";
import flavors from "./modules/flavors";
import form from "./modules/form";
import hamburger from "./modules/hamburger";
import exampleSlider from "./modules/exampleSlider";
import reviewsSlider from "./modules/reviewsSlider";
import modal from "./modules/modal";
import up from "./modules/up";



document.addEventListener('DOMContentLoaded', () => {

   accordeon();
   calc();
   flavors();
   form();
   hamburger();
   exampleSlider(
    '.examples__slider-inner',
    '.examples__slide',
    '.examples__slider-arrow_left',
    '.examples__slider-arrow_right',
    '.dots__container_examples');
    reviewsSlider();
    modal();
    up();


});