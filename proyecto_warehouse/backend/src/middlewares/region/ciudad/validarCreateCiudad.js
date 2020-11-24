const schemaCiudad = require("../../schemas/ciudad");

const validarCreateCiudad = (req, res, next) => {
  const { error } = schemaCiudad.create.validate(req.body);

  error
    ? res.status(422).send({
        error: error.details[0].message,
        path: error.details[0].path[1],
      })
    : next();
};

module.exports = validarCreateCiudad;
