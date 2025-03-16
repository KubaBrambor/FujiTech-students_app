<script setup lang="ts">
import { useApi } from "../composables/useApi";
import { onMounted, watch, watchEffect } from "vue";

interface BackendResponse {
  message: string;
}

const { data, error, pending } = useApi<BackendResponse>("/users");
</script>

<template>
  <div>
    <h1>Test połączenia z backendem</h1>
    <div v-if="pending">Ładowanie...</div>
    <div v-else-if="error">Błąd: {{ error }}</div>
    <div v-else>
      <p>Odpowiedź z backendu: {{ data?.message }}</p>
    </div>
  </div>
  <div>
    <h1>Tu masz przejscie do mapy \/</h1>
    <NuxtLink to="/map">Przejdź do mapy</NuxtLink>
  </div>
</template>

