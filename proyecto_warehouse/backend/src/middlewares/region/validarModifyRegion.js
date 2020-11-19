const schemaRegion = require("../schemas/region");

const validarModifyRegion = (req, res, next) => {

    const { error } = schemaRegion.modify.validate(req.body);

    error? res.status(422).send({error: error.details[0].message}) : next();
}

module.exports = validarModifyRegion;