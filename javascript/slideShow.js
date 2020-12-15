let slideIndex = 1;

//Öffnet das vorherige oder nächste Bild, je nachdem welcher Button geklickt wurde
function naechstesBild(n) {
    zeigeBild(slideIndex += n);
}

//Öffnet bei klick auf einen der drei Punkte unter dem Bild das jeweilige Bild
function zeigeBildZuGegebenemPunktIndex(n) {
    zeigeBild(slideIndex = n);
}

//Sucht das richtige Bild raus und markiert den richtigen Punkt unter den Bildern
function zeigeBild(n) {
    //Das erste Bild wird nur beim laden der Seite angezeigt, bei wechsel der Bilder wird
    //der style display des ersten Bildes auf none gesetzt.
    let erstesBild = document.getElementById("erstesBild");
    erstesBild.style.display = "none";

    let i;
    let bilder = document.getElementsByClassName("bilder");
    let punkte = document.getElementsByClassName("punkt");
    if (n > bilder.length) {
        slideIndex = 1
    }

    //Hier wird gecheckt, ob das Bild das erste/letzte in der Reihe ist
    if (n < 1) {
        slideIndex = bilder.length
    }
    for (i = 0; i < bilder.length; i++) {
        bilder[i].style.display = "none";
    }

    for (i = 0; i < punkte.length; i++) {
        punkte[i].className = punkte[i].className.replace(" active", "");
    }
    //Das entsprechende Bild wird angezeigt und der Punkt dazu wird dunkel gefärbt
    bilder[slideIndex - 1].style.display = "block";
    punkte[slideIndex - 1].className += " active";
}
