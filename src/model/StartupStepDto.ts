import TagDto from "./TagDto";

export default interface SturtupStepDto {
    id: number,
    parentId?: number,
    name: string,
    tags: TagDto[],
}