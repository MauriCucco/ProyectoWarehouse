const express = require("express");
const usuario = express.Router();
const verificarAdmin = require("../middlewares/services/verificarAdmin");
const validarRegistro = require("../middlewares/usuario/validarRegistro");
const validarLogin = require("../middlewares/usuario/validarLogin");
const validarUpdate = require("../middlewares/usuario/validarUpdate");
const crearUsuario = require("../controllers/usuario/crearUsuario");
const loginUsuario = require("../controllers/usuario/loginUsuario");
const obtenerUsuarios = require("../controllers/usuario/obtenerUsuarios");
const obtenerUsuarioSingle = require("../controllers/usuario/obtenerUsuarioSingle");
const modificarUsuario = require("../controllers/usuario/modificarUsuario");
const eliminarUsuario = require("../controllers/usuario/eliminarUsuario");

/*usuario.post("/registro", verificarAdmin, validarRegistro, crearUsuario);*/
usuario.put("/:id", verificarAdmin, validarUpdate, modificarUsuario);
usuario.delete("/:id", verificarAdmin, eliminarUsuario);
usuario.post("/login", validarLogin, loginUsuario);
usuario.get("/", verificarAdmin, obtenerUsuarios);
usuario.get("/:id", verificarAdmin, obtenerUsuarioSingle);

module.exports = usuario;
