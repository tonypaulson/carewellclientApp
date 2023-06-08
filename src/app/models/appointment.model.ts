import { AppointmentStatus } from '../enums/appointment-status-enum';
import { Service } from './service.model';

import { Patient } from './patient.model';
import { Staff } from './staff.model';
import { DurationModel } from './duration.model';

export class AppointmentModel {
    id: number;
    staffId: number;
    staff: Staff;
    patientId: number;
    patient: Patient;
    serviceId: number;
    service: Service;
    bookedDate: number;
    bookedDate_dateFormated: Date;
    startDate: Date;
    // endDate: Date;
    // startTime: string;
    startAtDate: Date;
    startAt: number;
    endAt: number;
    selected_durationId: string;
    status: AppointmentStatus;
    notes: string;
    updatedDate: Date;
    createdDate: Date;
    patientSearchText: string;
    isTeleMeeting: boolean;
    jWTToken: string;
    durationId: number;
    duration: DurationModel;
    currencyUnitSymbol: string;
}