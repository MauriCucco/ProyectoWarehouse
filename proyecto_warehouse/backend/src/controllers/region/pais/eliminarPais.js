const { deleteCountry } = require("../../../models/region");

const eliminarPais = (req, res) => {
  const { idPais } = req.body;

  deleteCountry(idPais)
    .then((r) => res.status(200).send({ _id: r }))
    .catch((e) => {
      res.status(500).send({ error: e });
    });
};

module.exports = eliminarPais;
