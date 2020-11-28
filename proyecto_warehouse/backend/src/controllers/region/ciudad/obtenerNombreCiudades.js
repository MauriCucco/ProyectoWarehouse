const { findRegions } = require("../../../models/region");

const obtenerNombreCiudades = (req, res) => {
  const { nombrePais } = req.body;

  findRegions(
    { "paises.nombrePais": nombrePais },
    { "paises.ciudades.nombreCiudad.$": 1, _id: 0 }
  )
    .then(([r]) => {
      const ciudades = r.paises[0].ciudades.map((pais) => pais.nombreCiudad);
      res.status(200).send(ciudades);
    })
    .catch((e) => res.status(500).send(e));
};

module.exports = obtenerNombreCiudades;
