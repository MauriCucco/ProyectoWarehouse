"use strict";

import {
  host,
  token,
  removeActive,
  checkInputs,
  processInvalid,
  seccionContactos,
  seccionCompanias,
  seccionRegiones,
  resetInputsStyles,
  resetInputsValues,
  sortTableByColumn,
  resetDots,
  createIcons,
  crearModalCrud,
  modalBg,
  modalCrud,
  modalModifyCompany,
  modalSucces,
  resetModal,
  processAdminTable,
  seccionUsuarios,
} from "./modules/indexModules.js";

let usuariosItem = document.getElementById("usuarios-item");
const modalModificar = document.getElementById("modal-modify-user");

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
const botonUsuario = document.getElementById("boton-usuario");
const registroForm = document.getElementById("registro");
let userId;

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

  seccionUsuarios.style.display = "unset";
  modalModifyCompany.style.display = "none";
  seccionContactos.style.display = "none";
  seccionRegiones.style.display = "none";
  seccionCompanias.style.display = "none";
  botonUsuario.style.display = "block";
  registroForm.style.display = "none";

  resetInputsValues();

  resetInputsStyles();

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
    .then((r) => processAdminTable(r, "usuarios"))
    .catch((e) => console.error(e));

//EventListener del botón para agregar companias

botonUsuario.addEventListener("click", () => {
  botonUsuario.style.display = "none";
  registroForm.style.display = "flex";
  window.scrollBy(0, 80);
});

//CREAR USUARIO

submitButton.addEventListener("click", () => {
  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const email = emailInput.value;
  const perfil = perfilSelect.value;
  const password = passwordInput.value;
  const confirm_password = confirmInput.value;

  const data = { nombre, apellido, email, perfil, password, confirm_password };

  resetInputsStyles();

  const emptyInput = checkInputs("usuarios-create");

  if (!emptyInput) ABMUser(`http://${host}/usuarios/registro`, "POST", data);
});

//función que crea, elimina o modifica (ABM) un usuario

const ABMUser = (url, metodo, obj = {}) =>
  fetch(url, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponseUser(r, metodo))
    .catch((e) => console.error(e));

//función que procesa las respuestas del servidor

const processResponseUser = async (response, metodo) => {
  try {
    const jsonResponse = await response.json();

    if (response.status === 200) {
      resetInputsStyles();
      modalBg.classList.add("bg-activate");
      modalSucces.classList.add("bg-activate");
      setTimeout(() => {
        modalBg.classList.remove("bg-activate");
        modalSucces.classList.remove("bg-activate");
        usuariosItem.click();
      }, 2000);
      resetModal();
      getUsuarios();
    } else if (response.status === 401) {
      window.open("bienvenida.html", "_self");
    } else if (response.status === 422) {
      if (metodo === "POST") processInvalid(jsonResponse, inputs, smalls);
      if (metodo === "PUT") processInvalid(data, inputsModify, smallsModify);
    }
  } catch (error) {
    console.error(error);
  }
};

//ELIMINAR Y MODIFICAR USUARIOS

document.addEventListener("click", (event) => {
  if (event.target.className === "fas fa-ellipsis-h dots usuarios") {
    userId = event.target.id;
    resetDots();
    createIcons(event.target);
  } else if (event.target.className === "fas fa-trash usuarios") {
    //ELIMINAR USUARIO
    const userName = `${event.target.parentElement.parentElement.firstElementChild.innerHTML} ${event.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML}`;
    modalBg.classList.add("bg-activate");
    crearModalCrud("deleteUser", userName);
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
      modalModifyCompany.style.display = "none";
      modalModificar.style.display = "none";
      resetInputsStyles();
    }
  } else if (
    event.target.className === "primary-button crud eliminar usuario"
  ) {
    ABMUser(`http://${host}/usuarios/${userId}`, "DELETE");
  } else if (event.target.className === "fas fa-pen usuarios") {
    //MODIFICAR USUARIO
    resetInputsStyles();
    chargeUserInfo(event.target);
    modalBg.classList.add("bg-activate");
    modalModificar.style.display = "flex";
  } else if (event.target.className === "primary-button modificar") {
    const modifiedUser = {
      nombre: nombreInputModify.value,
      apellido: apellidoInputModify.value,
      email: emailInputModify.value,
      perfil: perfilSelectModify.value,
    };

    const emptyInput = checkInputs();

    if (!emptyInput)
      modifyUser(`http://${host}/usuarios/${userId}`, "PUT", modifiedUser);
  }
});

//Llamo a la función sorTableByColumn al tocar una imagen .sort

document.querySelectorAll(".tabla th").forEach((headerCell) => {
  headerCell.addEventListener("click", (e) => {
    if (
      e.target.localName === "p" ||
      e.target.className === "checkmark main" ||
      e.target.localName === "input"
    )
      return;
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

//event listener para cuando alguien escribe en los inputs

Object.values(inputs).forEach((input) =>
  input.addEventListener("keydown", () => {
    input.classList.remove("invalid");
    resetInputsStyles();
  })
);

Object.values(inputsModify).forEach((inputModify) =>
  inputModify.addEventListener("keydown", () => {
    inputModify.classList.remove("invalid");
    resetInputsStyles();
  })
);

//función para cargar la info del usuario para luego modificarlo

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
