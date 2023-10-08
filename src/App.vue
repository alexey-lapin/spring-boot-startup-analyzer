<template>
  <div class="container">
    <TheHeader class="mb-4" />
    <router-view/>
    <Toast/>
  </div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import TheHeader from "@/components/TheHeader.vue";
</script>

