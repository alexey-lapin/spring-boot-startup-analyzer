<template>
  <div v-if="!eventsStore.isAnalyzed" class="flex justify-content-center">
    <div class="w-6">
      <InputUrl />
      <Divider align="center" class="flex justify-content-center" type="solid">
        <p>or</p>
      </Divider>
      <div class="flex justify-content-center">
        <InputFile />
      </div>
      <Divider align="center" class="flex justify-content-center" type="solid">
        <p>or</p>
      </Divider>
      <InputContent />
    </div>
  </div>

  <div v-if="eventsStore.isAnalyzed">
    <div class="mt-2">
      <KeepAlive>
        <Component :is="analyzerViewStore.activeComponent" />
      </KeepAlive>
    </div>
  </div>

  <ScrollTop />
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
import ScrollTop from "primevue/scrolltop";

import InputContent from "@/components/InputContent.vue";
import InputFile from "@/components/InputFile.vue";
import InputUrl from "@/components/InputUrl.vue";
import { useEventsStore } from "@/store/EventsStore";
import { useAnalyzerViewStore } from "@/store/AnalyzerViewStore";

const eventsStore = useEventsStore();
const analyzerViewStore = useAnalyzerViewStore();
</script>
