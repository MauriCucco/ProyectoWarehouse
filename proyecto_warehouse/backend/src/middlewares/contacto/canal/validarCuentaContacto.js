const { testCanalContacto } = require("../../../models/testCanalContacto");

const validarCuentaContacto = (req, res, next) => {
  const { canalesContacto, nombreCanal, cuentaUsuario } = req.body;

  if (!canalesContacto) return next();

  if (canalesContacto) {
    const validation = canalesContacto.find(testCanalContacto);

    validation === undefined
      ? next()
      : res.status(422).send({
          mensaje: `La cuenta de usuario ${validation.cuentaUsuario} es inválida para ${validation.nombreCanal}`,
        });
  }

  if (nombreCanal && cuentaUsuario) {
    //PARA MODIFICAR LOS CANALES DEL CONTACTO
    const canalContacto = [{ nombreCanal, cuentaUsuario }];

    const validation = canalContacto.find(testCanalContacto);

    validation === undefined
      ? next()
      : res.status(422).send({
          mensaje: `La cuenta de usuario ${validation.cuentaUsuario} es inválida para ${validation.nombreCanal}`,
        });
  }
};

module.exports = validarCuentaContacto;
