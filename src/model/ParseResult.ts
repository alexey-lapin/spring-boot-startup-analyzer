import type DataNode from '@/model/DataNode'
import type Event from '@/model/Event'

export default interface ParseResult {
  totalDuration: number
  events: Event[]
  nodes: DataNode[]
  springBootVersion?: string | null
}
