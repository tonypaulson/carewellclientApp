import { TimeHelperModel } from "./time-helper-model";

export class BusinessHourModel {
  day: string;
  markAsWorking: boolean;
  workingTime: WorkingTime;

  constructor() {
    this.workingTime = new WorkingTime();
  }
}

export class WorkingTime {
  selectedStartTime: TimeHelperModel;
  selectedEndTime: TimeHelperModel;
  startTime: TimeHelperModel[];
  endTime: TimeHelperModel[];
}
