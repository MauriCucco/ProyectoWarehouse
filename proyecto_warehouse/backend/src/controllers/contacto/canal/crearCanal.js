const { createChannel } = require("../../../models/contacto");

const crearCanal = (req, res) => {

    const obj = ({ nombreCanal, cuentaUsuario, preferencia } = req.body);

    createChannel(req.params.id, obj)
    .then(r => res.status(200).send({mensaje: "El canal de contacto fue creado exitósamente"}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id del contacto es incorrecto"});

        if(e.code === 11000) return res.status(422).send({error: "La cuenta de usuario ya existe"});

        res.status(500).send({error: e});
    })
}

module.exports = crearCanal;