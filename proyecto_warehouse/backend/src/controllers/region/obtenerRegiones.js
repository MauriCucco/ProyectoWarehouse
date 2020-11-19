const { findRegions } = require("../../models/region");

const obtenerRegiones = (req, res) => 

    findRegions({})
    .then(r => res.status(200).send(r))
    .catch(e => res.sattus(500).send(e))

module.exports = obtenerRegiones;