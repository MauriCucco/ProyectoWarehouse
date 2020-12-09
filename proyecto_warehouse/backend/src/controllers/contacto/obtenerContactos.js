const { findContacts } = require("../../models/contacto");

const obtenerContactos = async (req, res) =>
  findContacts({})
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(500).send(e));

module.exports = obtenerContactos;
