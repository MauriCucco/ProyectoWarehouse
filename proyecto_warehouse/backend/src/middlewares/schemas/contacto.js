const Joi = require('joi');

const schemaContacto = {

    create: Joi.object().keys({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        email: Joi.string().email().required(),
        cargo: Joi.string().required(),
        compania: Joi.string().required(),
        interes: Joi.number().valid(0, 25, 50, 75, 100).required(),
        region: Joi.string().required(),
        pais: Joi.string().required(),
        ciudad: Joi.string().required(),
        direccion: Joi.string().required(),
        canalesContacto: Joi.array().required().items(
            Joi.object({
                nombreCanal: Joi.string().valid('Teléfono', 'Whatsapp', 'Instagram', 'Facebook', 'Linkedin').required(),
                cuentaUsuario: Joi.string().required(),
                preferencia: Joi.string().valid('Sin preferencia', 'Canal favorito', 'No molestar').required()
            }).required()
        )
    }),
    modify: Joi.object().keys({
        nombre: Joi.string().optional(),
        apellido: Joi.string().optional(),
        email: Joi.string().email().optional(),
        cargo: Joi.string().optional(),
        compania: Joi.string().optional(),
        interes: Joi.number().valid(0, 25, 50, 75, 100).optional(),
        region: Joi.string().optional(),
        pais: Joi.string().optional(),
        ciudad: Joi.string().optional(),
        direccion: Joi.string().optional()
    })
}

module.exports = schemaContacto;