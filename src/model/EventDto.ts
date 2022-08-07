import StartupStepDto from "./StartupStepDto";

export default interface EventDto {
  startTime: string;
  endTime: string;
  duration: string;
  startupStep: StartupStepDto;
}
