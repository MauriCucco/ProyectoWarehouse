const schemaUsuario = require("../schemas/usuario")

const validarLogin = (req, res, next) => {

    const { error } = schemaUsuario.login.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarLogin;