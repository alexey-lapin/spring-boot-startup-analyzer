import { describe, expect, it } from 'vitest'
import DefaultParser from '@/service/DefaultParser'
import type EventDto from '@/model/dto/EventDto'
import type StartupDto from '@/model/dto/StartupDto'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

// Enable duration plugin
dayjs.extend(duration)

function createTimeline(eventsCallback: (startMoment: dayjs.Dayjs) => EventDto[]): StartupDto {
  const startMoment = dayjs().subtract(10, 'm')
  return {
    springBootVersion: '3.0.0',
    timeline: {
      startTime: startMoment.toString(),
      events: eventsCallback(startMoment),
    },
  } as StartupDto
}

describe('parser tests', () => {
  const parser = new DefaultParser()

  it('parses single event correctly', () => {
    const timeline = createTimeline((startMoment) => [
      {
        startTime: startMoment.add(10, 's').toString(),
        endTime: startMoment.add(11, 's').toString(),
        duration: dayjs.duration(1, 's').toISOString(),
        startupStep: {
          id: 1,
          parentId: null,
          name: 'step-1',
          tags: [{ key: 'k1', value: 'v1' }],
        },
      },
    ])

    const result = parser.parse(JSON.stringify(timeline))

    expect(result.totalDuration).equals(1000)
  })

  it('parses multiple events correctly', () => {
    const timeline = createTimeline((startMoment) => [
      {
        startTime: startMoment.add(10, 's').toString(),
        endTime: startMoment.add(15, 's').toString(),
        duration: dayjs.duration(5, 's').toISOString(),
        startupStep: {
          id: 1,
          parentId: null,
          name: 'step-1',
          tags: [],
        },
      },
      {
        startTime: startMoment.add(11, 's').toString(),
        endTime: startMoment.add(14, 's').toString(),
        duration: dayjs.duration(3, 's').toISOString(),
        startupStep: {
          id: 2,
          parentId: 1,
          name: 'step-2',
          tags: [],
        },
      },
      {
        startTime: startMoment.add(12, 's').toString(),
        endTime: startMoment.add(13, 's').toString(),
        duration: dayjs.duration(1, 's').toISOString(),
        startupStep: {
          id: 3,
          parentId: 2,
          name: 'step-3',
          tags: [],
        },
      },
      {
        startTime: startMoment.add(15, 's').toString(),
        endTime: startMoment.add(16, 's').toString(),
        duration: dayjs.duration(1, 's').toISOString(),
        startupStep: {
          id: 4,
          parentId: null,
          name: 'step-4',
          tags: [],
        },
      },
    ])

    const result = parser.parse(JSON.stringify(timeline))

    expect(result.totalDuration).equals(dayjs.duration(6, 's').asMilliseconds())
    expect(result.events.length).equals(4)
    expect(result.nodes.length).equals(2)
    const firstNode = result.nodes[0]
    expect(firstNode).toBeDefined()
    expect(firstNode!.key).equals('1')
    expect(firstNode!.leaf).equals(false)
    expect(firstNode!.data.id).equals(1)
    expect(firstNode!.data.parentId).equals(null)
    expect(firstNode!.data.name).equals('step-1')
    expect(firstNode!.data.summary).equals(dayjs.duration(5, 's').asMilliseconds())
    expect(firstNode!.data.duration).equals(dayjs.duration(2, 's').asMilliseconds())
    expect(firstNode!.data.percentage).toBeDefined()
    expect(firstNode!.data.startTime).toBeDefined()
    expect(firstNode!.data.endTime).toBeDefined()
    expect(firstNode!.data.tags).toBeDefined()
    expect(firstNode!.children.length).equals(1)
  })
})
