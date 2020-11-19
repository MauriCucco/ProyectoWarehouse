const { findContacts } = require("../../models/contacto");

const obtenerContactos = (req, res) => 
    findContacts({})
    .then(r => res.status(200).send(r))
    .catch(e => res.sattus(500).send(e))

module.exports = obtenerContactos;