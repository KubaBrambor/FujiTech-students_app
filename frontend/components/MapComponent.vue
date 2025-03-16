<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L from 'leaflet';

// Referencja do kontenera mapy
const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value).setView([52.2298, 21.0122], 13); // Warszawa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([52.2298, 21.0122])
      .addTo(map)
      .bindPopup('Cześć! Tu jest OpenStreetMap w Vue & Nuxt!')
      .openPopup();
  }
});
</script>

<template>
  <div ref="mapContainer" class="map"></div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>
