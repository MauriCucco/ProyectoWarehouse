const { findCompanies } = require("../../models/compania");

const verificarCompanias = async (data) => {
  for (let contacto of data) {
    const [compania] = await findCompanies({ nombre: contacto.compania });
    if (!compania) contacto.compania = "";
  }
  return data;
};

module.exports = { verificarCompanias };
