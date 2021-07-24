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
        for(item of items) {
            const latLngAndDescription = split(item, "\n", 1);
            if (latLngAndDescription.length == 2) { 
                const latLng = latLngAndDescription[0].split(',');
                if (latLng.length == 2) {
                    const description = latLngAndDescription[1];
                    L.marker(latLng).bindPopup(description).addTo(map);
                }
           }
        }
    }

    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", onDataLoaded);
    oReq.open("GET", "churches/Kyiv/churches.html");
    oReq.send();
}

