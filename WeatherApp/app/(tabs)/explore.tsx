import { StyleSheet } from "react-native";

import WebView from "react-native-webview";

export default function TabTwoScreen() {
  const htmlContent_for_map = `
<!DOCTYPE html>
<html>
<head>
  <title>Leaflet Map</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link 
    rel="stylesheet" 
    href="https://unpkg.com/leaflet/dist/leaflet.css" 
  />
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
</head>
<body style="margin:0; padding:0;">
  <div id="map" style="width:100vw; height:100vh;"></div>
  <script>
    var map = L.map('map').setView([48.8667, 2.3333], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Optionally add markers:
    // L.marker([11.3, 5.3]).addTo(map).bindPopup('Here!');
  </script>
</body>
</html>
`;

  return (
    <WebView
      source={{ html: htmlContent_for_map }}
      javaScriptEnabled={true}
      domStorageEnabled={true} /* automaticallyAdjustContentInsets={false}*/
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  map: {
    width: "400",
    height: "500",
  },
});
