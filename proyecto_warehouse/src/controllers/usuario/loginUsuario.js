const {findUser} = require("../../models/usuario");
const { crearToken } = require("../../models/crearToken");
const sha1 = require('sha1');

const loginUsuario = (req, res) => {

    const { email, password } = req.body;

    const obj = {
        email,
        password: sha1(password)
    }

    findUser(obj)
    .then(r => {
       
        if(r === null) return res.status(401).send({mensaje: "No se encuentra registrado"})

        const { _id, perfil } = r;

        const token = crearToken({_id, perfil});

        res.status(200).send({mensaje: "Autenticación exitosa", token});
    })
    .catch(e => res.status(500).send(e))
}

module.exports = loginUsuario;