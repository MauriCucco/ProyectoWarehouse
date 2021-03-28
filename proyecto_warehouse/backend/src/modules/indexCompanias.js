const express = require("express");
const compania = express.Router();
const validarLocacion = require("../middlewares/services/validarLocacion");
const validarCreateCompania = require("../middlewares/compania/validarCreateCompania");
const validarModifyCompania = require("../middlewares/compania/validarModifyCompania");
const crearCompania = require("../controllers/compania/crearCompania");
const obtenerCompanias = require("../controllers/compania/obtenerCompanias");
const modificarCompania = require("../controllers/compania/modificarCompania");
const eliminarCompania = require("../controllers/compania/eliminarCompania");
const obtenerNombresCompanias = require("../controllers/compania/obtenerNombresCompanias");

compania.get("/nombres", obtenerNombresCompanias);
compania.put("/:id", validarModifyCompania, validarLocacion, modificarCompania);
compania.delete("/:id", eliminarCompania);
compania.post("/", validarCreateCompania, validarLocacion, crearCompania);
compania.get("/", obtenerCompanias);

module.exports = compania;
