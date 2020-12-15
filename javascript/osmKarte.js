const EdinburghLong = -3.188267;
const EdinburghLat = 55.953251;

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
        createClickEventOnOSMMap(map);
    }
}

function punktAuswaehlen(nummer) {


    let longitude = parseFloat(document.getElementById('longitude').innerHTML);
    let latitude = parseFloat(document.getElementById('latitude').innerHTML);

    if (nummer === 1) {
        document.getElementById('longEins').value = longitude;
        document.getElementById('latEins').value = latitude;
    }
    if (nummer === 2) {
        document.getElementById('longZwei').value = longitude;
        document.getElementById('latZwei').value = latitude;
    }
}

function initializeMapVariables(ort) {

    //Je nachdem, auf welcher Seite man sich befindet wird ein anderer Punkt auf der Karte markiert

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

    //Hier wird die eigentliche Karte mit den entsprechenden Variablen (Long, Lat, Zoom) erstellt

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

function createClickEventOnOSMMap(map) {

    //Hier wird das Klickevent auf der Karte erstell, damit können Longitude und Latitude auf der Seite angezeigt werden

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
