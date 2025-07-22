// types/school.ts
export interface School {
    name: string;
    lat: number;
    lon: number;
    type: 'Technikum' | 'Liceum' | 'Zawodowka';
    value: number;
}