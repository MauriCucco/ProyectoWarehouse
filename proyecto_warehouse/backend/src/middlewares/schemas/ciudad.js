const Joi = require("joi");

const ciudadSchema = {
  create: Joi.object().keys({
    idPais: Joi.string().alphanum().min(24).required(),
    ciudades: Joi.array()
      .required()
      .items(
        Joi.object({
          nombreCiudad: Joi.string()
            .required()
            .pattern(
              new RegExp("^[A-Za-z]{3,}\\s{0,1}[A-Za-z]*\\s{0,1}[A-Za-z]*$")
            )
            .message("El nombre de la ciudad es inválido"),
        })
      ),
  }),
  modify: Joi.object().keys({
    idPais: Joi.string().alphanum().min(24).required(),
    idCiudad: Joi.string().alphanum().min(24).required(),
    nombreCiudad: Joi.string()
      .required()
      .pattern(new RegExp("^[A-Za-z]{3,}\\s{0,1}[A-Za-z]*\\s{0,1}[A-Za-z]*$"))
      .message("El nombre de la ciudad es inválido"),
  }),
  delete: Joi.object().keys({
    idPais: Joi.string().alphanum().min(24).required(),
    idCiudad: Joi.string().alphanum().min(24).required(),
  }),
};

module.exports = ciudadSchema;
