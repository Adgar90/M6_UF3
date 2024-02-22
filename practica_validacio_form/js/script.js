//Selector d'elements
let inputs = document.querySelectorAll("input");

inputs.forEach((input, index) => {
    input.addEventListener("focusout", () => {
        if (input.value == "") {
            input.style.borderColor = "red";
        } else {
            input.style.borderColor = "green";
        }
        if (input.id == "inputEmail") {
            if (!validateEmail(input.value)) {
                input.style.borderColor = "red";
            }
        }
    });
});

function validateEmail (email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}