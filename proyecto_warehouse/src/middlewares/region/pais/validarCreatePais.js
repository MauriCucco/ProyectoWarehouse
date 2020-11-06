const schemaPais = require("../../schemas/pais");

const validarCreatePais = (req, res, next) => {

    const { error } = schemaPais.create.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarCreatePais;