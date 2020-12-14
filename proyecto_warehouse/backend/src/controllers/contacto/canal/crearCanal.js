const { createChannel } = require("../../../models/contacto");

const crearCanal = async (req, res) => {
  try {
    const arrayCanales = req.body;

    /*for (let canal of arrayCanales) {
      await createChannel(req.params.id, canal);
    }*/
    const results = arrayCanales.map((canal) =>
      createChannel(req.params.id, canal)
    );

    await Promise.all(results);

    res.status(200).send({ mensaje: "La operación fue exitosa" });
  } catch (e) {
    if (e.path === "_id")
      return res
        .status(422)
        .send({ error: "El id del contacto es incorrecto" });

    if (e.code === 11000)
      return res.status(422).send({
        error: `Esta cuenta ya ha sido registrada: ${Object.values(
          e.keyValue
        )}`,
      });

    res.status(500).send({ error: e });
  }
};

module.exports = crearCanal;
