const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
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
    cargo: {
        type: String,
        required: true
    },
    compania: {
        type: String,
        required: true
    },
    interes: {
        type: Number,
        enum: [0, 25, 50, 75, 100],
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
    },
    direccion: {
        type: String,
        required: true
    },
    canalesContacto: [{
        nombreCanal: {
            type: String,
            enum: ['Teléfono', 'Whatsapp', 'Instagram', 'Facebook', 'Linkedin'],
            required: true
        },
        cuentaUsuario: {
            type: String,
            unique: true,
            required: true
        },
        preferencia: {
            type: String,
            enum: ['Sin preferencia', 'Canal favorito', 'No molestar'],
            required: true
        }
    }]   
});


const Contactos = mongoose.model("contactos", contactoSchema);

module.exports = {Contactos }