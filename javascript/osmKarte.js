const ERDRADIUS = 6378.88;
const RAD = 0.01745329251994;
const PI2 = 1.5707963267949; //Pi/2

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


function showClickableOSMKarte() {

    window.onload = function () {

        var latitude;
        var longitude;
        var zoom;
        longitude = -3.188267;
        latitude = 55.953251;
        zoom = 9

        var map = new ol.Map({
            target: 'clickableMap',
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
        map.on('click', function (evt) {
            var coordinates = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326').toString();
            var coordinatesArray = coordinates.split(",");
            var longitudeToBeDisplayed = parseFloat(coordinatesArray[0]).toFixed(6);
            var latitudeToBeDisplayed = parseFloat(coordinatesArray[1]).toFixed(6);

            document
                .getElementById('longitude')
                .innerHTML = longitudeToBeDisplayed.toString();

            document
                .getElementById('latitude')
                .innerHTML = latitudeToBeDisplayed.toString();

        });
    }
}

function punktAuswaehlen(nummer) {

    var longitude;
    var latitude;

    longitude = parseFloat(document.getElementById('longitude').innerHTML);
    latitude = parseFloat(document.getElementById('latitude').innerHTML);

    if (nummer === 1) {
        document.getElementById('longEins').value = longitude;
        document.getElementById('latEins').value = latitude;
    }
    if (nummer === 2) {
        document.getElementById('longZwei').value = longitude;
        document.getElementById('latZwei').value = latitude;
    }
}

function berechneStrecke() {
    //Berechnet die Strecke zwischen zwei Koordinaten (Longitude/Latitude)
    //Dabei wird die Erde als Kugel angenommen, d.h. Bei großen Entfernungen wird das Ergebnis ungenau
    lon1 = parseFloat(document.getElementById('longEins').value);
    lat1 = parseFloat(document.getElementById('latEins').value);
    lon2 = parseFloat(document.getElementById('longZwei').value);
    lat2 = parseFloat(document.getElementById('latZwei').value);

    //Berechnung der Longitude und Latitude in Radiant
    LonARad = lon1 * RAD
    LatARad = lat1 * RAD
    LonBRad = lon2 * RAD
    LatBRad = lat2 * RAD

    strecke = Math.sin(LatARad) * Math.sin(LatBRad) + Math.cos(Math.abs(LonARad - LonBRad)) * Math.cos(LatARad) * Math.cos(LatBRad)
    strecke = (Math.atan(-strecke / Math.sqrt(-strecke * strecke + 1)) + PI2) * ERDRADIUS;

    document.getElementById('strecke').innerHTML = 'Strecke: ' + parseFloat(strecke).toFixed(2) + ' km';
}
