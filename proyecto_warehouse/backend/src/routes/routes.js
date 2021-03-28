const usuario = require("../modules/indexUsuarios");
const region = require("../modules/indexRegiones");
const compania = require("../modules/indexCompanias");
const contacto = require("../modules/indexContactos");

//RUTAS PRINCIPALES
module.exports = function (app) {
  app.use("/usuarios", usuario);
  app.use("/regiones", region);
  app.use("/companias", compania);
  app.use("/contactos", contacto);
};
