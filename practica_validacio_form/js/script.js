//Selector d'elements
let inputs = document.querySelectorAll("input");

inputs.forEach((input, index) => {
    input.addEventListener("focusout", () => {
        if (input.value == "") {
            input.style.borderColor = "red";
            document.getElementById(`span${index}`).hidden = false;
        } else {
            input.style.borderColor = "green";
            
            document.getElementById(`span${index}`).hidden = true;
        }
        if (input.id == "inputEmail") {
            if (!validateEmail(input.value)) {
                input.style.borderColor = "red";  
                document.getElementById(`span${index}`).hidden = false;
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