const calc = () => {
    const total = document.querySelector('.calc__total span'),
          selects = document.querySelectorAll('.calc__select'),
          calcInput = document.querySelector('.kilos-input'),
          promo = document.querySelector('.calc__input');

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

        let totalSum = 0;
        
        totalSum = values.reduce((sum, current) => sum + current);

        promo.value === 'IWANTCAKE' ? total.textContent = totalSum * .9 : total.textContent = totalSum;

            document.querySelector('.total-input').value = `${+total.textContent}`;
 

        // promo.value === 'IWANTCAKE' ? document.querySelector('.total-input').value = `${total.textContent * .9}` : document.querySelector('.total-input').value = `${total.textContent}`;

    };
    
        selects.forEach(select => {
            select.addEventListener('change', () => {
                select.querySelector('option').setAttribute('disabled', 'disabled');
    
                changeValue();
            });
        });

        promo.addEventListener('input', () => {
            changeValue();
        });
    
        calcInput.addEventListener('input', () => {
            changeValue();
        });
        
};

export default calc;