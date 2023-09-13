import IMask from 'imask';

const validation = (elements, trigger) => {

        let isMaskFull = false;
        let isInputFull = false;

        function checkText(text) {
            text.value = text.value.replace(/\d/g, '');
        }
        
        function checkNum(num) {
           const mask = new IMask(num, {
                mask: "+{7} (000) 000-00-00",
                lazy: false
              })

              mask.masked.isComplete ? isMaskFull = true : isMaskFull = false;
        };

        function checkFull() {
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].value === '') {
                    isInputFull = false;
                    break;
                } else {
                    isInputFull = true;
                };
            };

            if (isMaskFull && isInputFull) {
                trigger.style.opacity = '1';
                trigger.removeAttribute('disabled');
            } else {
                trigger.style.opacity = '0.4';
                trigger.setAttribute('disabled', true);
            };
        };

    
        elements.forEach(elem => {
            elem.addEventListener('input', () => {
                switch (elem.type) {
                    case 'text': checkText(elem);
                    break;
                    case 'tel': checkNum(elem);
                    break;
                };

                checkFull();
            });
        });
    };







export default validation;