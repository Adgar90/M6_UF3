//Declarem array buida on aniran tots els fitxers
let fitxers = [];

//Declaració d'objeces (DOM) que farem servir
let dropArea = document.querySelector('.drop-area');
let h2Text = document.querySelector('h2');
let button = document.querySelector('button');
let form = document.querySelector('form');
let input = document.getElementById("input-file");
let preview = document.getElementById("preview");

// Variables de text
let text1 = "Drag & Drop files";
let text2 = "Drag to upload files";
// Accions interactives
let accions = ['dragover', 'dragleave', 'drop'];

accions.forEach(action => {
    //Invalidació per defecte del drag & drop
    dropArea.addEventListener(action, prevDefault);
    //EVENT class list segons l'acció
    if (action == 'dragover') {
        //Acció dragover
        dropArea.addEventListener('dragover', function() {
            dropArea.classList.add("active");
            dropArea.firstElementChild.textContent = text2;
        });
    } else {
        //Acció dragleave
        dropArea.addEventListener('dragleave', function (){
            dropArea.classList.remove("active");
            dropArea.firstElementChild.textContent = text1;
        });
        //Acció drop
        dropArea.addEventListener('drop', function (){
            dropArea.classList.remove("active");
            dropArea.firstElementChild.textContent = text1;
        });
    }
})

//Esdeveniment que concatena els files i els mostra de nou quan fem drop
dropArea.addEventListener('drop', function (e) {
    fitxers = fitxers.concat(Array.from(e.dataTransfer.files));
    showFiles();
})

//Esdevediment que en fer click es mostra un selector d'arxius
button.addEventListener("click", function(e) {
    e.preventDefault();
    input.click();
});

//Esdeveniment que gestiona els fitxers seleccionats en l'input
input.addEventListener("change", function() { 
    fitxers = fitxers.concat(Array.from(input.files));
    showFiles();
    form.submit();
});

//Esdeveniment que agafa les dades dels fitxers i les emmagatzema al nostre php (servidor)
form.addEventListener("submit", function(e){
    e.preventDefault();
    const dataTransfer = new DataTransfer();
    files.forEach(file=>{
        console.log(file);
        dataTransfer.items.add(file);
    });
    input.files = dataTransfer.files;
    form.submit();
});

//Funció per preventDefault()
function prevDefault (e) {
    e.preventDefault();
}

//Funció showFiles
function showFiles() {
    preview.innerHTML = "";
    fitxers.forEach((file, index) => {
        processFile(file, index);
    })
}

//Funció que procesa els fitxers
function processFile(file, index) {
    // extensions vàlides
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    // type del file
    const docType = file.type;
    //comprovem si el type és una extensió vàlida
    if (! validExtensions.includes(docType)) { fitxers.splice(index, 1); return; }

    let reader = new FileReader();
    preview.appendChild(creaImgPreview(file.name, index));
    reader.addEventListener(
        "load",
        function () {
            document.getElementById(index).src = this.result;
        },
        false,
      );
    reader.readAsDataURL(file);
}

// Funció per crear un div d'imatges de preview
function creaImgPreview(name, index) {
    let prev = document.createElement("div");
    prev.innerHTML = `<div class="previewImage">
                <img id="${index}"/>
                <span>${name}</span>
                <span onclick="removeBtn(${index})" class="removeBtn">c</span>
            </div>`;
    return prev.firstChild;
}
//Funció que esborra un element de l'array
function removeBtn(i) {
    fitxers.splice(i, 1);
    showFiles();
}