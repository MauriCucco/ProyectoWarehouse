const schemaRegion = require("../schemas/region");

const validarCreateRegion = (req, res, next) => {
  const { error } = schemaRegion.create.validate(req.body);

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = validarCreateRegion;
