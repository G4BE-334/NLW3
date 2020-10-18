/* 
JS Data Types
String " "
Number 01
Object {}
Boolean: true or false
Array[]
*/
// Create map
const mymap = L.map("mapid").setView([-3.740693,-38.505193], 15);

// Create and add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mymap);

// Create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

function addMarker({name, id, lat, lng}) {   
    // Create popup overlay
    const  popup = L.popup({
        closeButton: false,
        classname: 'map-popup',
        minWidth: 240,
        minHeight: 240,
    }).setContent(`${name}<a href="orphanage?id=${id}"> <img src="/images/arrow-white.svg"> </a>`)

    // Create and add marker
    L.marker([lat, lng], {icon})
    .addTo(mymap)
    .bindPopup(popup)
}

const orphanagesSpan = document.querySelectorAll('.orphanages span')

orphanagesSpan.forEach(span => {
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    }

    addMarker(orphanage)
})

