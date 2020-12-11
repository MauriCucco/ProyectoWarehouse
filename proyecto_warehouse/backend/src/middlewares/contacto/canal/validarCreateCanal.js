const schemaCanal = require("../../schemas/canal");

const validarCreateCanal = (req, res, next) => {
  const { error } = schemaCanal.create.validate(req.body);

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = validarCreateCanal;
