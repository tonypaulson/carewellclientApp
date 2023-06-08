import { HttpBaseService } from '../core/services/httpbase.service';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../core/services/app-config.service';
import { Patient } from '../models/patient.model';
import { Response } from '../core/contracts/Response';
import { AppointmentModel } from '../models/appointment.model';
import { AppointmentRequestForCalenderModel } from '../models/appointment-request-for-calender.model';
import { AppointmentInputModel } from '../models/appointment-input.model';
import { from, Observable } from "rxjs";
import { TenantSettingsService } from './tenant-settings.service';
import { AppointmentStatusUpdateModel } from '../models/appointment-status-update.model';

@Injectable()
export class AppointmentService extends HttpBaseService {
    private baseUrl = '';

    constructor(
        private tenantSettingsService: TenantSettingsService,
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.carewell;
    }

    addAppointment(appointment: AppointmentInputModel, skip: boolean = true): Observable<Response> {
        const url = `${this.baseUrl}/appointment`;
        const config = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        if (!skip) {
            return this.httpClient.post(url, appointment).pipe(map(this.extractData), catchError(this.handleError));
        }
        else {
            return from(this.tenantSettingsService.getTenantInfobySubDomain()).pipe(
                mergeMap(_tenant_response => this.httpClient
                    .post(url, appointment, { headers: { skip: "true" } }).pipe(map(this.extractData), catchError(this.handleError))));
        }

        // return this.httpClient.post(url, appointment).pipe(
        //     map(this.extractData),
        //     catchError(this.handleError));
    }

    getAppointment(StaffId = null, patientId = null): Observable<Response> {
        StaffId = StaffId === null ? 0 : StaffId;
        patientId = patientId === null ? 0 : patientId;

        const url = `${this.baseUrl}/appointment/getByFieldValue/${StaffId}/${patientId}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getAppointmentStatusCount(StaffId = null, patientId = null): Observable<Response> {
        StaffId = StaffId === null ? 0 : StaffId;
        patientId = patientId === null ? 0 : patientId;
        const url = `${this.baseUrl}/appointment/getAppointmentStatusCounts/${StaffId}/${patientId}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getAppointmentsByMonthWeekDay(appointmentRequestForCalenderModel: AppointmentRequestForCalenderModel): Observable<Response> {
        const url = `${this.baseUrl}/appointment/GetAppointmentsByMonthWeekDay`;
        return this.httpClient.post(url, appointmentRequestForCalenderModel).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getPatientsPastAppointment(patientId = null): Observable<Response> {
        const offset = (new Date()).getTimezoneOffset();
        const url = `${this.baseUrl}/patient/${patientId}/appointments/past?offset=${offset}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getPatientsUpcommingAppointment(patientId = null): Observable<Response> {
        const offset = (new Date()).getTimezoneOffset();
        const url = `${this.baseUrl}/patient/${patientId}/appointments/upcoming?offset=${offset}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getStaffsTodaysAppointment(StaffId = null): Observable<Response> {
        const offset = (new Date()).getTimezoneOffset();
        const url = `${this.baseUrl}/staff/${StaffId}/appointments/today`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    updateAppointmentStatus(appointmentId: number, appointmentStatusUpdateModel: AppointmentStatusUpdateModel): Observable<Response> {
        const url = `${this.baseUrl}/appointment/${appointmentId}/status`;
        return this.httpClient.put(url, appointmentStatusUpdateModel).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

}
