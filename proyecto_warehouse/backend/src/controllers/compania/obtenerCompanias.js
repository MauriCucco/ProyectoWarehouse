const { findCompanies } = require("../../models/compania");

const obtenerCompanias = (req, res) =>
  findCompanies({})
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(500).send(e));

module.exports = obtenerCompanias;
