const { findRegions, findCountry, findCity } = require("../../models/region");

const validarLocacion = async (req, res, next) => {
  try {
    const { region, pais, ciudad } = req.body;

    if (!region && !pais && !ciudad) return next();

    const [matchRegion] = await findRegions({ _id: region });

    if (matchRegion === undefined) throw "La región es inválida";

    const [matchPais] = await findCountry({
      _id: pais,
    });

    if (matchPais === undefined) throw "El país es inválido";

    const [matchCiudad] = await findCity({
      _id: ciudad,
    });

    if (matchCiudad === undefined) throw "La ciudad es inválida";

    next();
  } catch (error) {
    res.status(422).send({ mensaje: error });
  }
};

module.exports = validarLocacion;
