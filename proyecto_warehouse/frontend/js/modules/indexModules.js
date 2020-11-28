export const host = "localhost:3000";
export const token = localStorage.getItem("token");
export let seccionUsuarios = document.getElementById("usuarios");
export let seccionRegiones = document.getElementById("regiones");
export let seccionContactos = document.getElementById("contactos");
export let seccionCompanias = document.getElementById("companias");
export const divSinPermiso = document.getElementById("sin-permiso");
export const modalBg = document.querySelector(".modal-bg");
export const modalCrud = document.getElementById("modal-crud");
export const modalSucces = document.getElementById("modal-succes");
export const modalModifyCompany = document.getElementById(
  "modal-modify-company"
);
let emptyInput = false;

//FUNCIÓN PARA DEJAR DE RESALTAR UNA SECCIÓN DEL NAV

export const removeActive = () => {
  let navItem = document.getElementsByClassName("nav-item");

  for (let item of navItem) {
    if (item.className === "nav-item item-habilitado")
      return item.classList.remove("item-habilitado");
  }
};

//FUNCIÓN QUE PROCESA LA INFO DEL SERVIDOR PARA CREAR UNA TABLA

export const processAdminTable = async (response, seccion) => {
  try {
    const data = await response.json();

    if (data.error === "No se encontró un token de autorización")
      return window.open("bienvenida.html", "_self");
    if (seccion === "usuarios") {
      if (data.error === "No posee autorización de administrador")
        return (divSinPermiso.style.display = "flex");

      seccionUsuarios.style.display = "unset";
    } else {
      seccionCompanias.style.display = "unset";
    }

    deleteRows(seccion);

    createRows(data, seccion);
  } catch (error) {
    console.error(error);
  }
};

//FUNCIÓN QUE CREA LA TABLA CON LA INFO DEL SERVIDOR

const createRows = (data, seccion) => {
  data.forEach((element) => {
    let tablaBodyUsuarios = document.getElementById("body-tabla");
    let tablaBodyCompania = document.getElementById("body-tabla-companias");
    let tr = document.createElement("tr");
    let tdNombre = document.createElement("td");
    let tdApellido = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdPerfil = document.createElement("td");
    let tdRegionPais = document.createElement("td");
    let regionP = document.createElement("p");
    let paisP = document.createElement("p");
    let tdCiudad = document.createElement("td");
    let tdDireccion = document.createElement("td");
    let tdTelefono = document.createElement("td");
    let tdAcciones = document.createElement("td");
    let dotsIcon = document.createElement("i");

    tdAcciones.classList.add("acciones");
    dotsIcon.className = "fas fa-ellipsis-h dots";
    dotsIcon.id = element._id;
    tdNombre.innerHTML = element.nombre;
    tdEmail.innerHTML = element.email;
    tr.appendChild(tdNombre);

    if (seccion === "usuarios") {
      tr.classList.add("fila-usuario");
      tdApellido.innerHTML = element.apellido;
      tdPerfil.innerHTML = element.perfil;
      tablaBodyUsuarios.appendChild(tr);
      tr.appendChild(tdApellido);
      tr.appendChild(tdEmail);
      tr.appendChild(tdPerfil);
      tr.appendChild(tdAcciones);
    } else {
      tr.classList.add("fila-compania");
      dotsIcon.className = "fas fa-ellipsis-h dots company";
      tdRegionPais.className = "td-region-pais";
      regionP.className = "region-p";
      tdPerfil.innerHTML = element.perfil;
      regionP.innerHTML = element.region;
      paisP.innerHTML = element.pais;
      tdCiudad.innerHTML = element.ciudad;
      tdDireccion.innerHTML = element.direccion;
      tdTelefono.innerHTML = element.telefono;
      tablaBodyCompania.appendChild(tr);
      tdRegionPais.appendChild(paisP);
      tdRegionPais.appendChild(regionP);
      tr.appendChild(tdRegionPais);
      tr.appendChild(tdCiudad);
      tr.appendChild(tdDireccion);
      tr.appendChild(tdEmail);
      tr.appendChild(tdTelefono);
      tr.appendChild(tdAcciones);
    }
    tdAcciones.appendChild(dotsIcon);
  });
};

//FUNCIÓN QUE RESETEA LAS TABLAS

const deleteRows = (seccion) => {
  const filasCompanias = document.getElementsByClassName("fila-compania");
  const filasUsuarios = document.getElementsByClassName("fila-usuario");
  if (seccion === "usuarios") {
    for (let i = filasUsuarios.length - 1; i >= 0; i--) {
      filasUsuarios[i].remove();
    }
  } else {
    for (let i = filasCompanias.length - 1; i >= 0; i--) {
      filasCompanias[i].remove();
    }
  }
};

//FUNCIÓN QUE CHEQUEA SI EL USUARIO LLENÓ TODOS LOS CAMPOS REQUERIDOS

