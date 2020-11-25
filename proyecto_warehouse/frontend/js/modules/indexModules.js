export const host = "localhost:3000";
export const token = localStorage.getItem("token");
export let seccionUsuarios = document.getElementById("usuarios");
export let seccionRegiones = document.getElementById("regiones");
export let seccionContactos = document.getElementById("contactos");
export const divSinPermiso = document.getElementById("sin-permiso");
export const modalBg = document.querySelector(".modal-bg");
export const modalCrud = document.getElementById("modal-crud");

//FUNCIÓN PARA DEJAR DE RESALTAR UNA SECCIÓN DEL NAV

export const removeActive = () => {
  let navItem = document.getElementsByClassName("nav-item");

  for (let item of navItem) {
    if (item.className === "nav-item item-habilitado")
      return item.classList.remove("item-habilitado");
  }
};

//FUNCIÓN QUE CHEQUEA SI EL USUARIO LLENÓ TODOS LOS CAMPOS REQUERIDOS

export const checkInputs = (data, inputs, dataSmall) => {
  const { email, password, nombre, apellido, confirm_password } = data;

  const {
    nombreInput,
    apellidoInput,
    emailInput,
    passwordInput,
    confirmInput,
    emailInputModify,
    nombreInputModify,
    apellidoInputModify,
    inputRegion,
    inputCountry,
    inputCities,
    inputCity,
  } = inputs;

  if (!data.nombreRegion && inputRegion) inputRegion.classList.add("invalid");

  if (data.paises) {
    if (!data.paises[0].nombrePais && inputCountry)
      inputCountry.classList.add("invalid");
    if (!data.paises[0].ciudades[0].nombreCiudad && inputCities)
      inputCities[0].classList.add("invalid");
  }

  if (Object.keys(data)[0] === "nombrePais") {
    if (!data.nombrePais && inputCountry) inputCountry.classList.add("invalid");
    if (data.ciudades) {
      if (!data.ciudades[0].nombreCiudad && inputCities)
        inputCities[0].classList.add("invalid");
    }
  }

  if (Object.keys(data)[0] === "idPais")
    inputCities[0].classList.add("invalid");

  if (!email && emailInput) emailInput.classList.add("invalid");

  if (!email && emailInputModify) emailInputModify.classList.add("invalid");

  if (!password && passwordInput) passwordInput.classList.add("invalid");

  if (!nombre && nombreInput) nombreInput.classList.add("invalid");

  if (!nombre && nombreInputModify) nombreInputModify.classList.add("invalid");

  if (!apellido && apellidoInput) apellidoInput.classList.add("invalid");

  if (!apellido && apellidoInputModify)
    apellidoInputModify.classList.add("invalid");

  if (!confirm_password && confirmInput) confirmInput.classList.add("invalid");

  return (dataSmall.innerHTML = "Ingrese todos los datos requeridos");
};

//FUNCIÓN PARA RESETEAR LOS ESTILOS DE TODOS LOS INPUTS Y EL CONTENIDO DE SUS SMALLS

