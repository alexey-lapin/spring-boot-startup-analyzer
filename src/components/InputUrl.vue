<template>
  <div class="flex gap-2">
    <Dropdown v-model="method" :options="methods" optionValue="name" optionLabel="name">
      <template #option="slotProps">
        <div class="flex gap-2 align-items-center">
          <span>{{ slotProps.option.name }}</span>
          <i class="pi pi-question-circle" v-tooltip="slotProps.option.tooltip" />
        </div>
      </template>
    </Dropdown>
    <InputText class="w-full" v-model="url" placeholder="actuator endpoint url" />
  </div>
  <div class="mt-3 flex justify-content-center">
    <Button label="Analyze URL" icon="pi pi-link" @click="readContent()" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'

import DefaultParser from '@/service/DefaultParser'
import { useEventsStore } from '@/store/EventsStore'

const toast = useToast()
const eventsStore = useEventsStore()
const parser = new DefaultParser()

const url = ref('http://localhost:8080/actuator/startup')
const method = ref('GET')

const methods = [
  { name: 'GET', tooltip: 'Retrieves a snapshot of the Application Startup Steps' },
  { name: 'POST', tooltip: 'Drains the Application Startup Steps' }
]

const readContent = () => {
  fetch(url.value, {
    method: method.value
  })
    .then((response) => {
      if (response.ok) {
        return response.text()
      } else {
        throw Error(`request to ${response.url} returned ${response.status} status`)
      }
    })
    .then((data) => {
      return parser.parse(data)
    })
    .then((data) => eventsStore.insertData(data))
    .catch((error) =>
      toast.add({
        severity: 'error',
        summary: 'Failed to analyze data',
        detail: error,
        life: 3000
      })
    )
}
</script>
