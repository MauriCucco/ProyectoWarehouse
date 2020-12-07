import {
  host,
  token,
  removeActive,
  seccionUsuarios,
  seccionContactos,
  seccionCompanias,
  seccionRegiones,
  resetDots,
  createIcons,
  modalBg,
  modalCrud,
  modalSucces,
  processInvalid,
  callModal,
  resetModal,
  checkInputs,
  resetInputsStyles,
  modalModifyCompany,
} from "./modules/indexModules.js";

const regionesItem = document.getElementById("regiones-item");
const arbolRegiones = document.getElementById("arbol-regiones");
const botonAgregarRegion = document.getElementById("boton-region");
let idRegion, idPais, idCiudad;

//activar el item de usuarios en el nav y preparar la sección Regiones

regionesItem.addEventListener("click", () => {
  removeActive();

  regionesItem.classList.add("item-habilitado");

  resetRegiones();
  getRegiones();

  seccionUsuarios.style.display = "none";
  seccionContactos.style.display = "none";
  seccionCompanias.style.display = "none";
  modalModifyCompany.style.display = "none";
  seccionRegiones.style.display = "unset";
});

//función para obtener la info del servidor

const getRegiones = () =>
  fetch(`http://${host}/regiones`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (r.status === 200) crearArbol(r);
      if (r.status === 401) window.open("bienvenida.html", "_self");
    })
    .catch((e) => console.error(e));

//función para crear el árbol de regiones/paises/ciudades

const crearArbol = async (response) => {
  const data = await response.json();

  data.forEach((region) => {
    crearRama(region);
  });

  document.querySelectorAll(".caret").forEach((toggler) => {
    toggler.addEventListener("click", () => {
      if (toggler.parentElement.querySelector(".nested")) {
        toggler.parentElement
          .querySelector(".nested")
          .classList.toggle("active");
        toggler.classList.toggle("caret-down");
      }
    });
  });
};

//función para crear cada rama del árbol

const crearRama = (region) => {
  const regionLi = document.createElement("li");
  const regionSpan = document.createElement("span");
  const divIcons = document.createElement("div");
  const dotsIcon = document.createElement("i");
  const ulPaises = document.createElement("ul");

  regionSpan.classList.add("region");
  regionSpan.classList.add("caret");
  dotsIcon.id = region._id;
  regionSpan.innerHTML = region.nombreRegion;
  dotsIcon.className = "fas fa-ellipsis-h dots regiones";
  ulPaises.classList.add("nested");

  arbolRegiones.appendChild(regionLi);
  regionLi.appendChild(regionSpan);
  regionLi.appendChild(divIcons);
  divIcons.appendChild(dotsIcon);

  if (region.paises.length > 0) {
    regionLi.appendChild(ulPaises);

    region.paises.forEach((pais) => {
      const paisLi = document.createElement("li");
      const paisSpan = document.createElement("span");
      const divIcons = document.createElement("div");
      const dotsIcon = document.createElement("i");
      const ulCiudades = document.createElement("ul");

      paisLi.classList.add("pais");
      paisSpan.classList.add("caret");
      paisSpan.innerHTML = pais.nombrePais;
      dotsIcon.id = pais._id;
      dotsIcon.className = "fas fa-ellipsis-h dots paises";
      ulCiudades.classList.add("nested");

      ulPaises.appendChild(paisLi);
      paisLi.appendChild(paisSpan);
      paisLi.appendChild(divIcons);
      divIcons.appendChild(dotsIcon);

      if (pais.ciudades.length > 0) {
        paisLi.appendChild(ulCiudades);

        pais.ciudades.forEach((ciudad) => {
          const ciudadLi = document.createElement("li");
          const ciudadSpan = document.createElement("span");
          const divIcons = document.createElement("div");
          const dotsIcon = document.createElement("i");

          ciudadSpan.innerHTML = ciudad.nombreCiudad;
          ciudadLi.classList.add("ciudad");
          dotsIcon.className = "fas fa-ellipsis-h dots ciudades";
          dotsIcon.id = ciudad._id;

          ulCiudades.appendChild(ciudadLi);
          ciudadLi.appendChild(ciudadSpan);
          ciudadLi.appendChild(divIcons);
          divIcons.appendChild(dotsIcon);
        });
      }
    });
  }
};

