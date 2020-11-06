const mongoose = require("../../config/db");

const ciudadSchema = new mongoose.Schema({

    nombreCiudad: {
        type: String,
        required: true,
        unique: true
    }
})

const paisSchema = new mongoose.Schema({

    nombrePais: {
        type: String,
        required: true,
        unique: true
    },
    ciudades: [
        ciudadSchema
    ]
})

const regionSchema = new mongoose.Schema({
    nombreRegion: {
        type: String,
        required: true,
        unique: true
    },
    paises: [
        paisSchema
    ]
});

const Regiones = mongoose.model('Regiones', regionSchema);

module.exports = { Regiones };