export const resetInputsStyles = (inputs, smalls) => {
  const {
    nombreInput,
    apellidoInput,
    emailInput,
    passwordInput,
    confirmInput,
    emailInputModify,
    nombreInputModify,
    apellidoInputModify,
    inputRegion,
    inputCountry,
    inputCities,
    inputCity,
  } = inputs;

  const {
    nombreSmall,
    apellidoSmall,
    emailSmall,
    passwordSmall,
    confirmSmall,
    dataSmall,
    nombreSmallModify,
    apellidoSmallModify,
    emailSmallModify,
    dataSmallModify,
    smallRegion,
    smallCountry,
    smallCities,
    smallCity,
    smallDataEmpty,
  } = smalls;

  if (inputRegion) {
    inputRegion.classList.remove("invalid");
    smallRegion.innerHTML = "";
  }

  if (inputCountry) {
    inputCountry.classList.remove("invalid");
    smallCountry.innerHTML = "";
  }

  if (inputCities) {
    for (let input of inputCities) {
      input.classList.remove("invalid");
    }
    for (let small of smallCities) {
      small.innerHTML = "";
    }
  }

  if (inputCity) {
    inputCity.classList.remove("invalid");
    smallCity.innerHTML = "";
  }

  if (smallDataEmpty) {
    smallDataEmpty.classList.remove("invalid");
    smallDataEmpty.innerHTML = "";
  }
  if (emailInput) {
    emailInput.classList.remove("invalid");
    emailSmall.innerHTML = "";
  }

  if (emailInputModify) {
    emailInputModify.classList.remove("invalid");
    emailSmallModify.innerHTML = "";
  }

  if (passwordInput) {
    passwordInput.classList.remove("invalid");
    passwordSmall.innerHTML = "";
  }

  if (dataSmall) dataSmall.innerHTML = "";

  if (dataSmallModify) dataSmallModify.innerHTML = "";

  if (nombreInput) {
    nombreInput.classList.remove("invalid");
    nombreSmall.innerHTML = "";
  }

  if (nombreInputModify) {
    nombreInputModify.classList.remove("invalid");
    nombreSmallModify.innerHTML = "";
  }

  if (apellidoInput) {
    apellidoInput.classList.remove("invalid");
    apellidoSmall.innerHTML = "";
  }

  if (apellidoInputModify) {
    apellidoInputModify.classList.remove("invalid");
    apellidoSmallModify.innerHTML = "";
  }

  if (confirmInput) {
    confirmInput.classList.remove("invalid");
    confirmSmall.innerHTML = "";
  }
};

//FUNCIÓN PARA RESETEAR LOS VALUES DE LOS INPUTS AL CREAR UN USUARIO

export const resetInputsValues = (inputs) => {
  const {
    nombreInput,
    apellidoInput,
    emailInput,
    passwordInput,
    confirmInput,
  } = inputs;

  emailInput.value = "";
  passwordInput.value = "";
  if (nombreInput) nombreInput.value = "";
  if (apellidoInput) apellidoInput.value = "";
  if (confirmInput) confirmInput.value = "";
};

//FUNCIÓN QUE PROCESA UNA RESPUESTA 422 DEL SERVIDOR

export const processInvalid = (response, inputs, smalls) => {
  const {
    nombreInput,
    apellidoInput,
    emailInput,
    passwordInput,
    confirmInput,
    emailInputModify,
    nombreInputModify,
    apellidoInputModify,
    inputRegion,
    inputCountry,
    inputCities,
    inputCity,
  } = inputs;

  const {
    nombreSmall,
    apellidoSmall,
    emailSmall,
    passwordSmall,
    confirmSmall,
    nombreSmallModify,
    apellidoSmallModify,
    emailSmallModify,
    smallRegion,
    smallCountry,
    smallCities,
    smallCity,
  } = smalls;

  if (response.error === "Ya existe una region con ese nombre") {
    resetInputsStyles(inputs, smalls);
    inputRegion.classList.add("invalid");
    smallRegion.innerHTML = response.error;
  } else if (
    response.error === "Ya existe un país con ese nombre" ||
    response.error === "El nombre del país es inválido"
  ) {
    resetInputsStyles(inputs, smalls);
    inputCountry.classList.add("invalid");
    smallCountry.innerHTML = response.error;
  } else if (response.error === "El nombre de la ciudad es inválido") {
    resetInputsStyles(inputs, smalls);
    if (inputCity) {
      inputCity.classList.add("invalid");
      smallCity.innerHTML = response.error;
    } else {
      inputCities[response.path].classList.add("invalid");
      smallCities[response.path].innerHTML = response.error;
    }
  } else if (response.error === "Nombre inválido") {
    resetInputsStyles(inputs, smalls);

    if (nombreInput) {
      nombreInput.classList.add("invalid");
      nombreSmall.innerHTML = "Debe ingresar un nombre válido";
    } else if (nombreInputModify) {
      nombreInputModify.classList.add("invalid");
      nombreSmallModify.innerHTML = "Debe ingresar un nombre válido";
    }
  } else if (response.error === "Apellido inválido") {
    resetInputsStyles(inputs, smalls);

    if (nombreInput) {
      apellidoInput.classList.add("invalid");
      apellidoSmall.innerHTML = "Debe ingresar un apellido válido";
    } else if (nombreInputModify) {
      apellidoInputModify.classList.add("invalid");
      apellidoSmallModify.innerHTML = "Debe ingresar un apellido válido";
    }
  } else if (response.error === "Email inválido") {
    resetInputsStyles(inputs, smalls);

    if (emailInput) {
      emailInput.classList.add("invalid");
      emailSmall.innerHTML = "Debe ingresar un email válido";
    } else if (emailInputModify) {
      emailInputModify.classList.add("invalid");
      emailSmallModify.innerHTML = "Debe ingresar un email válido";
    }
  } else if (response.error === "Esta dirección de email ya fue utilizada") {
    resetInputsStyles(inputs, smalls);

    if (emailInput) {
      emailInput.classList.add("invalid");
      emailSmall.innerHTML = "Ésta cuenta de email ya fue utilizada";
    } else if (emailInputModify) {
      emailInputModify.classList.add("invalid");
      emailSmallModify.innerHTML = "Ésta cuenta de email ya fue utilizada";
    }
  } else if (response.error === "Password inválido") {
    resetInputsStyles(inputs, smalls);

    passwordInput.classList.add("invalid");
    passwordSmall.innerHTML = "Debe ingresar un password válido";
  } else {
    resetInputsStyles(inputs, smalls);

    confirmInput.classList.add("invalid");
    confirmSmall.innerHTML = "Debe ingresar el mismo password";
  }
};

