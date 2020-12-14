const schemaContacto = require("../schemas/contacto");

const validarCreateContacto = async (req, res, next) => {
  const { error } = schemaContacto.create.validate(
    JSON.parse(req.body.newContact)
  );

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = validarCreateContacto;
