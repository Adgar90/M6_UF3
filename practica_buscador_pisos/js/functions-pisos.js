/* PART REGISTRE PISOS */

$("#barris").prop("disabled", true);

let districtes = document.getElementById("districte");
districtes.innerHTML = "";
//Fetch que rep les dades de categories de la base de dades i les mostra
//com a opcions en el select de categories
fetch("getDistrictes.php")
    .then((response) => response.json())
    .then((data) => { 
        data.forEach(districte => {
            let option = document.createElement("option");
            option.value = districte.id;
            option.text = districte.name;
            districtes.appendChild(option);
        });
        //Esdeveniment que crida la funció per mostra les subcategories de cada categoria
        $(districtes).on("change", function() { mostraBarris(this.value); })
        districtes.dispatchEvent(new Event('change')); 
    })
    .catch ((error) => {
        console.log(error); 
    });

//Funció mostraSubcategories, que rep la id de la categoria i crea un formData
//per enviar per POST a getSubcategories.php i consultar a la base de dades les
//subcategories per cada id que rep
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
