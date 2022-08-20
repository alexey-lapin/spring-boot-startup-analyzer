<template>
  <div class="container">
    <TabMenu :model="items" class="mb-4" />
    <router-view />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import TabMenu from "primevue/tabmenu";
import Toast from "primevue/toast";

const items = [
  { label: "Analyzer", icon: "pi bi-search", to: "/" },
  {
    label: "Usage",
    icon: "pi bi-journal-text",
    to: "/usage",
  },
  {
    label: "GitHub",
    icon: "pi bi-github",
    url: "https://github.com/alexey-lapin/spring-boot-startup-analyzer",
  },
];
</script>

<style>
.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
