// Creating map
let crime_map = L.map("crime-map", {
    center: [33.956174824512914,  -118.2116044755473],
    zoom: 11,
    minZoom: 9
});

// Setting tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(crime_map);