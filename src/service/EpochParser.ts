import type DataNode from '@/model/DataNode'
import type Event from '@/model/Event'
import type EventDto from '@/model/dto/EventDto'
import type ParseResult from '@/model/ParseResult'
import type Parser from '@/service/Parser'
import type StartupDto from '@/model/dto/StartupDto'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

// Enable duration plugin for dayjs
dayjs.extend(duration)

export default class EpochParser implements Parser {
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

    return {
      totalDuration: totalDuration,
      events: events,
      nodes: nodes,
      springBootVersion: startupData.springBootVersion ?? null,
    }
  }

  private convertNode(item: EventDto): DataNode {
    const startTimeSeconds = Number(item.startTime)
    const endTimeSeconds = Number(item.endTime)
    const durationSeconds = Number(item.duration)

    const startTimeMs = startTimeSeconds * 1000
    const endTimeMs = endTimeSeconds * 1000
    const durationMs = durationSeconds * 1000

    return {
      key: String(item.startupStep.id),
      data: {
        id: item.startupStep.id,
        parentId: item.startupStep.parentId ?? null,
        name: item.startupStep.name,
        summary: durationMs,
        duration: durationMs,
        percentage: 0,
        startTime: new Date(startTimeMs),
        endTime: new Date(endTimeMs),
        tags: item.startupStep.tags,
      },
      children: [],
      leaf: true,
    }
  }
}
