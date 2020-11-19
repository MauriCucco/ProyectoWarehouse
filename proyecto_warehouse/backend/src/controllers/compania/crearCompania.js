const { createCompany } = require("../../models/compania");

const crearCompania = (req, res) => 
    
    createCompany(req.body)
    .then(r => res.status(200).send({id: r}))
    .catch(e => {
        
        if(e.keyPattern) {

            if(e.keyPattern.nombre === 1) return res.status(422).send({mensaje: "El nombre de la compañia ya existe"});
            if(e.keyPattern.email === 1) return res.status(422).send({mensaje: "Esta cuenta de email ya ha sido registrada"});
            if(e.keyPattern.telefono === 1) return res.status(422).send({mensaje: "Este teléfono ya ha sido registrado"});
        }

        res.status(500).send(e)
    })

module.exports = crearCompania;