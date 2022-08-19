import type Event from "@/model/Event";
import type DataNode from "@/model/DataNode";

export default interface RootState {
  events: Event[];
  nodes: DataNode[];
}
