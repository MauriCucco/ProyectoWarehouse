const { findRegions } = require("../../models/region");

const verificarLocaciones = async (response) => {
  for (let obj of response) {
    if (obj.region) {
      const [region] = await findRegions(
        { nombreRegion: obj.region },
        { nombreRegion: 1, _id: 0 }
      );
      if (!region) {
        obj.region = "";
        obj.pais = "";
        obj.ciudad = "";
      } else if (region) {
        const [pais] = await findRegions(
          { nombreRegion: obj.region, "paises.nombrePais": obj.pais },
          { "paises.nombrePais.$": 1, _id: 0 }
        );
        if (!pais) {
          obj.pais = "";
          obj.ciudad = "";
        } else if (pais) {
          const [ciudad] = await findRegions(
            {
              "paises.nombrePais": obj.pais,
              "paises.ciudades.nombreCiudad": obj.ciudad,
            },
            { "paises.ciudades.nombreCiudad.$": 1, _id: 0 }
          );

          if (!ciudad) obj.ciudad = "";
        }
      }
    }
  }

  return response;
};

module.exports = { verificarLocaciones };
