const flavors = () => {
    const flavorWrapper = document.querySelector('.flavor__content');

    function renderFlavor(title, img, alt, lines) {
        const flavor = document.createElement('div');
        flavor.classList.add('flavor__card');
        flavor.innerHTML = `
        <div class="flavor__card-descr">
        <div class="flavor__card-title">${title}</div>

    </div>
    <img src="${img}" alt="${alt}" class="flavor__card-img">
        `;
        lines.forEach(line => {
            const l = document.createElement('div');
            l.classList.add('flavor__card-line');
            l.textContent = `${line}`;

            flavor.querySelector('.flavor__card-descr').append(l);
        });

        flavorWrapper.append(flavor);
    };


    async function getData(url) {
        const res = await fetch(url);

        return await res.json();
    };

    getData('http://localhost:250/flavors')
    .then(data => {
        data.forEach(({title, img, alt, lines}) => {
            renderFlavor(title, img, alt, lines);
        });
    });
};

export default flavors;