// pages/map.vue
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useApiFetcher } from "~/composables/useFetch";
import type { School } from "~/types/rspo";

// Initialize composable with reactive state
const { institutions, isLoading, error, fetchInstitutions } = useApiFetcher();
const map = ref(null);
const schools = ref<School[]>([]);

// Fetch data when component mounts
onMounted(async () => {
  await fetchInstitutions("/placowki/", {
    method: "GET",
    params: {
      page: 30,
    }, 
  });
  console.log("Data fetched:", institutions.value?.length || 0, "institutions");
});

// Process data when it becomes available
watch(institutions, (newInstitutions) => {
  if (newInstitutions && newInstitutions.length > 0) {
    console.log("Processing", newInstitutions.length, "institutions");
    
    // Map the institutions to schools format
    schools.value = newInstitutions.map((school) => {
      return {
        name: school.nazwa,
        type: school.typ.nazwa,
        lat: school.geolokalizacja.latitude,
        lon: school.geolokalizacja.longitude,
        value: Math.floor(Math.random() * 100),
      };
    });
    // Initialize map after data is processed
    initializeMap();
  }
}, { deep: true });

// Color generation based on value
const getColorForValue = (value: number): string => {
    // Ensure value stays within 0-100 for calculation if needed
    const clampedValue = Math.max(0, Math.min(100, value));
    const red = clampedValue < 50 ? 255 : Math.round(255 - ((clampedValue - 50) * 5.1));
    const green = clampedValue > 50 ? 255 : Math.round(clampedValue * 5.1);
    return `rgb(${red},${green},0)`;
};

// SVG shape generation based on school type
const getShapeSVG = (type: string): string => {
    // Using currentColor allows the SVG fill to inherit the color set via CSS
    switch (type) {
        case "Technikum":
            return "<rect width='24' height='24' style='fill:currentColor;stroke:black;stroke-width:1;'/>"; 
        case "Liceum":
            return "<circle cx='12' cy='12' r='11' style='fill:currentColor;stroke:black;stroke-width:1;'/>";
        case "Zawodowka":
            return "<polygon points='12,2 22,22 2,22' style='fill:currentColor;stroke:black;stroke-width:1;'/>";
        default:
            return "<circle cx='12' cy='12' r='11' style='fill:currentColor;stroke:black;stroke-width:1;'/>";
    }
};

// Move map initialization to a separate function that's called after data is processed
const initializeMap = () => {
  if (map.value) return; // Avoid initializing twice
  
  console.log("Initializing map with", schools.value.length, "schools");
  
  map.value = new maplibregl.Map({
    container: "map",
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: [21.0118, 52.2298],
    zoom: 7,
    maxBounds: [
      [14.0, 49.0],
      [24.2, 55.0],
    ],
  });
  
  map.value.addControl(new maplibregl.NavigationControl(), 'top-right');
  map.value.addControl(new maplibregl.FullscreenControl(), 'top-right');
  
  // Wait for the map to load before adding markers
  map.value.on('load', () => {
    schools.value.forEach((school) => {
      // Create SVG marker (from original file)
      const el = document.createElement("div");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.innerHTML = getShapeSVG(school.type);
      el.appendChild(svg);
      el.style.color = getColorForValue(school.value);
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.cursor = 'pointer';
      el.title = school.name;
      
      new maplibregl.Marker({ element: el })
        .setLngLat([school.lon, school.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(`<h3>${school.name}</h3><p>Typ: ${school.type}<br>Wartość: ${school.value}</p>`)
        )
        .addTo(map.value);
    });
  });
};
</script>

<template>
  <div class="map-container">
    <h1>Mapa OpenStreetMap (MapLibre) - Szkoły</h1>
    <div v-if="isLoading" class="status-message loading">Ładowanie danych...</div>
    <div v-else-if="error" class="status-message error">Błąd: {{ error.message }}</div>
    <div v-else-if="schools.length === 0" class="status-message">Brak szkół do wyświetlenia</div>
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

.status-message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.loading {
  background-color: #e3f2fd;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

@media (max-width: 768px) {
  #map {
    width: 95vw;
    height: 60vh;
  }
}
</style>