const form = () => {
    const form = document.querySelector('.form'),
          inputs = document.querySelectorAll('.form__input'),
          chekbox = document.querySelector('.form__checkbox'),
          selects = document.querySelectorAll('.calc__select'),
          calcInput = document.querySelector('.kilos-input'),
          response = {
            succes: 'Мы вам перезвоним',
            loading: 'Отправляем...',
            fail: 'Что-то пошло не так'
          };

    async function sendData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        })

        return await res.json();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const responseBlock = document.createElement('div');
        responseBlock.textContent = response.loading;
        form.append(responseBlock);

        if (chekbox.checked) {
            selects.forEach(select => {
                select.setAttribute('form', 'data');
            });
            calcInput.setAttribute('form', 'data');
        } else {
            selects.forEach(select => {
                select.setAttribute('form', '');
            });
            calcInput.setAttribute('form', '')
        };


        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        sendData('http://localhost:250/requests', json)
        .then((data) => {
            console.log(data);
            responseBlock.textContent = response.succes;
        })
        .catch(() => {
            responseBlock.textContent = response.fail;
        })
        .finally(() => {
            setTimeout(() => {
                responseBlock.remove();
                inputs.forEach(input => {
                    input.value = '';
                });
            }, 2000)
        })
    });
};

export default form;