const { deleteContact } = require("../../models/contacto");

const eliminarContacto = (req, res) => 

    deleteContact(req.params.id)
    .then(r => res.status(200).send({mensaje: "El contacto fue eliminado exitósamente"}))
    .catch(e => {

        if(e.kind === "ObjectId") return res.status(422).send({error: "El id es incorrecto"});

        res.status(500).send(e);
    })

module.exports = eliminarContacto;