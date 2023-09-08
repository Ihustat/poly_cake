const up = () => {
    const upBtn = document.querySelector('.up');

    window.addEventListener('scroll', () => {
        window.scrollY > 400 ? upBtn.style.opacity = '1' :  upBtn.style.opacity = '0';
    });

    upBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
};

export default up;