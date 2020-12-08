const { Regiones, Paises, Ciudades } = require("../database/schemas/Region");

const createRegion = async (obj) => {
  try {
    const { nombreRegion, paises } = obj;

    const nuevaRegion = new Regiones({ nombreRegion });
    await nuevaRegion.save();

    for (let pais of paises) {
      let nombrePais = pais.nombrePais;
      let nuevoPais = new Paises({ nombrePais });
      await nuevoPais.save();

      nuevaRegion.paises.push(nuevoPais);
      await nuevaRegion.save();

      for (let ciudad of pais.ciudades) {
        let nombreCiudad = ciudad.nombreCiudad;
        let nuevaCiudad = new Ciudades({ nombreCiudad });
        await nuevaCiudad.save();

        nuevoPais.ciudades.push(nuevaCiudad);
        await nuevoPais.save();
      }
    }

    return nuevaRegion;
  } catch (error) {
    throw error;
  }
};

const createCountry = async (idRegion, pais) => {
  try {
    const region = await Regiones.findById(idRegion);
    if (region === null) throw "El id de la región es incorrecto";

    const { nombrePais, ciudades } = pais;

    const nuevoPais = await new Paises({ nombrePais });
    await nuevoPais.save();

    region.paises.push(nuevoPais);
    await region.save();

    for (let ciudad of ciudades) {
      let nombreCiudad = ciudad.nombreCiudad;
      let nuevaCiudad = new Ciudades({ nombreCiudad });
      await nuevaCiudad.save();

      nuevoPais.ciudades.push(nuevaCiudad);
      await nuevoPais.save();
    }

    return nuevoPais;
  } catch (error) {
    throw error;
  }
};

const createCity = async (idPais, ciudades) => {
  try {
    const pais = await Paises.findById(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    for (let ciudad of ciudades) {
      const nuevaCiudad = await new Ciudades(ciudad);
      await nuevaCiudad.save();

      pais.ciudades.push(nuevaCiudad);
      await pais.save();
    }

    return pais;
  } catch (error) {
    throw error;
  }
};

const findRegions = (obj, proyection = {}) =>
  Regiones.find(obj, proyection)
    .populate({
      path: "paises",
      model: "Paises",
      populate: {
        path: "paises ciudades",
        model: "Ciudades",
      },
    })
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const findCountry = (obj, proyection = {}) =>
  Paises.find(obj, proyection)
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const findCity = (obj, proyection = {}) =>
  Ciudades.find(obj, proyection)
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const findCountriesNames = (obj, proyection = {}) =>
  Regiones.find(obj, proyection)
    .populate({
      path: "paises",
      model: "Paises",
      select: { nombrePais: 1 },
    })
    .then((r) => r)
    .catch((e) => {
      throw e;
    });

const findCitiesNames = (obj, proyection = {}) =>
  Paises.find(obj, proyection)
    .populate({
      path: "ciudades",
      model: "Ciudades",
      select: { nombreCiudad: 1 },
    })
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

const modifyCountry = async (idPais, nombrePais) => {
  try {
    const pais = await Paises.findById(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    const { _id: id } = await pais.set("nombrePais", nombrePais, {
      runValidators: true,
    });

    await pais.save();

    return id;
  } catch (error) {
    throw error;
  }
};

const modifyCity = async (idCiudad, nombreCiudad) => {
  try {
    const ciudad = await Ciudades.findById(idCiudad);

    if (ciudad === null) throw "El id de la ciudad es incorrecto";

    const { _id: id } = await ciudad.set("nombreCiudad", nombreCiudad, {
      runValidators: true,
    });

    await ciudad.save();

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

const deleteCountry = async (idPais) => {
  try {
    const pais = await Paises.findById(idPais);

    if (pais === null) throw "El id del país es incorrecto";

    const { _id: id } = pais.remove();

    return id;
  } catch (error) {
    throw error;
  }
};

const deleteCity = async (idCiudad) => {
  try {
    const ciudad = await Ciudades.findById(idCiudad);

    if (ciudad === null) throw "El id de la ciudad es incorrecto";

    const { _id: id } = ciudad.remove();

    return id;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRegion,
  findRegions,
  findCountriesNames,
  findCountry,
  findCitiesNames,
  findCity,
  modifyRegion,
  deleteRegion,
  createCountry,
  modifyCountry,
  deleteCountry,
  createCity,
  modifyCity,
  deleteCity,
};
