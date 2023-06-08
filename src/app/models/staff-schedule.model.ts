import { DayOffModel } from "./dayOff.model";

export class StaffScheduleModel {
  staffId: number;
  staffSettingsId: number;
  schedules: DayOffModel[];
}
