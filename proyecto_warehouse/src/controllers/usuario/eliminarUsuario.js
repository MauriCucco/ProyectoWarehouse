const {deleteUser } = require("../../models/usuario")

const eliminarUsuario = (req, res) => {

    deleteUser(req.params.id)
    .then(r => {

        res.status(200).send({mensaje: "El usuario fue eliminado exitósamente"});
        
    })
    .catch(e => {

        if(e.kind === "ObjectId") return res.status(422).send({error: "El id es incorrecto"});

        res.status(500).send(e);
    })
}

module.exports = eliminarUsuario;