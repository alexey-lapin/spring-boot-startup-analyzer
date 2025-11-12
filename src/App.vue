<template>
  <TheHeader />
  <router-view />
  <Toast />
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import Toast from 'primevue/toast'
</script>
