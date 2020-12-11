import {
  host,
  token,
  removeActive,
  seccionUsuarios,
  seccionCompanias,
  seccionRegiones,
  resetDots,
  createIcons,
  processAdminTable,
  resetInputsValues,
  arrayContactos,
  deleteRows,
  createRows,
  getLocations,
  resetOptions,
  regionContacto,
  paisContacto,
  ciudadContacto,
  canalContacto,
} from "./modules/indexModules.js";

let contactosItem = document.getElementById("contactos-item");
let inputContactos = document.getElementById("input-contactos");
const buttonContactos = document.getElementById("button-contactos");
const divSinResultados = document.getElementById("no-results");
const tablaContactos = document.getElementById("tabla-contactos");
const direccionContacto = document.getElementById("direccion-contacto");
const divNuevoContacto = document.getElementById("nuevo-contacto");
const modalBgContacto = document.querySelector(".modal-bg.contacto");
const cuartoBarra = document.getElementById("cuarto");
const mitadBarra = document.getElementById("mitad");
const tresCuartosBarra = document.getElementById("tres-cuartos");
const selectorBarra = document.getElementById("selector-barra");
const barraInteres = document.getElementById("barra-interes");
const cuentaContacto = document.getElementById("cuenta-contacto");
const preferenciasContacto = document.getElementById("preferencias-contacto");
const botonAgregarCanal = document.getElementById("button-agregar-canal");
const nombreContacto = document.getElementById("nombre-contacto");
const smallNombreContacto = document.getElementById("small-nombre-contacto");
const apellidoContacto = document.getElementById("apellido-contacto");
const smallApellidoContacto = document.getElementById(
  "small-apellido-contacto"
);
const cargoContacto = document.getElementById("cargo-contacto");
const smallCargoContacto = document.getElementById("small-cargo-contacto");
const emailContacto = document.getElementById("email-contacto");
const smallEmailContacto = document.getElementById("small-email-contacto");
const companiaContacto = document.getElementById("compania-contacto");
const botonGuardar = document.getElementById("boton-guardar-contacto");
const cancelarContacto = document.getElementById("cancelar");
const smallPaisContacto = document.getElementById("small-pais-contacto");
const smallCiudadContacto = document.getElementById("small-ciudad-contacto");
const smallCuentaContacto = document.getElementById("small-cuenta-contacto");
const cerrarDivNuevoContacto = document.querySelector(".fas.fa-times");
const h2Contacto = document.getElementById("h2-contacto");
const eliminarContactos = document.getElementById("div-delete");
const divEliminarContacto = document.getElementById("eliminar-contacto");
const cancelDelete = document.getElementById("cancel-delete");
const divPaginado = document.getElementById("div-paginado");
const inputFile = document.getElementById("input-file");
const userIcon = document.querySelector(".fas.fa-user.contacto");
const divImagenContacto = document.getElementById("imagen-contacto");
let contactosSeleccionados = [];
let contactoId;

//al cargar el index
contactosItem.classList.add("item-habilitado");

document.addEventListener("DOMContentLoaded", () => {
  checkAdmin();
  getContactos();
  getCompanies();
  getLocations(`http://${host}/regiones/nombres`, "region-contacto");
});

//EventListener del item de Contactos

contactosItem.addEventListener("click", () => {
  removeActive();

  contactosItem.classList.add("item-habilitado");
  tablaContactos.style.visibility = "unset";
  divSinResultados.style.display = "none";
  resetOptions("pais", "contactos");
  resetOptions("ciudad", "contactos");
  resetInputsValues();
  getContactos();
  seccionUsuarios.style.display = "none";
  seccionRegiones.style.display = "none";
  seccionCompanias.style.display = "none";
});

//función que trae los datos de las companias

const getContactos = () =>
  fetch(`http://${host}/contactos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => processAdminTable(r, "contactos"))
    .catch((e) => console.error(e));

//función que chequea si el usuario logueado es administrador

const checkAdmin = () =>
  fetch(`http://${host}/usuarios`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.error === "No posee autorización de administrador") {
        document.getElementById("usuarios-item").parentElement.remove();
      }
      document.getElementById("body").style.display = "unset";
    })
    .catch((e) => console.error(e));

//función para filtrar las búsquedas del usuario

const filtrar = () => {
  let resultados = arrayContactos.filter(filterBySearch);
  return resultados;
};

buttonContactos.addEventListener("click", search);

//función que engloba las acciones al querer buscar un contacto

function search() {
  if (inputContactos === "") {
    return;
  }
  const arrayBusqueda = filtrar();
  if (arrayBusqueda[0] === undefined) {
    tablaContactos.style.display = "none";
    divPaginado.style.display = "none";
    divSinResultados.style.display = "unset";
  }
  deleteRows("contactos");
  createRows(arrayBusqueda, "contactos");
}

//función usada en el filter de filtrar()

const filterBySearch = (contacto) => {
  const texto = inputContactos.value.toLowerCase();

  const nombre = contacto.nombre.toLowerCase();
  const apellido = contacto.apellido.toLowerCase();
  const email = contacto.email.toLowerCase();
  const cargo = contacto.cargo.toLowerCase();
  const compania = contacto.compania.toLowerCase();
  const interes = contacto.interes;
  const region = contacto.region.toLowerCase();
  const pais = contacto.pais.toLowerCase();
  const ciudad = contacto.ciudad.toLowerCase();

  const canalesContacto = contacto.canalesContacto.map(
    (canal) => canal.nombreCanal
  );

  for (let canal of canalesContacto) {
    if (canal.toString().toLowerCase().includes(texto)) {
      return contacto;
    }
  }

  if (
    nombre.includes(texto) ||
    apellido.includes(texto) ||
    email.includes(texto) ||
    region.includes(texto) ||
    pais.includes(texto) ||
    ciudad.includes(texto) ||
    compania.includes(texto) ||
    cargo.includes(texto) ||
    interes.toString().includes(texto)
  ) {
    return contacto;
  } else {
    return false;
  }
};

