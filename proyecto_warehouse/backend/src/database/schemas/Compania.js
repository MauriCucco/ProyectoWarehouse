const mongoose = require('mongoose');

const companiaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    }, 
    direccion: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    telefono: {
        type: String,
        unique: true,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    }
});

const Companias = mongoose.model('Companias', companiaSchema);

module.exports = { Companias };