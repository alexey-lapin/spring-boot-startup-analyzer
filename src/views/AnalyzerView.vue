<template>
  <div class="py-6 space-y-6">
    <div
      v-if="!hasData"
      class="max-w-6xl mx-auto bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl p-6 space-y-6 shadow-sm"
    >
      <header class="space-y-2">
        <div class="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 class="text-2xl font-semibold">Choose how you want to analyze</h1>
            <p class="text-sm text-surface-500 dark:text-surface-400">
              Work entirely in the browser—no data ever leaves your machine.
            </p>
          </div>
        </div>
      </header>

      <div class="grid gap-4 lg:grid-cols-3">
        <article
          class="lg:col-span-2 rounded-lg border border-surface-200 dark:border-surface-700 p-4 space-y-4 bg-surface-50 dark:bg-surface-800/40"
        >
          <div class="space-y-1">
            <div
              class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              <i class="pi pi-globe"></i>
              Endpoint
            </div>
            <h2 class="text-lg font-semibold">Analyze an actuator URL</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">
              Supports GET or POST to capture live startup traces.
            </p>
          </div>
          <InputUrl />
        </article>

        <article
          class="rounded-lg border border-surface-200 dark:border-surface-700 p-4 space-y-4 bg-surface-50 dark:bg-surface-800/40 flex flex-col justify-between"
        >
          <div class="space-y-1">
            <div
              class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              <i class="pi pi-file"></i>
              File
            </div>
            <h2 class="text-lg font-semibold">Upload a saved response</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">
              Drop the JSON you exported from <code class="text-nowrap">/actuator/startup</code>.
            </p>
          </div>
          <InputFile />
        </article>

        <article
          class="rounded-lg border border-surface-200 dark:border-surface-700 p-4 space-y-4 bg-surface-50 dark:bg-surface-800/40 lg:col-span-2"
        >
          <div class="space-y-1">
            <div
              class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              <i class="pi pi-clipboard"></i>
              Paste
            </div>
            <h2 class="text-lg font-semibold">Paste raw JSON</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">
              Handy when copying directly from the actuator response body.
            </p>
          </div>
          <InputContent />
        </article>

        <article
          class="rounded-lg border border-dashed border-surface-300 p-4 space-y-4 dark:border-surface-600 bg-surface-0/60 dark:bg-surface-800/40"
        >
          <div class="space-y-1">
            <div
              class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              <i class="pi pi-code"></i>
              Sample
            </div>
            <h2 class="text-lg font-semibold">Just browsing?</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">
              Load the bundled sample trace to see the experience instantly.
            </p>
          </div>
          <Button
            :loading="isLoading"
            label="Load Sample"
            icon="pi pi-database"
            size="small"
            severity="secondary"
            outlined
            @click="handleLoadSample"
          />
        </article>
      </div>
    </div>

    <div
      v-if="hasData"
      class="bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl p-6 shadow-sm"
    >
      <div v-if="status === 'loading'">
        <div class="flex flex-col items-center justify-center h-64 gap-3 text-center">
          <ProgressSpinner stroke-width="4" />
          <div>
            <p class="font-semibold">Analyzing startup events…</p>
            <p class="text-sm text-surface-500 dark:text-surface-400">
              This may take a few seconds.
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="status === 'error'">
        <div class="space-y-4">
          <div>
            <h2 class="text-xl font-semibold mb-2">Something went wrong</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">{{ error }}</p>
          </div>
          <div class="flex gap-2">
            <Button
              label="Try Again"
              icon="pi pi-replay"
              severity="secondary"
              @click="analysisStore.clear()"
            />
          </div>
        </div>
      </div>
      <div v-else-if="hasData">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 class="text-2xl font-semibold">{{ appName ?? 'Unknown application' }}</h2>
              <p class="text-sm text-surface-500 dark:text-surface-400">
                {{ springBootVersion ? 'Spring Boot ' + springBootVersion + ' · ' : ''
                }}{{ summary.totalSteps }} steps · {{ formattedDuration }} total duration
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <Button
                label="Clear"
                icon="pi pi-trash"
                severity="secondary"
                text
                @click="analysisStore.clear()"
              />
              <SelectButton
                v-model="viewModeLocal"
                :options="viewOptions"
                option-label="label"
                option-value="value"
                :allow-empty="false"
                @update:modelValue="analysisStore.setViewMode($event)"
              />
            </div>
          </div>
          <KeepAlive>
            <component
              :is="visualizationComponent"
              v-bind="visualizationProps"
            />
          </KeepAlive>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-col items-start gap-3">
          <h2 class="text-xl font-semibold">Waiting for data</h2>
          <p class="text-sm text-surface-500 dark:text-surface-400">
            Kick off an analysis using any method above. Once data is available you can explore the
            summary, tree, or table views.
          </p>
        </div>
      </div>
    </div>

    <ScrollTop />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AnalysisSummary from '@/components/AnalysisSummary.vue'
import AnalysisTable from '@/components/AnalysisTable.vue'
import AnalysisTree from '@/components/AnalysisTree.vue'
import Button from 'primevue/button'
import InputContent from '@/components/InputContent.vue'
import InputFile from '@/components/InputFile.vue'
import InputUrl from '@/components/InputUrl.vue'
import ProgressSpinner from 'primevue/progressspinner'
import ScrollTop from 'primevue/scrolltop'
import SelectButton from 'primevue/selectbutton'
import { storeToRefs } from 'pinia'
import { useAnalysisStore } from '@/store/AnalysisStore'
import { useInputContentStore } from '@/store/InputContentStore'

const analysisStore = useAnalysisStore()
const inputContentStore = useInputContentStore()
const {
  status,
  hasData,
  viewMode,
  events,
  nodes,
  totalDuration,
  appName,
  error,
  summary,
  isLoading,
  springBootVersion,
} = storeToRefs(analysisStore)

const componentLookup = {
  summary: AnalysisSummary,
  tree: AnalysisTree,
  table: AnalysisTable,
}

const visualizationComponent = computed(() => componentLookup[viewMode.value])

const visualizationProps = computed(() => {
  if (viewMode.value === 'summary') {
    return {
      events: events.value,
      nodes: nodes.value,
      totalDuration: totalDuration.value,
    }
  }
  if (viewMode.value === 'tree') {
    return {
      events: events.value,
      nodes: nodes.value,
    }
  }
  return {
    events: events.value,
  }
})

const viewOptions = [
  { label: 'Summary', value: 'summary' },
  { label: 'Tree', value: 'tree' },
  { label: 'Table', value: 'table' },
]

const viewModeLocal = ref(viewMode.value)

const formattedDuration = computed(
  () => `${totalDuration.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ms`,
)

const handleLoadSample = async () => {
  const content = await inputContentStore.loadSample()
  await analysisStore.analyzeSample(content)
}

watch(
  () => viewMode.value,
  (next) => {
    viewModeLocal.value = next
  },
)
</script>
