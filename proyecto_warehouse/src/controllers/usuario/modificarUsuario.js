const { modifyUser } = require("../../models/usuario")

const modificarUsuario = (req, res) => 

    modifyUser(req.params.id, req.body)
    .then(r => {

        res.status(200).send({mensaje: "El usuario fue modificado exitósamente"});
        
    })
    .catch(e => {

        if(e.kind === "ObjectId") return res.status(422).send({error: "El id es incorrecto"});

        res.status(500).send(e);
    })

module.exports = modificarUsuario;