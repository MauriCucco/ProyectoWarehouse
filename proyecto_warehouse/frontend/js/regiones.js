import { removeActive } from "./modules/indexModules.js";

const regionesItem = document.getElementById("regiones-item");

//activar el item de usuarios en el nav

regionesItem.addEventListener("click", () => {

    removeActive();

    regionesItem.classList.add("item-habilitado");

})