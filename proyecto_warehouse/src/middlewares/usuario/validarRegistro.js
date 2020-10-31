const schemaUsuario = require("../schemas/usuario")

const validarRegistro = (req, res, next) => {

    const { error } = schemaUsuario.registro.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarRegistro;