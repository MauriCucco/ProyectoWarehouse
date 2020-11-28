import {
  host,
  token,
  removeActive,
  seccionUsuarios,
  seccionContactos,
  divSinPermiso,
  seccionRegiones,
  resetDots,
  createIcons,
  modalBg,
  modalCrud,
  modalSucces,
  processInvalid,
  resetModal,
  checkInputs,
  resetInputsStyles,
  processAdminTable,
  resetInputsValues,
  crearModalCrud,
  modalModifyCompany,
} from "./modules/indexModules.js";

const companiasItem = document.getElementById("companias-item");
const botonCompania = document.getElementById("boton-compania");
const divCompania = document.getElementById("div-nueva-compania");
const regionCompany = document.getElementById("region-company");
const regionCompanyModify = document.getElementById("region-modify-company");
const paisCompany = document.getElementById("country-company");
const paisCompanyModify = document.getElementById("country-modify-company");
const ciudadCompany = document.getElementById("city-company");
const ciudadCompanyModify = document.getElementById("city-modify-company");
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
  divSinPermiso.style.display = "none";
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

//función que obtiene los nombres de las locaciones existentes

const getLocations = async (url, locacion, obj = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();

  response.status === 200
    ? crearOptions(data, locacion)
    : window.open("bienvenida.html", "_self");
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
      option.innerHTML = element;
      option.className = `${locacion}-company`;
      if (locacion === "region-modify") {
        regionCompanyModify.appendChild(option);
      }
      if (locacion === "pais-modify") {
        paisCompanyModify.appendChild(option);
        paisCompanyModify.disabled = false;
      }
      if (locacion === "ciudad-modify") {
        ciudadCompanyModify.appendChild(option);
        ciudadCompanyModify.disabled = false;
      }
    });
    return;
  }
  array.forEach((element) => {
    const option = document.createElement("option");
    option.innerHTML = element;
    option.className = `${locacion}-company`;
    if (locacion === "region") {
      regionCompany.appendChild(option);
    }
    if (locacion === "pais") {
      paisCompany.disabled = false;
      paisCompany.appendChild(option);
    }
    if (locacion === "ciudad") {
      ciudadCompany.disabled = false;
      ciudadCompany.appendChild(option);
    }
  });
};

//EventListener para las options de las regiones y los paises

regionCompany.addEventListener("click", (e) => {
  resetOptions("pais");
  resetOptions("ciudad");
  paisCompany.disabled = true;
  ciudadCompany.disabled = true;
  e.target.value === "none"
    ? console.log("Debe elegir una región")
    : getLocations(`http://${host}/regiones/paises/nombres`, "pais", {
        nombreRegion: e.target.value,
      });
});

regionCompanyModify.addEventListener("click", (e) => {
  resetOptions("pais-modify");
  resetOptions("ciudad-modify");
  paisCompanyModify.disabled = true;
  ciudadCompanyModify.disabled = true;
  e.target.value === "none"
    ? console.log("Debe elegir una región")
    : getLocations(`http://${host}/regiones/paises/nombres`, "pais-modify", {
        nombreRegion: e.target.value,
      });
});

paisCompany.addEventListener("click", (e) => {
  resetOptions("ciudad");
  e.target.value === "none"
    ? console.log("Debe elegir un país")
    : getLocations(`http://${host}/regiones/ciudades/nombres`, "ciudad", {
        nombrePais: e.target.value,
      });
});

paisCompanyModify.addEventListener("click", (e) => {
  resetOptions("ciudad-modify");
  e.target.value === "none"
    ? console.log("Debe elegir un país")
    : getLocations(
        `http://${host}/regiones/ciudades/nombres`,
        "ciudad-modify",
        {
          nombrePais: e.target.value,
        }
      );
});

//función que resetea los options

const resetOptions = (locacion) => {
  document
    .querySelectorAll(`.${locacion}-company`)
    .forEach((option) => option.remove());
};

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
  regionCompanyModify.value =
    elemento.parentElement.parentElement.firstElementChild.nextElementSibling.lastElementChild.innerHTML;
  await getLocations(`http://${host}/regiones/paises/nombres`, "pais-modify", {
    nombreRegion: regionCompanyModify.value,
  });
  paisCompanyModify.value =
    elemento.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.innerHTML;
  await getLocations(
    `http://${host}/regiones/ciudades/nombres`,
    "ciudad-modify",
    { nombrePais: paisCompanyModify.value }
  );
  ciudadCompanyModify.value =
    elemento.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
  document.getElementById("email-compania-modify").value =
    elemento.parentElement.previousElementSibling.previousElementSibling.innerHTML;
  document.getElementById("telefono-compania-modify").value =
    elemento.parentElement.previousElementSibling.innerHTML;
};
