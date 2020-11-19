const Joi = require('joi');

const paisSchema = {
    
    create: Joi.object().keys({
        idRegion: Joi.string().alphanum().min(24).required(),
        nombrePais: Joi.string().required().pattern(new RegExp('^[A-Za-z]{3,}\\s{0,1}[A-Za-z]*$')).message("El nombre del país es inválido")
    }),
    modify: Joi.object().keys({
        idRegion: Joi.string().alphanum().min(24).required(),
        idPais: Joi.string().alphanum().min(24).required(),
        nombrePais: Joi.string().required().pattern(new RegExp('^[A-Za-z]{3,}\\s{0,1}[A-Za-z]*$')).message("nombreCiudad inválido")
    }),
    delete: Joi.object().keys({
        idRegion: Joi.string().alphanum().min(24).required(),
        idPais: Joi.string().alphanum().min(24).required()
    })
};

module.exports = paisSchema;