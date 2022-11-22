function validarStringVacio(text) {
  if (text.trim().length == 0) {
    return true;
  }
  return false;
}

const regex = {
  titulo : /^[aA0-zZ9À-ÿ\u00f1\u00d1\s]{6,30}$/,
  descripcion: /^[aA0-zZ9À-ÿ\u00f1\u00d1\s]{6,50}$/,
  precio: /^[0-9]{5,}$/,
  puertas: /^[245]$/,
  kilometros: /^[0-9]{0,6}$/,
  potencia: /^[0-9]{2,3}$/,
  
  email: /^[aA0-zZ9]+@[aA-zZ]+\.[aA-zZ]{2,3}(\.[aA-zZ]{2,3})?$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
}


function setCampoError(input) {
  if(input.classList.contains('is-valid')){
    input.classList.replace('is-valid', 'is-invalid');
  }
  else{
    input.classList.add('is-invalid');
  }

}
function removeCampoError(input) {
  if(input.classList.contains('is-invalid')){
    input.classList.replace('is-invalid', 'is-valid');
  }
  else{
    input.classList.add('is-valid');
  }
}

export const validarCampos = (e) => {

  const input = (e.type == "text") ? e : e.target; //si e es de tipo text significa que es el input, sino, es un evento
  const valor = input.value;
  const valorInt = parseInt(valor);

  switch(input.name){
    case 'titulo':
      (!validarStringVacio(valor) && regex.titulo.test(valor)) ? removeCampoError(input) : setCampoError(input);
      break;
    case 'descripcion':
      (!validarStringVacio(valor) && regex.descripcion.test(valor)) ? removeCampoError(input) : setCampoError(input);
      break;
    case 'precio':
      (!validarStringVacio(valor) && regex.precio.test(valor)) ? removeCampoError(input) : setCampoError(input);
      break;
    case 'puertas':
      (!validarStringVacio(valor) && regex.puertas.test(valor)) ? removeCampoError(input) : setCampoError(input);
      break;
    case 'kilometros':
      (!validarStringVacio(valor) && regex.kilometros.test(valor) && valorInt <= 200000) ? removeCampoError(input) : setCampoError(input);
      break;
    case 'potencia':
      (!validarStringVacio(valor) && regex.potencia.test(valor) && (valorInt >= 50 && valorInt <=300)) ? removeCampoError(input) : setCampoError(input);
      break;
  }

}

export function validarRadios(radios) {
  let itemCheck = null;
  for (let i = 0; i < radios.length; i++) {
    const item = radios[i];
    if (item.checked) {
      itemCheck = item;
      break;
    }
  }  
  (itemCheck == null) ? setRadioError(radios) : removeRadioError(radios, itemCheck);
}

export const validarEventRadios = (e) => {
  const input = e.target;
  const transacciones = document.forms[0].transaccion;
  removeRadioError(transacciones, input);
  
}

//#region VALIDACIONES RADIOS INTERNAS
function setRadioError(radios) {
  radios.forEach(element => {
    setCampoError(element);
  });
}

function removeRadioError(inputsArray, input) {
  inputsArray.forEach(element => {
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
  });
  input.classList.add('is-valid');
}

//#endregion
