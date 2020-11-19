const { findRegions } = require("../../models/region");

const validarLocacion = async (req, res, next) => {

    try {

        const { region, pais, ciudad, } = req.body;
        
        const [ matchRegion ] = await findRegions({nombreRegion: region})

        if(matchRegion === undefined) throw "La región es inválida";
    
        const [ matchPais ] = await findRegions({nombreRegion: region, "paises.nombrePais": pais});

        if(matchPais === undefined) throw "El país es inválido";
    
        const [ matchCiudad ] = await findRegions({nombreRegion: region, "paises.nombrePais": pais, "paises.ciudades.nombreCiudad": ciudad});

        if(matchCiudad === undefined) throw "La ciudad es inválida";

        next();
        
    } catch (error) {

        res.status(422).send({mensaje: error});
    }
}

module.exports = validarLocacion;