<script setup lang="ts">
import { onMounted } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const schools = [
  { name: 'Liceum Ogólnokształcące w Warszawie', lat: 52.2298, lon: 21.0118, value: 0.1 },
  { name: 'Technikum w Krakowie', lat: 50.0614, lon: 19.9366, value: 0.4 },
  { name: 'Zespół Szkół w Gdańsku', lat: 54.352, lon: 18.6466, value: 0.75 }
];

const getMarkerColor = (value: number) => {
  if (value <= 0.2) return 'red';
  if (value <= 0.5) return 'orange';
  if (value <= 0.86) return 'yellow';
  return 'green';
};

onMounted(() => {
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=abmn79oKJ4AUDOofUSpi', // Zamień na własny klucz MapTiler
    center: [21.0118, 52.2298],
    zoom: 7,
    maxBounds: [
      [14.0, 49.0], // Południowo-zachodni narożnik Polski
      [24.2, 55.0]  // Północno-wschodni narożnik Polski
    ]
  });

  map.addControl(new maplibregl.NavigationControl());

  schools.forEach(school => {
    const el = document.createElement('div');
    el.className = `custom-marker ${getMarkerColor(school.value)}`;
    
    new maplibregl.Marker(el)
      .setLngLat([school.lon, school.lat])
      .setPopup(new maplibregl.Popup().setText(school.name))
      .addTo(map);
  });
});
</script>

<template>
  <div class="map-container">
    <h1>Mapa OpenStreetMap (MapLibre)</h1>
    <div id="map"></div>
  </div>
</template>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#map {
  width: 90vw;
  max-width: 600px;
  height: 50vh;
  max-height: 500px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.custom-marker {
  width: 32px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid black;
}

.red {
  background-color: red;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}

@media (max-width: 768px) {
  #map {
    width: 95vw;
    height: 60vh;
  }
}
</style>
