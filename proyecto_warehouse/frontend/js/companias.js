import {
  host,
  token,
  removeActive,
  seccionUsuarios,
  seccionContactos,
  seccionRegiones,
  resetDots,
  createIcons,
  modalBg,
  modalCrud,
  modalSucces,
  modalModifyCompany,
  processInvalid,
  resetModal,
  checkInputs,
  resetInputsStyles,
  processAdminTable,
  resetInputsValues,
  crearModalCrud,
  getLocations,
  resetOptions,
  regionCompany,
  regionCompanyModify,
  paisCompany,
  paisCompanyModify,
  ciudadCompany,
  ciudadCompanyModify,
} from "./modules/indexModules.js";

const companiasItem = document.getElementById("companias-item");
const botonCompania = document.getElementById("boton-compania");
const divCompania = document.getElementById("div-nueva-compania");
const botonAgregarCompania = document.querySelector(
  ".primary-button.create.company"
);
const nombreCompania = document.getElementById("nombre-compania");
const nombreCompaniaModify = document.getElementById("nombre-compania-modify");
const direccionCompania = document.getElementById("direccion-compania");
const direccionCompaniaModify = document.getElementById(
  "direccion-compania-modify"
);
const emailInput = document.getElementById("email-compania");
const emailInputModify = document.getElementById("email-compania-modify");
const emailSmall = document.getElementById("email-compania-small");
const emailSmallModify = document.getElementById("email-compania-small-modify");
const telefonoCompania = document.getElementById("telefono-compania");
const telefonoCompaniaModify = document.getElementById(
  "telefono-compania-modify"
);
let idCompany;

const inputs = { emailInput, emailInputModify };
const smalls = { emailSmall, emailSmallModify };

companiasItem.addEventListener("click", () => {
  removeActive();

  companiasItem.classList.add("item-habilitado");

  seccionUsuarios.style.display = "none";
  seccionContactos.style.display = "none";
  seccionRegiones.style.display = "none";
  divCompania.style.display = "none";
  botonCompania.style.display = "block";

  resetInputsValues();
  resetInputsStyles();
  resetOptions("pais");
  resetOptions("ciudad");

  getCompanies();
});

//función que trae los datos de las companias

const getCompanies = () =>
  fetch(`http://${host}/companias`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => processAdminTable(r, "companias"))
    .catch((e) => console.error(e));

//EventListener del botón para agregar companias

botonCompania.addEventListener("click", () => {
  botonCompania.style.display = "none";
  divCompania.style.display = "flex";
  window.scrollBy(0, 90);
  getLocations(`http://${host}/regiones/nombres`, "region");
});

//EventListeners para las options de las regiones y los paises

regionCompany.addEventListener("click", (e) => {
  resetOptions("pais");
  resetOptions("ciudad");
  paisCompany.disabled = true;
  ciudadCompany.disabled = true;
  if (e.target.value !== "none") {
    getLocations(`http://${host}/regiones/paises/nombres`, "pais", {
      nombreRegion: e.target.value,
    });
  }
});

regionCompanyModify.addEventListener("click", (e) => {
  resetOptions("pais-modify");
  resetOptions("ciudad-modify");
  paisCompanyModify.disabled = true;
  ciudadCompanyModify.disabled = true;
  if (e.target.value !== "none") {
    getLocations(`http://${host}/regiones/paises/nombres`, "pais-modify", {
      nombreRegion: e.target.value,
    });
  }
});

paisCompany.addEventListener("click", (e) => {
  resetOptions("ciudad");
  if (e.target.value !== "none") {
    getLocations(`http://${host}/regiones/ciudades/nombres`, "ciudad", {
      nombrePais: e.target.value,
    });
  }
});

paisCompanyModify.addEventListener("click", (e) => {
  resetOptions("ciudad-modify");
  if (e.target.value !== "none") {
    getLocations(`http://${host}/regiones/ciudades/nombres`, "ciudad-modify", {
      nombrePais: e.target.value,
    });
  }
});

//EventListener para el botón que agrega una compañia nueva

botonAgregarCompania.addEventListener("click", () => {
  resetInputsStyles();
  const emptyInput = checkInputs("companias");

  const compania = {
    nombre: nombreCompania.value,
    region: regionCompany.value,
    pais: paisCompany.value,
    ciudad: ciudadCompany.value,
    direccion: direccionCompania.value,
    email: emailInput.value,
    telefono: telefonoCompania.value,
  };

  if (!emptyInput) ABMCompany(`http://${host}/companias`, "POST", compania);
});

