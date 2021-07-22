const Churches = [
    {
        "lat": 50.46139554755741, 
        "lng": 30.382982790470127,
        "name": `
<h1>УГКЦ Святого Йосафата</h1>

<h2>Розклад Богослужень</h2>

<h3>Понеділок-четвер</h3>
<ul>
    <li>8:00 Божественна літургія за здоров'я</li>
</ul>

<h3>П'ятниця</h3> 
<ul>
    <li>8:00 Божественна літургія за здоров'я</li>
    <li>18:30 Молитви на оздоровлення</li>
</ul>

<h3>Субота</h3>
<ul>
    <li>9:00 Божественна літургія за упокій</li>
    <li>10:00 Панахида</li>
    <li>10:30 1/3 - Lectio Divina, 2/4 - Матері в молитві</li>
    <li>18:00 Всеношня (Вечірня та Утреня)</li>
</ul>

<h3>Неділя</h3>
<ul>
    <li>9:00 Божественна літургія за здоров'я</li>
    <li>11:00 Божественна літургія для дітей</li>
</ul>
`
    }
];


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

    // show a marker on the map
    for(church of Churches) {
        L.marker([church.lat, church.lng]).bindPopup(church.name).addTo(map);
    }
}

