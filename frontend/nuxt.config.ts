// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: [
    'maplibre-gl/dist/maplibre-gl.css'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/",
    },
  },

  // --- POCZĄTEK DODANEGO FRAGMENTU ---
  // Ta sekcja naprawia błąd 403 Forbidden, zezwalając serwerowi Vite
  // na bezpieczny dostęp do plików w folderze projektu.
  vite: {
    server: {
      fs: {
        allow: [
          '..'
        ]
      }
    }
  }
  // --- KONIEC DODANEGO FRAGMENTU ---
});