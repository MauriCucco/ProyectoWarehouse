const { isValidObjectId } = require("mongoose");
const Usuarios = require("../database/schemas/Usuario");

const createUser = async (obj) => {
    try {
        const nuevoUsuario = new Usuarios(obj);
    
        const { _id } = await nuevoUsuario.save();

        return _id;
        
    } catch (error) {

        throw error;
    }
}

const findUser = (obj) => 
        
    Usuarios.find(obj, {nombre: 1, apellido: 1, email: 1, perfil: 1})
    .then(r => { return r })
    .catch(e => { throw e })


const modifyUser = (id, obj) =>

    Usuarios.updateOne({_id: id}, obj, { runValidators: true })
    .then(r => { return r })
    .catch(e => { throw e })


const deleteUser = (id) =>

    Usuarios.deleteOne({_id: id})
    .then(r => { return r })
    .catch(e => { throw e })


module.exports = { createUser, findUser, modifyUser, deleteUser };