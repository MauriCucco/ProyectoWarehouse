const { findCompanies } = require("../../models/compania");

const obtenerNombresCompanias = (req, res) =>
  findCompanies({}, { nombre: 1, _id: 0 })
    .then((r) => {
      const nombresCompanias = r.map((elemento) => elemento.nombre);
      res.status(200).send(nombresCompanias);
    })
    .catch((e) => res.status(500).send(e));

module.exports = obtenerNombresCompanias;
