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

    document.write("<b class='datum'>" + tag + "." + monat + "." + jahr + " - " + stunden + ":" + minuten + ":" + sekunden + ":  " + "</b>");
}
