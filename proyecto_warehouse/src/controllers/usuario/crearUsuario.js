const { createUser } = require("../../models/usuario");
const sha1 = require("sha1");

const crearUsuario = (req, res) => {
    
    const { perfil = "contactos", nombre, apellido, email, password } = req.body;

    const obj = {
        perfil,
        nombre,
        apellido,
        email,
        password: sha1(password)
    }

    createUser(obj)
    .then( r => res.status(200).send({id: r}))
    .catch( e => {
        
        if(e.keyPattern) return res.status(422).send({error: "Esta dirección de email ya fue utilizada"});
        
        res.status(500).send(e);
    })
}

module.exports = crearUsuario;