const { findCompanies } = require("../../models/compania");
const {
  verificarLocaciones,
} = require("../../middlewares/services/verificarLocaciones");

const obtenerCompanias = async (req, res) => {
  try {
    const response = await findCompanies({});
    const data = await verificarLocaciones(response);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = obtenerCompanias;
