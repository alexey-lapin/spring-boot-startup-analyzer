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
    <span class="p-buttonset">
      <Button :label="eventsStore.appName ?? ''" class="p-button-text" />
      <Button
        icon="pi pi-trash"
        class="p-button-text p-button-danger"
        @click="eventsStore.clearData()"
      />
    </span>
    <Button
      label="Tree"
      class="ml-2 mr-1"
      :class="getTabButtonClass('AnalysisTree')"
      @click="switchTab('AnalysisTree')"
    />
    <Button
      label="Table"
      :class="getTabButtonClass('AnalysisTable')"
      @click="switchTab('AnalysisTable')"
    />
    <div class="mt-2">
      <KeepAlive>
        <Component :is="activeTabComponent" />
      </KeepAlive>
    </div>
  </div>

  <ScrollTop />
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
import ScrollTop from "primevue/scrolltop";
import AnalysisTable from "@/components/AnalysisTable.vue";
import AnalysisTree from "@/components/AnalysisTree.vue";
import AnalysisSummary from "@/components/AnalysisSummary.vue";
import InputContent from "@/components/InputContent.vue";
import InputFile from "@/components/InputFile.vue";
import InputUrl from "@/components/InputUrl.vue";
import { useEventsStore } from "@/store/EventsStore";
import { markRaw, ref } from "vue";

const eventsStore = useEventsStore();

const activeTabComponent = ref(markRaw(AnalysisTree));
const activeTabName = ref("AnalysisTree");

const lookup = {
  AnalysisSummary,
  AnalysisTree,
  AnalysisTable,
};

type LookupKey = keyof typeof lookup;

function switchTab(name: string): void {
  const lookupElement = lookup[name as LookupKey];
  activeTabComponent.value = markRaw(lookupElement);
  activeTabName.value = name;
}

function getTabButtonClass(name: string): string {
  return name === activeTabName.value ? "" : "p-button-outlined";
}
</script>
