import moment from 'moment'
import type Event from '@/model/Event'
import type EventDto from '@/model/dto/EventDto'
import type StartupDto from '@/model/dto/StartupDto'
import type DataNode from '@/model/DataNode'
import type ParseResult from '@/model/ParseResult'
import type Parser from '@/service/Parser'

export default class DefaultParser implements Parser {
  parse(payloadString: string): ParseResult {
    const startupData = JSON.parse(payloadString) as StartupDto

    const map = new Map<string, DataNode>()

    let totalDuration = 0

    const treeNodes = startupData.timeline.events
      .map((item) => this.convertNode(item))
      .map((item) => {
        map.set(item.key, item)
        if (item.data.parentId === null) {
          totalDuration += item.data.summary
        }
        return item
      })

    const events: Event[] = []
    treeNodes.forEach((item) => {
      events.push(item.data)
      item.data.percentage = Number(((item.data.duration / totalDuration) * 100).toFixed(1))
      const parentId = item.data.parentId
      if (parentId !== null) {
        const parent = map.get(String(parentId))
        if (parent !== undefined) {
          parent.children.push(item)
          parent.data.duration -= item.data.summary
          parent.leaf = false
        }
      }
    })
    const nodes = treeNodes.filter((item) => item.data.parentId === null)

    return { totalDuration: totalDuration, events: events, nodes: nodes }
  }

  private convertNode(item: EventDto): DataNode {
    const duration = moment.duration(item.duration).asMilliseconds()
    return {
      key: String(item.startupStep.id),
      data: {
        id: item.startupStep.id,
        parentId: item.startupStep.parentId ?? null,
        name: item.startupStep.name,
        summary: duration,
        duration: duration,
        percentage: 0,
        startTime: new Date(item.startTime),
        endTime: new Date(item.endTime),
        tags: item.startupStep.tags
      },
      children: [],
      leaf: true
    }
  }
}
