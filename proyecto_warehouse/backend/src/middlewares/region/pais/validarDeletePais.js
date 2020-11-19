const schemaPais = require("../../schemas/pais");

const validardeletePais = (req, res, next) => {

    const { error } = schemaPais.delete.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validardeletePais;