const Joi = require("joi");

const schemaCompania = {
  create: Joi.object().keys({
    nombre: Joi.string().required(),
    region: Joi.string().required(),
    pais: Joi.string().required(),
    ciudad: Joi.string().required(),
    direccion: Joi.string().required(),
    email: Joi.string().email().message("Email inválido").required(),
    telefono: Joi.string().required(),
  }),
  modify: Joi.object().keys({
    nombre: Joi.string().optional(),
    region: Joi.string().optional(),
    pais: Joi.string().optional(),
    ciudad: Joi.string().optional(),
    direccion: Joi.string().optional(),
    email: Joi.string().email().message("Email inválido").optional(),
    telefono: Joi.string().optional(),
  }),
};

module.exports = schemaCompania;
