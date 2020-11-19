const jwt = require("jsonwebtoken");
const { jwtClave } = require("../config/config");
const signOptions = { expiresIn: "8h"};


const crearToken = (payload) => jwt.sign(payload, jwtClave, signOptions);

module.exports = { crearToken };