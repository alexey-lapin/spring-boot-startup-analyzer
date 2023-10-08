import { defineStore } from 'pinia'
import { markRaw, ref } from 'vue'
import AnalysisTree from '@/components/AnalysisTree.vue'
import AnalysisSummary from '@/components/AnalysisSummary.vue'
import AnalysisTable from '@/components/AnalysisTable.vue'

const lookup = {
  AnalysisSummary,
  AnalysisTree,
  AnalysisTable
}

type LookupKey = keyof typeof lookup

export const useAnalyzerViewStore = defineStore('sbsa-analyzer-view', () => {
  const activeComponent = ref(markRaw(AnalysisTree))

  const switchComponent = (name: string): void => {
    const lookupElement = lookup[name as LookupKey]
    activeComponent.value = markRaw(lookupElement)
  }

  return { activeComponent, switchComponent }
})