//EventListener del input para buscar contactos

inputContactos.addEventListener("keyup", (e) => {
  if (inputContactos.value === "") {
    getContactos();
    tablaContactos.style.display = "flex";
    divPaginado.style.display = "flex";
    divSinResultados.style.display = "none";
  }
});

//evento para cuando el usuario presiona ENTER para buscar un contacto

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    search();
  } else if (e.target.className.includes("invalid")) {
    e.target.classList.remove("invalid");
    e.target.nextElementSibling.innerHTML = "";
  }
});

//cerrar el div de nuevo contacto

cerrarDivNuevoContacto.addEventListener("click", () => {
  modalBgContacto.classList.remove("bg-activate");
  modalBgContacto.classList.remove("modal-bg-modify");
  divNuevoContacto.style.display = "none";
  h2Contacto.innerHTML = "Nuevo contacto";
  botonGuardar.innerHTML = "Guardar contacto";
  cancelarContacto.click();
});

//EventListeners de document

document.getElementById("check-all").addEventListener("change", () => {
  document
    .querySelectorAll(".checkmark")
    .forEach((checkmark) => checkmark.click());
});

document.addEventListener("click", (e) => {
  if (e.target.className === "fas fa-ellipsis-h dots canales") {
    //para mostrar todos los canales del contacto
    const canales = e.target.parentElement.childNodes;
    e.target.style.display = "none";
    canales.forEach((canal) => {
      if (canal !== e.target) canal.style.display = "flex";
    });
  } else if (e.target.className === "checkmark") {
    //del checkbox custom
    checkRow(e.target);
    agregarContactosSeleccionados(e.target);
    crearDivSeleccionados();
    habilitarDivEliminar();
  } else if (e.target.id === "button-nuevo-contacto") {
    modalBgContacto.classList.add("bg-activate");
    divNuevoContacto.style.display = "flex";
  } else if (e.target.id === "cuarto") {
    //BARRA INTERÉS
    selectorBarra.classList.remove("mitad-barra");
    selectorBarra.classList.remove("tres-cuartos-barra");
    selectorBarra.classList.remove("barra-completa");
    selectorBarra.classList.add("cuarto-barra");
    mitadBarra.className = "barra";
    tresCuartosBarra.className = "barra";
    barraInteres.className = "barra";
    cuartoBarra.className = " barra cuarto";
  } else if (e.target.id === "mitad") {
    selectorBarra.classList.remove("cuarto-barra");
    selectorBarra.classList.remove("tres-cuartos-barra");
    selectorBarra.classList.remove("barra-completa");
    selectorBarra.classList.add("mitad-barra");
    cuartoBarra.className = "barra";
    tresCuartosBarra.className = "barra";
    barraInteres.className = "barra";
    cuartoBarra.classList.add("mitad");
    mitadBarra.className = "barra mitad";
  } else if (e.target.id === "tres-cuartos") {
    selectorBarra.classList.remove("cuarto-barra");
    selectorBarra.classList.remove("mitad-barra");
    selectorBarra.classList.remove("barra-completa");
    selectorBarra.classList.add("tres-cuartos-barra");
    barraInteres.className = "barra";
    cuartoBarra.className = "barra";
    mitadBarra.className = "barra";
    cuartoBarra.classList.add("tres-cuartos");
    mitadBarra.classList.add("tres-cuartos");
    tresCuartosBarra.className = "barra tres-cuartos";
  } else if (e.target.id === "barra-interes") {
    selectorBarra.classList.add("barra-completa");
    cuartoBarra.classList.add("completa");
    mitadBarra.classList.add("completa");
    tresCuartosBarra.classList.add("completa");
    barraInteres.classList.add("completa");
  } else if (e.target.id === "cero") {
    selectorBarra.className = "";
    cuartoBarra.className = "barra";
    mitadBarra.className = "barra";
    tresCuartosBarra.className = "barra";
    barraInteres.className = "barra";
  } else if (e.target.className === "button-canal delete") {
    //Eliminar un canal de contacto al modificarlo
    if (
      h2Contacto.innerHTML === "Modificar contacto" &&
      botonGuardar.innerText === "Modificar contacto"
    ) {
      ABMContact(`http://${host}/contactos/canales/${contactoId}`, "DELETE", {
        idCanal: e.target.id,
      });
    }
    e.target.parentElement.remove();
  } else if (e.target.className === "fas fa-trash contactos") {
    if (
      h2Contacto.innerHTML === "Modificar contacto" &&
      botonGuardar.innerHTML === "Modificar contacto"
    ) {
      ABMContact(`http://${host}/contactos/canales/${contactoId}`, "DELETE", {
        idCanal: e.target.parentElement.id,
      });
    }
    e.target.parentElement.parentElement.remove();
  } else if (e.target.className === "button-canal modify") {
    //Modificar un canal de contacto
    const favouriteModify = document.querySelector(".fas.fa-heart.icon-modify");
    const banModify = document.querySelector(".fas.fa-ban.icon-modify");
    e.target.parentElement.firstElementChild.firstElementChild.disabled = false;
    e.target.previousElementSibling.previousElementSibling.firstElementChild.disabled = false;
    e.target.previousElementSibling.firstElementChild.disabled = false;
    if (favouriteModify)
      favouriteModify.className = "fas fa-heart icon-modify-active";
    if (banModify) banModify.className = "fas fa-ban icon-modify-active";
  } else if (e.target.className === "fas fa-pen contactos") {
    const favouriteModify = document.querySelector(".fas.fa-heart.icon-modify");
    const banModify = document.querySelector(".fas.fa-ban.icon-modify");
    e.target.parentElement.parentElement.firstElementChild.firstElementChild.disabled = false;
    e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.disabled = false;
    e.target.parentElement.previousElementSibling.firstElementChild.disabled = false;
    if (favouriteModify)
      favouriteModify.className = "fas fa-heart icon-modify-active";
    if (banModify) banModify.className = "fas fa-ban icon-modify-active";
  } else if (e.target.className === "fas fa-ellipsis-h dots contactos") {
    contactoId = e.target.id;
    resetDots();
    createIcons(e.target);
  } else if (e.target.className === "fas fa-pen contacto") {
    //MODIFICAR CONTACTO
    modifyContact(contactoId, e.target);
  } else if (e.target.id === "canal-contacto") {
    if (e.target.value === "none")
      cuentaContacto.setAttribute("placeholder", "");
  }
});

