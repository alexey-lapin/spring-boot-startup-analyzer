import type Event from "@/model/Event";
import type DataNode from "@/model/DataNode";

export default interface ParseResult {
  totalDuration: number;
  events: Event[];
  nodes: DataNode[];
}
