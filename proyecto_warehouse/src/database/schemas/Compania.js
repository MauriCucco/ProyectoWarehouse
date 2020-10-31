const mongoose= require('mongoose');

const companiaSchema = new mongoose.Schema({
    nombre: String, 
    direccion: String, 
    email: String,
    telefono: String,
    ciudad: Schema.Types.ObjectId
});

const Companias = mongoose.model('Companias', companiaSchema);

module.exports = Companias;