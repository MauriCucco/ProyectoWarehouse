const { modifyContact } = require("../../models/contacto");

const modificarContacto = (req, res) =>
  modifyContact(req.params.id, req.body)
    .then((r) =>
      res
        .status(200)
        .send({ mensaje: "El contacto fue modificado exitósamente" })
    )

    .catch((e) => {
      if (e.kind === "ObjectId") {
        return res.status(422).send({ error: "El id es incorrecto" });
      }

      res.status(500).send(e);
    });

module.exports = modificarContacto;
