const express = require("express");
const app = express();
const { puerto } = require("./config/config");
const middlewaresGlobales = require("./middlewares/globales");
const { notFound, errorServidor} = require("./middlewares/errores");
const routes = require("./config/routes")

//MIDDLEWARES GLOBALES
middlewaresGlobales(app);


//RUTAS
routes(app);


//MIDDLEWARES PARA ERRORES 
app.use(notFound, errorServidor);


//INICIALIZANDO PUERTO
app.listen(puerto, () => console.log("SERVER UP!!!"))