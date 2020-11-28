const { modifyCompany } = require("../../models/compania");

const modificarCompania = (req, res) =>
  modifyCompany(req.params.id, req.body)
    .then((r) =>
      res
        .status(200)
        .send({ mensaje: "La compania fue modificada exitósamente" })
    )
    .catch((e) => {
      if (e.kind === "ObjectId")
        return res.status(422).send({ error: "El id es incorrecto" });

      res.status(500).send(e);
    });

module.exports = modificarCompania;
