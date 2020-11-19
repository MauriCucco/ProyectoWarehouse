const schemaCompania = require("../schemas/compania");

const validarCreateCompania = (req, res, next) => {

    const { error } = schemaCompania.create.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarCreateCompania;