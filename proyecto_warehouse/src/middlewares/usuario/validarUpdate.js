const schemaUsuario = require("../schemas/usuario")

const validarUpdate = (req, res, next) => {

    const { error } = schemaUsuario.update.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarUpdate;