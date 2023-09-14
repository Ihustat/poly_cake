const hamburger = () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.header__nav'),
          overlay = document.querySelector('.overlay'),
          headerNav = document.querySelector('.header__nav');

    function openMenu() {
        menu.classList.add('header__nav_active');
        hamburger.classList.add('hamburger_active');
        overlay.classList.add('overlay_active');
        document.documentElement.style.overflow = 'hidden';
    };

    function closeMenu() {
        menu.classList.remove('header__nav_active');
        hamburger.classList.remove('hamburger_active');
        overlay.classList.remove('overlay_active');
        document.documentElement.style.overflow = '';
    };
        
    hamburger.addEventListener('click', () => {
        hamburger.classList.contains('hamburger_active') ? closeMenu() : openMenu();
    });

    headerNav.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('nav__list-link')) {
            closeMenu();
        };
    });


};

export default hamburger;