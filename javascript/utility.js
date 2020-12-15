function oeffneUnterseite(fileName) {
    window.location.href = "../html/" + fileName + ".html";
}

function datumUndUhrzeitAnzeigen() {
    date = new Date();
    jahr = date.getFullYear();
    monat = date.getMonth() + 1;
    tag = date.getDate();

    stunden = date.getHours();
    minuten = date.getMinutes();
    sekunden = date.getSeconds();
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
