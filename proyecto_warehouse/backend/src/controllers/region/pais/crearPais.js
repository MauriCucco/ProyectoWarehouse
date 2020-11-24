const { createCountry } = require("../../../models/region");

const crearPais = (req, res) =>
  createCountry(req.params.id, req.body)
    .then((r) =>
      res.status(200).send({ mensaje: "El país fue creado exitósamente" })
    )
    .catch((e) => {
      if (e.path === "_id")
        return res
          .status(422)
          .send({ error: "El id de la región es incorrecto" });

      if (e.code === 11000)
        return res
          .status(422)
          .send({ error: "Ya existe un país con ese nombre" });

      res.status(500).send({ error: e });
    });

module.exports = crearPais;
