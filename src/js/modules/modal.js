const modal = () => {
    const trigger = document.querySelector('.gift'),
          modal = document.querySelector('.modal'),
          promoBtn = document.querySelector('.modal__btn'),
          promoCode = 'IWANTCAKE';

    let isOpen = false,
        modalTimer;

    function openModal() {
        modal.style.display = 'block';
        document.documentElement.style.overflow = 'hidden';
        trigger.remove();
        isOpen = true;
        clearInterval(modalTimer);
    };

    function closeModal() {
        modal.style.display = 'none';
        document.documentElement.style.overflow = '';
    };

    trigger.addEventListener('click', () => { 
        openModal();
    });

    modal.addEventListener('click', (e) => {
        const target = e.target;

        if (target && (target === modal || target.classList.contains('modal__close'))) {
            closeModal();
        };
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        };
    });

    promoBtn.addEventListener('click', () =>{ 
        document.querySelector('.calc__input').value = promoCode;
        closeModal();

        const coords = document.querySelector('.calc').offsetTop;

        window.scrollTo(0, coords)
    });

    // function showModalByTime() {
    //     modalTimer = setTimeout(() => {
    //         openModal();
    //     }, 3000);
    // };

    function modalObserverCallback(entries, observer){
        if (!isOpen && entries[0].isIntersecting) {
            openModal();
        };
    };

    const modalObserverOptions = {
        root: null,
        threshold: .9
    };

    const modalObserver = new IntersectionObserver(modalObserverCallback, modalObserverOptions);

    modalObserver.observe(document.querySelector('.calc'));
};

export default modal;