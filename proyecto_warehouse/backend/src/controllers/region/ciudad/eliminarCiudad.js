const { deleteCity } = require("../../../models/region");

const eliminarCiudad = (req, res) => {

    const { idPais, idCiudad } = req.body;

    deleteCity(req.params.id, idPais, idCiudad)
    .then(r => res.status(200).send({_id: r}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id de la región es incorrecto"});

        res.status(500).send({error: e})
    })
}

module.exports = eliminarCiudad;