import { User } from '../core/models/user.model';

export class AppointmentInputModel {
    id: number;
    patient: number;
    service: number;
    staff: number;
    duration: number;
    telemeeting: boolean;
    startAt: number;
    notes: string;
    guest: User;
    hostName: string;
}