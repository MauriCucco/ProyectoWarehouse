const { deleteChannel } = require("../../../models/contacto");

const eliminarCanal = (req, res) => {
  const { idCanal } = req.body;

  deleteChannel(req.params.id, idCanal)
    .then((r) =>
      res.status(200).send({ mensaje: "El canal fue eliminado exitósamente" })
    )
    .catch((e) => {
      if (e.path === "_id")
        return res
          .status(422)
          .send({ error: "El id del contacto es incorrecto" });

      res.status(500).send({ error: e });
    });
};

module.exports = eliminarCanal;
