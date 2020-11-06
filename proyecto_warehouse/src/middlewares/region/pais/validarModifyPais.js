const schemaPais = require("../../schemas/pais");

const validarModifyPais = (req, res, next) => {

    const { error } = schemaPais.modify.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarModifyPais;