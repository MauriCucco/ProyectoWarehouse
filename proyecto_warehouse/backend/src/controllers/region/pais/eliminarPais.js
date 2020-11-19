const { deleteCountry } = require("../../../models/region");

const eliminarPais = (req, res) => {

    const { idPais } = req.body;

    deleteCountry(req.params.id, idPais)
    .then(r => res.status(200).send({_id: r}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id de la región es incorrecto"});

        res.status(500).send({error: e})
    })
}

module.exports = eliminarPais;