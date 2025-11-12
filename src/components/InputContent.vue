<template>
  <Textarea
    v-model="inputContentStore.inputContent"
    rows="8"
    class="w-full"
    style="resize: none"
    placeholder="Paste /actuator/startup JSON payload"
  />
  <Button
    :loading="isLoading"
    label="Analyze JSON"
    icon="pi pi-code"
    @click="submit"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { storeToRefs } from 'pinia'
import { useAnalysisStore } from '@/store/AnalysisStore'
import { useInputContentStore } from '@/store/InputContentStore'

const inputContentStore = useInputContentStore()
const analysisStore = useAnalysisStore()
const { isLoading } = storeToRefs(analysisStore)

const submit = (): void => {
  analysisStore.analyzeFromText(inputContentStore.inputContent)
}
</script>
