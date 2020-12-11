const schemaContacto = require("../schemas/contacto");

const validarModifyContacto = (req, res, next) => {
  const { error } = schemaContacto.modify.validate(
    JSON.parse(req.body.newContact)
  );

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = validarModifyContacto;
