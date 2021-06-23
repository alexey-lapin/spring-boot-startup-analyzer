import moment from "moment";
import Event from "@/model/Event";
import EventDto from "@/model/EventDto";
import StartupDto from "@/model/StartupDto";
import TreeNode from "@/model/TreeNode";
import Parser from "./Parser";
import ParseResult from "@/model/ParseResult";

export default class DefaultParser implements Parser {
  parse(payloadString: string): ParseResult {
    const startupData = JSON.parse(payloadString) as StartupDto;

    const map = new Map<number, TreeNode>();

    const treeNodes = startupData.timeline.events
      .map((item) => this.convertNode(item))
      .map((item) => {
        map.set(item.key, item);
        return item;
      });

    const events: Event[] = [];
    treeNodes.forEach((item) => {
      events.push(item.data);
      const parentId = item.data.parentId;
      if (parentId !== undefined) {
        const parent = map.get(parentId);
        if (parent !== undefined) {
          parent.children.push(item);
          parent.data.duration -= item.data.summary;
          parent.leaf = false;
        }
      }
    });
    const nodes = treeNodes.filter((item) => item.data.parentId === null)

    return {events: events, nodes: nodes};
  }

  private convertNode(item: EventDto): TreeNode {
    const duration = moment.duration(item.duration).asMilliseconds();
    return {
      key: item.startupStep.id,
      data: {
        id: item.startupStep.id,
        parentId: item.startupStep.parentId,
        name: item.startupStep.name,
        summary: duration,
        duration: duration,
        startTime: new Date(item.startTime),
        endTime: new Date(item.endTime),
        tags: item.startupStep.tags,
      },
      children: [],
      leaf: true,
    };
  }
}
