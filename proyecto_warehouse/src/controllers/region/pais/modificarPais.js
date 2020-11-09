const { modifyCountry } = require("../../../models/region")

const modificarPais = (req, res) => {

    const { idPais, nombrePais } = req.body;

    modifyCountry(req.params.id, idPais, nombrePais)
    .then(r => res.status(200).send({_id: r}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id de la región es incorrecto"});

        if(e.code == 11000 ) return res.status(422).send({error: "El país ya existe"})
        
        res.status(500).send({error: e});
    })
}

module.exports = modificarPais;