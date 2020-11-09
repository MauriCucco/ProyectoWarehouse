const { createCity } = require("../../../models/region")

const crearCiudad = (req, res) => {

    const { idPais, nombreCiudad } = req.body;

    createCity(req.params.id, idPais, nombreCiudad)
    .then(r => res.status(200).send({mensaje: "La ciudad fue creada exitósamente"}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id de la región es incorrecto"});

        if(e.code === 11000) return res.status(422).send({error: "La ciudad ya existe"});

        res.status(500).send({error: e});
    })
}

module.exports = crearCiudad;