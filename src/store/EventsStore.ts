import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type DataNode from '@/model/DataNode'
import type Event from '@/model/Event'
import type ParseResult from '@/model/ParseResult'

export const useEventsStore = defineStore('events', () => {
  const events: Ref<Event[]> = ref([])
  const nodes = ref<DataNode[]>([])

  const isAnalyzed = computed(() => {
    return nodes.value.length > 0
  })

  const appName = computed(() => {
    if (isAnalyzed.value) {
      return nodes.value.find((item) => item.key === '0')?.data.tags[0]?.value
    }
    return null
  })

  const insertData = (data: ParseResult) => {
    events.value = data.events
    nodes.value = data.nodes
  }

  const clearData = () => {
    events.value = []
    nodes.value = []
  }

  return { events, nodes, isAnalyzed, appName, insertData, clearData }
})
