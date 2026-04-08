import { Platform } from 'react-native';
import type { DispensaryWithInventory } from '@kannaai/shared';

interface WebMapProps {
  dispensaries: DispensaryWithInventory[];
  centerLat?: number;
  centerLng?: number;
}

// For web: render an iframe with Leaflet map
// For native: will use react-native-maps later
export function WebMap({ dispensaries, centerLat = 34.0522, centerLng = -118.2437 }: WebMapProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  const markers = dispensaries.map(d => ({
    lat: d.latitude,
    lng: d.longitude,
    name: d.name,
    address: d.address,
    distance: d.distance,
    isVerified: d.isVerified,
    stockCount: d.inventory?.filter(i => i.inStock).length || 0,
  }));

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a1a; }
    #map { width: 100%; height: 100vh; }
    .leaflet-popup-content-wrapper {
      background: #1a1a2e;
      color: white;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .leaflet-popup-tip { background: #1a1a2e; }
    .popup-name { font-weight: bold; font-size: 14px; margin-bottom: 4px; }
    .popup-address { color: #8a8aa3; font-size: 12px; margin-bottom: 4px; }
    .popup-stock { color: #2ecc71; font-size: 12px; }
    .popup-verified { color: #2ecc71; font-size: 11px; }
    .leaflet-tile-pane { filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7); }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = L.map('map').setView([${centerLat}, ${centerLng}], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const icon = L.divIcon({
      html: '<div style="background:#2ecc71;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #0a0a1a;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:16px;">🌿</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      className: ''
    });

    const markers = ${JSON.stringify(markers)};
    markers.forEach(m => {
      L.marker([m.lat, m.lng], { icon })
        .addTo(map)
        .bindPopup(
          '<div class="popup-name">' + m.name + (m.isVerified ? ' ✓' : '') + '</div>' +
          '<div class="popup-address">' + (m.distance ? m.distance + ' mi · ' : '') + m.address + '</div>' +
          '<div class="popup-stock">● ' + m.stockCount + ' strains in stock</div>'
        );
    });

    // Add user location marker
    L.circleMarker([${centerLat}, ${centerLng}], {
      radius: 8, fillColor: '#4285F4', fillOpacity: 1,
      color: 'white', weight: 2
    }).addTo(map).bindPopup('You are here');
  </script>
</body>
</html>`;

  return (
    <iframe
      srcDoc={html}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Dispensary Map"
    />
  );
}
