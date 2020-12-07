const { deleteContact } = require("../../models/contacto");

const eliminarContacto = async (req, res) => {
  try {
    const arrayContactos = req.body;

    for (let contacto of arrayContactos) {
      await deleteContact(contacto);
    }

    res.status(200).send({ mensaje: "La operación fue exitosa" });
  } catch (e) {
    if (e.kind === "ObjectId")
      return res.status(422).send({ error: "El id es incorrecto" });

    res.status(500).send(e);
  }
};
module.exports = eliminarContacto;
