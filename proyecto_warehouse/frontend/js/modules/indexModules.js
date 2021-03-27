export const host = "localhost:3000";
export const token = localStorage.getItem("token");
export let seccionUsuarios = document.getElementById("usuarios");
export let seccionRegiones = document.getElementById("regiones");
export let seccionContactos = document.getElementById("contactos");
export let divContactos = document.getElementById("div-contactos");
export let seccionCompanias = document.getElementById("companias");
export const modalBg = document.querySelector(".modal-bg");
export const modalCrud = document.getElementById("modal-crud");
export const modalSucces = document.getElementById("modal-succes");
export const modalModifyCompany = document.getElementById(
  "modal-modify-company"
);
export const regionCompany = document.getElementById("region-company");
export const regionCompanyModify = document.getElementById(
  "region-modify-company"
);
export const paisCompany = document.getElementById("country-company");
export const paisCompanyModify = document.getElementById(
  "country-modify-company"
);
export const ciudadCompany = document.getElementById("city-company");
export const ciudadCompanyModify = document.getElementById(
  "city-modify-company"
);
export const regionContacto = document.getElementById("region-contacto");
export const paisContacto = document.getElementById("pais-contacto");
export const ciudadContacto = document.getElementById("ciudad-contacto");
export const canalContacto = document.getElementById("canal-contacto");
export let arrayContactos;
const sinCompanias = document.getElementById("sin-companias");
const tablaCompanias = document.getElementById("tabla-companias");
const divCompanias = document.getElementById("div-companias");
const sinContactos = document.getElementById("sin-contactos");
const tablaContactos = document.getElementById("tabla-contactos");
const divPaginado = document.getElementById("div-paginado");
const divSelectDelete = document.getElementById("div-select-delete");
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

    checkLength(data, seccion);

    if (seccion === "companias") {
      seccionCompanias.style.display = "unset";
    } else if (seccion === "contactos") {
      arrayContactos = data;
      seccionContactos.style.display = "block";
      divContactos.style.display = "block";
    }

    deleteRows(seccion);

    createRows(data, seccion);
  } catch (error) {
    console.error(error);
  }
};

//función que chequea si se obtuvo info del servidor

const checkLength = (data, seccion) => {
  if (data.length === 0) {
    if (seccion === "companias") {
      sinCompanias.style.display = "block";
      tablaCompanias.style.display = "none";
      divCompanias.style.width = "fit-content";
    }
    if (seccion === "contactos") {
      sinContactos.style.display = "block";
      tablaContactos.style.display = "none";
      divPaginado.style.display = "none";
      divSelectDelete.style.display = "none";
    }
  } else {
    if (seccion === "companias") {
      sinCompanias.style.display = "none";
      tablaCompanias.style.display = "flex";
      divCompanias.style.width = "88.3%;";
    }
    if (seccion === "contactos") {
      sinContactos.style.display = "none";
      tablaContactos.style.display = "flex";
      divPaginado.style.display = "flex";
    }
  }
};

//FUNCIÓN QUE CREA LA TABLA CON LA INFO DEL SERVIDOR

