const { findRegions } = require("../../../models/region");

const obtenerNombrePaises = (req, res) => {
  const { nombreRegion } = req.body;
  findRegions({ nombreRegion }, { "paises.nombrePais": 1, _id: 0 })
    .then(([r]) => {
      const paises = r.paises.map((pais) => pais.nombrePais);
      res.status(200).send(paises);
    })
    .catch((e) => res.status(500).send(e));
};

module.exports = obtenerNombrePaises;
