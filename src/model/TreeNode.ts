import Event from "@/model/Event";

export default interface TreeNode {
  key: number;
  data: Event;
  children: TreeNode[];
  leaf: boolean;
}
