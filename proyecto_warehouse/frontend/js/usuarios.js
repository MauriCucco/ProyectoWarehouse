import {
  host,
  token,
  removeActive,
  checkInputs,
  processInvalid,
  seccionUsuarios,
  seccionContactos,
  seccionRegiones,
  divSinPermiso,
  resetInputsStyles,
  resetInputsValues,
  sortTableByColumn,
  resetDots,
  createIcons,
  crearModalCrud,
  modalBg,
  modalCrud,
  resetModal,
} from "./modules/indexModules.js";

let usuariosItem = document.getElementById("usuarios-item");
const botonEliminar = document.querySelector(
  ".primary-button.eliminar.usuario"
);
const modalModificar = document.getElementById("modal-modify");
const botonModificar = document.querySelector(
  ".primary-button.modificar.usuario"
);
const modalSucces = document.getElementById("modal-succes");

let nombreInput = document.getElementById("nombre-input");
let nombreInputModify = document.getElementById("nombre-input-modify");
let nombreSmall = document.getElementById("nombre-small");
let nombreSmallModify = document.getElementById("nombre-small-modify");
let apellidoInput = document.getElementById("apellido-input");
let apellidoInputModify = document.getElementById("apellido-input-modify");
let apellidoSmall = document.getElementById("apellido-small");
let apellidoSmallModify = document.getElementById("apellido-small-modify");
let emailInput = document.getElementById("email-input");
let emailInputModify = document.getElementById("email-input-modify");
let emailSmall = document.getElementById("email-small");
let emailSmallModify = document.getElementById("email-small-modify");
let perfilSelect = document.getElementById("perfil-select");
let perfilSelectModify = document.getElementById("perfil-select-modify");
let passwordInput = document.getElementById("password-input");
let passwordSmall = document.getElementById("password-small");
let confirmInput = document.getElementById("confirm-password-input");
let confirmSmall = document.getElementById("confirm-password-small");
const submitButton = document.getElementById("submit-button");
let dataSmall = document.getElementById("data-small");
let dataSmallModify = document.getElementById("data-small-modify");

const inputs = {
  nombreInput,
  apellidoInput,
  emailInput,
  passwordInput,
  confirmInput,
};
const smalls = {
  nombreSmall,
  apellidoSmall,
  emailSmall,
  passwordSmall,
  confirmSmall,
  dataSmall,
};
const inputsModify = {
  nombreInputModify,
  apellidoInputModify,
  emailInputModify,
};
const smallsModify = {
  nombreSmallModify,
  apellidoSmallModify,
  emailSmallModify,
  dataSmallModify,
};

//activar el item de usuarios en el nav

usuariosItem.addEventListener("click", () => {
  removeActive();

  usuariosItem.classList.add("item-habilitado");

  seccionContactos.style.display = "none";
  seccionRegiones.style.display = "none";

  resetInputsValues(inputs);

  resetInputsStyles(inputs, smalls);

  getUsuarios();
});

//función para hacer un GET al endpoint de usuarios

const getUsuarios = () =>
  fetch(`http://${host}/usuarios`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => processAdmin(r))
    .catch((e) => console.error(e));

//función para verificar si es administrador

const processAdmin = async (response) => {
  try {
    const data = await response.json();

    if (data.error === "No se encontró un token de autorización")
      return window.open("bienvenida.html", "_self");
    if (data.error === "No posee autorización de administrador")
      return (divSinPermiso.style.display = "flex");

    seccionUsuarios.style.display = "unset";

    deleteRows();

    createRows(data);
  } catch (error) {
    console.error(error);
  }
};

//función que "resetea" la tabla usuarios

const deleteRows = () => {
  const filasUsuarios = document.getElementsByClassName("fila-usuario");

  for (let i = filasUsuarios.length - 1; i >= 0; i--) {
    filasUsuarios[i].remove();
  }
};

//función para crear las filas en la tabla de usuarios

const createRows = (data) => {
  data.forEach((element) => {
    let tablaBody = document.getElementById("body-tabla");
    let tr = document.createElement("tr");
    let tdNombre = document.createElement("td");
    let tdApellido = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdPerfil = document.createElement("td");
    let tdAcciones = document.createElement("td");
    let dotsIcon = document.createElement("i");

    tr.classList.add("fila-usuario");
    tdAcciones.classList.add("acciones");
    dotsIcon.className = "fas fa-ellipsis-h dots";
    dotsIcon.id = element._id;

    tdNombre.innerHTML = element.nombre;
    tdApellido.innerHTML = element.apellido;
    tdEmail.innerHTML = element.email;
    tdPerfil.innerHTML = element.perfil;

    tablaBody.appendChild(tr);
    tdAcciones.appendChild(dotsIcon);
    tr.appendChild(tdNombre);
    tr.appendChild(tdApellido);
    tr.appendChild(tdEmail);
    tr.appendChild(tdPerfil);
    tr.appendChild(tdAcciones);
  });
};

//CREAR USUARIO