//función para el AVM de companias

const ABMCompany = (url, method, obj = {}) => {
  fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponseCompany(r))
    .catch((e) => console.error(e));
};

//función que procesa las respuestas del servidor

const processResponseCompany = async (response) => {
  try {
    const jsonResponse = await response.json();

    if (response.status === 200) {
      modalModifyCompany.style.display = "none";
      modalCrud.style.display = "none";
      modalBg.classList.add("bg-activate");
      modalSucces.classList.add("bg-activate");
      setTimeout(() => {
        modalBg.classList.remove("bg-activate");
        modalSucces.classList.remove("bg-activate");
        companiasItem.click();
      }, 2000);
      resetModal();
    } else if (response.status === 401) {
      window.open("bienvenida.html", "_self");
    } else if (response.status === 422) {
      processInvalid(jsonResponse, inputs, smalls);
    }
  } catch (error) {
    console.error(error);
  }
};

// EventListener para MODIFICAR Y ELIMINAR COMPANIAS

document.addEventListener("click", (event) => {
  if (event.target.className === "fas fa-ellipsis-h dots company") {
    resetDots();
    createIcons(event.target);
    idCompany = event.target.id;
  } else if (event.target.className === "fas fa-pen company") {
    resetInputsStyles();
    resetOptions("region-modify");
    chargeCompanyInfo(event.target);
    modalBg.classList.add("bg-activate");
    modalModifyCompany.style.display = "unset";
  } else if (event.target.className === "primary-button modificar company") {
    resetInputsStyles();
    const emptyInput = checkInputs("companias");
    const nuevaCompania = {
      nombre: nombreCompaniaModify.value,
      region: regionCompanyModify.value,
      pais: paisCompanyModify.value,
      ciudad: ciudadCompanyModify.value,
      direccion: direccionCompaniaModify.value,
      email: emailInputModify.value,
      telefono: telefonoCompaniaModify.value,
    };

    if (!emptyInput)
      ABMCompany(`http://${host}/companias/${idCompany}`, "PUT", nuevaCompania);
  } else if (event.target.className === "fas fa-trash company") {
    modalBg.classList.add("bg-activate");
    modalCrud.style.display = "flex";
    crearModalCrud(
      "deleteCompany",
      event.target.parentElement.parentElement.firstElementChild.innerHTML
    );
  } else if (
    event.target.className === "primary-button crud eliminar compania"
  ) {
    ABMCompany(`http://${host}/companias/${idCompany}`, "DELETE");
  }
});

//función para cargar la info de la compañia al querer modificarla

const chargeCompanyInfo = async (elemento) => {
  document.getElementById("nombre-compania-modify").value =
    elemento.parentElement.parentElement.firstElementChild.innerHTML;
  document.getElementById("direccion-compania-modify").value =
    elemento.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
  await getLocations(`http://${host}/regiones/nombres`, "region-modify");
  if (
    !elemento.parentElement.parentElement.firstElementChild.nextElementSibling
      .lastElementChild.innerHTML
  ) {
    regionCompanyModify.value = "none";
  } else {
    regionCompanyModify.value =
      elemento.parentElement.parentElement.firstElementChild.nextElementSibling.lastElementChild.innerHTML;
  }

  await getLocations(`http://${host}/regiones/paises/nombres`, "pais-modify", {
    nombreRegion: regionCompanyModify.value,
  });
  if (
    !elemento.parentElement.parentElement.firstElementChild.nextElementSibling
      .firstElementChild.innerHTML
  ) {
    paisCompanyModify.value = "none";
  } else {
    paisCompanyModify.value =
      elemento.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.innerHTML;
  }

  if (
    !elemento.parentElement.parentElement.firstElementChild.nextElementSibling
      .nextElementSibling.innerHTML
  ) {
    ciudadCompanyModify.value = "none";
  } else {
    await getLocations(
      `http://${host}/regiones/ciudades/nombres`,
      "ciudad-modify",
      { nombrePais: paisCompanyModify.value }
    );
    ciudadCompanyModify.value =
      elemento.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
  }
  document.getElementById("email-compania-modify").value =
    elemento.parentElement.previousElementSibling.previousElementSibling.innerHTML;
  document.getElementById("telefono-compania-modify").value =
    elemento.parentElement.previousElementSibling.innerHTML;
};
