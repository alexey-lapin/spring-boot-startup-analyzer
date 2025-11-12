<template>
  <div class="flex flex-wrap items-center gap-2">
    <Select
      v-model="method"
      :options="methods"
      option-value="name"
      option-label="name"
      class="w-28"
    >
      <template #option="slotProps">
        <div class="flex gap-2 items-center">
          <span>{{ slotProps.option.name }}</span>
          <i
            v-tooltip="slotProps.option.tooltip"
            class="pi pi-question-circle"
          />
        </div>
      </template>
    </Select>
    <InputText
      v-model="url"
      class="flex-1 min-w-[200px]"
      placeholder="actuator endpoint url"
    />
  </div>
  <Button
    :loading="isLoading"
    label="Analyze URL"
    icon="pi pi-link"
    @click="submit"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAnalysisStore } from '@/store/AnalysisStore'

const analysisStore = useAnalysisStore()
const { isLoading } = storeToRefs(analysisStore)

const url = ref('http://localhost:8080/actuator/startup')
const method = ref('GET')

const methods = [
  { name: 'GET', tooltip: 'Retrieves a snapshot of the Application Startup Steps' },
  { name: 'POST', tooltip: 'Drains the Application Startup Steps' },
]

const submit = () => {
  analysisStore.analyzeFromUrl({ url: url.value, method: method.value })
}
</script>
