// composables/useSchools.ts

// Definiujemy typ dla pojedynczej szkoły dla lepszej kontroli
export interface School {
    name: string;
    lat: number;
    lon: number;
    type: 'Technikum' | 'Liceum' | 'Zawodowka'; // Używamy konkretnych typów
    value: number;
}

export const useSchools = () => {
    const schools: School[] = [
        {
            name: "Technikum Elektroniczne w Warszawie",
            lat: 52.2298,
            lon: 21.0118,
            type: "Technikum",
            value: 100,
        },
        {
            name: "Liceum Ogólnokształcące w Krakowie",
            lat: 50.0614,
            lon: 19.9366,
            type: "Liceum",
            value: 45,
        },
        {
            name: "Zespół Szkół Zawodowych w Gdańsku",
            lat: 54.352,
            lon: 18.6466,
            type: "Zawodowka",
            value: 5,
        },
        {
            name: "Technikum Komunikacyjne",
            lat: 52.2298,
            lon: 21.0118,
            type: "Technikum",
            value: 70,
        },
    ];

    return {
        schools
    };
};