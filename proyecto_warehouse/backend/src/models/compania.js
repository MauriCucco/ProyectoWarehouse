const { Companias } = require("../database/schemas/Compania");

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
    .populate({
      path: "region",
      model: "Regiones",
      select: { nombreRegion: 1, _id: 0 },
    })
    .populate({
      path: "pais",
      model: "Paises",
      select: { nombrePais: 1, _id: 0 },
    })
    .populate({
      path: "ciudad",
      model: "Ciudades",
      select: { nombreCiudad: 1, _id: 0 },
    })
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
