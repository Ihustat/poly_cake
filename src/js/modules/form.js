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
        
    let message = `Сообщение о заказе`;

    validation(inputs, btn);

    function createMessage() {

        inputs.forEach(input => {
            message += `
${input.name}: ${input.value};
            `
        });

        if (chekbox.checked) {
            selects.forEach(select => {
                message += `
${select.name}: ${select.value};
                `
            });

            message += `
${calcInput.name}: ${calcInput.value};
            `
        };
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const TOKEN = "6151406167:AAHlicX7RwVWpi53sLRIumF_d4QnblwK3tE";
        const CHAT_ID = "-903266664";
        const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        createMessage();

        const responseBlock = document.createElement('div');
        responseBlock.textContent = response.loading;
        form.append(responseBlock);


        axios.post(URI_API, {
          chat_id: CHAT_ID,
          text: message
        })
        .then(() => {
            responseBlock.textContent = response.succes;
        })
        .catch(() => {
            responseBlock.textContent = response.fail;
        })
        .finally(() => {
            message = `Сообщение о заказе`;
            setTimeout(() => {
                responseBlock.remove();
                inputs.forEach(input => {
                    input.value = '';
                });
            }, 2000)
        });
    });
};

export default form;