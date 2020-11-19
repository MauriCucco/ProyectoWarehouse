const { findUser } = require("../../models/usuario")

const obtenerUsuarios = (req, res) => 

    findUser({})
    .then(r => res.status(200).send(r))
    .catch(e => res.send(500).send(e))


module.exports = obtenerUsuarios;