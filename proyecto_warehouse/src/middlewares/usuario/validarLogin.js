const schemaLogin = require("../schemas/login")

const validarLogin = (req, res, next) => {

    const { error } = schemaLogin.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarLogin;