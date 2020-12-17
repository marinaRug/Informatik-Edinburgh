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
    if (stunden < 10) {
        stunden = "0" + stunden;
    }
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
    //Damit der benutzer sowohl Kommas als auch Punkte eingeben kann werden Punkte durch Kommas ersetzt
    let lon1 = parseFloat(document.getElementById('longEins').value);
    let lat1 = parseFloat(document.getElementById('latEins').value);
    let lon2 = parseFloat(document.getElementById('longZwei').value);
    let lat2 = parseFloat(document.getElementById('latZwei').value);

    let LonARad = lon1 * RAD
    let LatARad = lat1 * RAD
    let LonBRad = lon2 * RAD
    let LatBRad = lat2 * RAD

    let strecke = Math.sin(LatARad) * Math.sin(LatBRad) + Math.cos(Math.abs(LonARad - LonBRad)) * Math.cos(LatARad) * Math.cos(LatBRad)
    strecke = (Math.atan(-strecke / Math.sqrt(-strecke * strecke + 1)) + PI2) * ERDRADIUS;

    if(isNaN(strecke)){
        strecke = 'Bitte kontrollieren Sie ihre Eingabe'
    }
    else {
        strecke = 'Strecke: ' + strecke.toFixed(2) + ' km';
    }
    document.getElementById('strecke').innerHTML = strecke;
}
