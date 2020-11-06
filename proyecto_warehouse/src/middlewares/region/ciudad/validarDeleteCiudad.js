const schemaCiudad = require("../../schemas/ciudad");

const validardeleteCiudad = (req, res, next) => {

    const { error } = schemaCiudad.delete.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validardeleteCiudad;