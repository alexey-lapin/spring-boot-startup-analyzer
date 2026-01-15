import DefaultParser from '@/service/DefaultParser'
import EpochParser from '@/service/EpochParser'
import type Parser from '@/service/Parser'

export default class ParserFactory {
  /**
   * Creates the appropriate parser based on the payload format.
   * Auto-detects whether the timestamps are in ISO8601 or epoch format.
   */
  static createParser(payloadString: string): Parser {
    try {
      const data = JSON.parse(payloadString)

      if (data?.timeline?.events && data.timeline.events.length > 0) {
        const firstEvent = data.timeline.events[0]

        if (firstEvent.startTime) {
          const startTime = firstEvent.startTime

          if (typeof startTime === 'string' && (startTime.includes('T') || startTime.includes('Z'))) {
            return new DefaultParser()
          }

          if (typeof startTime === 'number' || !isNaN(Number(startTime))) {
            return new EpochParser()
          }
        }
      }

      return new DefaultParser()
    } catch {
      return new DefaultParser()
    }
  }
}
