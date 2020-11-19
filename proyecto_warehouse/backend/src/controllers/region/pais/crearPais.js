const { createCountry } = require("../../../models/region");

const crearPais = (req, res) => {

    const { nombrePais } = req.body;

    createCountry(req.params.id, nombrePais)
    .then(r => res.status(200).send({mensaje: "El país fue creado exitósamente"}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id de la región es incorrecto"});

        if(e.code === 11000) return res.status(422).send({error: "El país ya existe"});

        res.status(500).send({error: e});
    })
}

module.exports = crearPais;