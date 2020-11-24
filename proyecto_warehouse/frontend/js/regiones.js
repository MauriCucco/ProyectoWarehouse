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
  processInvalid,
  callModal,
  resetModal,
  checkInputs,
  resetInputsStyles,
} from "./modules/indexModules.js";

const regionesItem = document.getElementById("regiones-item");
const arbolRegiones = document.getElementById("arbol-regiones");
const botonAgregarRegion = document.getElementById("boton-region");
let smalls, inputs, idRegion, idPais, idCiudad;

//activar el item de usuarios en el nav y preparar la sección Regiones

regionesItem.addEventListener("click", () => {
  removeActive();

  regionesItem.classList.add("item-habilitado");
  seccionUsuarios.style.display = "none";
  seccionContactos.style.display = "none";
  divSinPermiso.style.display = "none";
  seccionRegiones.style.display = "unset";

  resetRegiones();

  getRegiones();
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

//AGREGAR, MODIFICAR Y ELIMINAR REGIONES

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
  } else if (
    event.target.className === "primary-button crud agregar regiones" //CREAR UNA REGIÓN
  ) {
    const inputRegion = document.querySelector(".input-add");
    const inputCountry = document.querySelector(".input-add.country");
    const inputCities = document.querySelectorAll(".input-add.city");
    const smallRegion = document.querySelector(".small-add");
    const smallCountry = document.querySelector(".small-add.country");
    const smallCities = document.querySelectorAll(".small-add.city");
    const smallDataEmpty = document.querySelector(".small-data-empty");

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
    const inputs = { inputRegion, inputCountry, inputCities };
    const smalls = { smallRegion, smallCountry, smallCities, smallDataEmpty };

    resetInputsStyles(inputs, smalls);

    if (
      !region.nombreRegion ||
      !region.paises[0].nombrePais ||
      !region.paises[0].ciudades[0].nombreCiudad
    )
      return checkInputs(region, inputs, smallDataEmpty);

    //createRegion(region);
    crud(region, `http://${host}/regiones`, "POST");
  } else if (event.target.className === "fas fa-plus city") {
    addInputCity();
  } else if (event.target.className === "fas fa-trash city") {
    event.target.parentElement.nextElementSibling.remove();
    event.target.parentElement.remove();
  } else if (event.target.className === "fas fa-trash regiones") {
    callModal("deleteRegion", event.target);
  } else if (
    event.target.className === "primary-button crud eliminar regiones" //ELIMINAR UNA REGIÓN
  ) {
    //deleteRegion(idRegion);
    const obj = {};
    crud(obj, `http://${host}/regiones/${idRegion}`, "DELETE");
  } else if (event.target.className === "fas fa-pen regiones") {
    callModal("modifyRegion", event.target);
  } else if (
    event.target.className === "primary-button crud modificar regiones" //MODIFICAR UNA REGIÓN
  ) {
    const inputRegion = document.querySelector(".input-add");
    const smallRegion = document.querySelector(".small-add");
    const smallDataEmpty = document.querySelector(".small-data-empty");

    const region = { nombreRegion: inputRegion.value };

    const inputs = { inputRegion };
    const smalls = { smallRegion, smallDataEmpty };

    resetInputsStyles(inputs, smalls);

    if (!region.nombreRegion)
      return checkInputs(region, inputs, smallDataEmpty);

    //modifyRegion(region, idRegion);
    crud(region, `http://${host}/regiones/${idRegion}`, "PUT");
  } else if (event.target.className === "fas fa-plus regiones") {
    //AGREGAR UN PAÍS
    callModal("addCountry", event.target);
  } else if (event.target.className === "primary-button crud agregar paises") {
    const inputCountry = document.querySelector(".input-add.country");
    const inputCities = document.querySelectorAll(".input-add.city");
    const smallCountry = document.querySelector(".small-add.country");
    const smallCities = document.querySelectorAll(".small-add.city");
    const smallDataEmpty = document.querySelector(".small-data-empty");

    const pais = {
      nombrePais: inputCountry.value,
      ciudades: [],
    };

    inputCities.forEach((city) => {
      pais.ciudades.push({
        nombreCiudad: city.value,
      });
    });

    const inputs = { inputCountry, inputCities };
    const smalls = { smallCountry, smallCities, smallDataEmpty };

    resetInputsStyles(inputs, smalls);

    if (!pais.nombrePais || !pais.ciudades[0].nombreCiudad)
      return checkInputs(pais, inputs, smallDataEmpty);

    addCountry(pais, idRegion);
  } else if (event.target.className === "fas fa-pen paises") {
    //MODIFICAR UN PAÍS

    idRegion =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;

    callModal("modifyCountry", event.target);
  } else if (
    event.target.className === "primary-button crud modificar paises"
  ) {
    const inputCountry = document.querySelector(".input-add.country");
    const smallCountry = document.querySelector(".small-add.country");
    const smallDataEmpty = document.querySelector(".small-data-empty");

    const pais = { nombrePais: inputCountry.value, idPais };

    const inputs = { inputCountry };
    const smalls = { smallCountry, smallDataEmpty };

    resetInputsStyles(inputs, smalls);

    if (!pais.nombrePais) return checkInputs(pais, inputs, smallDataEmpty);

    modifyCountry(pais, idRegion);
  } else if (event.target.className === "fas fa-trash paises") {
    //ELIMINAR UN PAÍS
    idRegion =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;
    callModal("deleteCountry", event.target);
  } else if (event.target.className === "primary-button crud eliminar paises") {
    const pais = { idPais };
    deleteCountry(pais, idRegion);
  } else if (event.target.className === "fas fa-plus paises") {
    //AGREGAR UNA CIUDAD
    idRegion =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .firstElementChild.id;
    callModal("addCity", event.target);
  } else if (
    event.target.className === "primary-button crud agregar ciudades"
  ) {
    const inputCities = document.querySelectorAll(".input-add.city");
    const smallCities = document.querySelectorAll(".small-add.city");
    const smallDataEmpty = document.querySelector(".small-data-empty");

    const ciudadOCiudades = { idPais, ciudades: [] };

    inputCities.forEach((city) => {
      ciudadOCiudades.ciudades.push({
        nombreCiudad: city.value,
      });
    });

    const inputs = { inputCities };
    const smalls = { smallCities, smallDataEmpty };

    resetInputsStyles(inputs, smalls);

    if (!ciudadOCiudades.ciudades[0].nombreCiudad)
      return checkInputs(ciudadOCiudades, inputs, smallDataEmpty);

    addCity(ciudadOCiudades, idRegion);
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
    const inputCity = document.querySelector(".input-add.city");
    const smallCity = document.querySelector(".small-add.city");
    const smallDataEmpty = document.querySelector(".small-data-empty");

    const ciudad = { idPais, idCiudad, nombreCiudad: inputCity.value };

    const inputs = { inputCity };
    const smalls = { smallCity, smallDataEmpty };

    resetInputsStyles(inputs, smalls);

    if (!ciudad.nombreCiudad)
      return checkInputs(ciudad, inputs, smallDataEmpty);

    modifyCity(ciudad, idRegion);
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
    deleteCity(ciudad, idRegion);
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

const processResponse = async (response) => {
  try {
    const jsonResponse = await response.json();

    if (response.status === 200) {
      resetRegiones();
      getRegiones();
      modalBg.classList.remove("bg-activate");
      modalCrud.style.display = "none";
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

//AGREGAR UNA REGIÓN
botonAgregarRegion.addEventListener("click", () => {
  callModal("addRegion");
});

/*const createRegion = (obj) =>
  fetch(`http://${host}/regiones`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//ELIMINAR UNA REGIÓN

const deleteRegion = (id) =>
  fetch(`http://${host}/regiones/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//MODIFICAR UNA REGIÓN

const modifyRegion = (obj, id) =>
  fetch(`http://${host}/regiones/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//AGREGAR UN PAÍS

const addCountry = (obj, id) =>
  fetch(`http://${host}/regiones/paises/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//MODIFICAR UN PAÍS

const modifyCountry = (obj, id) =>
  fetch(`http://${host}/regiones/paises/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//ELIMINAR UN PAÍS

const deleteCountry = (obj, id) =>
  fetch(`http://${host}/regiones/paises/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//AGREGAR UNA CIUDAD

const addCity = (obj, id) =>
  fetch(`http://${host}/regiones/ciudades/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));

//MODIFICAR UNA CIUDAD

const modifyCity = (obj, id) => {
  fetch(`http://${host}/regiones/ciudades/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));
};

//ELIMINAR UNA CIUDAD

const deleteCity = (obj, id) =>
  fetch(`http://${host}/regiones/ciudades/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));*/

//FUNCIÓN GENERAL PARA AGREGAR, MODIFICAR Y ELIMINAR

const crud = (obj, url, operacion) =>
  fetch(url, {
    method: operacion,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processResponse(r))
    .catch((e) => console.error(e));
