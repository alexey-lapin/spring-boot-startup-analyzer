<template>
  <div class="container">
    <TabMenu :model="items" class="p-mb-4" />
    <router-view />
    <Toast />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TabMenu from "primevue/tabmenu";
import Toast from "primevue/toast";

@Options({
  components: {
    TabMenu,
    Toast,
  },
})
export default class App extends Vue {
  items = [
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
}
</script>

<style>
.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
