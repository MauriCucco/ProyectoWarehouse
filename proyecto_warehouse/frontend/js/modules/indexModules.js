export const host = "localhost:3000";
export const token = localStorage.getItem("token");
export let seccionUsuarios = document.getElementById("usuarios");
export const divSinPermiso = document.getElementById("sin-permiso");


//FUNCIÓN PARA DEJAR DE RESALTAR UNA SECCIÓN DEL NAV

export const removeActive = () => {

    let navItem = document.getElementsByClassName("nav-item");

    for(let item of navItem) {

        if(item.className === "nav-item item-habilitado") return item.classList.remove("item-habilitado");
    }
}


//FUNCIÓN QUE CHEQUEA SI EL USUARIO LLENÓ TODOS LOS CAMPOS REQUERIDOS

export const checkInputs = (data, inputs, dataSmall) => {

    const {email, password, nombre, apellido, confirm_password } = data;

    const { nombreInput, apellidoInput, emailInput, passwordInput, confirmInput, emailInputModify, nombreInputModify, apellidoInputModify} = inputs;

    if(!email && emailInput) emailInput.classList.add("invalid");

    if(!email && emailInputModify) emailInputModify.classList.add("invalid");
        
    if(!password && passwordInput) passwordInput.classList.add("invalid");

    if(!nombre && nombreInput) nombreInput.classList.add("invalid");

    if(!nombre && nombreInputModify) nombreInputModify.classList.add("invalid");

    if(!apellido && apellidoInput) apellidoInput.classList.add("invalid");

    if(!apellido && apellidoInputModify) apellidoInputModify.classList.add("invalid");

    if(!confirm_password && confirmInput) confirmInput.classList.add("invalid");

    return dataSmall.innerHTML = "Ingrese todos los datos requeridos"
}


//FUNCIÓN PARA RESETEAR LOS ESTILOS DE TODOS LOS INPUTS Y EL CONTENIDO DE SUS SMALLS

export const resetInputsStyles = (inputs, smalls) => {

    const { nombreInput, apellidoInput, emailInput, passwordInput, confirmInput, emailInputModify, nombreInputModify, apellidoInputModify } = inputs;

    const { nombreSmall, apellidoSmall, emailSmall, passwordSmall, confirmSmall, dataSmall, nombreSmallModify, apellidoSmallModify, emailSmallModify, dataSmallModify } = smalls;

    if(emailInput) {

        emailInput.classList.remove("invalid");
        emailSmall.innerHTML = "";
    }

    if(emailInputModify) {

        emailInputModify.classList.remove("invalid");
        emailSmallModify.innerHTML = "";
    }
    
    if(passwordInput) {

        passwordInput.classList.remove("invalid");
        passwordSmall.innerHTML = "";
    }
    
    if(dataSmall) dataSmall.innerHTML = "";

    if(dataSmallModify) dataSmallModify.innerHTML = "";

    if(nombreInput) {

        nombreInput.classList.remove("invalid");
        nombreSmall.innerHTML = "";
    }

    if(nombreInputModify) {

        nombreInputModify.classList.remove("invalid");
        nombreSmallModify.innerHTML = "";
    }

    if(apellidoInput) {

        apellidoInput.classList.remove("invalid");
        apellidoSmall.innerHTML = "";
    }

    if(apellidoInputModify) {

        apellidoInputModify.classList.remove("invalid");
        apellidoSmallModify.innerHTML = "";
    }

    if(confirmInput) {

        confirmInput.classList.remove("invalid");
        confirmSmall.innerHTML = "";
    }
}


//FUNCIÓN PARA RESETEAR LOS VALUES DE LOS INPUTS AL CREAR UN USUARIO

export const resetInputsValues = (inputs) => {

    const { nombreInput, apellidoInput, emailInput, passwordInput, confirmInput } = inputs;

    emailInput.value = "";
    passwordInput.value = "";
    if(nombreInput) nombreInput.value = "";
    if(apellidoInput) apellidoInput.value = "";
    if(confirmInput) confirmInput.value = "";
}


//FUNCIÓN QUE PROCESA UNA RESPUESTA 422 DEL SERVIDOR

export const processInvalid = (response, inputs, smalls) => {

    const { nombreInput, apellidoInput, emailInput, passwordInput, confirmInput, emailInputModify, nombreInputModify, apellidoInputModify } = inputs;

    const { nombreSmall, apellidoSmall, emailSmall, passwordSmall, confirmSmall, nombreSmallModify, apellidoSmallModify, emailSmallModify } = smalls;

    if(response.error === "Nombre inválido") {

        resetInputsStyles(inputs, smalls);

        if(nombreInput) {

            nombreInput.classList.add("invalid");
            nombreSmall.innerHTML = "Debe ingresar un nombre válido";

        }else if(nombreInputModify) {

            nombreInputModify.classList.add("invalid");
            nombreSmallModify.innerHTML = "Debe ingresar un nombre válido";
        }

    }else if(response.error === "Apellido inválido") {

        resetInputsStyles(inputs, smalls);

        if(nombreInput) {

            apellidoInput.classList.add("invalid");
            apellidoSmall.innerHTML = "Debe ingresar un apellido válido";

        }else if(nombreInputModify) {

            apellidoInputModify.classList.add("invalid");
            apellidoSmallModify.innerHTML = "Debe ingresar un apellido válido";
        }    

    }else if(response.error === "Email inválido") {

        resetInputsStyles(inputs, smalls);

        if(emailInput) {

            emailInput.classList.add("invalid");
            emailSmall.innerHTML = "Debe ingresar un email válido";

        }else if(emailInputModify) {

            emailInputModify.classList.add("invalid");
            emailSmallModify.innerHTML = "Debe ingresar un email válido";
        }
        
    }else if(response.error === "Esta dirección de email ya fue utilizada") {

        resetInputsStyles(inputs, smalls);

        if(emailInput) {

            emailInput.classList.add("invalid");
            emailSmall.innerHTML = "Ésta cuenta de email ya fue utilizada";

        }else if(emailInputModify) {

            emailInputModify.classList.add("invalid");
            emailSmallModify.innerHTML = "Ésta cuenta de email ya fue utilizada";
        }
        
    }else if(response.error === "Password inválido") {

        resetInputsStyles(inputs, smalls);

        passwordInput.classList.add("invalid");
        passwordSmall.innerHTML = "Debe ingresar un password válido";

    }else {

        resetInputsStyles(inputs, smalls);

        confirmInput.classList.add("invalid");
        confirmSmall.innerHTML = "Debe ingresar el mismo password"
    }
}


//FUNCIÓN QUE ORDENA LAS FILAS DE UNA TABLA POR COLUMNA

export function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}