//FUNCIÓN QUE ORDENA LAS FILAS DE UNA TABLA POR COLUMNA

export function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  // Remove all existing TRs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // Re-add the newly sorted rows
  tBody.append(...sortedRows);

  // Remember how the column is currently sorted
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-desc", !asc);
}

//FUNCIÓN QUE RESETEA LOS PUNTOS DE LAS OPCIONES DE CRUD

export const resetDots = () => {
  const dots = document.getElementsByClassName("fas fa-ellipsis-h dots");
  const trashIcons = document.getElementsByClassName("fas fa-trash");
  const modifyIcons = document.getElementsByClassName("fas fa-pen");
  const addIcons = document.getElementsByClassName("fas fa-plus");

  for (let dot of dots) {
    dot.style.display = "unset";
  }

  for (let icon of trashIcons) {
    icon.remove();
  }

  for (let icon of modifyIcons) {
    icon.remove();
  }
  if (addIcons) {
    for (let plus of addIcons) {
      plus.remove();
    }
  }
};

//FUNCIÓN QUE CREA LOS ICONOS DE AGREGAR, MODIFICAR Y ELIMINAR

export const createIcons = (target) => {
  const editar = document.createElement("i");
  const eliminar = document.createElement("i");
  const agregar = document.createElement("i");

  if (target.className === "fas fa-ellipsis-h dots") {
    editar.className = "fas fa-pen";
  } else if (target.className === "fas fa-ellipsis-h dots regiones") {
    editar.className = "fas fa-pen regiones";
  } else if (target.className === "fas fa-ellipsis-h dots paises") {
    editar.className = "fas fa-pen paises";
  } else if (target.className === "fas fa-ellipsis-h dots ciudades") {
    editar.className = "fas fa-pen ciudades";
  }
  if (target.className === "fas fa-ellipsis-h dots") {
    eliminar.className = "fas fa-trash";
  } else if (target.className === "fas fa-ellipsis-h dots regiones") {
    eliminar.className = "fas fa-trash regiones";
  } else if (target.className === "fas fa-ellipsis-h dots paises") {
    eliminar.className = "fas fa-trash paises";
  } else if (target.className === "fas fa-ellipsis-h dots ciudades") {
    eliminar.className = "fas fa-trash ciudades";
  }
  if (target.className === "fas fa-ellipsis-h dots") {
    agregar.className = "fas fa-plus";
  } else if (target.className === "fas fa-ellipsis-h dots regiones") {
    agregar.className = "fas fa-plus regiones";
  } else if (target.className === "fas fa-ellipsis-h dots paises") {
    agregar.className = "fas fa-plus paises";
  }
  target.style.display = "none";
  target.parentNode.appendChild(editar);
  target.parentNode.appendChild(eliminar);

  if (
    target.className === "fas fa-ellipsis-h dots regiones" ||
    target.className === "fas fa-ellipsis-h dots paises" ||
    target.className === "fas fa-ellipsis-h dots ciudades"
  )
    target.parentNode.appendChild(agregar);
};

