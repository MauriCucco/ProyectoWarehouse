const express = require("express");
const app = express();
const path = require("path");
const { puerto } = require("./config/config");
const middlewaresGlobales = require("./middlewares/globales");
const { notFound, errorServidor } = require("./middlewares/errores");
const routes = require("./config/routes");

//SIRVO EL CONTENIDO ESTÁTICO DE LA CARPETA PUBLIC
app.use(express.static(path.join(__dirname, "public")));

//MIDDLEWARES GLOBALES
middlewaresGlobales(app);

//RUTAS
routes(app);

//MIDDLEWARES PARA ERRORES
app.use(notFound, errorServidor);

//INICIALIZANDO PUERTO
app.listen(puerto, () => console.log("SERVER UP!!!"));
