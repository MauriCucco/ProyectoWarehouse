const Joi = require("joi");

const schemaLogin = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$')).message("Password inválido")
})

module.exports = schemaLogin;