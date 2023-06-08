import { AppointmentStatus } from '../enums/appointment-status-enum';

export class AppointmentStatusUpdateModel {
    id: number; // appointment Id
    status: AppointmentStatus;
}