// pages/map.vue
<script setup lang="ts">
import { onMounted } from 'vue';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useSchoolMap } from '~/composables/useSchoolMap';

// Nuxt automatycznie zaimportuje 'useSchoolMap'
const { initializeMap } = useSchoolMap();

// onMounted gwarantuje, że kod wykona się w przeglądarce, gdy element #map już istnieje
onMounted(() => {
    initializeMap('map'); // Przekazujemy ID naszego kontenera na mapę
});
</script>

<template>
    <div class="map-container">
        <h1>Mapa OpenStreetMap (MapLibre) - Szkoły</h1>
        <!-- Ten element jest celem dla naszej mapy -->
        <div id="map"></div>
    </div>
</template>

<style scoped>
.map-container {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
}

#map {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>