//función para resetear las regiones

const resetRegiones = () => {
  document.querySelectorAll("#arbol-regiones li").forEach((li) => li.remove());
};

// EventListener para AGREGAR, MODIFICAR Y ELIMINAR REGIONES

document.addEventListener("click", (event) => {
  if (event.target.className === "fas fa-ellipsis-h dots regiones") {
    resetDots();
    createIcons(event.target);
    idRegion = event.target.id;
  } else if (event.target.className === "fas fa-ellipsis-h dots paises") {
    resetDots();
    createIcons(event.target);
    idPais = event.target.id;
  } else if (event.target.className === "fas fa-ellipsis-h dots ciudades") {
    resetDots();
    createIcons(event.target);
    idCiudad = event.target.id;
  } else if (event.target.className === "fas fa-plus city") {
    addInputCity(); //agregar un input para ciudades
  } else if (event.target.className === "fas fa-trash city") {
    event.target.parentElement.nextElementSibling.remove();
    event.target.parentElement.remove(); //remueve el input para ciuades
  } else if (
    event.target.className === "primary-button crud agregar regiones" //CREAR UNA REGIÓN
  ) {
    const data = checkAll(event.target);

    if (data) crud(data, `http://${host}/regiones`, "POST");
  } else if (event.target.className === "fas fa-pen regiones") {
    //MODIFICAR UNA REGIÓN
    callModal("modifyRegion", event.target);
  } else if (
    event.target.className === "primary-button crud modificar regiones"
  ) {
    const data = checkAll(event.target);

    if (data) crud(data, `http://${host}/regiones/${idRegion}`, "PUT");
  } else if (event.target.className === "fas fa-trash regiones") {
    //ELIMINAR UNA REGIÓN
    callModal("deleteRegion", event.target);
  } else if (
    event.target.className === "primary-button crud eliminar regiones"
  ) {
    const obj = {};
    crud(obj, `http://${host}/regiones/${idRegion}`, "DELETE");
  } else if (event.target.className === "fas fa-plus regiones") {
    //AGREGAR UN PAÍS
    callModal("addCountry", event.target);
  } else if (event.target.className === "primary-button crud agregar paises") {
    const data = checkAll(event.target);

    if (data) crud(data, `http://${host}/regiones/paises/${idRegion}`, "POST");
  } else if (event.target.className === "fas fa-pen paises") {
    //MODIFICAR UN PAÍS
    idRegion =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;

    callModal("modifyCountry", event.target);
  } else if (
    event.target.className === "primary-button crud modificar paises"
  ) {
    const data = checkAll(event.target);

    if (data) crud(data, `http://${host}/regiones/paises/${idRegion}`, "PUT");
  } else if (event.target.className === "fas fa-trash paises") {
    //ELIMINAR UN PAÍS
    idRegion =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;
    callModal("deleteCountry", event.target);
  } else if (event.target.className === "primary-button crud eliminar paises") {
    const pais = { idPais };
    crud(pais, `http://${host}/regiones/paises/${idRegion}`, "DELETE");
  } else if (event.target.className === "fas fa-plus paises") {
    //AGREGAR UNA CIUDAD
    idRegion =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;
    callModal("addCity", event.target);
  } else if (
    event.target.className === "primary-button crud agregar ciudades"
  ) {
    const data = checkAll(event.target);
    if (data)
      crud(data, `http://${host}/regiones/ciudades/${idRegion}`, "POST");
  } else if (event.target.className === "fas fa-pen ciudades") {
    //MODIFICAR UNA CIUDAD
    idRegion =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.firstElementChild.nextElementSibling
        .firstElementChild.id;
    idPais =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;
    callModal("modifyCity", event.target);
  } else if (
    event.target.className === "primary-button crud modificar ciudades"
  ) {
    const data = checkAll(event.target);
    if (data) crud(data, `http://${host}/regiones/ciudades/${idRegion}`, "PUT");
  } else if (event.target.className === "fas fa-trash ciudades") {
    //ELIMINAR UNA CIUDAD
    idRegion =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.firstElementChild.nextElementSibling
        .firstElementChild.id;
    idPais =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;
    callModal("deleteCity", event.target);
  } else if (
    event.target.className === "primary-button crud eliminar ciudades"
  ) {
    const ciudad = { idPais, idCiudad };
    crud(ciudad, `http://${host}/regiones/ciudades/${idRegion}`, "DELETE");
  }
});

