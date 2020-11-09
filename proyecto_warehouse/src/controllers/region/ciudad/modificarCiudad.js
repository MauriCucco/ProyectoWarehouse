const { modifyCity } = require("../../../models/region");

const modificarCiudad = (req, res) => {

    const { idPais, idCiudad, nombreCiudad} = req.body;

    modifyCity(req.params.id, idPais, idCiudad, nombreCiudad)
    .then(r => res.status(200).send({_id: r}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id de la región es incorrecto"});

        if(e.code == 11000 ) return res.status(422).send({error: "La ciudad ya existe"})
        
        res.status(500).send({error: e});
    })
}

module.exports = modificarCiudad;