import axios from 'axios';
import validation from './validation';

const form = () => {
    const form = document.querySelector('.form'),
          inputs = document.querySelectorAll('.form__input'),
          chekbox = document.querySelector('.form__checkbox'),
          selects = document.querySelectorAll('.calc__select'),
          calcInput = document.querySelector('.kilos-input'),
          btn = document.querySelector('.form__btn'),
          response = {
            succes: 'Мы вам перезвоним',
            loading: 'Отправляем...',
            fail: 'Что-то пошло не так'
          };
        
    let message = '',
        responseBlock;

    

    validation(inputs, btn);

    function createResponseBlock() {
        responseBlock = document.createElement('div');
        responseBlock.textContent = response.loading;
        form.append(responseBlock);
    };

    function createMessage(startMessage) {

        message += `${startMessage};\n`

        inputs.forEach(input => {
            message += `${input.name}: ${input.value};\n`
        });

        if (chekbox.checked) {
            selects.forEach(select => {
                message += `${select.name}: ${select.value};\n`
            });

            message += `${calcInput.name}: ${calcInput.value};\n `
        };
    };

    async function sendData(message) {
        const TOKEN = "6151406167:AAHlicX7RwVWpi53sLRIumF_d4QnblwK3tE";
        const CHAT_ID = "-903266664";
        const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

       const res = await axios.post(URI_API, {
            chat_id: CHAT_ID,
            text: message
          });

        return await new Promise(function(resolve) {
            resolve(message);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();


        createMessage('Сообщение о заказе');
        createResponseBlock();
        


        sendData(message)
        .then(() => {
            responseBlock.textContent = response.succes;
        })
        .catch((e) => {
            console.log(e)
            responseBlock.textContent = response.fail;
        })
        .finally(() => {
            message = `Сообщение о заказе`;
            setTimeout(() => {
                responseBlock.remove();
                inputs.forEach(input => {
                    input.value = '';
                });
                chekbox.checked = false;
            }, 3000)
        });
    });
};

export default form;