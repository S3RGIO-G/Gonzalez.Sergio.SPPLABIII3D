import { getAnunciosXml } from '../js-async/xml.js';
import { CrearTabla } from './tabla.js';

const $divTabla = document.querySelector("#divTabla");
const spinner = document.querySelector('.spinner');
const fondoSpinner = document.querySelector('.fondoSpinner');
const select = document.querySelector('select');
const txtPromedio = document.querySelector('#txtPromedio');
const URL = "http://localhost:3000/anuncios";


document.querySelector('button').addEventListener('click', (e) => {

  fondoSpinner.classList.add('activarSpinner');
  spinner.classList.add('activarSpinner');
  select.disabled = true;

  getAnunciosXml(filtrarTabla);
});


function EliminarTabla() {
  if ($divTabla.hasChildNodes()) {
    $divTabla.removeChild($divTabla.lastChild);
  }
}

function filtrarTabla($datos) {

  EliminarTabla();

  const selected = select.selectedOptions[0].value;

  let arrayCheckboxes = Array.apply(null, document.querySelectorAll('input[type="checkbox"]:checked'));
  let arrayMap = arrayCheckboxes.map((value) => { return value.name });

  const datosFiltrados = $datos.filter((item) => {
    return (selected == 'todos' || item.transaccion == selected) ? true : false;
  });

  let newTable = datosFiltrados.map((dato) => {
    let obj = {};
    for (const key in dato) {
      if (!arrayMap.includes(key) && key != 'id') continue;
      obj[key] = dato[key];
    }
    return obj;
  });

  const promedio = datosFiltrados.reduce((prev, actual) => {
    return prev + parseInt(actual.precio);
  }, 0) / datosFiltrados.length;


  (arrayCheckboxes.length > 0) ? txtPromedio.value = promedio : txtPromedio.value = 'NaN';

  if (newTable.length > 0) $divTabla.appendChild(CrearTabla(newTable));
  
  fondoSpinner.classList.remove('activarSpinner');
  spinner.classList.remove('activarSpinner');
  select.disabled = false;
}

