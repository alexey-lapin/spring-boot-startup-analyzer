<template>
  <TheHeader />
  <router-view />
  <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import TheHeader from '@/components/TheHeader.vue'
</script>