//función que selecciona la fila del checkbox al ser clickeado

const checkRow = (elemento) => {
  elemento.parentElement.parentElement.parentElement.classList.toggle(
    "fila-elegida"
  );
  const childrenCanal =
    elemento.parentElement.parentElement.parentElement.lastElementChild
      .previousElementSibling.previousElementSibling.children;

  for (let child of childrenCanal) {
    if (
      child.className === "div-canal" ||
      child.className === "div-canal seleccionado"
    )
      child.classList.toggle("seleccionado");
  }
};

//función que crea el div con la cantidad de contactos seleccionados

const crearDivSeleccionados = () => {
  const divCount = document.getElementById("div-count");

  if (contactosSeleccionados.length < 2)
    return (divCount.style.display = "none");

  divCount.innerHTML = `${contactosSeleccionados.length} seleccionados`;
  divCount.style.display = "flex";
};

//función que crea el div para eliminar los contactos seleccionados

const habilitarDivEliminar = () => {
  const divEliminar = document.getElementById("div-select-delete");

  if (contactosSeleccionados.length < 2) {
    tablaContactos.style.marginTop = "7.3rem";
    return (divEliminar.style.display = "none");
  }

  divEliminar.style.display = "flex";
  tablaContactos.style.marginTop = "0rem";
};

//función que agrega los ids de los contactos a un array para poder ser eliminados

const agregarContactosSeleccionados = (elemento) => {
  if (!elemento.previousElementSibling.checked) {
    contactosSeleccionados.push(elemento.previousElementSibling.id);
  } else if (elemento.previousElementSibling.checked) {
    const indiceDelete = contactosSeleccionados.indexOf(
      elemento.previousElementSibling.id
    );
    if (indiceDelete !== -1) contactosSeleccionados.splice(indiceDelete, 1);
  }
};

//función que obtiene los nombres de las companias existentes

