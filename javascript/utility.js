const ERDRADIUS = 6378.88;
const RAD = 0.01745329251994;
const PI2 = 1.5707963267949; //Pi/2

function oeffneUnterseite(fileName) {
    window.location.href = "../html/" + fileName + ".html";
}

function datumUndUhrzeitAnzeigen() {
    date = new Date();
    let jahr = date.getFullYear();
    let monat = date.getMonth() + 1;
    let tag = date.getDate();

    let stunden = date.getHours();
    let minuten = date.getMinutes();
    let sekunden = date.getSeconds();
    if (minuten < 10) {
        minuten = "0" + minuten;
    }
    if (sekunden < 10) {
        sekunden = "0" + sekunden;
    }

    let datumsanzeige = document.getElementById('datum');
    datumsanzeige.innerHTML = tag + "."
        + monat + "."
        + jahr + " - "
        + stunden + ":"
        + minuten + ":"
        + sekunden;
    window.setTimeout("datumUndUhrzeitAnzeigen();", 1000);
}

//Berechnet die Strecke zwischen zwei Koordinaten (Longitude/Latitude)
//Dabei wird die Erde als Kugel angenommen, d.h. Bei großen Entfernungen wird das Ergebnis ungenau
function berechneStrecke() {

    //Hier werden die Punkte aus dem HTML geholt und in Radiant umgerechnet, da es sich bei Longitude und Latitude
    //um winkel handelt
    let lon1 = parseFloat(document.getElementById('longEins').value) * RAD;
    let lat1 = parseFloat(document.getElementById('latEins').value) * RAD;
    let lon2 = parseFloat(document.getElementById('longZwei').value) * RAD;
    let lat2 = parseFloat(document.getElementById('latZwei').value) * RAD;

    let strecke = Math.sin(lat1) * Math.sin(lat2) + Math.cos(Math.abs(lon1 - lon2)) * Math.cos(lat1) * Math.cos(lat2)
    strecke = (Math.atan(-strecke / Math.sqrt(-strecke * strecke + 1)) + PI2) * ERDRADIUS;

    document.getElementById('strecke').innerHTML = 'Strecke: ' + strecke.toFixed(2) + ' km';
}
