const { createCity } = require("../../../models/region");

const crearCiudad = (req, res) => {
  const { idPais, ciudades } = req.body;

  createCity(idPais, ciudades)
    .then((r) => res.status(200).send({ mensaje: "La operación fue exitosa" }))
    .catch((e) => {
      if (e.path === "_id")
        return res
          .status(422)
          .send({ error: "El id de la región es incorrecto" });

      res.status(500).send({ error: e });
    });
};

module.exports = crearCiudad;
