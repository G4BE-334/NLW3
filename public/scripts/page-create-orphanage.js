// Create map
const mymap = L.map("mapid").setView([-3.740693,-38.505193], 15);

// Create and add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mymap);

// Create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

// Create and add marker
mymap.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

// Remove all icons
    marker && mymap.removeLayer(marker) // && here means to verify the existence of the marker

// Add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(mymap)
})

// Add photo field
function addPhotoField() {
    // Take the photos container
    const container = document.querySelector('#images')

    // Take the duplication container
    const fieldContainer = document.querySelectorAll('.new-upload')

    // Clone the last uploaded picture
    const newFieldContainer = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // Verify if the field is empty
    const isEmpty = newFieldContainer.children[0]
    if (isEmpty.value == "") {
        return  // Stop the execution of the code
    }
    
    // Clear the field before adding new pictures
    newFieldContainer.children[0].value = ""

    // Add the clone to the photos container
    container.appendChild(newFieldContainer);
}

// Function delete field
function deleteField(event) {
    const span = event.currentTarget

    const fieldContainer = document.querySelectorAll('.new-upload')

    if (fieldContainer.length <= 1) {
        // Clean the field
        span.parentNode.children[0].value = ""
        return
    }

    // Delete the field
    span.parentNode.remove();
}

// YES/NO selection
function toggleSelect(event) {
    // Remove active class
    document.querySelectorAll('.button-select button').forEach((button) => { button.classList.remove('active')})

    // Get the clicked button
    const button = event.currentTarget

    // Give active class
    button.classList.add('active')

    // Update the hidden input with the selected value
    const input = document.querySelector('[name="open-on-weekends"]')

    // Verify Yes or No
    input.value = button.dataset.value;
}

function validate(event) {
    // Verify if lat and lng are filled
    const needsLatandLng = true;

    if (needsLatandLng) {
    event.preventDefault()
    alert("Selecione um ponto no mapa")
    }
}