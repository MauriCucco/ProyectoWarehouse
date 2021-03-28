const { modifyContact } = require("../../models/contacto");
const { imgFile } = require("../../services/fileHandler");

const modificarContacto = async (req, res) => {
  try {
    const infoContacto = JSON.parse(req.body.newContact);

    if (req.file) {
      const uidImagen = imgFile(req.file);
      await modifyContact(req.params.id, { ...infoContacto, uidImagen });
    } else {
      await modifyContact(req.params.id, infoContacto);
    }
    res
      .status(200)
      .send({ mensaje: "El contacto fue modificado exitósamente" });
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(422).send({ error: "El id es incorrecto" });
    }

    res.status(500).send({ error: e });
  }
};

module.exports = modificarContacto;
