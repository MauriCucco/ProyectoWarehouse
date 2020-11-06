const express = require("express");
const usuario = express.Router();
const verificarAdmin = require("../../middlewares/admin/verificarAdmin");
const validarRegistro = require("../../middlewares/usuario/validarRegistro");
const validarLogin = require("../../middlewares/usuario/validarLogin");
const validarUpdate = require("../../middlewares/usuario/validarUpdate")
const crearUsuario = require("../../controllers/usuario/crearUsuario");
const loginUsuario = require("../../controllers/usuario/loginUsuario");
const obtenerUsuarios = require("../../controllers/usuario/obtenerUsuarios");
const modificarUsuario = require("../../controllers/usuario/modificarUsuario");
const eliminarUsuario = require("../../controllers/usuario/eliminarUsuario");

usuario.post("/admin/registro", /*verificarAdmin,*/ validarRegistro, crearUsuario);
usuario.put("/admin/:id", /*verificarAdmin,*/ validarUpdate, modificarUsuario);
usuario.delete("/admin/:id", /*verificarAdmin,*/ eliminarUsuario)
usuario.post("/login", validarLogin, loginUsuario);
usuario.get("/admin", /*verificarAdmin,*/ obtenerUsuarios);

module.exports = usuario;