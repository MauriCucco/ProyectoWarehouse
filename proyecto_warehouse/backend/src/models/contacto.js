const { Contactos } = require("../database/schemas/Contacto");

const createContact = async (obj) => {
     
    try {
        const nuevoContacto = new Contactos(obj);
        
        const { _id } = await nuevoContacto.save();
    
        return _id;
            
    } catch (error) {
    
        throw error;
    } 
}


const createChannel = async (idContacto, obj) => {

    try {
        
        const contacto = await Contactos.findById(idContacto);

        if(contacto === null) throw "El id del contacto es incorrecto";

        const data = await contacto.canalesContacto.push(obj);

        await contacto.save();

        return data;

    } catch (error) {
        
        throw error;
    }
}


const findContacts = (obj) =>

    Contactos.find(obj)
    .then(r => r )
    .catch(e => { throw e })


const modifyContact = (id, obj) =>     

    Contactos.updateOne({_id: id}, obj, { runValidators: true }) //el runValidators sirve como validador para los updates
    .then(r => r )
    .catch(e => { throw e })


const modifyChannels = async (idContacto, idCanal, obj) => {

    try {
            
        const contacto = await Contactos.findById(idContacto);
        
        if(contacto === null) throw "El id del contacto es incorrecto";
    
        const canal = await contacto.canalesContacto.id(idCanal);
        
        if(canal === null) throw "El id del canal de usuario es incorrecto";
        
        const { _id: id } = await canal.set(obj);
        
        await contacto.save();
    
        return id;
    
    } catch (error) {
    
        throw error;
    }
}


const deleteContact = (id) =>

    Contactos.deleteOne({_id: id})
    .then(r => r )
    .catch(e => { throw e })


const deleteChannel = async (idContacto, idCanal) => {

    try {
        
        const contacto = await Contactos.findById(idContacto);

        if(contacto === null) throw "El id del contacto es incorrecto";

        const canal = await contacto.canalesContacto.id(idCanal);

        if(canal === null) throw "El id del canal de usuario es incorrecto";

        const { _id: id } = canal.remove();

        await contacto.save();

        return id;

    } catch (error) {
        
        throw error;
    }
}


module.exports = {
    createContact,
    createChannel,
    findContacts,
    modifyContact,
    modifyChannels,
    deleteContact,
    deleteChannel
}
