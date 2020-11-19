import { removeActive, seccionUsuarios, divSinPermiso }  from "./modules/indexModules.js";

let contactosItem = document.getElementById("contactos-item");


//previo a cargar los estilos

window.addEventListener("DOMContentLoaded", () => {

    contactosItem.classList.add("item-habilitado");
})

contactosItem.addEventListener("click", () => {

    removeActive();

    contactosItem.classList.add("item-habilitado");

    seccionUsuarios.style.display = "none";
    divSinPermiso.style.display = "none"
})