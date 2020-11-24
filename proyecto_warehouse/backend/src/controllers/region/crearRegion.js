const { createRegion } = require("../../models/region");

const crearRegion = (req, res) =>
  createRegion(req.body)
    .then((r) => res.status(200).send({ id: r }))
    .catch((e) => {
      if (e.keyPattern) {
        const [nombre] = Object.keys(e.keyPattern);
        if (nombre === "nombreRegion")
          return res
            .status(422)
            .send({ error: "Ya existe una region con ese nombre" });
        if (nombre === "paises.nombrePais")
          return res
            .status(422)
            .send({ error: "Ya existe un país con ese nombre" });
      }

      res.status(500).send(e);
    });

module.exports = crearRegion;
