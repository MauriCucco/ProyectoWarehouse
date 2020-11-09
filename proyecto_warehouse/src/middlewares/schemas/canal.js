const Joi = require('joi');

const schemaCanal = {

    create: Joi.object().keys({
        nombreCanal: Joi.string().valid('Teléfono', 'Whatsapp', 'Instagram', 'Facebook', 'Linkedin').required(),
        cuentaUsuario: Joi.string().required(),
        preferencia: Joi.string().valid('Sin preferencia', 'Canal favorito', 'No molestar').required()
    }),
    modify: Joi.object().keys({
        nombreCanal: Joi.string().valid('Teléfono', 'Whatsapp', 'Instagram', 'Facebook', 'Linkedin').optional(),
        cuentaUsuario: Joi.string().optional(),
        preferencia: Joi.string().valid('Sin preferencia', 'Canal favorito', 'No molestar').optional()
    })
}

module.exports = schemaCanal;