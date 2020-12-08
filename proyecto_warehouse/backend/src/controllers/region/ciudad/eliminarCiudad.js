const { deleteCity } = require("../../../models/region");

const eliminarCiudad = (req, res) => {
  const { idCiudad } = req.body;

  deleteCity(idCiudad)
    .then((r) => res.status(200).send({ _id: r }))
    .catch((e) => {
      res.status(500).send({ error: e });
    });
};

module.exports = eliminarCiudad;
