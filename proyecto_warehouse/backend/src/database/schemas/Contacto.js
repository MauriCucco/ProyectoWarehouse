const mongoose = require("mongoose");

const canalSchema = new mongoose.Schema({
  nombreCanal: {
    type: String,
    enum: ["Teléfono", "Whatsapp", "Instagram", "Facebook", "Linkedin"],
    required: true,
  },
  cuentaUsuario: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
  },
  preferencia: {
    type: String,
    enum: ["Sin preferencia", "Canal favorito", "No molestar"],
    required: true,
  },
});

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  compania: {
    type: String,
    required: true,
  },
  interes: {
    type: Number,
    enum: [0, 25, 50, 75, 100],
  },
  region: {
    type: String,
    required: false,
  },
  pais: {
    type: String,
    required: false,
  },
  ciudad: {
    type: String,
    required: false,
  },
  direccion: {
    type: String,
    required: false,
  },
  canalesContacto: {
    type: [canalSchema],
    default: undefined,
  },
});

const Contactos = mongoose.model("contactos", contactoSchema);

module.exports = { Contactos };
