const mongoose = require("../../config/db");
//const Schema = mongoose.Schema;

const ciudadSchema = new mongoose.Schema({
  nombreCiudad: {
    type: String,
    required: true,
  },
});

const paisSchema = new mongoose.Schema({
  nombrePais: {
    type: String,
    required: true,
    unique: true,
  },
  ciudades: [ciudadSchema],
  //ciudades: [{ type: Schema.Types.ObjectId, ref: "Ciudades" }],
});

const regionSchema = new mongoose.Schema({
  nombreRegion: {
    type: String,
    required: true,
    unique: true,
  },
  paises: [paisSchema],
  //paises: [{ type: Schema.Types.ObjectId, ref: "Paises" }],
});

const Regiones = mongoose.model("Regiones", regionSchema);
/*const Paises = mongoose.model("Paises", paisSchema);
const Ciudades = mongoose.model("Ciudades", ciudadSchema);*/

module.exports = { Regiones };
