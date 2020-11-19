const { deleteCompany } = require("../../models/compania");

const eliminarCompania = (req, res) => 
    deleteCompany(req.params.id)
    .then(r => res.status(200).send({mensaje: "La compania fue eliminada exitósamente"}))
    .catch(e => {

        if(e.kind === "ObjectId") return res.status(422).send({error: "El id es incorrecto"});

        res.status(500).send(e);
    })


module.exports = eliminarCompania;