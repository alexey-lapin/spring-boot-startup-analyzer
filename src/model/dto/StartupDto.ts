import type TimelineDto from './TimelineDto'

export default interface StartupDto {
  springBootVersion: string
  timeline: TimelineDto
}
