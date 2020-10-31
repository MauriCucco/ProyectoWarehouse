const express = require("express");
const usuario = express.Router();
const verificarAdmin = require("../../middlewares/admin/verificarAdmin");
const validarRegistro = require("../../middlewares/usuario/validarRegistro");
const validarLogin = require("../../middlewares/usuario/validarLogin");
const crearUsuario = require("../../controllers/usuario/crearUsuario");
const loginUsuario = require("../../controllers/usuario/loginUsuario");
const obtenerUsuarios = require("../../controllers/usuario/obtenerUsuarios");
const modificarUsuario = require("../../controllers/usuario/modificarUsuario");
const eliminarUsuario = require("../../controllers/usuario/eliminarUsuario");

usuario.post("/registro", /*verificarAdmin,*/ validarRegistro, crearUsuario);
usuario.post("/login", validarLogin, loginUsuario);
usuario.get("/", /*verificarAdmin,*/ obtenerUsuarios);
usuario.put("/:id", /*verificarAdmin,*/ modificarUsuario);
usuario.delete("/:id", /*verificarAdmin,*/ eliminarUsuario)

module.exports = usuario;