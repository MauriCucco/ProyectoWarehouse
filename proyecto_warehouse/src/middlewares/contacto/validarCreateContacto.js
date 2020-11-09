const schemaContacto = require("../schemas/contacto");

const validarCreateContacto = (req, res, next) => {

    const { error } = schemaContacto.create.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarCreateContacto;