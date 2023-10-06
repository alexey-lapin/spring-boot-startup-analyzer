import type TagDto from './TagDto'

export default interface StartupStepDto {
  id: number
  parentId: number | null
  name: string
  tags: TagDto[]
}
