function split(str, separator, limit) {
if (limit==0) return [str];
var a = str.split(separator, limit);
if(a.length == limit) {
let s = a.join(separator) + separator;
a.push( str.substr(s.length) );
return a;
}else{
return [str];
}
}

function init() {
    // initialize Leaflet
    var map = L.map('map').setView([50.4614919,30.3828357], 20);

    map.on('click', (event) => {
        console.log(event.latlng);
    });

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(map);

    function onDataLoaded() {
        const items = this.responseText.split("<hr>");
        // show a marker on the map
        var avgLat = null;
        var avgLng = null;
        for(item of items) {
            const latLngAndDescription = split(item, "\n", 1);
            if (latLngAndDescription.length == 2) { 
                const latLng = latLngAndDescription[0].split(',');
                if (latLng.length == 2) {
                    const description = latLngAndDescription[1];
                    L.marker(latLng).bindPopup(description).addTo(map);
                    if (avgLat == null) {
                        avgLat = latLng[0];
                    } else {
                        avgLat = (avgLat + latLng[0]) / 2;
                    }
                    if (avgLng == null) {
                        avgLng = latLng[1];
                    } else {
                        avgLng = (avgLng + latLng[1]) / 2;
                    }
                }
           }
        }
        map.setView([avgLat, avgLng], 20)
    }

    function openGeoObjects(link) {
        const path = `geo-data/${link}`;
        console.log(`openGeoObjects, path = ${path}`);
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", onDataLoaded);
        oReq.open("GET", path);
        oReq.send();
    }

    openGeoObjects(OBJECTS["Церкви Києва"]);

    new Vue({
        "el": '#geo-data',
        "data": {
            "objects": OBJECTS
        },
        "methods": {
            "selected": function(event) {
                var link = event.srcElement.value;
                openGeoObjects(link);
            }
        }
    });
}
