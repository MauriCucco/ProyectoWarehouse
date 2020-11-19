const schemaCanal = require("../../schemas/canal");

const validarModifyCanal = (req, res, next) => {

    const { error } = schemaCanal.modify.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarModifyCanal;