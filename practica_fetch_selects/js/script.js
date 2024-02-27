let categories = document.getElementById("categories");
fetch("getCategories.php")
    .then((response) => response.json())
    .then((data) => { 
        data.forEach(categoria => {
            let opt = document.createElement("option");
            opt.value = categoria.id;
            opt.text = categoria.nom;
            categories.appendChild(opt);
        });
        
        categories.addEventListener("change", function() { 
            mostraSubcategories(this.value) 
        }); 
        categories.dispatchEvent(new Event('change')); 
    })
    .catch ((error) => {
        console.log(error); 
    });


function mostraSubcategories(value) {
    let formData = new FormData();
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