const { Companias } = require("../database/schemas/Compania");
const { Regiones, Paises, Ciudades } = require("../database/schemas/Region");

const createCompany = async (obj) => {
  try {
    const nuevaCompania = new Companias(obj);

    const { _id } = await nuevaCompania.save();

    return _id;
  } catch (error) {
    throw error;
  }
};

const findCompanies = (obj, proyection = {}) =>
  Companias.find(obj, proyection)
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const modifyCompany = (id, obj) =>
  Companias.updateOne({ _id: id }, obj, { runValidators: true }) //el runValidators sirve como validador para los updates
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const deleteCompany = (id) =>
  Companias.deleteOne({ _id: id })
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

module.exports = {
  createCompany,
  findCompanies,
  modifyCompany,
  deleteCompany,
};
