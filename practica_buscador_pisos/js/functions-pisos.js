/* PART REGISTRE PISOS */

$("#barris").prop("disabled", true);

let districtes = document.getElementById("districte");
districtes.innerHTML = "";
//Fetch que rep les dades dels districtes de la base de dades i les mostra
//com a opcions en el select de districte
fetch("getDistrictes.php")
    .then((response) => response.json())
    .then((data) => { 
        data.forEach(districte => {
            let option = document.createElement("option");
            option.value = districte.id;
            option.text = districte.name;
            districtes.appendChild(option);
        });
        //Esdeveniment que crida la funció per mostra els barris de cada districte amb jQuery
        $(districtes).on("change", function() { mostraBarris(this.value); })
        districtes.dispatchEvent(new Event('change')); 
    })
    .catch ((error) => {
        console.log(error); 
    });

//Funció mostraBarris, que rep la id del districte i crea un formData
//per enviar per POST a getBarris.php i consultar a la base de dades els
//barris per cada id que rep
function mostraBarris(value) {
    let formData = new FormData();
    console.log(value);
    formData.append("id", value);
    let options = {
        method: 'POST',
        body: formData
    }
    let barris = document.getElementById("barris");
    barris.innerHTML = "";
    barris.disabled = false;
    fetch("getBarris.php", options)
    .then((response) => response.json())
    .then((data) => { 
        data.forEach(barri => {
            let option = document.createElement("option");
            option.value = barri.id;
            option.text = barri.name;
            barris.appendChild(option);
        });
    })
    .catch ((error) => {
        console.log(error); 
    });
}

//prevent submit del form
$('#form-user-register').submit(function(e) { e.preventDefault(); });


//Visualització de les dades
/* 
    h4 --> Nom + barri, districte
    p --> Via + Nom + Número + Pis + Escala + Porta · CP · Districte · Barri · Poblacio
    p --> preu
    p --> text
*/
$('.btn-info').on("click", () => {
    //Dades 
    let nomPis = document.getElementById("inputNomPis").value;
    let preu = document.getElementById("inputPreu").value;
    let direccio = document.getElementById("nomDir").value;
    let num = document.getElementById("number").value; 
    let pis = document.getElementById("pis").value;
    let escala = document.getElementById("escala").value;
    let porta = document.getElementById("porta").value;
    let cp = document.getElementById("cp").value;
    let text = document.getElementById("text").value; 
    let via;
    //jQuery que recorre les opcions per agafar el valor de l'element seleccionat
    $('#via option').each( function() { if(this.selected) via = this.innerText; })
    let districte;
    $('#districte option').each( function() { if(this.selected) districte = this.innerText; })
    let barri;
    $('#barris option').each( function() { if(this.selected) barri = this.innerText; })
    let poblacio;
    $('#poblacio option').each( function() { if(this.selected) poblacio = this.innerText; })
    //elements per les dades
    let h4_nomPis = document.getElementById("nomPis");
    let p_direccio = document.getElementById("dir");
    let p_preu = document.getElementById("preu");
    let p_text = p_preu.nextElementSibling;

    h4_nomPis.innerText = `${nomPis}, ${barri}, ${districte}`;
    p_direccio.innerText = `${via} ${direccio}, ${num}, ${pis}, Escala ${escala}, Porta ${porta} · ${cp} · ${districte} · ${barri} · ${poblacio}`;
    p_preu.innerText = `${preu}€`;
    p_text.innerText = text;
});