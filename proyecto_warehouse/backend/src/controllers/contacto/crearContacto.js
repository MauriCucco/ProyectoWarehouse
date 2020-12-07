const { createContact } = require("../../models/contacto");

const crearContacto = (req, res) =>
  createContact(req.body)
    .then((r) => res.status(200).send({ id: r }))
    .catch((e) => {
      console.log(e);
      if (e.keyPattern) {
        if (e.keyPattern.email === 1)
          return res
            .status(422)
            .send({ mensaje: "Este email ya ha sido registrado" });

        if (e.keyPattern["canalesContacto.cuentaUsuario"] === 1)
          return res
            .status(422)
            .send({ mensaje: "Esta cuenta ya ha sido registrada" });
      }

      res.status(500).send(e);
    });

module.exports = crearContacto;
