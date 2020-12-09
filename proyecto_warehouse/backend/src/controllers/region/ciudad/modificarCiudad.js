const { modifyCity } = require("../../../models/region");

const modificarCiudad = (req, res) => {
  const { idCiudad, nombreCiudad } = req.body;

  modifyCity(idCiudad, nombreCiudad)
    .then((r) => res.status(200).send({ _id: r }))
    .catch((e) => {
      res.status(500).send({ error: e });
    });
};

module.exports = modificarCiudad;