submitButton.addEventListener("click", () => {
  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const email = emailInput.value;
  const perfil = perfilSelect.value;
  const password = passwordInput.value;
  const confirm_password = confirmInput.value;

  resetInputsStyles(inputs, smalls);

  const data = { nombre, apellido, email, perfil, password, confirm_password };

  if (nombre && apellido && email && perfil && password && confirm_password)
    return createUser(data);

  checkInputs(data, inputs, dataSmall);
});

//función que crea un usuario

const createUser = (obj) =>
  fetch(`http://${host}/usuarios/registro`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//función que procesa las respuestas del servidor

const processResponse = async (response) => {
  try {
    dataSmall.innerHTML = "";

    const jsonResponse = await response.json();

    if (response.status === 200) {
      resetInputsStyles(inputs, smalls);

      dataSmall.classList.add("small-success");

      dataSmall.innerHTML = "El usuario fue creado exitósamente";

      getUsuarios();

      setTimeout(() => {
        resetInputsValues(inputs);

        resetInputsStyles(inputs, smalls);
      }, 2000);
    } else if (response.status === 401) {
      window.open("bienvenida.html", "_self");
    } else if (response.status === 422) {
      processInvalid(jsonResponse, inputs, smalls);
    }
  } catch (error) {
    console.error(error);
  }
};

//ELIMINAR Y MODIFICAR USUARIOS

document.addEventListener("click", (event) => {
  if (event.target.className === "fas fa-ellipsis-h dots") {
    resetDots();

    createIcons(event.target);
  } else if (event.target.className === "fas fa-trash") {
    modalBg.classList.add("bg-activate");
    crearModalCrud("deleteUser", event.target.id);
    modalCrud.style.display = "flex";
  } else if (
    event.target.className === "primary-button cerrar" ||
    event.target.className === "primary-button cerrar-modify"
  ) {
    if (event.target.className === "primary-button cerrar") {
      modalBg.classList.remove("bg-activate");
      modalCrud.style.display = "none";
      resetModal();
    } else {
      modalBg.classList.remove("bg-activate");
      modalModificar.style.display = "none";
      resetInputsStyles(inputsModify, smallsModify);
    }
  } else if (
    event.target.className === "primary-button crud eliminar usuario"
  ) {
    deleteUser(event.target.id); //ELIMINAR
  } else if (event.target.className === "fas fa-pen") {
    chargeUserInfo(event.target);
    modalBg.classList.add("bg-activate");
    modalModificar.style.display = "flex";
  } else if (event.target.className === "primary-button modificar") {
    modifyUser(event.target.id); //MODIFICAR
  }
});

//función para eliminar un usuario

const deleteUser = (id) =>
  fetch(`http://${host}/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (r.status === 200) {
        getUsuarios();
        modalBg.classList.remove("bg-activate");
      } else if (r.status === 401) {
        window.open("bienvenida.html", "_self");
      }
    })
    .catch((e) => console.error(e));

//Llamo a la función sorTableByColumn al tocar una imagen .sort

document.querySelectorAll(".tabla th").forEach((headerCell) => {
  headerCell.addEventListener("click", (e) => {
    if (e.target.localName === "p") return;
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

//función para modificar un usuario

const modifyUser = async (id) => {
  const obj = {
    nombre: nombreInputModify.value,
    apellido: apellidoInputModify.value,
    email: emailInputModify.value,
    perfil: perfilSelectModify.value,
  };

  if (!obj.nombre || !obj.apellido || !obj.email)
    return checkInputs(obj, inputsModify, dataSmallModify);

  const response = await fetch(`http://${host}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();

  if (response.status === 200) {
    modalModificar.style.display = "none";
    modalSucces.classList.add("bg-activate");

    setTimeout(() => {
      modalBg.classList.remove("bg-activate");
      modalSucces.classList.remove("bg-activate");
      usuariosItem.click();
    }, 2000);
  } else if (response.status === 401) {
    window.open("bienvenida.html", "_self");
  } else if (response.status === 422) {
    processInvalid(data, inputsModify, smallsModify);
  }
};

//event listener para cuando alguien escribe en los inputs

Object.values(inputs).forEach((input) =>
  input.addEventListener("keydown", () => {
    input.classList.remove("invalid");
    resetInputsStyles(input, smalls);
  })
);

Object.values(inputsModify).forEach((inputModify) =>
  inputModify.addEventListener("keydown", () => {
    inputModify.classList.remove("invalid");
    resetInputsStyles(inputsModify, smallsModify);
  })
);

//función para carga la info del usuario al querer modificarlo

const chargeUserInfo = (elemento) => {
  document.getElementById("nombre-input-modify").value =
    elemento.parentElement.parentElement.firstElementChild.innerHTML;
  document.getElementById("apellido-input-modify").value =
    elemento.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
  document.getElementById("email-input-modify").value =
    elemento.parentElement.previousElementSibling.previousElementSibling.innerHTML;
  document.getElementById("perfil-select-modify").value =
    elemento.parentElement.previousElementSibling.innerHTML;
};
