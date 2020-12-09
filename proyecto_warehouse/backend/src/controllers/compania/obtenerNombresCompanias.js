const { findCompanies } = require("../../models/compania");

const obtenerNombresCompanias = (req, res) =>
  findCompanies({}, { nombre: 1 })
    .then((r) => {
      const nombresCompanias = r.map((compania) => ({
        nombreCompania: compania.nombre,
        id: compania._id,
      }));
      res.status(200).send(nombresCompanias);
    })
    .catch((e) => res.status(500).send(e));

module.exports = obtenerNombresCompanias;
