const { Regiones } = require("../database/schemas/Region");

const createRegion = async (obj) => {
  try {
    const nuevaRegion = new Regiones(obj);

    const { _id } = await nuevaRegion.save();

    return _id;
  } catch (error) {
    throw error;
  }
};

const createCountry = async (idRegion, pais) => {
  try {
    const region = await Regiones.findById(idRegion);

    if (region === null) throw "El id de la región es incorrecto";

    const data = await region.paises.push(pais);

    await region.save();

    return data;
  } catch (error) {
    throw error;
  }
};

const createCity = async (idRegion, idPais, ciudades) => {
  /*//1º FORMA DE CREAR UNA CIUDAD

    Regiones.updateOne({_id: idRegion, "paises._id": idPais}, {$push: {"paises.$.ciudades": {nombreCiudad}}}, { runValidators: true })
    .then(r => r )
    .catch(e => { throw e })*/

  //2º FORMA DE PUSHEAR UNA CIUDAD (comentada en la documentación de Mongoose)

  try {
    const region = await Regiones.findById(idRegion);

    if (region === null) throw "El id de la región es incorrecto";

    const pais = await region.paises.id(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    for (let ciudad of ciudades) {
      await pais.ciudades.push(ciudad);
    }

    await region.save();

    return pais;
  } catch (error) {
    throw error;
  }
};

const findRegions = (obj) =>
  Regiones.find(obj)
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const modifyRegion = (id, obj) =>
  Regiones.updateOne({ _id: id }, obj, { runValidators: true }) //el runValidators sirve como validador para los updates
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const modifyCountry = async (idRegion, idPais, nombrePais) => {
  try {
    const region = await Regiones.findById(idRegion);

    if (region === null) throw "El id de la región es incorrecto";

    const pais = await region.paises.id(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    const { _id: id } = await pais.set("nombrePais", nombrePais, {
      runValidators: true,
    });

    await region.save();

    return id;
  } catch (error) {
    throw error;
  }
};

const modifyCity = async (idRegion, idPais, idCiudad, nombreCiudad) => {
  try {
    const region = await Regiones.findById(idRegion);

    if (region === null) throw "El id de la región es incorrecto";

    const pais = await region.paises.id(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    const ciudad = await pais.ciudades.id(idCiudad);

    if (ciudad === null) throw "El id de la ciudad es incorrecto";

    const { _id: id } = await ciudad.set("nombreCiudad", nombreCiudad, {
      runValidators: true,
    });

    await region.save();

    return id;
  } catch (error) {
    throw error;
  }
};

const deleteRegion = (id) =>
  Regiones.deleteOne({ _id: id })
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const deleteCountry = async (idRegion, idPais) => {
  try {
    const region = await Regiones.findById(idRegion);

    if (region === null) throw "El id de la región es incorrecto";

    const pais = await region.paises.id(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    const { _id: id } = pais.remove();

    await region.save();

    return id;
  } catch (error) {
    throw error;
  }
};

const deleteCity = async (idRegion, idPais, idCiudad) => {
  try {
    const region = await Regiones.findById(idRegion);

    if (region === null) throw "El id de la región es incorrecto";

    const pais = await region.paises.id(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    //const data = await pais.ciudades.pull(idCiudad); OTRA FORMA (usando pull)

    const ciudad = await pais.ciudades.id(idCiudad);

    if (ciudad === null) throw "El id de la ciudad es incorrecto";

    const { _id: id } = ciudad.remove();

    await region.save();

    return id;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRegion,
  findRegions,
  modifyRegion,
  deleteRegion,
  createCountry,
  modifyCountry,
  deleteCountry,
  createCity,
  modifyCity,
  deleteCity,
};
