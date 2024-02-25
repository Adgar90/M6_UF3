//Selector d'elements
let inputs = document.querySelectorAll("input");
let inputPass = document.getElementById("inputPass");
let inputPassEqual = document.getElementById("inputPassEqual");
let spans = document.querySelectorAll("span");
let ul = document.querySelector("ul");
let liCollection = document.querySelectorAll("li");
let form = document.querySelector("form");
let msgError = document.getElementById("msgError");
//Variables regexp
let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let lowerCaseLetters = /[a-z]/;
let upperCaseLetters = /[A-Z]/;
let numbers = /[0-9]/;
let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//Esdeveniments
//Recorregut forEach per implementar esdeveniment focusout en els inputs d'inputName, inputEmail i
//inputCode per comprovar que no estiguin buits (en el cas de code i name) i sigui vàlid (en el cas d'email).
inputs.forEach((input, index) => {
    input.addEventListener("focusout", () => {
        switch (input.id) {
            case "inputName":
                checkInputValue(input, index);
                break;
            case "inputEmail":
                validateEmail(input, index);
                break;
            case "inputCode": 
                checkInputValue(input, index);
                break;
        }
    });
});
//Esdeveniment input que crida la funció validatePassword per comprovar a que el nostre password
//compleix amb tots el requeriments i, a més, crida a la vegada la funció equalPassword per actualitzar
//també l'input de repetir el password.
inputPass.addEventListener("input", () => {
    validatePassword(inputPass);
    equalPassword(inputPass, inputPassEqual);
});
//Esdeveniment input que crida la funció equalPassword per cada lletra i comprova si els passwords dels dos inputs son iguals
inputPassEqual.addEventListener("input", () => {
    equalPassword(inputPass, inputPassEqual);
})
//Esdeveniment on submit que fa submit en cas de ser un form valid, si no, mostra un missatge d'error
form.addEventListener("submit", function(e){
    e.preventDefault();
    msgError.innerHTML = "";
    if (validateForm()){
        form.submit();
    } else {
        msgError.innerHTML = '<p style="color: red">ERROR: Alguns dels camps no són correctes</p>';
    }
})
//Funcions
//Funció que comprova que el form sigui vàlid comprovant que tots siguin amb borderColor == green
function validateForm() {
    let valid = true;
    inputs.forEach(input => {
        if (input.style.borderColor == "red" || input.style.borderColor == "") { valid = false; }
    });
    return valid;
}
//Funció que rep l'input i el seu index i actualitza el color i mostra missatge d'error en cas d'estar buit
function checkInputValue(input, index) {
    if (input.value == "") {
        input.style.borderColor = "red";
        spans[index].hidden = false;
    } else {
        input.style.borderColor = "green";
        spans[index].hidden = true;
    }
}
//Funció que executa .test amb variable regex per comprovar que l'email sigui vàlid
function validateEmail(input, index) {
    if (validEmail.test(input.value)) {
        input.style.borderColor = "green";
        spans[index].hidden = true;
    } else {
        input.style.borderColor = "red";
        spans[index].hidden = false;
    }
}
//Funció que comprova un per un els requeriments que es demana per al password
function validatePassword(input) {
    input.value.length > 7 && input.value.length < 16 ? liCollection[0].style.color = "green" : liCollection[0].style.color = "red";
    upperCaseLetters.test(input.value) ? liCollection[1].style.color = "green" : liCollection[1].style.color = "red";
    lowerCaseLetters.test(input.value) ? liCollection[2].style.color = "green" : liCollection[2].style.color = "red";
    numbers.test(input.value) ? liCollection[3].style.color = "green" : liCollection[3].style.color = "red";
    specialChars.test(input.value) ? liCollection[4].style.color = "green" : liCollection[4].style.color = "red";
    if (acceptablePassword(input.value)) {
        input.style.borderColor = "green";
        ul.hidden = true;
    } else {
        input.style.borderColor = "red";
        ul.hidden = false;
    }
    
}
//Funció que comprova si el password compleix amb tots els requeriments
function acceptablePassword(password) {
    if ((password.length > 7 && password.length < 16) && upperCaseLetters.test(password) && lowerCaseLetters.test(password) && numbers.test(password) && specialChars.test(password)) {
        return true;
    }
    return false;
}
//Funció que comprova si el password actual i el repetit són iguals
function equalPassword(actual, expected) {
    if (actual.value == expected.value) {
        expected.style.borderColor = "green";
        spans[3].hidden = true;
    } else {
        expected.style.borderColor = "red";
        spans[3].hidden = false;
    } 
}