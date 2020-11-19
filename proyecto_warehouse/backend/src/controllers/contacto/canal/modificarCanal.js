const { modifyChannels } = require("../../../models/contacto");

const modificarCanales = (req, res) => {

    const { idCanal, ...otrasPropiedades } = req.body;
    
    modifyChannels(req.params.id, idCanal, otrasPropiedades)
    .then(r => res.status(200).send({_id: r}))
    .catch(e => {

        if(e.path === "_id") return res.status(422).send({error: "El id del contacto es incorrecto"});
        
        res.status(500).send({error: e});
    })
}

module.exports = modificarCanales;