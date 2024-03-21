
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

function validatePhone(phone) {
  if (/^[0-9]{9}$/.test(phone)){
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
let feedbackDivs = document.querySelectorAll(".feedback");

inputs.forEach((input, index) => {
  $(input).on("focusout", () => {
    comprovaInput(input, index);
  });
  $(input).on("input", () => {
    comprovaInput(input, index);
  });
});

//Funció que afegeix o remou les classes valid & invalid segons els paràmetres que rep
function AddRemoveClass(valid, input, index) {
  if (valid) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    AddRemoveFeedBack(valid, feedbackDivs[index])
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    AddRemoveFeedBack(valid, feedbackDivs[index])
  }
}
//Funció que afegeix o remou les classes valid & invalid feedback segons els paràmetres que rep
function AddRemoveFeedBack(valid, div) {
  if (valid) {
    div.classList.remove("invalid-feedback");
    div.classList.add("valid-feedback");
    div.innerText = "";
  } else {
    div.classList.remove("valid-feedback");
    div.classList.add("invalid-feedback");
    insertFeedbackMessage(div);
  }


}
//Funció que segons la id de l'input realitza unes comprovacions o unes altres
function comprovaInput(input, index){
  let valid = false;
  if (!isEmpty(input.value)) {
    switch (input.id) {
      case "validationDNI":
        if (validateNIF_NIE(input.value)) {  
          valid = true;
        }
        break;
      case "validationEmail":
        if (validateEmail(input.value)) {
          valid = true;
        }
        break;
      case "validationTelf":
        console.log(validatePhone(input.value))
        if (validatePhone(input.value)) {
          valid = true;
        }
        break;
      default:
        valid = true;
        break;
    }
  } 
  AddRemoveClass(valid, input, index);
}

//Funció per definir missatge d'error segons el camp del form
function insertFeedbackMessage(div){
  switch(div.id){
    case "feedbackDNI":
        div.innerText = "El DNI no és vàlid";
      break;
    case "feedbackEmail":
        div.innerText = "No és un email vàlid";
      break;
    case "feedbackTelf":
        div.innerText = "No és un número de teléfon correcte";
      break;
    default:
        div.innerText = "Aquest camp no pot estar buit";
      break;
  }
}