export const checkInputs = (seccion = "") => {
  const inputsRegiones = document.getElementsByClassName("input-add");
  const inputsUser = document.getElementsByClassName("input-form");
  const inputsCompania = document.getElementsByClassName("input-form-company");
  const inputsCompaniaModify = document.getElementsByClassName(
    "input-form-company modify"
  );
  const regionCompany = document.getElementById("region-company");
  const regionCompanyModify = document.getElementById("region-modify-company");
  const paisCompany = document.getElementById("country-company");
  const paisCompanyModify = document.getElementById("country-modify-company");
  const ciudadCompany = document.getElementById("city-company");
  const ciudadCompanyModify = document.getElementById("city-modify-company");
  const inputsModifyUser = document.getElementsByClassName("input-form-modify");
  const divCompania = document.getElementById("div-nueva-compania");
  const dataSmall = document.querySelectorAll(".small-data-empty");

  if (seccion === "regiones") {
    for (let input of inputsRegiones) {
      if (input.value === "") {
        input.classList.add("invalid");
        emptyInput = true;
      }
    }
  } else if (seccion === "usuarios-create") {
    for (let input of inputsUser) {
      if (input.value === "") {
        input.classList.add("invalid");
        emptyInput = true;
      }
    }
  } else if (seccion === "companias") {
    if (divCompania.style.display === "flex") {
      for (let input of inputsCompania) {
        if (input.value === "") {
          input.classList.add("invalid");
          emptyInput = true;
        }
      }

      if (regionCompany.value === "none") {
        regionCompany.classList.add("invalid");
        emptyInput = true;
      } else if (paisCompany.value === "none") {
        paisCompany.classList.add("invalid");
        emptyInput = true;
      } else if (ciudadCompany.value === "none") {
        ciudadCompany.classList.add("invalid");
        emptyInput = true;
      }
    } else {
      for (let input of inputsCompaniaModify) {
        if (input.value === "") {
          input.classList.add("invalid");
          emptyInput = true;
        }
      }

      if (regionCompanyModify.value === "none") {
        regionCompanyModify.classList.add("invalid");
        emptyInput = true;
      } else if (paisCompanyModify.value === "none") {
        paisCompanyModify.classList.add("invalid");
        emptyInput = true;
      } else if (ciudadCompanyModify.value === "none") {
        ciudadCompanyModify.classList.add("invalid");
        emptyInput = true;
      }
    }
  } else {
    for (let input of inputsModifyUser) {
      if (input.value === "") {
        input.classList.add("invalid");
        emptyInput = true;
      }
    }
  }

  if (emptyInput)
    dataSmall.forEach(
      (small) => (small.innerHTML = "Ingrese todos los datos requeridos")
    );

  return emptyInput;
};

//FUNCIÓN PARA RESETEAR LOS ESTILOS DE TODOS LOS INPUTS Y EL CONTENIDO DE SUS SMALLS

export const resetInputsStyles = () => {
  let allInputs = document.getElementsByTagName("INPUT");
  let allSelects = document.getElementsByTagName("SELECT");
  const dataSmall = document.querySelectorAll(".small-data-empty");

  for (let input of allInputs) {
    input.classList.remove("invalid");
  }
  for (let select of allSelects) {
    select.classList.remove("invalid");
  }
  dataSmall.forEach((small) => (small.innerHTML = ""));
  emptyInput = false;
};

//FUNCIÓN PARA RESETEAR LOS VALUES DE LOS INPUTS AL CREAR UN USUARIO

export const resetInputsValues = () => {
  let allInputs = document.getElementsByTagName("INPUT");

  for (let input of allInputs) {
    input.value = "";
  }
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
    if (inputCities) {
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

    emailInput.classList.add("invalid");
    emailSmall.innerHTML = "Debe ingresar un email válido";
    emailInputModify.classList.add("invalid");
    emailSmallModify.innerHTML = "Debe ingresar un email válido";
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
  } else if (target.className === "fas fa-ellipsis-h dots company") {
    editar.className = "fas fa-pen company";
  }

  if (target.className === "fas fa-ellipsis-h dots") {
    eliminar.className = "fas fa-trash";
  } else if (target.className === "fas fa-ellipsis-h dots regiones") {
    eliminar.className = "fas fa-trash regiones";
  } else if (target.className === "fas fa-ellipsis-h dots paises") {
    eliminar.className = "fas fa-trash paises";
  } else if (target.className === "fas fa-ellipsis-h dots ciudades") {
    eliminar.className = "fas fa-trash ciudades";
  } else if (target.className === "fas fa-ellipsis-h dots company") {
    eliminar.className = "fas fa-trash company";
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
  elemento
    ? crearModalCrud(
        operacion,
        elemento.parentElement.previousSibling.innerHTML
      )
    : crearModalCrud(operacion);

  modalBg.classList.add("bg-activate");
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

  if (operacion === "deleteUser" || operacion === "deleteCompany") {
    if (operacion === "deleteUser") {
      h2Crud.innerHTML = "¿Está seguro de eliminar a éste usuario?";
      buttonCrud.className = "primary-button crud eliminar usuario";
    } else {
      h2Crud.innerHTML = "¿Está seguro de eliminar ésta compañia?";
      buttonCrud.className = "primary-button crud eliminar compania";
    }
    h2Name.innerHTML = `"${name}"`;
    h2Crud.after(h2Name);
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
