// composables/useSchoolMap.ts
import maplibregl from 'maplibre-gl';
import type { School } from '~/types/school'; // Importujemy nasz nowy typ

// Wszystkie funkcje pomocnicze i dane zamykamy w tym jednym pliku.
// Nie eksportujemy ich, bo będą używane tylko tutaj.
const schools: School[] = [
    { name: "Technikum Elektroniczne w Warszawie", lat: 52.2298, lon: 21.0118, type: "Technikum", value: 100 },
    { name: "Liceum Ogólnokształcące w Krakowie", lat: 50.0614, lon: 19.9366, type: "Liceum", value: 45 },
    { name: "Zespół Szkół Zawodowych w Gdańsku", lat: 54.352, lon: 18.6466, type: "Zawodowka", value: 5 },
    { name: "Technikum Komunikacyjne", lat: 52.2298, lon: 21.0118, type: "Technikum", value: 70 },
];

const getColorForValue = (value: number): string => {
    const clampedValue = Math.max(0, Math.min(100, value));
    const red = clampedValue < 50 ? 255 : Math.round(255 - ((clampedValue - 50) * 5.1));
    const green = clampedValue > 50 ? 255 : Math.round(clampedValue * 5.1);
    return `rgb(${red},${green},0)`;
};

const getShapeSVG = (type: School['type']): string => {
    switch (type) {
        case "Technikum": return "<rect width='24' height='24' style='fill:currentColor;stroke:black;stroke-width:1;'/>";
        case "Liceum": return "<circle cx='12' cy='12' r='11' style='fill:currentColor;stroke:black;stroke-width:1;'/>";
        case "Zawodowka": return "<polygon points='12,2 22,22 2,22' style='fill:currentColor;stroke:black;stroke-width:1;'/>";
        default: return "<circle cx='12' cy='12' r='11' style='fill:currentColor;stroke:black;stroke-width:1;'/>";
    }
};

// Eksportujemy tylko jedną funkcję, która będzie naszą "usługą" mapy
export const useSchoolMap = () => {

    // Ta funkcja będzie odpowiedzialna za stworzenie mapy
    const initializeMap = (containerId: string) => {
        // Dodatkowe zabezpieczenie, aby kod nie próbował się wykonać po stronie serwera
        if (process.server) {
            return;
        }

        const map = new maplibregl.Map({
            container: containerId,
            style: "https://tiles.openfreemap.org/styles/liberty",
            center: [21.0118, 52.2298],
            zoom: 6,
            maxBounds: [[14.0, 49.0], [24.2, 55.0]],
        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        map.addControl(new maplibregl.FullscreenControl(), 'top-right');

        schools.forEach((school) => {
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
                .setPopup(new maplibregl.Popup({ offset: 25 })
                    .setHTML(`<h3>${school.name}</h3><p>Typ: ${school.type}<br>Wartość: ${school.value}</p>`)
                )
                .addTo(map);
        });
    };

    // Zwracamy tylko tę jedną funkcję
    return { initializeMap };
};