const getCompanies = async () => {
  const response = await fetch(`http://${host}/companias/nombres`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  response.status === 200
    ? crearOptionsCompanies(data)
    : window.open("bienvenida.html", "_self");
};

//función para crear las options del select de companias

const crearOptionsCompanies = (array) => {
  array.forEach((element) => {
    const option = document.createElement("option");
    const selectCompania = document.getElementById("compania-contacto");
    option.innerHTML = element.nombreCompania;
    option.id = element.id;
    option.className = `option-company`;
    selectCompania.appendChild(option);
  });
};

//EventListeners para las options de las regiones y los paises

regionContacto.addEventListener("change", (e) => {
  resetOptions("pais", "contactos");
  resetOptions("ciudad", "contactos");
  if (e.target.value === "none") {
    paisContacto.classList.remove("invalid");
    smallPaisContacto.innerHTML = "";
    paisContacto.disabled = true;
    ciudadContacto.disabled = true;
  } else {
    ciudadContacto.disabled = true;
    getLocations(`http://${host}/regiones/paises/nombres`, "pais-contacto", {
      nombreRegion: e.target.value,
    });
  }
});

paisContacto.addEventListener("change", (e) => {
  resetOptions("ciudad", "contactos");
  if (e.target.value === "none") {
    ciudadContacto.classList.remove("invalid");
    smallCiudadContacto.innerHTML = "";
    ciudadContacto.disabled = true;
  } else {
    getLocations(
      `http://${host}/regiones/ciudades/nombres`,
      "ciudad-contacto",
      {
        nombrePais: e.target.value,
      }
    );
  }
});

ciudadContacto.addEventListener("click", (e) => {
  direccionContacto.disabled = false;
});

//EventListener del select para elegir los canales de contacto

canalContacto.addEventListener("click", (e) => {
  if (e.target.value !== "none") {
    cuentaContacto.disabled = false;
    if (
      canalContacto.value === "Teléfono" ||
      canalContacto.value === "Whatsapp"
    ) {
      cuentaContacto.setAttribute("placeholder", "Ingrese su teléfono");
    } else if (
      canalContacto.value === "Instagram" ||
      canalContacto.value === "Facebook" ||
      canalContacto.value === "Linkedin"
    ) {
      cuentaContacto.setAttribute("placeholder", "@ejemplo");
    }
  } else {
    cuentaContacto.disabled = true;
    preferenciasContacto.disabled = true;
    cuentaContacto.value = "";
    botonAgregarCanal.classList.remove("boton-activado");
  }
});

//EventListenere para saber si la info del canal está completa

cuentaContacto.addEventListener("keyup", (e) => {
  if (canalContacto.value !== "none" && cuentaContacto.value !== "") {
    preferenciasContacto.disabled = false;
    botonAgregarCanal.classList.add("boton-activado");
  } else {
    if (preferenciasContacto.className.includes("preferencias-activado")) {
      botonAgregarCanal.classList.remove("boton-activado");
      preferenciasContacto.disabled = true;
      preferenciasContacto.value = "Sin preferencia";
      preferenciasContacto.classList.remove("preferencias-activado");
      preferenciasContacto.nextElementSibling.remove();
    }
  }
});

//agregar un canal más

botonAgregarCanal.addEventListener("click", (e) => {
  if (botonAgregarCanal.className === "button-canal boton-activado") {
    const check = checkInputCuenta(canalContacto);
    if (check) {
      const info = infoCanal();
      crearOtroCanal(info);
      resetCanal();
    } else {
      cuentaContacto.classList.add("invalid");
      smallCuentaContacto.innerHTML = "Cuenta inválida";
      botonAgregarCanal.classList.remove("boton-activado");
    }
  }
});

//chequeo que la cuenta sea válida

const checkInputCuenta = (elemento) => {
  if (
    elemento.value === "Facebook" ||
    elemento.value === "Instagram" ||
    elemento.value === "Linkedin"
  ) {
    const regex = new RegExp("^[@]+[a-z0-9]+$");
    if (
      !regex.test(
        elemento.parentElement.nextElementSibling.lastElementChild
          .previousElementSibling.value
      )
    ) {
      return false;
    } else {
      return true;
    }
  } else if (elemento.value === "Teléfono" || elemento.value === "Whatsapp") {
    const regex = new RegExp("^[+]*[(]{0,1}[0-9]{1,5}[)]{0,1}[-\\s0-9]*$");
    if (
      !regex.test(
        elemento.parentElement.nextElementSibling.lastElementChild
          .previousElementSibling.value
      )
    )
      return false;

    return true;
  }
};

//función que copia la info del canal

const infoCanal = () => {
  return {
    nombreCanal: canalContacto.value,
    cuentaUsuario: cuentaContacto.value,
    preferencia: preferenciasContacto.value,
  };
};

//función para agregar otro canal de contacto

const crearOtroCanal = (infoCanal) => {
  const divInferior = document.getElementById("secundarios-inferior");
  const canales = document.getElementsByClassName("canal");
  const divCanal = document.createElement("div");
  const divInputCanal = document.createElement("div");
  const selectCanal = document.createElement("select");
  const optionFacebookCanal = document.createElement("option");
  const optionWhatsappCanal = document.createElement("option");
  const optionTelefonoCanal = document.createElement("option");
  const optionInstagramCanal = document.createElement("option");
  const optionLinkedinCanal = document.createElement("option");
  const divInputCuenta = document.createElement("div");
  const inputCuenta = document.createElement("input");
  const smallCuenta = document.createElement("small");
  const divInputPreferencia = document.createElement("div");
  const selectPreferencia = document.createElement("select");
  const optionNonePreferencia = document.createElement("option");
  const optionFavoritoPreferencia = document.createElement("option");
  const optionNoMolestarPreferencia = document.createElement("option");
  const favouriteIcon = document.createElement("i");
  const banIcon = document.createElement("i");
  const buttonEditar = document.createElement("button");
  const iButtonEditar = document.createElement("i");
  const buttonEliminar = document.createElement("button");
  const iButtonEliminar = document.createElement("i");

  divCanal.className = "canal crud";
  divInputCanal.className = "div-input-contacto";
  selectCanal.id = `canal-contacto-${canales.length}`;
  selectCanal.disabled = true;
  selectCanal.className = "select-definitivo canal-modify";
  optionTelefonoCanal.setAttribute("value", "Teléfono");
  optionTelefonoCanal.innerHTML = "Teléfono";
  optionWhatsappCanal.setAttribute("value", "Whatsapp");
  optionWhatsappCanal.innerHTML = "Whatsapp";
  optionInstagramCanal.setAttribute("value", "Instagram");
  optionInstagramCanal.innerHTML = "Instagram";
  optionFacebookCanal.setAttribute("value", "Facebook");
  optionFacebookCanal.innerHTML = "Facebook";
  optionLinkedinCanal.setAttribute("value", "Linkedin");
  optionLinkedinCanal.innerHTML = "Linkedin";
  divInputCuenta.className = "div-input-contacto cuenta";
  inputCuenta.value = infoCanal.cuentaUsuario;
  inputCuenta.disabled = true;
  smallCuenta.id = `small-cuenta-${canales.length}`;
  divInputPreferencia.className = "div-input-contacto";
  selectPreferencia.id = `preferencia-contacto-${canales.length}`;
  selectPreferencia.disabled = true;
  selectPreferencia.className = "select-definitivo modify-contact";
  optionNonePreferencia.value = "Sin preferencia";
  optionNonePreferencia.innerHTML = "Sin preferencia";
  optionFavoritoPreferencia.value = "Canal favorito";
  optionFavoritoPreferencia.innerHTML = "Canal favorito";
  optionNoMolestarPreferencia.value = "No molestar";
  optionNoMolestarPreferencia.innerHTML = "No molestar";
  favouriteIcon.className = "fas fa-heart icon-modify";
  banIcon.className = "fas fa-ban icon-modify";
  buttonEditar.className = "button-canal modify";
  buttonEditar.setAttribute("type", "button");
  iButtonEditar.className = "fas fa-pen contactos";
  buttonEliminar.setAttribute("type", "button");
  buttonEliminar.className = "button-canal delete";
  buttonEliminar.id = `${infoCanal._id}`;
  iButtonEliminar.className = "fas fa-trash contactos";

  divInferior.appendChild(divCanal);
  divCanal.appendChild(divInputCanal);
  divInputCanal.appendChild(selectCanal);
  selectCanal.appendChild(optionTelefonoCanal);
  selectCanal.appendChild(optionWhatsappCanal);
  selectCanal.appendChild(optionInstagramCanal);
  selectCanal.appendChild(optionFacebookCanal);
  selectCanal.appendChild(optionLinkedinCanal);
  divCanal.appendChild(divInputCuenta);
  divInputCuenta.appendChild(inputCuenta);
  divInputCuenta.appendChild(smallCuenta);
  divCanal.appendChild(divInputPreferencia);
  divInputPreferencia.appendChild(selectPreferencia);
  selectPreferencia.appendChild(optionNonePreferencia);
  selectPreferencia.appendChild(optionFavoritoPreferencia);
  selectPreferencia.appendChild(optionNoMolestarPreferencia);
  divCanal.appendChild(buttonEditar);
  divCanal.appendChild(buttonEliminar);

  buttonEditar.appendChild(iButtonEditar);
  const editarText = document.createTextNode("Editar canal");
  buttonEditar.appendChild(editarText);
  buttonEliminar.appendChild(iButtonEliminar);
  const eliminarText = document.createTextNode("Eliminar canal");
  buttonEliminar.appendChild(eliminarText);

  selectCanal.value = infoCanal.nombreCanal;
  selectPreferencia.value = infoCanal.preferencia;
  if (infoCanal.preferencia === "Canal favorito")
    divInputPreferencia.appendChild(favouriteIcon);
  if (infoCanal.preferencia === "No molestar")
    divInputPreferencia.appendChild(banIcon);
  if (infoCanal.preferencia === "Sin preferencia")
    selectPreferencia.style.paddingLeft = "0.86rem";
};

//función que resetea la info del canal al agregar otro

const resetCanal = () => {
  const favourite = document.querySelector(".fas.fa-heart.create");
  const ban = document.querySelector(".fas.fa-ban.create");

  canalContacto.value = "none";
  cuentaContacto.value = "";
  cuentaContacto.disabled = true;
  cuentaContacto.setAttribute("placeholder", "");
  preferenciasContacto.classList.remove("preferencias-activado");
  if (ban) preferenciasContacto.parentElement.removeChild(ban);
  if (favourite) preferenciasContacto.parentElement.removeChild(favourite);
  preferenciasContacto.value = "Sin preferencia";
  preferenciasContacto.disabled = true;
  botonAgregarCanal.classList.remove("boton-activado");
};

//EventListener para saber si se cargaron los datos obligatorios del contacto

document.addEventListener("change", (e) => {
  if (
    e.target === nombreContacto ||
    e.target === apellidoContacto ||
    e.target === cargoContacto ||
    e.target === emailContacto ||
    e.target === companiaContacto
  ) {
    if (
      nombreContacto.value !== "" &&
      apellidoContacto.value !== "" &&
      cargoContacto.value !== "" &&
      emailContacto.value !== "" &&
      companiaContacto.value !== "none"
    ) {
      botonGuardar.classList.add("guardar-activado");
      if (h2Contacto.innerHTML === "Guardar contacto")
        botonGuardar.innerHTML = "Guardar contacto";
      cancelarContacto.classList.add("cancelar-activado");
      cancelarContacto.innerHTML = "Eliminar Contacto";
    } else if (
      nombreContacto.value === "" ||
      apellidoContacto.value === "" ||
      cargoContacto.value === "" ||
      emailContacto.value === "" ||
      companiaContacto.value === "none"
    ) {
      botonGuardar.classList.remove("guardar-activado");
      if (h2Contacto.innerHTML === "Guardar contacto")
        botonGuardar.innerHTML = "Guardar contacto";
      cancelarContacto.classList.remove("cancelar-activado");
      cancelarContacto.innerHTML = "Cancelar";
    }
  } else if (
    e.target.className === "select-definitivo modify-contact" ||
    e.target.className ===
      "select-definitivo modify-contact preferencias-activado"
  ) {
    //crea los icons del select de preferencias que se pueden modificar
    crearIconsPreferencias(e.target);
  }
});

//reseteo de todos los inputs para agregar un contacto

cancelarContacto.addEventListener("click", () => {
  const canalesCrud = document.querySelectorAll(".canal.crud");
  if (
    cancelarContacto.className === "cancelar-activado" &&
    h2Contacto.innerHTML === "Nuevo contacto" &&
    botonGuardar.innerText === "Guardar contacto"
  ) {
    if (canalesCrud) {
      for (let canal of canalesCrud) {
        canal.remove();
      }
    }
    if (userIcon.style.display === "none") {
      divImagenContacto.lastChild.remove();
      userIcon.style.display = "unset";
    }
    resetInputsValues();
    cancelarContacto.classList.remove("cancelar-activado");
    cancelarContacto.innerHTML = "Cancelar";
    botonGuardar.classList.remove("guardar-activado");
    barraInteres.className = "barra";
    selectorBarra.className = "";
    document.getElementById("cuarto").className = "barra";
    document.getElementById("mitad").className = "barra";
    document.getElementById("tres-cuartos").className = "barra";
    preferenciasContacto.classList.remove("preferencias-activado");
    preferenciasContacto.value = "Sin preferencia";
    if (preferenciasContacto.nextElementSibling)
      preferenciasContacto.nextElementSibling.remove();
  } else if (
    h2Contacto.innerHTML === "Modificar contacto" &&
    botonGuardar.innerText === "Modificar contacto"
  ) {
    contactosSeleccionados = [];
    contactosSeleccionados.push(contactoId);
    divNuevoContacto.style.display = "none";
    document.getElementById("p-delete").innerHTML =
      "¿Seguro que desea eliminar el contacto seleccionado?";
    eliminarContactos.click();
  }
});

//agregar los i al select de preferencias

preferenciasContacto.addEventListener("change", (e) => {
  crearIconsPreferencias(e.target);
});

//función que crea los iconos del select de preferencias

const crearIconsPreferencias = (elemento) => {
  if (elemento.value === "Canal favorito") {
    const favourite = document.createElement("i");
    const favouriteModify = document.createElement("i");
    const ban = document.querySelector(".fas.fa-ban.create");
    const banModify = document.querySelector(".fas.fa-ban.icon-modify-active");

    favourite.className = "fas fa-heart create";
    favouriteModify.className = "fas fa-heart icon-modify-active";
    elemento.classList.add("preferencias-activado");

    if (ban) preferenciasContacto.parentElement.removeChild(ban);
    if (banModify) elemento.nextElementSibling.remove();
    if (elemento === preferenciasContacto) {
      preferenciasContacto.parentElement.appendChild(favourite);
    } else {
      elemento.parentElement.appendChild(favouriteModify);
      elemento.style.paddingLeft = "3.02rem";
    }
  } else if (elemento.value === "No molestar") {
    const ban = document.createElement("i");
    const banModify = document.createElement("i");
    const favourite = document.querySelector(".fas.fa-heart.create");
    const favouriteModify = document.querySelector(
      ".fas.fa-heart.icon-modify-active"
    );

    ban.className = "fas fa-ban create";
    banModify.className = "fas fa-ban icon-modify-active";
    elemento.classList.add("preferencias-activado");

    if (favourite) preferenciasContacto.parentElement.removeChild(favourite);
    if (favouriteModify) elemento.nextElementSibling.remove();
    if (elemento === preferenciasContacto) {
      preferenciasContacto.parentElement.appendChild(ban);
    } else {
      elemento.parentElement.appendChild(banModify);
      elemento.style.paddingLeft = "3.02rem";
    }
  } else if (elemento.value === "Sin preferencia") {
    const favourite = document.querySelector(".fas.fa-heart.create");
    const favouriteModify = document.querySelector(
      ".fas.fa-heart.icon-modify-active"
    );
    const ban = document.querySelector(".fas.fa-ban.create");
    const banModify = document.querySelector(".fas.fa-ban.icon-modify-active");

    elemento.classList.remove("preferencias-activado");
    if (elemento !== preferenciasContacto)
      elemento.style.paddingLeft = "0.86rem";
    if (ban) preferenciasContacto.parentElement.removeChild(ban);
    if (banModify) elemento.nextElementSibling.remove();
    if (favourite) preferenciasContacto.parentElement.removeChild(favourite);
    if (favouriteModify) elemento.nextElementSibling.remove();
  }
};

//GUARDAR UN CONTACTO NUEVO

botonGuardar.addEventListener("click", (e) => {
  if (botonGuardar.className === "primary-button guardar guardar-activado") {
    const checkInputsPrincipales = checkInputsContacto();

    if (checkInputsPrincipales) {
      const canalesModify = document.getElementsByClassName(
        "select-definitivo canal-modify"
      );
      if (canalesModify[0]) {
        for (let canal of canalesModify) {
          const checkCuenta = checkInputCuenta(canal);

          if (!checkCuenta) {
            canal.parentElement.nextElementSibling.lastElementChild.previousElementSibling.classList.add(
              "invalid"
            );
            canal.parentElement.nextElementSibling.lastChild.innerHTML =
              "Cuenta inválida";
            return;
          }
        }
      }

      if (
        botonGuardar.innerText === "Guardar contacto" &&
        h2Contacto.innerHTML === "Nuevo contacto"
      ) {
        guardarContacto();
      } else {
        const contactoModificado = getInfo("modifyContacto");
        const formdata = new FormData();
        formdata.append("uidImagen", inputFile.files[0]);
        formdata.append("newContact", JSON.stringify(contactoModificado));
        ABMContact(`http://${host}/contactos/${contactoId}`, "PUT", formdata);
        chargeChannels();
      }
    }
  }
});

//chequeo de los inputs con la info del contacto nuevo

const checkInputsContacto = () => {
  const regexNombreApellido = new RegExp(
    "^[A-Z]+[-,a-z.\\s']+[\\s]*([A-Z]+[-,a-zº.\\s']+[\\s]*)*$"
  );
  const regexEmail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

  if (!regexNombreApellido.test(nombreContacto.value)) {
    nombreContacto.classList.add("invalid");
    smallNombreContacto.innerHTML = "Nombre inválido";
    return false;
  } else if (!regexNombreApellido.test(apellidoContacto.value)) {
    apellidoContacto.classList.add("invalid");
    smallApellidoContacto.innerHTML = "Apellido inválido";
    return false;
  } else if (!regexNombreApellido.test(cargoContacto.value)) {
    cargoContacto.classList.add("invalid");
    smallCargoContacto.innerHTML = "Cargo inválido";
    return false;
  } else if (!regexEmail.test(emailContacto.value)) {
    emailContacto.classList.add("invalid");
    smallEmailContacto.innerHTML = "Email inválido";
    return false;
  }

  if (regionContacto.value !== "none" && paisContacto.value === "none") {
    paisContacto.classList.add("invalid");
    smallPaisContacto.innerHTML = "Ingrese un país";
    return false;
  } else if (
    regionContacto.value !== "none" &&
    paisContacto.value !== "none" &&
    ciudadContacto.value === "none"
  ) {
    ciudadContacto.classList.add("invalid");
    smallCiudadContacto.innerHTML = "Ingrese un país";
    return false;
  }

  if (canalContacto.value !== "none" && cuentaContacto.value === "") {
    cuentaContacto.classList.add("invalid");
    smallCuentaContacto.innerHTML = "Ingrese una cuenta";
    return false;
  }

  return true;
};

//EventListeners para los inputs y selects

paisContacto.addEventListener("change", () => {
  if (paisContacto.value !== "none") {
    paisContacto.classList.remove("invalid");
    smallPaisContacto.innerHTML = "";
  }
});

ciudadContacto.addEventListener("change", () => {
  if (ciudadContacto.value !== "none") {
    ciudadContacto.classList.remove("invalid");
    smallCiudadContacto.innerHTML = "";
  }
});

//función que guarda el contacto

const guardarContacto = () => {
  const contacto = getInfo();
  const formdata = new FormData();
  formdata.append("uidImagen", inputFile.files[0]);
  formdata.append("newContact", JSON.stringify(contacto));
  ABMContact(`http://${host}/contactos`, "POST", formdata);
};

//función que guarda la info de los inputs para crear o modificar un contacto (menos los canales)

const getInfo = (schema = "") => {
  const canalesModify = document.getElementsByClassName(
    "select-definitivo canal-modify"
  );
  const companiaIndex = companiaContacto.selectedIndex;
  const regionIndex = regionContacto.selectedIndex;
  const paisIndex = paisContacto.selectedIndex;
  const ciudadIndex = ciudadContacto.selectedIndex;

  const contacto = {
    nombre: nombreContacto.value,
    apellido: apellidoContacto.value,
    cargo: cargoContacto.value,
    email: emailContacto.value,
    compania: companiaContacto.options.item(companiaIndex).id,
  };
  if (regionContacto.value !== "none") {
    contacto.region = regionContacto.options.item(regionIndex).id;
    contacto.pais = paisContacto.options.item(paisIndex).id;
    contacto.ciudad = ciudadContacto.options.item(ciudadIndex).id;
  }
  if (direccionContacto.value !== "")
    contacto.direccion = direccionContacto.value;

  if (selectorBarra.className === "cuarto-barra") {
    contacto.interes = 25;
  } else if (selectorBarra.className === "mitad-barra") {
    contacto.interes = 50;
  } else if (selectorBarra.className === "tres-cuartos-barra") {
    contacto.interes = 75;
  } else if (selectorBarra.className.includes("barra-completa")) {
    contacto.interes = 100;
  } else {
    contacto.interes = 0;
  }
  if (schema === "modifyContacto") return contacto;

  if (canalContacto.value !== "none") {
    contacto.canalesContacto = [
      {
        nombreCanal: canalContacto.value,
        cuentaUsuario: cuentaContacto.value,
        preferencia: preferenciasContacto.value,
      },
    ];
  }
  if (canalesModify[0]) {
    for (let canal of canalesModify) {
      const nuevoCanal = {
        idCanal: canal.parentElement.parentElement.lastChild.id,
        nombreCanal: canal.value,
        cuentaUsuario:
          canal.parentElement.nextElementSibling.lastElementChild
            .previousElementSibling.value,
        preferencia:
          canal.parentElement.nextElementSibling.nextElementSibling.firstChild
            .value,
      };

      contacto.canalesContacto.push(nuevoCanal);
    }
  }

  return contacto;
};

//función para obtener info de los canales al modificarlos y mandarlos al servidor

const chargeChannels = () => {
  const canalesModify = document.getElementsByClassName(
    "select-definitivo canal-modify"
  );
  const newChannels = [];
  const modifyChannels = [];

  if (canalContacto.value !== "none") {
    newChannels.push({
      nombreCanal: canalContacto.value,
      cuentaUsuario: cuentaContacto.value,
      preferencia: preferenciasContacto.value,
    });
  }
  if (canalesModify[0]) {
    for (let canal of canalesModify) {
      const nuevoCanal = {
        idCanal: canal.parentElement.parentElement.lastChild.id,
        nombreCanal: canal.value,
        cuentaUsuario:
          canal.parentElement.nextElementSibling.lastElementChild
            .previousElementSibling.value,
        preferencia:
          canal.parentElement.nextElementSibling.nextElementSibling.firstChild
            .value,
      };
      if (!nuevoCanal.idCanal) {
        newChannels.push(nuevoCanal);
      } else {
        modifyChannels.push(nuevoCanal);
      }
    }
  }

  if (newChannels[0]) {
    ABMContact(
      `http://${host}/contactos/canales/${contactoId}`,
      "POST",
      newChannels
    );
  }
  if (modifyChannels[0]) {
    ABMContact(
      `http://${host}/contactos/canales/${contactoId}`,
      "PUT",
      modifyChannels
    );
  }
};

//función de CRUD para un contacto

const ABMContact = async (url, metodo, obj = {}) => {
  try {
    if ((metodo === "POST" || metodo === "PUT") && obj instanceof FormData) {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: obj,
      });
      processResponseContact(response);
    } else {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      processResponseContact(response);
    }
  } catch (error) {
    console.error(error);
  }
};

