const schemaCompania = require("../schemas/compania");

const validarModifyCompania = (req, res, next) => {
  const { error } = schemaCompania.modify.validate(req.body);

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = validarModifyCompania;
