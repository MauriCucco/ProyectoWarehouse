const schemaCiudad = require("../../schemas/ciudad");

const validarModifyCiudad = (req, res, next) => {

    const { error } = schemaCiudad.modify.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarModifyCiudad;