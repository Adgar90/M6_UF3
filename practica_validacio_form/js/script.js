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
inputPass.addEventListener("input", () => {
    validatePassword(inputPass);
    equalPassword(inputPass, inputPassEqual);
});
inputPassEqual.addEventListener("input", () => {
    equalPassword(inputPass, inputPassEqual);
})
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
function validateForm() {
    let valid = true;
    inputs.forEach(input => {
        if (input.style.borderColor == "red" || input.style.borderColor == "") { valid = false; }
    });
    return valid;
}
function checkInputValue(input, index) {
    if (input.value == "") {
        input.style.borderColor = "red";
        spans[index].hidden = false;
    } else {
        input.style.borderColor = "green";
        spans[index].hidden = true;
    }
}
function validateEmail(input, index) {
    if (validEmail.test(input.value)) {
        input.style.borderColor = "green";
        spans[index].hidden = true;
    } else {
        input.style.borderColor = "red";
        spans[index].hidden = false;
    }
}
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
function acceptablePassword(password) {
    if ((password.length > 7 && password.length < 16) && upperCaseLetters.test(password) && lowerCaseLetters.test(password) && numbers.test(password) && specialChars.test(password)) {
        return true;
    }
    return false;
}
function equalPassword(actual, expected) {
    if (actual.value == expected.value) {
        expected.style.borderColor = "green";
        spans[3].hidden = true;
    } else {
        expected.style.borderColor = "red";
        spans[3].hidden = false;
    } 
}