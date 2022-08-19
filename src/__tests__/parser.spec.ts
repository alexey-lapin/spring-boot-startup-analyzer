import moment from "moment";
import { describe, expect, it } from "vitest";

import DefaultParser from "@/service/DefaultParser";
import type StartupDto from "@/model/dto/StartupDto";
import type EventDto from "@/model/dto/EventDto";

function createTimeline(
  eventsCallback: (startMoment: moment.Moment) => EventDto[]
): StartupDto {
  const startMoment = moment().subtract(10, "m");
  return {
    timeline: {
      startTime: startMoment.toString(),
      events: eventsCallback(startMoment),
    },
  } as StartupDto;
}

describe("parser tests", () => {
  const parser = new DefaultParser();

  it("parses single event correctly", () => {
    const timeline = createTimeline((startMoment) => [
      {
        startTime: startMoment.add(10, "s").toString(),
        endTime: startMoment.add(11, "s").toString(),
        duration: moment.duration(1, "s").toISOString(),
        startupStep: {
          id: 1,
          parentId: null,
          name: "step-1",
          tags: [{ key: "k1", value: "v1" }],
        },
      },
    ]);

    const result = parser.parse(JSON.stringify(timeline));

    expect(result.totalDuration).equals(1000);
  });

  it("parses multiple events correctly", () => {
    const timeline = createTimeline((startMoment) => [
      {
        startTime: startMoment.add(10, "s").toString(),
        endTime: startMoment.add(15, "s").toString(),
        duration: moment.duration(5, "s").toISOString(),
        startupStep: {
          id: 1,
          parentId: null,
          name: "step-1",
          tags: [],
        },
      },
      {
        startTime: startMoment.add(11, "s").toString(),
        endTime: startMoment.add(14, "s").toString(),
        duration: moment.duration(3, "s").toISOString(),
        startupStep: {
          id: 2,
          parentId: 1,
          name: "step-2",
          tags: [],
        },
      },
      {
        startTime: startMoment.add(12, "s").toString(),
        endTime: startMoment.add(13, "s").toString(),
        duration: moment.duration(1, "s").toISOString(),
        startupStep: {
          id: 3,
          parentId: 2,
          name: "step-3",
          tags: [],
        },
      },
      {
        startTime: startMoment.add(15, "s").toString(),
        endTime: startMoment.add(16, "s").toString(),
        duration: moment.duration(1, "s").toISOString(),
        startupStep: {
          id: 4,
          parentId: null,
          name: "step-4",
          tags: [],
        },
      },
    ]);

    const result = parser.parse(JSON.stringify(timeline));

    expect(result.totalDuration).equals(
      moment.duration(6, "s").asMilliseconds()
    );
    expect(result.events.length).equals(4);
    expect(result.nodes.length).equals(2);
    expect(result.nodes[0].key).equals("1");
    expect(result.nodes[0].leaf).equals(false);
    expect(result.nodes[0].data.id).equals(1);
    expect(result.nodes[0].data.parentId).equals(null);
    expect(result.nodes[0].data.name).equals("step-1");
    expect(result.nodes[0].data.summary).equals(
      moment.duration(5, "s").asMilliseconds()
    );
    expect(result.nodes[0].data.duration).equals(
      moment.duration(2, "s").asMilliseconds()
    );
    expect(result.nodes[0].data.percentage).toBeDefined();
    expect(result.nodes[0].data.startTime).toBeDefined();
    expect(result.nodes[0].data.endTime).toBeDefined();
    expect(result.nodes[0].data.tags).toBeDefined();
    expect(result.nodes[0].children.length).equals(1);
  });
});
