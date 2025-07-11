// assets/leafletContent.js
export default (locations) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Leaflet Map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link 
    rel="stylesheet" 
    href="https://unpkg.com/leaflet/dist/leaflet.css"
  />
  <style>
    body, html, #map { height: 100%; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([${locations[0].latitude}, ${locations[0].longitude}], 5); // initial center & zoom

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    ${locations.map(loc => `
      L.marker([${loc.latitude}, ${loc.longitude}])
        .addTo(map)
        .bindPopup("${loc.name}");
    `).join('')}
  </script>
</body>
</html>
`;
