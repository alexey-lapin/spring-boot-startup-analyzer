import Event from "@/model/Event";
import TreeNode from "@/model/TreeNode";

export default interface RootState {
  events: Event[];
  nodes: TreeNode[];
}
