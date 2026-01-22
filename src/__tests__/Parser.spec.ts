import { describe, expect, it } from 'vitest'
import DefaultParser from '@/service/DefaultParser'
import EpochParser from '@/service/EpochParser'
import ParserFactory from '@/service/ParserFactory'
import type StartupDto from '@/model/dto/StartupDto'

describe('Parser', () => {
  describe('DefaultParser (ISO8601)', () => {
    it('should parse ISO8601 timestamps correctly', () => {
      const parser = new DefaultParser()
      const data: StartupDto = {
        springBootVersion: '3.0.0',
        timeline: {
          startTime: '2023-10-06T19:36:56.928306Z',
          events: [
            {
              endTime: '2023-10-06T19:36:57.011537100Z',
              duration: 'PT0.0668144S',
              startTime: '2023-10-06T19:36:56.944722700Z',
              startupStep: {
                name: 'spring.boot.application.starting',
                id: 0,
                parentId: null,
                tags: [
                  {
                    key: 'mainApplicationClass',
                    value: 'com.github.alexeylapin.startupdemo.SpringStartupDemo',
                  },
                ],
              },
            },
          ],
        },
      }

      const result = parser.parse(JSON.stringify(data))

      expect(result.events).toHaveLength(1)
      expect(result.events[0]!.name).toBe('spring.boot.application.starting')
      expect(result.springBootVersion).toBe('3.0.0')
      expect(result.totalDuration).toBeGreaterThan(0)
    })
  })

  describe('EpochParser', () => {
    it('should parse epoch timestamps correctly', () => {
      const parser = new EpochParser()
      const data: StartupDto = {
        springBootVersion: '3.1.4',
        timeline: {
          startTime: '1696618616.928306',
          events: [
            {
              endTime: '1696618617.011537',
              duration: '0.066814',
              startTime: '1696618616.944722',
              startupStep: {
                name: 'spring.boot.application.starting',
                id: 0,
                parentId: null,
                tags: [
                  {
                    key: 'mainApplicationClass',
                    value: 'com.github.alexeylapin.startupdemo.SpringStartupDemo',
                  },
                ],
              },
            },
          ],
        },
      }

      const result = parser.parse(JSON.stringify(data))

      expect(result.events).toHaveLength(1)
      expect(result.events[0]!.name).toBe('spring.boot.application.starting')
      expect(result.events[0]!.duration).toBeCloseTo(66.814, 1)
      expect(result.springBootVersion).toBe('3.1.4')
      expect(result.totalDuration).toBeCloseTo(66.814, 1)
    })

    it('should handle Date objects correctly', () => {
      const parser = new EpochParser()
      const data: StartupDto = {
        springBootVersion: '3.1.4',
        timeline: {
          startTime: '1696618616.928306',
          events: [
            {
              endTime: '1696618617.011537',
              duration: '0.1',
              startTime: '1696618616.944722',
              startupStep: {
                name: 'test.step',
                id: 0,
                parentId: null,
                tags: [],
              },
            },
          ],
        },
      }

      const result = parser.parse(JSON.stringify(data))

      expect(result.events[0]!.startTime).toBeInstanceOf(Date)
      expect(result.events[0]!.endTime).toBeInstanceOf(Date)
      expect(result.events[0]!.startTime.getTime()).toBe(1696618616944)
      expect(result.events[0]!.endTime.getTime()).toBe(1696618617011)
    })

    it('should handle numeric epoch timestamps', () => {
      const parser = new EpochParser()
      const data = {
        springBootVersion: '3.1.4',
        timeline: {
          startTime: 1768490605.402159,
          events: [
            {
              endTime: 1768490605.59354721,
              duration: 0.191387578,
              startTime: 1768490605.402159632,
              startupStep: {
                name: 'spring.beans.smart-initialize',
                id: 1702,
                tags: [{ key: 'beanName', value: 'meterRegistryPostProcessor' }],
                parentId: 4,
              },
            },
            {
              endTime: 1768490605.593635694,
              duration: 0.000010641,
              startTime: 1768490605.593625053,
              startupStep: {
                name: 'spring.beans.smart-initialize',
                id: 1703,
                tags: [{ key: 'beanName', value: 'entityManagerFactory' }],
                parentId: 4,
              },
            },
          ],
        },
      }

      const result = parser.parse(JSON.stringify(data))

      expect(result.events).toHaveLength(2)
      expect(result.events[0]!.name).toBe('spring.beans.smart-initialize')
      expect(result.events[0]!.duration).toBeCloseTo(191.387578, 1)
      expect(result.events[1]!.duration).toBeCloseTo(0.010641, 3)
    })
  })

  describe('ParserFactory', () => {
    it('should auto-detect ISO8601 format and return DefaultParser', () => {
      const data = {
        timeline: {
          events: [
            {
              startTime: '2023-10-06T19:36:56.928306Z',
              endTime: '2023-10-06T19:36:57.011537100Z',
              duration: 'PT0.0668144S',
              startupStep: { id: 0, name: 'test', tags: [] },
            },
          ],
        },
      }

      const parser = ParserFactory.createParser(JSON.stringify(data))
      expect(parser).toBeInstanceOf(DefaultParser)
    })

    it('should auto-detect epoch format and return EpochParser', () => {
      const data = {
        timeline: {
          events: [
            {
              startTime: 1696618616.928306,
              endTime: 1696618617.011537,
              duration: 0.066814,
              startupStep: { id: 0, name: 'test', tags: [] },
            },
          ],
        },
      }

      const parser = ParserFactory.createParser(JSON.stringify(data))
      expect(parser).toBeInstanceOf(EpochParser)
    })

    it('should default to DefaultParser for invalid JSON', () => {
      const parser = ParserFactory.createParser('invalid json')
      expect(parser).toBeInstanceOf(DefaultParser)
    })

    it('should default to DefaultParser for empty events', () => {
      const data = {
        timeline: {
          events: [],
        },
      }

      const parser = ParserFactory.createParser(JSON.stringify(data))
      expect(parser).toBeInstanceOf(DefaultParser)
    })
  })
})
