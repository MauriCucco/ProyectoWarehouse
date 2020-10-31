const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    idRegion: Schema.Types.ObjectId,
    nombreRegion: String,
    paises: [
        {   
            idPais: Schema.Types.ObjectId,
            nombrePais: String,
            ciudades: [
                {   
                    idCiudad: Schema.Types.ObjectId,
                    nombreCiudad: String
                }
            ]
        }
    ]
});

const Regiones = mongoose.model('Regiones', regionSchema);

module.exports = Regiones;