//Función que agrega un input más de ciudad al crear una región

const addInputCity = () => {
  const divInput = document.getElementById("div-input");
  const divCities = document.createElement("div");
  const inputCity = document.createElement("input");
  const smallCity = document.createElement("small");
  const removeIcon = document.createElement("i");

  divCities.className = "div-cities";
  inputCity.setAttribute("type", "text");
  inputCity.className = "input-add city new";
  smallCity.className = "small-add city";
  removeIcon.className = "fas fa-trash city";

  divInput.appendChild(divCities);
  divCities.appendChild(inputCity);
  divCities.appendChild(removeIcon);
  divInput.appendChild(smallCity);
};

//función que procesa las respuestas del servidor

const processResponseRegion = async (response) => {
  try {
    const jsonResponse = await response.json();

    if (response.status === 200) {
      modalCrud.style.display = "none";
      modalSucces.classList.add("bg-activate");
      setTimeout(() => {
        modalBg.classList.remove("bg-activate");
        modalSucces.classList.remove("bg-activate");
        regionesItem.click();
      }, 2000);
      resetModal();
    } else if (response.status === 401) {
      window.open("bienvenida.html", "_self");
    } else if (response.status === 422) {
      const smallRegion = document.querySelector(".small-add");
      const inputRegion = document.querySelector(".input-add");
      const smallCountry = document.querySelector(".small-add.country");
      const inputCountry = document.querySelector(".input-add.country");
      const inputCities = document.querySelectorAll(".input-add.city");
      const smallCities = document.querySelectorAll(".small-add.city");
      const inputCity = document.querySelector(".input-add.city");
      const smallCity = document.querySelector(".small-add.city");

      processInvalid(
        jsonResponse,
        (inputs = { inputRegion, inputCountry, inputCities, inputCity }),
        (smalls = { smallRegion, smallCountry, smallCities, smallCity })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

//EventListener del botón para agregar una región
botonAgregarRegion.addEventListener("click", () => {
  callModal("addRegion");
});

//función general para el CRUD de regiones, paises y ciudades

const crud = (obj, url, operacion) =>
  fetch(url, {
    method: operacion,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponseRegion(r))
    .catch((e) => console.error(e));

//función que chequea los inputs y reune su información antes de mandarla al servidor
const checkAll = (elemento) => {
  const inputRegion = document.getElementById("input-nuevo");
  const inputCountry = document.getElementById("input-country");
  const inputCities = document.querySelectorAll(".input-add.city");

  resetInputsStyles();

  const emptyInput = checkInputs("regiones");

  if (emptyInput) {
    return false;
  } else {
    if (elemento.className === "primary-button crud agregar regiones") {
      const region = {
        nombreRegion: inputRegion.value,
        paises: [
          {
            nombrePais: inputCountry.value,
            ciudades: [],
          },
        ],
      };

      inputCities.forEach((city) => {
        region.paises[0].ciudades.push({
          nombreCiudad: city.value,
        });
      });

      return region;
    } else if (
      elemento.className === "primary-button crud modificar regiones"
    ) {
      const region = { nombreRegion: inputRegion.value };

      return region;
    } else if (elemento.className === "primary-button crud agregar paises") {
      const pais = {
        nombrePais: inputCountry.value,
        ciudades: [],
      };

      inputCities.forEach((city) => {
        pais.ciudades.push({
          nombreCiudad: city.value,
        });
      });
      return pais;
    } else if (elemento.className === "primary-button crud modificar paises") {
      const pais = { nombrePais: inputCountry.value, idPais };
      return pais;
    } else if (elemento.className === "primary-button crud agregar ciudades") {
      const ciudadOCiudades = { idPais, ciudades: [] };

      inputCities.forEach((city) => {
        ciudadOCiudades.ciudades.push({
          nombreCiudad: city.value,
        });
      });

      return ciudadOCiudades;
    } else if (
      elemento.className === "primary-button crud modificar ciudades"
    ) {
      const ciudad = { idPais, idCiudad, nombreCiudad: inputCities[0].value };

      return ciudad;
    }
  }
};
