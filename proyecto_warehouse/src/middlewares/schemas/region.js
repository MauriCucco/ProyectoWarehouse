const Joi = require('joi');

const schemaRegion = {

    create: Joi.object().keys({
        nombreRegion: Joi.string().required(),
        paises: Joi.array().required().items(
            Joi.object({
                nombrePais: Joi.string().required(),
                ciudades: Joi.array().required().items(
                    Joi.object({
                        nombreCiudad: Joi.string().required()
                    })
                )
            }).required()
        )
    }),
    modify: Joi.object().keys({
        nombreRegion: Joi.string().optional(),
        nombrePais: Joi.string().optional(),
        nombreCiudad: Joi.string().optional()
    })
}

module.exports = schemaRegion;