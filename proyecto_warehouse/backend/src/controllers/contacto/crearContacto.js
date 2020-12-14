const { createContact } = require("../../models/contacto");
const { imgFile } = require("../../middlewares/services/fileHandler");

const crearContacto = async (req, res) => {
  try {
    const infoContacto = JSON.parse(req.body.newContact);
    let id;
    if (req.file) {
      const uidImagen = imgFile(req.file);
      id = await createContact({ ...infoContacto, uidImagen });
    } else {
      id = await createContact(infoContacto);
    }
    res.status(200).send({ id });
  } catch (e) {
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

    res.status(500).send({ error: e });
  }
};

module.exports = crearContacto;
