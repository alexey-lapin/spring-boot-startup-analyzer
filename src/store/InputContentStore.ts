import {defineStore} from 'pinia'
import {ref} from 'vue'
import sample from '@/assets/sample.json'

export const useInputContentStore = defineStore('sbsa-input-content', () => {
    const inputContent = ref("")

    const loadSample = (): void => {
        inputContent.value = JSON.stringify(sample, null, 2)
    }

    return {inputContent, loadSample}
})
