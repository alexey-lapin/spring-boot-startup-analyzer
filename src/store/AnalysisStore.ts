import { computed, ref } from 'vue'
import type DataNode from '@/model/DataNode'
import type Event from '@/model/Event'
import type ParseResult from '@/model/ParseResult'
import ParserFactory from '@/service/ParserFactory'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export type AnalysisStatus = 'idle' | 'loading' | 'ready' | 'error'
export type AnalysisViewMode = 'summary' | 'tree' | 'table'

type AnalysisSource =
  | { type: 'url'; details: { url: string; method: string } }
  | { type: 'file'; details: { name: string } }
  | { type: 'text' }
  | { type: 'sample' }


export const useAnalysisStore = defineStore('sbsa-analysis', () => {
  const toast = useToast()

  const status = ref<AnalysisStatus>('idle')
  const totalDuration = ref(0)
  const events = ref<Event[]>([])
  const nodes = ref<DataNode[]>([])
  const viewMode = ref<AnalysisViewMode>('summary')
  const source = ref<AnalysisSource | null>(null)
  const error = ref<string | null>(null)
  const springBootVersion = ref<string | null>(null)

  const hasData = computed(() => status.value === 'ready' && nodes.value.length > 0)
  const isLoading = computed(() => status.value === 'loading')

  const appName = computed(() => {
    if (!hasData.value) {
      return null
    }
    return nodes.value.find((item) => item.key === '0')?.data.tags[0]?.value ?? null
  })

  const summary = computed(() => ({
    totalSteps: events.value.length,
    totalDuration: totalDuration.value,
  }))

  const applyResult = (result: ParseResult): void => {
    totalDuration.value = result.totalDuration
    events.value = result.events
    nodes.value = result.nodes
    springBootVersion.value = result.springBootVersion ?? null
  }

  const resetData = (): void => {
    totalDuration.value = 0
    events.value = []
    nodes.value = []
    springBootVersion.value = null
  }

  const pushError = (message: string): void => {
    status.value = 'error'
    error.value = message
    toast.add({
      severity: 'error',
      summary: 'Failed to analyze data',
      detail: message,
      life: 4000,
    })
  }

  const runAnalysis = async (operation: () => Promise<ParseResult>, nextSource: AnalysisSource) => {
    status.value = 'loading'
    error.value = null

    try {
      const result = await operation()
      applyResult(result)
      source.value = nextSource
      status.value = 'ready'
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      pushError(message)
    }
  }

  const analyzeFromUrl = async ({
    url,
    method,
  }: {
    url: string
    method: string
  }): Promise<void> => {
    if (!url) {
      pushError('URL is required')
      return
    }

    await runAnalysis(
      async () => {
        const response = await fetch(url, { method })
        if (!response.ok) {
          throw new Error(`Request to ${response.url} returned ${response.status}`)
        }
        const payload = await response.text()
        const parser = ParserFactory.createParser(payload)
        return parser.parse(payload)
      },
      { type: 'url', details: { url, method } },
    )
  }

  const analyzeFromFile = async (file: File | null): Promise<void> => {
    if (!file) {
      pushError('Please provide a file to analyze')
      return
    }

    await runAnalysis(
      async () => {
        const payload = await file.text()
        const parser = ParserFactory.createParser(payload)
        return parser.parse(payload)
      },
      { type: 'file', details: { name: file.name } },
    )
  }

  const analyzeFromText = async (payload: string): Promise<void> => {
    if (!payload || payload.trim() === '') {
      pushError('Content is empty')
      return
    }

    await runAnalysis(async () => {
      const parser = ParserFactory.createParser(payload)
      return parser.parse(payload)
    }, { type: 'text' })
  }

  const analyzeSample = async (payload: string): Promise<void> => {
    await runAnalysis(async () => {
      const parser = ParserFactory.createParser(payload)
      return parser.parse(payload)
    }, { type: 'sample' })
  }

  const clear = (): void => {
    status.value = 'idle'
    error.value = null
    source.value = null
    viewMode.value = 'summary'
    resetData()
  }

  const setViewMode = (mode: AnalysisViewMode): void => {
    viewMode.value = mode
  }

  return {
    appName,
    analyzeFromFile,
    analyzeFromText,
    analyzeFromUrl,
    analyzeSample,
    clear,
    error,
    events,
    hasData,
    isLoading,
    nodes,
    setViewMode,
    source,
    springBootVersion,
    status,
    summary,
    totalDuration,
    viewMode,
  }
})
