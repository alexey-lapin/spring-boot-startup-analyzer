<template>
  <FileUpload
    mode="basic"
    choose-label="Analyze File"
    choose-icon="pi pi-upload"
    accept="application/json"
    :auto="true"
    :custom-upload="true"
    :disabled="isLoading"
    @uploader="uploader"
  />
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import { storeToRefs } from 'pinia'
import { useAnalysisStore } from '@/store/AnalysisStore'

const analysisStore = useAnalysisStore()
const { isLoading } = storeToRefs(analysisStore)

const uploader = (event: FileUploadUploaderEvent): void => {
  const file = Array.isArray(event.files) ? event.files[0] : event.files
  if (file) {
    analysisStore.analyzeFromFile(file)
  }
}
</script>
