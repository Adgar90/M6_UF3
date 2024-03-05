// Variables
let buttonAdr = document.getElementById("findLoc");
let buttonCtr = document.getElementById("centerLoc");
let actualZoom = 12;
let map;
let marker;
let mapStyle;
//Fetch data styling wizard map
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        mapStyle = data;
    })
    .catch((error) => {
        console.log(error);
    })

async function initMap() {
    //Constant de prova per definir les coordenades el map & marker
    const myLatLng = { lat: 41.390205, lng: 2.154007 };
    //Importem la llibreria de Google Maps
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    
    //Inicialitzem el nostre mapa
    map = new Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: actualZoom,
        styles: mapStyle
    });
    marker = new google.maps.Marker({
        position: myLatLng,
        map,
    });
    let infowindow = new google.maps.InfoWindow({
        content: document.getElementById("adreca").value
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}
//Funció que amb el value de l'input 'adreca' renderitza el map a les coordenades adequades
function geocalitza() {
    //Variables
    let geocoder = new google.maps.Geocoder();
    let address = document.getElementById("adreca").value;
    geocoder.geocode( { 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            //Actualitzem els values dels inputs latitude i longitude
            actualitzaInputs(latitude, longitude);
            actualZoom = 16;
            //Inicialitzem la localització cridant la funció updatePositionMap
            updatePositionMap({lat: latitude, lng: longitude });
        } else {
            //Si l'status no és .OK mostra alert d'error
            alert('Direcció invàlida o no trobada');
        }
    });
}
//Funció per actualitzar els valors dels inputs lat & long
function actualitzaInputs(lat, long) {
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = long;
}
//Funció que actualitza la posició del mapa
function updatePositionMap(pos) {
    map.setCenter(pos);
    map.setZoom(actualZoom);
    marker = new google.maps.Marker({
        position: pos,
        map,
    });
}
//Funció que centra el mapa en les coordenades actuals en que en trobes
//i et mostra la teva localització
function centraMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            map.setZoom(20);

            marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: 'img/baby.png'
            });
        });
    }
}
//Esdeveniment que crida la funció geocalitza() onclick
buttonAdr.addEventListener("click", () => { geocalitza(); });
//Esdeveniment que crida la funció centraMap() onclick
buttonCtr.addEventListener("click", () => { centraMap(); });

//Iniciem en Barcelona
initMap();
