const { findCompanies } = require("../../models/compania");
const {
  verificarLocaciones,
} = require("../../middlewares/services/verificarLocaciones");

const obtenerCompanias = async (req, res) => {
  try {
    const response = await findCompanies({});
    res.status(200).send(response);
    //const data = await verificarLocaciones(response);
    const data = await findCompanies({
      _id: "5fbebd9b20fbe41bbc460bfd",
    });
    console.log("DATA", data);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = obtenerCompanias;
