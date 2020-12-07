const { findContacts } = require("../../models/contacto");
const {
  verificarLocaciones,
} = require("../../middlewares/services/verificarLocaciones");
const {
  verificarCompanias,
} = require("../../middlewares/services/verificarCompanias");

const obtenerContactos = async (req, res) => {
  try {
    const response = await findContacts({});
    const data = await verificarLocaciones(response);
    const finalData = await verificarCompanias(data);
    res.status(200).send(finalData);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = obtenerContactos;
