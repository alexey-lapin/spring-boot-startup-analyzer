<template>
  <FileUpload
    mode="basic"
    chooseLabel="Analyze File"
    accept="application/json"
    :auto="true"
    :custom-upload="true"
    @uploader="uploader"
  />
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'

import DefaultParser from '@/service/DefaultParser'
import { useEventsStore } from '@/store/EventsStore'

const toast = useToast()
const eventsStore = useEventsStore()
const parser = new DefaultParser()

const uploader = (event: FileUploadUploaderEvent): void => {
  Array.isArray(event.files) ? readContent(event.files[0]) : readContent(event.files)
}

const readContent = (file: File): void => {
  const reader: FileReader = new FileReader()
  reader.onload = (event: ProgressEvent<FileReader>) => {
    try {
      const data = parser.parse(event.target?.result as string)
      eventsStore.insertData(data)
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
  reader.readAsText(file)
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
