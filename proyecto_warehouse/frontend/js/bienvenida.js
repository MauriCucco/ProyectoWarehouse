"use strict";

import {
  host,
  checkInputs,
  resetInputsStyles,
  processInvalid,
  resetInputsValues,
} from "./modules/indexModules.js";

let emailInput = document.getElementById("email-input");
let passwordInput = document.getElementById("password-input");
let submitButton = document.getElementById("submit-button");
let emailSmall = document.getElementById("email-small");
let passwordSmall = document.getElementById("password-small");
let dataSmall = document.getElementById("data-small");

const inputs = { emailInput, passwordInput };
const smalls = { emailSmall, passwordSmall };

resetInputsValues(inputs); //reseteo los inputs

submitButton.addEventListener("click", (event) => {
  loginOrCheck();
});

//función que se encarga de llamar a userLogin o a checkInputs según los datos ingresados

const loginOrCheck = () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  //reseteo de los smalls

  emailSmall.innerHTML = "";
  passwordSmall.innerHTML = "";
  dataSmall.innerHTML = "";

  const data = { email, password };

  if (email && password) return userLogin(data);

  checkInputs(data, inputs, dataSmall);
};

//eventos para cuando el usuario escribe en un input

emailInput.addEventListener("keydown", (event) => {
  emailInput.classList.remove("invalid");
});

passwordInput.addEventListener("keydown", (event) => {
  passwordInput.classList.remove("invalid");
});

//evento para cuando el usuario presiona ENTER para loguearse

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    loginOrCheck();
  }
});

//función que consulta al servidor si el usuario está registrado

const userLogin = (obj) =>
  fetch(`http://${host}/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((r) => processLogin(r))
    .catch((e) => console.error(e));

//función que procesa las respuestas del servidor

const processLogin = async (response) => {
  try {
    dataSmall.innerHTML = "";

    const jsonResponse = await response.json();

    if (response.status === 200) {
      const token = jsonResponse.token;

      localStorage.setItem("token", token);

      window.open("index.html", "_self");
    } else if (response.status === 401) {
      resetInputsStyles(inputs, smalls);

      dataSmall.innerHTML = "No se encuentra registrado/a";
    } else if (response.status === 422) {
      processInvalid(jsonResponse, inputs, smalls);
    }
  } catch (error) {
    console.error(error);
  }
};
