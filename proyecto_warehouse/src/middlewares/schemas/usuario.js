const Joi = require("joi");

const schemaUsuario = {

    registro: Joi.object().keys({

        nombre: Joi.string().required().pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')).message('Nombre inválido'),
        apellido: Joi.string().required().pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')).message('Apellido inválido'),
        email: Joi.string().email().message("Email inválido").required(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$')).message("Password inválido"), //debe tener minimo 6 caracteres con 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
        confirm_password: Joi.ref('password'),
        perfil: Joi.string().valid('Contactos', 'Administrador').optional()

    }).with('password', 'confirm_password'),

    login: Joi.object().keys({

        email: Joi.string().email().message("Email inválido").required(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$')).message("Password inválido")

    }),

    update: Joi.object().keys({
        nombre: Joi.string().optional().pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')).message('Nombre inválido'),
        apellido: Joi.string().optional().pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')).message('Apellido inválido'),
        email: Joi.string().email().message("Email inválido").optional(),
        perfil: Joi.string().valid('Contactos', 'Administrador').optional()
    })
}


module.exports = schemaUsuario;