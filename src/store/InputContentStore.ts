import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInputContentStore = defineStore('sbsa-input-content', () => {
  const inputContent = ref('')

  const loadSample = async (): Promise<string> => {
    const module = await import('@/assets/sample.json')
    const sample = module.default ?? module
    const serialized = JSON.stringify(sample, null, 2)
    inputContent.value = serialized
    return serialized
  }

  return { inputContent, loadSample }
})
