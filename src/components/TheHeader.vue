<template>
  <Toolbar>
    <template #start>
      <div class="flex gap-1">
        <router-link to="/">
          <Button label="Analyzer" icon="pi pi-search" plain text />
        </router-link>
        <router-link to="/usage">
          <Button label="Usage" icon="pi pi-book" plain text />
        </router-link>
        <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer" target="_blank">
          <Button plain text>
            <div class="flex align-items-center gap-2">
              <i class="pi pi-github" />
              <span>Github</span>
              <i class="pi pi-external-link" />
            </div>
          </Button>
        </a>
      </div>
    </template>
    <template #end>
      <div v-if="eventsStore.isAnalyzed" class="flex align-items-center gap-1">
        <Button severity="success" text>
          <span>{{ getAppInfo() }}: </span>
          <b>{{ getAppDuration() }}</b></Button
        >
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

const getAppInfo = (): string => {
  return eventsStore.appName ?? ''
}
const getAppDuration = (): string => {
  return (
    eventsStore.totalDuration.toLocaleString(undefined, {
      maximumFractionDigits: 3
    }) + 'ms'
  )
}

const onViewChange = (event: DropdownChangeEvent) => {
  if (event.value) {
    analyzerViewStore.switchComponent(event.value)
  }
}
</script>
