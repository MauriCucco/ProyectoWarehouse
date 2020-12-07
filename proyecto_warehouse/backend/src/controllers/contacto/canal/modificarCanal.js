const { modifyChannel } = require("../../../models/contacto");

const modificarCanales = async (req, res) => {
  try {
    const arrayCanales = req.body;
    console.log(arrayCanales);
    for (let canal of arrayCanales) {
      const { idCanal, ...otrasPropiedades } = canal;

      await modifyChannel(req.params.id, idCanal, otrasPropiedades);
    }

    res.status(200).send({ mensaje: "La operación fue exitosa" });
  } catch (e) {
    if (e.path === "_id")
      return res
        .status(422)
        .send({ error: "El id del contacto es incorrecto" });

    res.status(500).send({ error: e });
  }
};

module.exports = modificarCanales;
