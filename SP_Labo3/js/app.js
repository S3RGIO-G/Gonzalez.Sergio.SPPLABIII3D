
import { CrearTabla } from './tabla.js';
import { validarCampos, validarRadios, validarEventRadios } from './validaciones.js';
import { Anuncio_Auto } from './Entidades.js';
import { updateAnuncioAsyncFetch, postAnuncioAsyncFetch } from '../js-async/fetch.js';
import { getAnuncioAsyncAxios, deleteAnuncioAsyncAxios } from '../js-async/axios.js';
import { getAnunciosXml } from '../js-async/xml.js';


const $divTabla = document.querySelector("#divTabla");
const $contenedor = document.querySelector("section");
const formulario = document.forms[0];
const { titulo, transaccion, descripcion, precio, puertas, kilometros, potencia } = formulario;
const spinner = document.querySelector('.spinner');
const fondoSpinner = document.querySelector('.fondoSpinner');
let seleccion = null;

ActualizarTabla();

for (let i = 0; i < formulario.length; i++) {
  let item = formulario[i];
  if (item.matches('input[type="text"]')) {
    item.addEventListener('blur', validarCampos);
    item.addEventListener('keyup', validarCampos);
  } else if (item.matches('input[type="radio"]')) {
    item.addEventListener('change', validarEventRadios);
  }
}

formulario.addEventListener('submit', (e) => { //Quito la posibilidad de que el usuario modifique el input a tipo submit
  e.preventDefault();
});

$contenedor.addEventListener('click', async (e) => {
  const emisor = e.target;

  if (emisor.matches('tbody tr td')) {

    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');

    let id = parseInt(emisor.parentElement.dataset.id);

    seleccion = await getAnuncioAsyncAxios(id);

    setearCampos(seleccion);
    validarInputs(formulario)
    MostrarBotones();

    fondoSpinner.classList.remove('activarSpinner');
    spinner.classList.remove('activarSpinner');
  }
  else if (emisor.matches('[id="btnAgregar"]') && seleccion == null && validarInputs(formulario)) {
    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');

    let transaccion = document.querySelector('input[name="transaccion"]:checked').value;

    let anuncio = new Anuncio_Auto(titulo.value, transaccion, descripcion.value, precio.value, puertas.value, kilometros.value, potencia.value);
    await postAnuncioAsyncFetch(anuncio);

    fondoSpinner.classList.remove('activarSpinner');
    spinner.classList.remove('activarSpinner');
  }
  else if (emisor.matches('[id="btnCancelar"]')) {
    seleccion = null;
    resetearCampos();
    resetearEstilos();
    QuitarBotones();
  }
  else if (emisor.matches('[id="btnGuardar"]') && seleccion != null && validarInputs(formulario)) {

    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');

    const transaccion = document.querySelector('input[name="transaccion"]:checked').value;

    seleccion.titulo = titulo.value;
    seleccion.transaccion = transaccion;
    seleccion.descripcion = descripcion.value;
    seleccion.precio = precio.value;
    seleccion.puertas = puertas.value;
    seleccion.kilometros = kilometros.value;
    seleccion.potencia = potencia.value;

    await updateAnuncioAsyncFetch(seleccion);

    fondoSpinner.classList.remove('activarSpinner');
    spinner.classList.remove('activarSpinner');

  }
  else if (emisor.matches("#btnEliminar") && seleccion != null) {

    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');

    await deleteAnuncioAsyncAxios(seleccion.id);

    fondoSpinner.classList.remove('activarSpinner');
    spinner.classList.remove('activarSpinner');
  }
});

function validarInputs(form) {
  for (let i = 0; i < form.length; i++) {
    const item = form[i];
    if (item.matches('input[type="text"]')) {
      validarCampos(form[i]);
    }
  }
  validarRadios(form.transaccion);

  for (let i = 0; i < form.length; i++) {
    const item = form[i];
    if (item.matches('input') && item.classList.contains('is-invalid')) {
      return false;
    }
  }
  return true;
}

//#region RESET Y SET
function resetearEstilos() {
  for (let i = 0; i < form.length; i++) {
    const input = form[i];
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
  }
}

function resetearCampos() {
  titulo.value = "";
  descripcion.value = "";
  transaccion[0].checked = false;
  transaccion[1].checked = false;
  precio.value = "";
  puertas.value = "";
  kilometros.value = "";
  potencia.value = "";
}

function setearCampos(item) {
  titulo.value = item.titulo;
  descripcion.value = item.descripcion;
  (item.transaccion == "venta") ? transaccion[0].checked = true : transaccion[0].checked = false;
  (item.transaccion == "alquiler") ? transaccion[1].checked = true : transaccion[1].checked = false;
  precio.value = item.precio;
  puertas.value = item.puertas;
  kilometros.value = item.kilometros;
  potencia.value = item.potencia;
}
//#endregion

//#region BOTONES
function MostrarBotones() {
  document.querySelector("#btnAgregar").classList.add("d-none");
  document.querySelector("#btnGuardar").classList.remove("d-none");
  document.querySelector("#btnEliminar").classList.remove("d-none");
}

function QuitarBotones() {
  document.querySelector("#btnAgregar").classList.remove("d-none");
  document.querySelector("#btnGuardar").classList.add("d-none");
  document.querySelector("#btnEliminar").classList.add("d-none");
}
//#endregion

//#region TABLA
async function ActualizarTabla() {
  try {
    EliminarTabla();
    getAnunciosXml(cargarTabla);
  } catch (err) {
    console.error(err.message);
  }  
}

function cargarTabla(datos){
  if (datos.length > 0) $divTabla.appendChild(CrearTabla(datos));
}

function EliminarTabla() {
  if ($divTabla.hasChildNodes()) {
    $divTabla.removeChild($divTabla.lastChild);
  }
}



