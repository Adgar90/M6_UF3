let categories = document.getElementById("categories");
//Fetch que rep les dades de categories de la base de dades i les mostra
//com a opcions en el select de categories
fetch("getCategories.php")
    .then((response) => response.json())
    .then((data) => { 
        data.forEach(categoria => {
            let opt = documentc.reateElement("option");
            opt.value = categoria.id;
            opt.text = categoria.nom;
            categories.appendChild(opt);
        });
        //Esdeveniment que crida la funció per mostra les subcategories de cada categoria
        categories.addEventListener("change", function() {
            mostraSubcategories(this.value) 
        }); 
        categories.dispatchEvent(new Event('change')); 
    })
    .catch ((error) => {
        console.log(error); 
    });

//Funció mostraSubcategories, que rep la id de la categoria i crea un formData
//per enviar per POST a getSubcategories.php i consultar a la base de dades les
//subcategories per cada id que rep
function mostraSubcategories(value) {
    let formData = new FormData();
    console.log(value);
    formData.append("cat", value);
    let options = {
        method: 'POST',
        body: formData
    }
    let subcategories = document.getElementById("subcategories");
    subcategories.innerHTML = "";
    fetch("getSubcategories.php", options)
    .then((response) => response.json())
    .then((data) => { 
        data.forEach(element => {
            let opt = document.createElement("option");
            opt.value = element.id;
            opt.text = element.nom;
            subcategories.appendChild(opt);
        });
    })
    .catch ((error) => {
        console.log(error); 
    });
}