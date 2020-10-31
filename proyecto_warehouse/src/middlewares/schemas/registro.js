const Joi = require("joi");

const schemaRegistro = Joi.object({

    nombre: Joi.string(),
    apellido: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$')).message("Password inválido"), //debe tener minimo 6 caracteres con 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
    confirm_password: Joi.ref('password'),
    perfil: Joi.string().optional()
})
.with('password', 'confirm_password');

module.exports = schemaRegistro;