export const createRows = (data, seccion) => {
  data.forEach((element) => {
    let tablaBodyUsuarios = document.getElementById("body-tabla");
    let tablaBodyCompania = document.getElementById("body-tabla-companias");
    let tablaBodyContactos = document.getElementById("body-tabla-contactos");
    let tr = document.createElement("tr");
    let tdCheck = document.createElement("td");
    let labelCheck = document.createElement("label");
    let inputCheck = document.createElement("input");
    let spanCheck = document.createElement("span");
    let tdContacto = document.createElement("td");
    let divImagen = document.createElement("div");
    let userI = document.createElement("i");
    let imageContact = document.createElement("img");
    let divInfoContacto = document.createElement("div");
    let nombreP = document.createElement("p");
    let emailP = document.createElement("p");
    let tdCompania = document.createElement("td");
    let tdCargo = document.createElement("td");
    let tdCanalPreferido = document.createElement("td");
    let tdInteres = document.createElement("td");
    let interesP = document.createElement("p");
    let progressBar = document.createElement("progress");
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

    if (seccion === "contactos") {
      dotsIcon.classList.add("contactos");
      labelCheck.className = "container";
      inputCheck.setAttribute("type", "checkbox");
      inputCheck.className = "check-contacto";
      inputCheck.id = element._id;
      spanCheck.className = "checkmark";
      tdCheck.className = "check-table";
      tdContacto.className = "td-contacto";
      divImagen.classList.add("div-imagen");
      userI.className = "fas fa-user";
      imageContact.className = "img-div-imagen";
      imageContact.alt = "Imagen del contacto en miniatura";
      nombreP.innerHTML = `${element.nombre} ${element.apellido}`;
      emailP.innerHTML = element.email;
      emailP.className = "email-p contactos";
      tdRegionPais.className = "td-region-pais contactos";
      paisP.className = `pais-p contactos ${element._id}`;
      regionP.className = `region-p contactos ${element._id}`;
      if (element.region) regionP.innerHTML = element.region.nombreRegion;
      if (element.pais) paisP.innerHTML = element.pais.nombrePais;
      tdCompania.className = `compania-contacto ${element._id}`;
      if (element.compania) tdCompania.innerHTML = element.compania.nombre;
      tdCargo.innerHTML = element.cargo;
      if (element.canalesContacto)
        element.canalesContacto.map((canal) => {
          let divCanal = document.createElement("div");
          divCanal.className = "div-canal";
          divCanal.innerHTML = canal.nombreCanal;
          tdCanalPreferido.appendChild(divCanal);
        });
      tdCanalPreferido.className = "td-canal-preferido";
      tdInteres.className = "td-interes";
      interesP.innerHTML = `${element.interes}%`;
      progressBar.setAttribute("value", `${element.interes}`);
      progressBar.setAttribute("max", "100");

      if (tdCanalPreferido.childElementCount > 2)
        manageChannel(tdCanalPreferido);

      tr.classList.add("fila-contacto");
      tablaBodyContactos.appendChild(tr);
      tr.appendChild(tdCheck);
      tdCheck.appendChild(labelCheck);
      labelCheck.appendChild(inputCheck);
      labelCheck.appendChild(spanCheck);
      tr.appendChild(tdContacto);
      tdContacto.appendChild(divImagen);
      if (element.uidImagen) {
        imageContact.setAttribute(
          "src",
          `http://localhost:3000/images/${element.uidImagen}`
        );
        divImagen.appendChild(imageContact);
      } else {
        divImagen.appendChild(userI);
      }
      tdContacto.appendChild(divInfoContacto);
      divInfoContacto.appendChild(nombreP);
      divInfoContacto.appendChild(emailP);
      tdRegionPais.appendChild(paisP);
      tdRegionPais.appendChild(regionP);
      tr.appendChild(tdRegionPais);
      tr.appendChild(tdCompania);
      tr.appendChild(tdCargo);
      tr.appendChild(tdCanalPreferido);
      tdInteres.appendChild(interesP);
      tdInteres.appendChild(progressBar);
      tr.appendChild(tdInteres);
      tr.appendChild(tdAcciones);
    } else {
      tdNombre.innerHTML = element.nombre;
      tdEmail.innerHTML = element.email;
      tr.appendChild(tdNombre);

      if (seccion === "usuarios") {
        dotsIcon.classList.add("usuarios");
        tr.classList.add("fila-usuario");
        tdApellido.innerHTML = element.apellido;
        tdPerfil.innerHTML = element.perfil;
        tablaBodyUsuarios.appendChild(tr);
        tr.appendChild(tdApellido);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPerfil);
        tr.appendChild(tdAcciones);
      } else if (seccion === "companias") {
        tr.classList.add("fila-compania");
        dotsIcon.className = "fas fa-ellipsis-h dots company";
        tdRegionPais.className = "td-region-pais";
        regionP.className = "region-p";
        tdPerfil.innerHTML = element.perfil;
        if (element.region) regionP.innerHTML = element.region.nombreRegion;
        if (element.pais) paisP.innerHTML = element.pais.nombrePais;
        if (element.ciudad) tdCiudad.innerHTML = element.ciudad.nombreCiudad;
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
    }
    tdAcciones.appendChild(dotsIcon);
  });
};

