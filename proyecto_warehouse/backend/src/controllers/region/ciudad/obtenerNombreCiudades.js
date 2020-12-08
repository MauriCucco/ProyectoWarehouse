const { findCitiesNames } = require("../../../models/region");

const obtenerNombreCiudades = (req, res) => {
  const { nombrePais } = req.body;

  findCitiesNames({ nombrePais }, { ciudades: 1, _id: 0 })
    .then(([r]) => {
      const ciudades = r.ciudades.map((pais) => ({
        nombreCiudad: pais.nombreCiudad,
        id: pais._id,
      }));
      res.status(200).send(ciudades);
    })
    .catch((e) => res.status(500).send(e));
};

module.exports = obtenerNombreCiudades;
