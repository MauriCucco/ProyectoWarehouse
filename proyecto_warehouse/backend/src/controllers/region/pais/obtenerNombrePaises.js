const { findCountriesNames } = require("../../../models/region");

const obtenerNombrePaises = (req, res) => {
  const { nombreRegion } = req.body;
  findCountriesNames({ nombreRegion }, { paises: 1, _id: 0 })
    .then(([r]) => {
      const paises = r.paises.map((pais) => ({
        nombrePais: pais.nombrePais,
        id: pais._id,
      }));
      res.status(200).send(paises);
    })
    .catch((e) => res.status(500).send(e));
};

module.exports = obtenerNombrePaises;
