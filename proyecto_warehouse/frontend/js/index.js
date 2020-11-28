import {
  removeActive,
  seccionUsuarios,
  seccionRegiones,
  seccionCompanias,
  divSinPermiso,
} from "./modules/indexModules.js";

let contactosItem = document.getElementById("contactos-item");

//previo a cargar los estilos

contactosItem.classList.add("item-habilitado");

contactosItem.addEventListener("click", () => {
  removeActive();

  contactosItem.classList.add("item-habilitado");

  seccionUsuarios.style.display = "none";
  seccionRegiones.style.display = "none";
  seccionCompanias.style.display = "none";
  divSinPermiso.style.display = "none";
});
