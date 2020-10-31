const usuario = require("../modules/usuario/indexUsuarios");

//RUTAS PRINCIPALES
module.exports = function(app) {
    
    app.use("/usuarios", usuario);
}