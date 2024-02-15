//Declarem array buida on aniran tots els fitxers
let fitxers = [];

//Declaració d'objeces (DOM) que farem servir
let dropArea = document.querySelector('.drop-area');
let h2Text = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.getElementById("input-file");
let preview = document.getElementById("preview");

//Invalidació per defecte del drag & drop
let accions = ['dragover', 'dragleave', 'drop'];

accions.forEach(action => {
    dropArea.addEventListener(action, prevDefault);
})

function prevDefault (e) {
    e.preventDefault();
}

//Acció dragover

dropArea.addEventListener('dragover', function() {
    dropArea.classList.add("active");
});