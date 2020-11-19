
function notFound(req, res) {

    res.status(404).send({error: "La página solicitada no existe"})
}

function errorServidor (err, req, res, next) {

    if (!err) { //no hay error
        return next();    
    }

    console.log(err);

    if (err.name === 'UnauthorizedError') { //no se encontró un token

        return res.status(401).send({error: "No se encontró un token de autorización"});
    }

    res.status(500).send({error: "Se ha producido un error inesperado"});
}

module.exports = {
    notFound,
    errorServidor
}