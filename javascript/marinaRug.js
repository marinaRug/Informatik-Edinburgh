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

var slideIndex = 1;
zeigeBilder(slideIndex);

function naechstesBild(n) {
    zeigeBilder(slideIndex += n);
}

function aktuellesBild(n) {
    zeigeBilder(slideIndex = n);
}

function zeigeBilder(n) {
    let erstesBild = document.getElementById("erstesBild");
    erstesBild.style.display = "none";

    var i;
    var bilder = document.getElementsByClassName("bilder");
    var punkte = document.getElementsByClassName("punkt");
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

function showOSMKarte(ort) {
    var lon;
    var lat;
    var zoom;

    if (ort === 'castle') {
        lon = -3.200150;
        lat = 55.94869;
        zoom = 15
    }
    if (ort === 'holyrood') {
        lon = -3.17224;
        lat = 55.95284;
        zoom = 15
    }
    if (ort === 'greyfriarsBobby') {
        lon = -3.19259;
        lat = 55.94710;
        zoom = 15
    }
    if (ort === 'caltonHill') {
        lon = -3.18293;
        lat = 55.95516;
        zoom = 15
    }
    if (ort === 'startseite') {
        lon = -3.188267;
        lat = 55.953251;
        zoom = 9
    }

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: zoom
        })
    });

    var markerFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });

    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [markerFeature]
        })
    });
    map.addLayer(layer);
}

function showConfigurableOSMKarte() {

    window.onload = function () {

        var latitude;
        var longitude;
        var zoom;
        longitude = -3.188267;
        latitude = 55.953251;
        zoom = 9

        var map = new ol.Map({
            target: 'configurableMap',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([longitude, latitude]),
                zoom: zoom
            })
        });

        var markerFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude]))
        });

        var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [markerFeature]
            })
        });
        map.addLayer(layer);
        map.on('click', function(evt){
            var coordinates = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326').toString();
            var coordinatesArray = coordinates.split(",");
            var longitudeToBeDisplayed = parseFloat(coordinatesArray[0]).toFixed(6);
            var latitudeToBeDisplayed = parseFloat(coordinatesArray[1]).toFixed(6);

            document
                .getElementById('longitude')
                .innerHTML = 'Longitude: ' + longitudeToBeDisplayed.toString();

            document
                .getElementById('latitude')
                .innerHTML = 'Latitude: ' + latitudeToBeDisplayed.toString();
        });
    }
}
