
import { getAnunciosXml } from './../js-async/xml.js';

window.addEventListener('load', getAnunciosXml(crearCards));


function crearCards(dataArray) {

    if (dataArray.length == 0) return null;

    const divCards = document.createElement('div');
    divCards.classList.add('d-grid', 'gap-5', 'py-5');
    const tituloPrincipal = document.createElement('h1');
    tituloPrincipal.classList.add('fw-bold', 'my-0', 'text-center');
    tituloPrincipal.textContent = "Autos en Venta y Alquiler";

    divCards.appendChild(tituloPrincipal);

    dataArray.forEach(element => {
        const divCardItem = document.createElement('div');
        divCardItem.classList.add('d-grid', 'gap-2', 'fs-5', 'p-5');
        const divIcons = document.createElement('div');
        divIcons.classList.add('row', 'justify-content-center');

        for (const key in element) {
            switch (key) {
                case 'titulo':
                    divCardItem.appendChild(crearEtiqueta(element, key, "h3"));
                    break;
                case 'transaccion':
                    divCardItem.appendChild(crearEtiqueta(element, key, "b"));
                    break;
                case 'descripcion':
                    divCardItem.appendChild(crearEtiqueta(element, key, "p"));
                    break;
                case 'precio':
                    divCardItem.appendChild(crearEtiqueta(element, key, "b"));
                    break;
                case 'puertas':
                    divIcons.appendChild(crearDivIcono(element, key));
                    break;
                case 'kilometros':
                    divIcons.appendChild(crearDivIcono(element, key));
                    break;
                case 'potencia':
                    divIcons.appendChild(crearDivIcono(element, key));
                    break;
            }
        }

        divCardItem.appendChild(divIcons);

        const divButton = document.createElement('div');
        divButton.classList.add('row', 'justify-content-center');

        const button = document.createElement('button');
        button.textContent = "Ver vehiculo";
        button.classList.add('col-md-8', 'col-lg-6', 'btn', 'btn-primary')

        divButton.appendChild(button);
        divCardItem.appendChild(divButton);
        divCards.appendChild(divCardItem);
    });

    document.querySelector('section').appendChild(divCards);
}

function crearEtiqueta(element, key, tipo) {
    const etiqueta = document.createElement(`${tipo}`);
    etiqueta.textContent = element[key];

    switch (key) {
        case 'titulo':
            etiqueta.classList.add('m-0', 'h2', 'fw-bold', 'text-capitalize');
            break;
        case 'transaccion':
            etiqueta.classList.add('text-capitalize');
            break;
        case 'descripcion':
            etiqueta.classList.add('m-0');
            break;
        case 'precio':
            etiqueta.classList.add('text-success');
            etiqueta.textContent = "$ " + element[key];
            break;
    }
    return etiqueta;
}

function crearDivIcono(element, key) {
    const divIcono = document.createElement('div');
    divIcono.classList.add('col-sm-4', 'col-md-3', 'col-lg-2', 'text-center', 'p-0');
    const icono = document.createElement('i');

    if (key == "puertas") {
        icono.classList.add('fa-sharp', 'fa-solid', 'fa-door-open');
    } else if (key == "kilometros") {
        icono.classList.add('fa-solid', 'fa-gauge-simple-high');
    } else if (key == "potencia") {
        icono.classList.add('fab', 'fa-searchengin');
    }
    icono.classList.add("me-2");

    const text = document.createElement('b');
    text.textContent = element[key];
    divIcono.appendChild(icono);
    divIcono.appendChild(text);

    return divIcono;
}