//FUNCIÓN QUE ORDENA LA CANTIDAD DE CANALES PREFERIDOS DE UN USUARIO

function manageChannel(td) {
  const dots = document.createElement("i");
  dots.className = "fas fa-ellipsis-h dots canales";
  td.insertBefore(dots, td.childNodes[2]);
  for (let j = 3; j < td.childElementCount; j++) {
    td.childNodes[j].style.display = "none";
  }
}

//FUNCIÓN QUE RESETEA LAS TABLAS

export const deleteRows = (seccion) => {
  const filasCompanias = document.getElementsByClassName("fila-compania");
  const filasUsuarios = document.getElementsByClassName("fila-usuario");
  const filasContactos = document.getElementsByClassName("fila-contacto");
  if (seccion === "usuarios") {
    for (let i = filasUsuarios.length - 1; i >= 0; i--) {
      filasUsuarios[i].remove();
    }
  } else if (seccion === "companias") {
    for (let i = filasCompanias.length - 1; i >= 0; i--) {
      filasCompanias[i].remove();
    }
  } else {
    for (let i = filasContactos.length - 1; i >= 0; i--) {
      filasContactos[i].remove();
    }
  }
};

//FUNCIÓN QUE CHEQUEA SI EL USUARIO LLENÓ TODOS LOS CAMPOS REQUERIDOS

