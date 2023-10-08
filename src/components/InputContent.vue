<template>
  <Textarea
    v-model="inputContentStore.inputContent"
    rows="10"
    class="w-full"
    style="resize: none"
  />
  <div class="mt-3 flex justify-content-center">
    <Button label="Analyze Json" icon="pi pi-file" @click="readContent()" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { useToast } from 'primevue/usetoast'

import DefaultParser from '@/service/DefaultParser'
import { useEventsStore } from '@/store/EventsStore'
import { useInputContentStore } from '@/store/InputContentStore'

const toast = useToast()
const eventsStore = useEventsStore()
const inputContentStore = useInputContentStore()

const parser = new DefaultParser()

const readContent = (): void => {
  if (inputContentStore.inputContent === '') {
    pushToast('content is empty')
    return
  }
  try {
    const parseResult = parser.parse(inputContentStore.inputContent)
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

const pushToast = (message: string): void => {
  toast.add({
    severity: 'error',
    summary: 'Failed to analyze data',
    detail: message,
    life: 3000
  })
}
</script>
