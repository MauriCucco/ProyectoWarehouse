const schemaRegistro = require("../schemas/registro")

const validarRegistro = (req, res, next) => {

    const { error } = schemaRegistro.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarRegistro;