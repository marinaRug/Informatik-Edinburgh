let slideIndex = 1;
zeigeBild(slideIndex);

function naechstesBild(n) {
    zeigeBild(slideIndex += n);
}

function aktuellesBild(n) {
    zeigeBild(slideIndex = n);
}

function zeigeBild(n) {
    let erstesBild = document.getElementById("erstesBild");
    erstesBild.style.display = "none";

    let i;
    let bilder = document.getElementsByClassName("bilder");
    let punkte = document.getElementsByClassName("punkt");
    if (n > bilder.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = bilder.length
    }
    for (i = 0; i < bilder.length; i++) {
        bilder[i].style.display = "none";
    }
    for (i = 0; i < punkte.length; i++) {
        punkte[i].className = punkte[i].className.replace(" active", "");
    }
    bilder[slideIndex - 1].style.display = "block";
    punkte[slideIndex - 1].className += " active";
}
