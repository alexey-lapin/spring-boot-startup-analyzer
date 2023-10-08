<template>
  <Toolbar>
    <template #start>
      <div class="flex gap-1">
        <router-link to="/">
          <Button label="Analyzer" plain icon="pi pi-search" text />
        </router-link>
        <router-link to="/usage">
          <Button label="Usage" plain icon="pi pi-book" text />
        </router-link>
        <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer" target="_blank">
          <Button label="Github" plain icon="pi pi-github" text />
        </a>
      </div>
    </template>
    <template #end>
      <div v-if="eventsStore.isAnalyzed" class="flex align-items-center">
        <Button :label="eventsStore.appName ?? ''" severity="success" text />
        <Button icon="pi pi-trash" severity="danger" text @click="eventsStore.clearData()" />
        <Dropdown
          v-model="activeAnalysisComponentName"
          :options="options"
          optionLabel="label"
          optionValue="value"
          class="w-8rem"
          @change="onViewChange"
        />
      </div>
      <div v-else>
        <Button label="Load Sample Json" plain text @click="inputContentStore.loadSample()" />
      </div>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import type { DropdownChangeEvent } from 'primevue/dropdown'

import { useEventsStore } from '@/store/EventsStore'
import { useAnalyzerViewStore } from '@/store/AnalyzerViewStore'
import { useInputContentStore } from '@/store/InputContentStore'

const router = useRouter()
const route = useRoute()

const eventsStore = useEventsStore()
const analyzerViewStore = useAnalyzerViewStore()
const inputContentStore = useInputContentStore()

const activeAnalysisComponentName = ref('AnalysisTree')
const options = ref([
  { label: 'Tree', value: 'AnalysisTree' },
  { label: 'Table', value: 'AnalysisTable' }
])

const onViewChange = (event: DropdownChangeEvent) => {
  if (event.value) {
    analyzerViewStore.switchComponent(event.value)
  }
}
</script>
