import type EventDto from "./EventDto";

export default interface TimelineDto {
  startTime: string;
  events: EventDto[];
}
