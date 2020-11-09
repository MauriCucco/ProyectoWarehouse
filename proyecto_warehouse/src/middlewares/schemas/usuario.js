const Joi = require("joi");

const schemaUsuario = {

    registro: Joi.object().keys({

        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$')).message("Password inválido"), //debe tener minimo 6 caracteres con 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
        confirm_password: Joi.ref('password'),
        perfil: Joi.string().valid('contactos', 'admin').optional()

    }).with('password', 'confirm_password'),

    login: Joi.object().keys({

        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$')).message("Password inválido")

    }),

    update: Joi.object().keys({
        nombre: Joi.string().optional(),
        apellido: Joi.string().optional(),
        email: Joi.string().email().optional(),
        perfil: Joi.string().valid('contactos', 'admin').optional()
    })
}


module.exports = schemaUsuario;