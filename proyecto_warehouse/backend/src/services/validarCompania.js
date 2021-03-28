const { findCompanies } = require("../models/compania");

const validarCompania = (req, res, next) => {
  const { compania } = JSON.parse(req.body.newContact);

  if (!compania) return next();

  findCompanies({ _id: compania })
    .then(([r]) => {
      if (r === undefined)
        return res.status(422).send({ mensaje: "La compañia no es válida" });

      next();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = validarCompania;
