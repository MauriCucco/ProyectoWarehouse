const usuario = require("../modules/usuario/indexUsuarios");
const region = require("../modules/region/indexRegiones");

//RUTAS PRINCIPALES
module.exports = function(app) {
    
    app.use("/usuarios", usuario);
    app.use("/regiones", region);
}