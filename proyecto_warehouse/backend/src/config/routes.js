const usuario = require("../modules/usuario/indexUsuarios");
const region = require("../modules/region/indexRegiones");
const compania = require("../modules/compania/indexCompanias");
const contacto = require("../modules/contacto/indexContactos");

//RUTAS PRINCIPALES
module.exports = function(app) {
    
    app.use("/usuarios", usuario);
    app.use("/regiones", region);
    app.use("/companias", compania);
    app.use("/contactos", contacto);
}