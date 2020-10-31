const mongoose = require("../../config/db");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }, 
    apellido: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    perfil: {
        type: String,
        enum: ['contactos', 'admin'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Usuarios = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuarios;