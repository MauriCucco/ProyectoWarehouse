const { findRegions } = require("../../models/region");

const obtenerNombreRegiones = (req, res) =>
  findRegions({}, { nombreRegion: 1 })
    .then((r) => {
      const regiones = r.map((obj) => ({
        nombreRegion: obj.nombreRegion,
        id: obj._id,
      }));
      res.status(200).send(regiones);
    })
    .catch((e) => res.status(500).send(e));

module.exports = obtenerNombreRegiones;
