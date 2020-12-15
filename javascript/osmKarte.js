const ERDRADIUS = 6378.88;
const RAD = 0.01745329251994;
const PI2 = 1.5707963267949; //Pi/2
const EdinburghLong = -3.188267;
const EdinburghLat = 55.953251;

function initializeMapVariables(ort) {

    if (ort === 'castle') {
        return {zoom: 15, coordinate: {longitude: -3.200150, latitude: 55.94869}};
    }
    if (ort === 'holyrood') {
        return {zoom: 15, coordinate: {longitude: -3.17224, latitude: 55.95284}};
    }
    if (ort === 'greyfriarsBobby') {
        return {zoom: 15, coordinate: {longitude: -3.19259, latitude: 55.94710}};
    }
    if (ort === 'caltonHill') {
        return {zoom: 15, coordinate: {longitude: -3.18293, latitude: 55.95516}};
    }
    return {zoom: 9, coordinate: {longitude: EdinburghLong, latitude: EdinburghLat}};
}

function createMap(mapVariables, target) {
    let longitude = mapVariables['coordinate']['longitude'];
    let latitude = mapVariables['coordinate']['latitude'];
    let zoom = mapVariables['zoom'];

    let map = new ol.Map({
        target: target,
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

    let markerFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude]))
    });

    let layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [markerFeature]
        })
    });
    map.addLayer(layer);
    return map;
}

function showOSMKarte(place) {
    let mapVariables = initializeMapVariables(place);

    createMap(mapVariables, 'map');
}


function showClickableOSMKarte() {

    window.onload = () => {

        let mapVariables = {
            zoom: 9,
            coordinate: {longitude: EdinburghLong, latitude: EdinburghLat}
        };

        let map = createMap(mapVariables, 'clickableMap');
        map.on('click', evt => {
            let coordinates = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326').toString();
            let coordinatesArray = coordinates.split(",");
            let longitudeToBeDisplayed = parseFloat(coordinatesArray[0]).toFixed(6);
            let latitudeToBeDisplayed = parseFloat(coordinatesArray[1]).toFixed(6);

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

    let longitude;
    let latitude;

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
    let lon1 = parseFloat(document.getElementById('longEins').value);
    let lat1 = parseFloat(document.getElementById('latEins').value);
    let lon2 = parseFloat(document.getElementById('longZwei').value);
    let lat2 = parseFloat(document.getElementById('latZwei').value);u

    //Berechnung der Longitude und Latitude in Radiant
    let LonARad = lon1 * RAD
    let LatARad = lat1 * RAD
    let LonBRad = lon2 * RAD
    let LatBRad = lat2 * RAD

    let strecke = Math.sin(LatARad) * Math.sin(LatBRad) + Math.cos(Math.abs(LonARad - LonBRad)) * Math.cos(LatARad) * Math.cos(LatBRad)
    strecke = (Math.atan(-strecke / Math.sqrt(-strecke * strecke + 1)) + PI2) * ERDRADIUS;

    document.getElementById('strecke').innerHTML = 'Strecke: ' + strecke.toFixed(2) + ' km';
}
