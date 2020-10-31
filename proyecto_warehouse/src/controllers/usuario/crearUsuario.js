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
    .catch( e => 

        (e.errors.perfil.message)? res.status(500).send({error: e.errors.perfil.message}) : res.status(500).send({error: e.errors.nombre.message})
    )
}

module.exports = crearUsuario;