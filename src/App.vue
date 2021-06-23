<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
  <Toast />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Toast from "primevue/toast";

@Options({
  components: {
    Toast,
  },
})
export default class App extends Vue {}
</script>

<style></style>