//función que procesa las respuestas del servidor

const processResponseContact = async (response) => {
  const data = await response.json();

  if (response.status === 200) {
    if (data.mensaje === "El canal fue eliminado exitósamente")
      return console.log(data.mensaje);
    cerrarDivNuevoContacto.click();
    contactosItem.click();
  } else if (response.status === 422) {
    if (data.mensaje === "Este email ya ha sido registrado") {
      emailContacto.classList.add("invalid");
      smallEmailContacto.innerHTML = data.mensaje;
    } else if (data.mensaje === "Esta cuenta ya ha sido registrada") {
      cuentaContacto.classList.add("invalid");
      smallCuentaContacto.innerHTML = data.mensaje;
    } else if (response.status === 500) {
      console.log("HUBO UN ERROR: ", data.error);
    }
  }
};

//MODIFICAR CONTACTO

const modifyContact = (idModify, penIcon) => {
  const modifyContact = arrayContactos.find(
    (contacto) => contacto._id === idModify
  );
  resetOptions("pais", "contactos");
  resetOptions("ciudad", "contactos");
  loadInfo(modifyContact, penIcon);
  modalBgContacto.classList.add("bg-activate");
  modalBgContacto.classList.add("modal-bg-modify");
  divNuevoContacto.style.display = "flex";
  h2Contacto.innerHTML = "Modificar contacto";
  botonGuardar.classList.add("guardar-activado");
  botonGuardar.innerHTML = "Modificar contacto";
  cancelarContacto.classList.add("cancelar-activado");
  cancelarContacto.innerHTML = "Eliminar Contacto";
};

