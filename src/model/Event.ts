import type Tag from "./Tag";

export default interface Event {
  id: number;
  parentId: number | null;
  name: string;
  summary: number;
  duration: number;
  percentage: number;
  startTime: Date;
  endTime: Date;
  tags: Tag[];
}
