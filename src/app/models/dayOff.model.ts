import { Day } from '../enums/day.enum';
import { TimeHelperModel } from './time-helper-model';

export class DayOffModel {
    day: string;
    markAsWorking: boolean;
    workingTimes: WorkingTime[];
}

export class WorkingTime {
    selectedStartTime: TimeHelperModel;
    selectedEndTime: TimeHelperModel;
    startTime: TimeHelperModel[];
    endTime: TimeHelperModel[];
}