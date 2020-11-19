const { findUser } = require("../../models/usuario");

const obtenerUsuarioSingle = (req, res) => {

    const id = req.params.id

    findUser({_id: id})
    .then(([r]) => res.status(200).send(r))
    .catch(e => res.send(500).send(e))
}

module.exports = obtenerUsuarioSingle;