export const checkInputs = (seccion = "") => {
  const inputsRegiones = document.querySelectorAll(".input-add");
  const inputsUser = document.querySelectorAll(".input-form");
  const inputsCompania = document.querySelectorAll(".input-form-company");
  const inputsCompaniaModify = document.querySelectorAll(
    ".input-form-company-modify"
  );
  const regionCompany = document.getElementById("region-company");
  const regionCompanyModify = document.getElementById("region-modify-company");
  const paisCompany = document.getElementById("country-company");
  const paisCompanyModify = document.getElementById("country-modify-company");
  const ciudadCompany = document.getElementById("city-company");
  const ciudadCompanyModify = document.getElementById("city-modify-company");
  const inputsModifyUser = document.querySelectorAll("input-form-modify");
  const divNuevaCompania = document.getElementById("div-nueva-compania");
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
    if (divNuevaCompania.style.display === "flex") {
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
  let allSelects = document.getElementsByTagName("SELECT");

  for (let input of allInputs) {
    input.value = "";
  }
  for (let select of allSelects) {
    select.value = "none";
  }
  if (regionContacto) regionContacto.click();
  if (canalContacto) canalContacto.click();
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
  const trashIcons = document.querySelectorAll(".fas.fa-trash");
  const modifyIcons = document.querySelectorAll(".fas.fa-pen");
  const addIcons = document.querySelectorAll(".fas.fa-plus");

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

  if (target.className === "fas fa-ellipsis-h dots usuarios") {
    editar.className = "fas fa-pen usuarios";
    editar.title = "Modificar usuario";
  } else if (target.className === "fas fa-ellipsis-h dots regiones") {
    editar.className = "fas fa-pen regiones";
    editar.title = "Modificar región";
  } else if (target.className === "fas fa-ellipsis-h dots paises") {
    editar.className = "fas fa-pen paises";
    editar.title = "Modificar país";
  } else if (target.className === "fas fa-ellipsis-h dots ciudades") {
    editar.className = "fas fa-pen ciudades";
    editar.title = "Modificar ciudad";
  } else if (target.className === "fas fa-ellipsis-h dots company") {
    editar.className = "fas fa-pen company";
    editar.title = "Modificar compañia";
  } else if (target.className === "fas fa-ellipsis-h dots contactos") {
    editar.className = "fas fa-pen contacto";
    editar.title = "Modificar contacto";
  }

  if (target.className === "fas fa-ellipsis-h dots usuarios") {
    eliminar.className = "fas fa-trash usuarios";
    eliminar.title = "Eliminar usuario";
  } else if (target.className === "fas fa-ellipsis-h dots regiones") {
    eliminar.className = "fas fa-trash regiones";
    eliminar.title = "Eliminar región";
  } else if (target.className === "fas fa-ellipsis-h dots paises") {
    eliminar.className = "fas fa-trash paises";
    eliminar.title = "Eliminar país";
  } else if (target.className === "fas fa-ellipsis-h dots ciudades") {
    eliminar.className = "fas fa-trash ciudades";
    eliminar.title = "Eliminar ciudad";
  } else if (target.className === "fas fa-ellipsis-h dots company") {
    eliminar.className = "fas fa-trash company";
    eliminar.title = "Eliminar compañia";
  }

  if (target.className === "fas fa-ellipsis-h dots regiones") {
    agregar.className = "fas fa-plus regiones";
    agregar.title = "Agregar región";
  } else if (target.className === "fas fa-ellipsis-h dots paises") {
    agregar.className = "fas fa-plus paises";
    agregar.title = "Agregar país y ciudades";
  }

  target.style.display = "none";
  target.parentNode.appendChild(editar);
  if (target !== "contactos") target.parentNode.appendChild(eliminar);

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

    if (document.querySelector(".h2-name")) {
      document.querySelector(".h2-name").remove();
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

//función que obtiene los nombres de las locaciones existentes

export const getLocations = async (url, locacion, obj = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();

  crearOptions(data, locacion);
};

//función para crear las options de los selects de regiones, países y ciudades

const crearOptions = (array, locacion) => {
  if (
    locacion === "region-modify" ||
    locacion === "pais-modify" ||
    locacion === "ciudad-modify"
  ) {
    array.forEach((element) => {
      const option = document.createElement("option");
      option.id = element.id;
      option.className = `${locacion}-company`;
      if (locacion === "region-modify") {
        option.innerHTML = element.nombreRegion;
        regionCompanyModify.appendChild(option);
      }
      if (locacion === "pais-modify") {
        option.innerHTML = element.nombrePais;
        paisCompanyModify.appendChild(option);
        paisCompanyModify.disabled = false;
      }
      if (locacion === "ciudad-modify") {
        option.innerHTML = element.nombreCiudad;
        ciudadCompanyModify.appendChild(option);
        ciudadCompanyModify.disabled = false;
      }
    });
    return;
  } else if (
    locacion === "region" ||
    locacion === "region-contacto" ||
    locacion === "pais" ||
    locacion === "pais-contacto" ||
    locacion === "ciudad" ||
    locacion === "ciudad-contacto"
  ) {
    array.forEach((element) => {
      const option = document.createElement("option");
      option.id = element.id;
      locacion.includes("contacto")
        ? (option.className = `${locacion}`)
        : (option.className = `${locacion}-company`);
      if (locacion === "region") {
        option.innerHTML = element.nombreRegion;
        regionCompany.appendChild(option);
      }
      if (locacion === "pais") {
        option.innerHTML = element.nombrePais;
        paisCompany.disabled = false;
        paisCompany.appendChild(option);
      }
      if (locacion === "ciudad") {
        option.innerHTML = element.nombreCiudad;
        ciudadCompany.disabled = false;
        ciudadCompany.appendChild(option);
      }
      if (locacion === "region-contacto") {
        option.innerHTML = element.nombreRegion;
        regionContacto.appendChild(option);
      }
      if (locacion === "pais-contacto") {
        option.innerHTML = element.nombrePais;
        paisContacto.disabled = false;
        paisContacto.appendChild(option);
      }
      if (locacion === "ciudad-contacto") {
        option.innerHTML = element.nombreCiudad;
        ciudadContacto.disabled = false;
        ciudadContacto.appendChild(option);
      }
    });
  }
};

//función que resetea los options

export const resetOptions = (locacion, seccion = "") => {
  if (seccion === "contactos") {
    document
      .querySelectorAll(`.${locacion}-contacto`)
      .forEach((option) => option.remove());
  } else {
    document
      .querySelectorAll(`.${locacion}-company`)
      .forEach((option) => option.remove());
  }
};
