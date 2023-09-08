const modal = () => {
    const trigger = document.querySelector('.gift'),
          modal = document.querySelector('.modal'),
          promoBtn = document.querySelector('.modal__btn'),
          promoCode = 'IWANTCAKE';

    function openModal() {
        modal.style.display = 'block';
        document.documentElement.style.overflow = 'hidden';
        trigger.remove();
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
    });
};

export default modal;