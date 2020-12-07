const mongoose = require("mongoose");
/*const Schema = mongoose.Schema;
const { Regiones, Paises, Ciudades } = require("../../database/schemas/Region");*/

const companiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
  },
  region: {
    type: String,
    /*type: Schema.Types.ObjectId,
    ref: "Regiones",
    required: true,*/
  },
  pais: {
    type: String,
    /*type: Schema.Types.ObjectId,
    ref: "Regiones",
    required: true,*/
  },
  ciudad: {
    type: String,
    /*type: Schema.Types.ObjectId,
    ref: "Regiones",
    required: true,*/
  },
  direccion: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  telefono: {
    type: String,
    unique: true,
    required: true,
  },
});

const Companias = mongoose.model("Companias", companiaSchema);

module.exports = { Companias };
