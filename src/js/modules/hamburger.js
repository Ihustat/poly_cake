const hamburger = () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.header__nav');
        
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('header__nav_active');
        hamburger.classList.toggle('hamburger_active');
    });
};

export default hamburger;