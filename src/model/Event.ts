import Tag from "./Tag";

export default interface Event {
  id: number;
  parentId?: number;
  name: string;
  summary: number;
  duration: number;
  percentage: number;
  startTime: Date;
  endTime: Date;
  tags: Tag[];
}
