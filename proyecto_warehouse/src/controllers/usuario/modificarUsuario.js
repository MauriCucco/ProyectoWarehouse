const { modifyUser } = require("../../models/usuario")

const modificarUsuario = (req, res) => 

    modifyUser(req.params.id, req.body)
    .then(r => {

        if(r.ok === 0) return res.status(422).send({mensaje: "El campo que quiere modificar no existe"});

        res.status(200).send({mensaje: "El usuario fue modificado exitósamente"});
        
    })
    .catch(e => {

        if(e.kind === "ObjectId") return res.status(422).send({error: "El id es incorrecto"});

        if(e.errors.perfil) return res.status(422).send({error: e.errors.perfil.message});

        res.status(500).send(e);
    })

module.exports = modificarUsuario;