//función que carga la info del contacto

const loadInfo = async (contacto, penIcon) => {
  if (contacto.uidImagen) {
    const imagen = document.createElement("img");
    userIcon.style.display = "none";
    imagen.className = "imagen-contacto";
    imagen.src = `../backend/src/public/images/${contacto.uidImagen}`;
    divImagenContacto.appendChild(imagen);
  }

  nombreContacto.value = contacto.nombre;
  apellidoContacto.value = contacto.apellido;
  cargoContacto.value = contacto.cargo;
  emailContacto.value = contacto.email;
  if (
    penIcon.parentElement.parentElement.firstElementChild.nextElementSibling
      .nextElementSibling.nextElementSibling.innerText === ""
  ) {
    companiaContacto.value = "none";
  } else {
    companiaContacto.value = contacto.compania.nombre;
  }

  companiaContacto.classList.add("select-definitivo");
  if (
    penIcon.parentElement.parentElement.firstElementChild.nextElementSibling
      .nextElementSibling.lastElementChild.innerText !== ""
  ) {
    regionContacto.value = contacto.region.nombreRegion;
    await getLocations(
      `http://${host}/regiones/paises/nombres`, //Obtengo los nombres de los países
      "pais-contacto",
      {
        nombreRegion: contacto.region.nombreRegion,
      }
    );
    regionContacto.classList.add("select-definitivo");
    paisContacto.disabled = false;
    paisContacto.value = contacto.pais.nombrePais;
    paisContacto.classList.add("select-definitivo");
    if (
      penIcon.parentElement.parentElement.firstElementChild.nextElementSibling
        .nextElementSibling.firstElementChild.innerText !== ""
    ) {
      ciudadContacto.disabled = false;
      await getLocations(
        `http://${host}/regiones/ciudades/nombres`,
        "ciudad-contacto",
        {
          nombrePais: contacto.pais.nombrePais,
        }
      );
      ciudadContacto.value = contacto.ciudad.nombreCiudad;
      ciudadContacto.classList.add("select-definitivo");
      direccionContacto.disabled = false;
    }
  }
  if (contacto.direccion) {
    direccionContacto.disabled = false;
    direccionContacto.value = contacto.direccion;
  }
  if (contacto.interes) {
    if (contacto.interes === 25) {
      selectorBarra.className = "cuarto-barra";
      document.getElementById("cuarto").className = " barra cuarto";
    }
    if (contacto.interes === 50) {
      selectorBarra.className = "mitad-barra";
      document.getElementById("cuarto").className = "barra mitad";
      document.getElementById("mitad").className = "barra mitad";
    }
    if (contacto.interes === 75) {
      selectorBarra.className = "tres-cuarto-barra tres-cuartos-barra";
      document.getElementById("cuarto").className = "barra tres-cuartos";
      document.getElementById("mitad").className = "barra tres-cuartos";
      document.getElementById("tres-cuartos").className = "barra tres-cuartos";
    }
    if (contacto.interes === 100) {
      barraInteres.className = "barra completa";
      selectorBarra.className = "tres-cuartos-barra barra-completa";
      document.getElementById("cuarto").className =
        "barra tres-cuartos completa";
      document.getElementById("mitad").className =
        "barra tres-cuartos completa";
      document.getElementById("tres-cuartos").className =
        "barra tres-cuartos completa";
    }
  }
  if (contacto.canalesContacto) {
    contacto.canalesContacto.forEach((canal) => {
      resetCanal();
      crearOtroCanal(canal);
    });
  }
};

/*ELIMINAR UNO O VARIOS CONTACTOS*/

eliminarContactos.addEventListener("click", (e) => {
  modalBgContacto.classList.add("bg-activate");
  modalBgContacto.classList.remove("modal-bg-modify");
  divEliminarContacto.style.display = "flex";
});

//cancelar la eliminación

cancelDelete.addEventListener("click", (e) => {
  modalBgContacto.classList.remove("bg-activate");
  modalBgContacto.classList.add("modal-bg-modify");
  divEliminarContacto.style.display = "none";
  document.getElementById("p-delete").innerHTML =
    "¿Seguro que desear eliminar los contactos seleccionados?";
});

//confirmar la eliminación

document.getElementById("confirm-delete").addEventListener("click", (e) => {
  ABMContact(`http://${host}/contactos`, "DELETE", contactosSeleccionados);
  cancelDelete.click();
  getContactos();
});

//SUBIR UNA IMAGEN

inputFile.addEventListener("change", () => {
  const imagen = document.createElement("img");

  userIcon.style.display = "none";
  imagen.className = "imagen-contacto";
  imagen.src = URL.createObjectURL(inputFile.files[0]);
  divImagenContacto.appendChild(imagen);
});
