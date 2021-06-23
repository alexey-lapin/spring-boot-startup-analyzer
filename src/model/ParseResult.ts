import Event from "@/model/Event";
import TreeNode from "@/model/TreeNode";

export default interface ParseResult {
    events: Event[],
    nodes: TreeNode[],
}