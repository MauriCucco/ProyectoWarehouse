const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    cargo: String,
    compania: String,
    interes: Number,
    region: Schema.Types.ObjectId,
    pais: Schema.Types.ObjectId,
    ciudad: Schema.Types.ObjectId,
    direccion: String,
    canalesContacto: [
        {
        nombre: String,
        cuentaUsuario: String,
        preferencia: String
        }
    ]   
});

const Contactos = mongoose.model("contactos", contactoSchema);

module.exports = Contactos;