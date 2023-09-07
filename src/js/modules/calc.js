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

export default calc;