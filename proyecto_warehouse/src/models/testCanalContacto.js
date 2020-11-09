
const testCanalContacto = (canal) => {

    if(canal.nombreCanal === "Instagram"
       || canal.nombreCanal === "Facebook"
       || canal.nombreCanal === "Linkedin") {
    
        const cuenta = canal.cuentaUsuario;
        const regex = new RegExp("^[@]*[a-z0-9]+$"); 
        const test = regex.test(cuenta);
                
        if(!test) return cuenta;
    
    }else {
    
        const cuenta = canal.cuentaUsuario;
        const regex = new RegExp("^[+]*[(]{0,1}[0-9]{1,5}[)]{0,1}[-\\s0-9]*$");
        const test = regex.test(cuenta);
    
        if(!test) return cuenta;
    }
}

module.exports = { testCanalContacto };