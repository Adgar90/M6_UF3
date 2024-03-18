let divsFeedback = document.querySelectorAll(".feedback");
console.log(divsFeedback[2]);

function validateNIF_NIE(value){
  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}


function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    return true;
  }
  return false;
}

//Evitem que el botó faci submit
$('#form-user-register').submit(function(e) {
  e.preventDefault();
});

//Funció true is empty, false if not
function isEmpty(value){
  return value == "";
}
let inputs = document.querySelectorAll("input");

inputs.forEach(input => {
  input.addEventListener("focusout", () => {
    comprovaInput(input);
  });

  input.addEventListener("input", () => {
    comprovaInput(input);
  });
})

//Funció que afegeix o remou les classes valid & invalid segons els paràmetres que rep
function AddRemoveClass(valid, input) {
  if (valid) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}
//Funció que afegeix o remou les classes valid & invalid feedback segons els paràmetres que rep
function AddRemoveFeedBack(valid, div) {
  if (valid) {
    div.classList.remove("invalid-feedback");
    div.classList.add("valid-feedback");
  } else {
    div.classList.remove("valid-feedback");
    div.classList.add("invalid-feedback");
    div.innerText = "EERRORRRRR";
  }


}
//Funció que segons la id de l'input realitza unes comprovacions o unes altres
function comprovaInput(input){
  if (!isEmpty(input.value)) {
    switch (input.id) {
      case "validationDNI":
        if (validateNIF_NIE(input.value)) {  
          AddRemoveClass(true, input);
        } else {
          AddRemoveClass(false, input);
        }
        break;
      case "validationEmail":
        if (validateEmail(input.value)) {
          AddRemoveClass(true, input);
        } else {
          AddRemoveClass(false, input);
        }
        break;
      default:
        AddRemoveClass(true, input);
        break;
    }
  } else {
    AddRemoveClass(false, input);
  }
}