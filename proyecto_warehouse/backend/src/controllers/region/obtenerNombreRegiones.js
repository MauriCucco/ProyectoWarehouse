const { findRegions } = require("../../models/region");

const obtenerNombreRegiones = (req, res) =>
  findRegions({}, { nombreRegion: 1, _id: 0 })
    .then((r) => {
      const regiones = r.map((obj) => obj.nombreRegion);
      res.status(200).send(regiones);
    })
    .catch((e) => res.status(500).send(e));

module.exports = obtenerNombreRegiones;
