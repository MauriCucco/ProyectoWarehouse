const Joi = require("joi");

const paisSchema = {
  create: Joi.object().keys({
    nombrePais: Joi.string()
      .required()
      .pattern(new RegExp("^[A-Za-z]{3,}\\s{0,1}[A-Za-z]*\\s{0,1}[A-Za-z]*$"))
      .message("El nombre del país es inválido"),
    ciudades: Joi.array()
      .required()
      .items(
        Joi.object({
          nombreCiudad: Joi.string().required(),
        })
      ),
  }),
  modify: Joi.object().keys({
    idPais: Joi.string().alphanum().min(24).required(),
    nombrePais: Joi.string()
      .required()
      .pattern(new RegExp("^[A-Za-z]{3,}\\s{0,1}[A-Za-z]*\\s{0,1}[A-Za-z]*$"))
      .message("El nombre del país es inválido"),
  }),
  delete: Joi.object().keys({
    idPais: Joi.string().alphanum().min(24).required(),
  }),
};

module.exports = paisSchema;
