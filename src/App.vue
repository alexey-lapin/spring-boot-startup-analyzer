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

<style>
.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
