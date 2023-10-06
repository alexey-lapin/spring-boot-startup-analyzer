<template>
  <Textarea v-model="text" rows="10" class="w-full" style="resize: none" />
  <div class="mt-3 flex justify-content-center">
    <SplitButton label="Analyze Text" icon="pi pi-file" :model="items" @click="readContent()" />
  </div>
</template>

<script setup lang="ts">
import SplitButton from 'primevue/splitbutton'
import Textarea from 'primevue/textarea'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

import DefaultParser from '@/service/DefaultParser'
import { useEventsStore } from '@/store/EventsStore'
import sample from '@/assets/sample.json'

const toast = useToast()
const eventsStore = useEventsStore()
const parser = new DefaultParser()

const text = ref('')

const items = [
  {
    label: 'Load Sample',
    icon: 'pi pi-th-large',
    command: () => loadSample()
  }
]

const readContent = (): void => {
  if (text.value === '') {
    pushToast('content is empty')
    return
  }
  try {
    const parseResult = parser.parse(text.value)
    eventsStore.insertData(parseResult)
  } catch (error) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }
    pushToast(message)
  }
}

const loadSample = (): void => {
  text.value = JSON.stringify(sample, null, 2)
}

const pushToast = (message: string): void => {
  toast.add({
    severity: 'error',
    summary: 'Failed to analyze data',
    detail: message,
    life: 3000
  })
}
</script>