//FUNCIÓN QUE LLAMA A crearModalCrud()

export const callModal = (operacion, elemento = "") => {
  modalBg.classList.add("bg-activate");

  elemento
    ? crearModalCrud(
        operacion,
        elemento.parentElement.previousSibling.innerHTML
      )
    : crearModalCrud(operacion);

  modalCrud.style.display = "flex";
};

//FUNCIÓN QUE CREA UN MODAL PARA EL CRUD DE UN ELEMENTO

export const crearModalCrud = (operacion, name = {}) => {
  const divButtonsInvalid = document.querySelector(".buttons-add-invalid");
  const divButtonsViejo = document.querySelector(".buttons-add");
  const divButtonsModify = document.querySelector(".buttons-modify");
  if (divButtonsInvalid) divButtonsInvalid.className = "buttons";
  if (divButtonsViejo) divButtonsViejo.className = "buttons";
  if (divButtonsModify) divButtonsModify.className = "buttons";

  const h2Crud = document.getElementById("h2-crud");
  const divButtons = document.querySelector(".buttons");
  const buttonCrud = document.querySelector(".primary-button.crud");
  const divInput = document.createElement("div");
  const divCountries = document.createElement("div");
  const divCities = document.createElement("div");
  const inputNuevo = document.createElement("input");
  const inputCountry = document.createElement("input");
  const inputCity = document.createElement("input");
  const smallAdd = document.createElement("small");
  const smallCountry = document.createElement("small");
  const smallCity = document.createElement("small");
  const dataSmallEmpty = document.createElement("small");
  const h2Countries = document.createElement("h2");
  const h2Cities = document.createElement("h2");
  const addCountry = document.createElement("i");
  const addCity = document.createElement("i");
  const h2Name = document.createElement("h2");

  const inputViejo = document.querySelector(".input-add");
  const inputViejoInvalid = document.querySelector(".input-add.invalid");
  if (inputViejo) inputViejo.remove();
  if (inputViejoInvalid) inputViejoInvalid.remove();
  const smallAddViejo = document.querySelector(".small-add");
  if (smallAddViejo) smallAddViejo.remove();

  divInput.id = "div-input";
  divCountries.className = "div-countries";
  divCities.className = "div-cities";
  inputNuevo.setAttribute("type", "text");
  inputCountry.setAttribute("type", "text");
  inputCity.setAttribute("type", "text");
  inputNuevo.className = "input-add";
  inputNuevo.id = "input-nuevo";
  inputCountry.className = "input-add country";
  inputCountry.id = "input-country";
  inputCity.className = "input-add city";
  smallAdd.className = "small-add";
  smallCountry.className = "small-add country";
  smallCity.className = "small-add city";
  addCountry.className = "fas fa-plus country";
  addCity.className = "fas fa-plus city";
  dataSmallEmpty.className = "small-data-empty";
  h2Name.className = "h2-name";

  if (operacion === "deleteUser") {
    h2Crud.innerHTML = "¿Está seguro de eliminar a éste usuario?";
    buttonCrud.className = "primary-button crud eliminar usuario";
    buttonCrud.innerHTML = "Eliminar";
  } else if (
    operacion === "deleteRegion" ||
    operacion === "deleteCountry" ||
    operacion === "deleteCity"
  ) {
    if (operacion === "deleteRegion") {
      h2Crud.innerHTML = "¿Está seguro de eliminar ésta región?";
      buttonCrud.className = "primary-button crud eliminar regiones";
    } else if (operacion === "deleteCountry") {
      h2Crud.innerHTML = "¿Está seguro de eliminar éste país?";
      buttonCrud.className = "primary-button crud eliminar paises";
    } else {
      h2Crud.innerHTML = "¿Está seguro de eliminar ésta ciudad?";
      buttonCrud.className = "primary-button crud eliminar ciudades";
    }
    h2Name.innerHTML = `"${name}"`;
    h2Crud.after(h2Name);
    buttonCrud.innerHTML = "Eliminar";
  } else if (
    operacion === "addRegion" ||
    operacion === "addCountry" ||
    operacion === "addCity"
  ) {
    if (operacion === "addRegion") {
      h2Crud.innerHTML = "Nombre de la región:";
      divButtons.className = "buttons-add";
      divInput.appendChild(inputNuevo);
      divInput.appendChild(smallAdd);
    }
    modalCrud.insertBefore(divInput, divButtons);
    if (operacion === "addRegion") h2Countries.innerHTML = "Agregue un país:";
    if (operacion === "addCountry") h2Crud.innerHTML = "Nombre del país:";
    if (operacion === "addCity") h2Crud.innerHTML = "Nombre de la ciudad:";
    if (operacion === "addRegion" || operacion === "addCountry") {
      divInput.appendChild(h2Countries);
      divInput.appendChild(divCountries);
      divCountries.appendChild(inputCountry);
      divInput.appendChild(smallCountry);
      h2Cities.innerHTML = "Agregue una ciudad:";
      divInput.appendChild(h2Cities);
    }
    divCities.appendChild(inputCity);
    divCities.appendChild(addCity);
    divInput.appendChild(divCities);
    divInput.appendChild(smallCity);
    divButtons.className = "buttons-add";
    if (operacion === "addRegion")
      buttonCrud.className = "primary-button crud agregar regiones";
    if (operacion === "addCountry")
      buttonCrud.className = "primary-button crud agregar paises";
    if (operacion === "addCity")
      buttonCrud.className = "primary-button crud agregar ciudades";
    buttonCrud.innerHTML = "Agregar";
    modalCrud.appendChild(dataSmallEmpty);
  } else if (
    operacion === "modifyRegion" ||
    operacion === "modifyCountry" ||
    operacion === "modifyCity"
  ) {
    h2Crud.innerHTML = "Ingrese el nuevo nombre:";
    modalCrud.insertBefore(divInput, divButtons);
    if (operacion === "modifyRegion") {
      divInput.appendChild(inputNuevo);
      divInput.appendChild(smallAdd);
      inputNuevo.value = name;
      buttonCrud.className = "primary-button crud modificar regiones";
    } else if (operacion === "modifyCountry") {
      divInput.appendChild(inputCountry);
      divInput.appendChild(smallCountry);
      inputCountry.value = name;
      buttonCrud.className = "primary-button crud modificar paises";
    } else {
      divInput.appendChild(inputCity);
      divInput.appendChild(smallCity);
      inputCity.classList.add("remove-margin");
      inputCity.value = name;
      buttonCrud.className = "primary-button crud modificar ciudades";
    }
    divButtons.className = "buttons-modify";
    buttonCrud.innerHTML = "Modificar";
    modalCrud.appendChild(dataSmallEmpty);
  }
};

//FUNCIÓN PARA RESETEAR UN MODAL

export const resetModal = () => {
  const divInput = document.getElementById("div-input");
  const h2Crud = document.getElementById("h2-crud");
  const h2Name = document.querySelector(".h2-name");
  const smallDataEmpty = document.querySelector(".small-data-empty");

  if (divInput) divInput.remove();
  if (smallDataEmpty) smallDataEmpty.remove();
  if (h2Name) h2Name.remove();
  h2Crud.innerHTML = "";
};
