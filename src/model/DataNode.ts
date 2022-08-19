import type Event from "@/model/Event";

export default interface DataNode {
  key: string;
  data: Event;
  children: DataNode[];
  leaf: boolean;
}
