const { findCompanies } = require("../../models/compania");

const obtenerCompanias = (req, res) =>
  findCompanies({})
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(500).send({ error: e }));

module.exports = obtenerCompanias;
