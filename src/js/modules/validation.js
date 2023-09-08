import IMask from 'imask';

const validation = (elements, trigger) => {



        function checkText(text) {
            text.value = text.value.replace(/\d/g, '');
        }
        
        function checkNum(num) {
           const mask = new IMask(num, {
                mask: "+{7} (000) 000-00-00",
                lazy: false
              })
        };

    
        elements.forEach(elem => {
            elem.addEventListener('input', () => {
                switch (elem.type) {
                    case 'text': checkText(elem);
                    break;
                    case 'tel': checkNum(elem);
                    break;
                }
            });
        });
    };





export default validation;