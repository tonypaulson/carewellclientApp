import { HttpBaseService } from '../core/services/httpbase.service';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../core/services/app-config.service';
import { Patient } from '../models/patient.model';
import { Response } from '../core/contracts/Response';
import { Staff } from '../models/staff.model';
import { StaffServiceAutoComplete } from '../models/staffService-auto-complete.model';
import { TenantSettingsService } from './tenant-settings.service';
import { from, Observable } from "rxjs";

@Injectable()
export class StaffService extends HttpBaseService {
    private baseUrl = '';

    constructor(
        private tenantSettingsService: TenantSettingsService,
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.carewell;
    }

    deleteStaff(id): Observable<Response> {
        const url = `${this.baseUrl}/staffs/${id}`;
        return this.httpClient.delete(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getStaffs(): Observable<Response> {
        const url = `${this.baseUrl}/staffs`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getServicesOrStaffs(staffId, serviceId, skip: boolean = true): Observable<Response> {
        const url = `${this.baseUrl}/staffs/GetServicesOrStaffs/${staffId}/${serviceId}`;
        if (!skip) {
            return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
        }
        else {
            return from(this.tenantSettingsService.getTenantInfobySubDomain()).pipe(
                mergeMap(_tenant_response => this.httpClient
                    .get(url, { headers: { skip: "true" } }).pipe(map(this.extractData), catchError(this.handleError))));
        }

        // return !skip ? this.httpClient.get(url).pipe(map(this.extractData),
        //     catchError(this.handleError)) :
        //     this.httpClient.get(url, { headers: { skip: "true" } }).pipe(map(this.extractData),
        //         catchError(this.handleError));
    }

    getStaffsBasicInfo(): Observable<Response> {
        const url = `${this.baseUrl}/staffs/basicInfo`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    addStaff(staff: Staff): Observable<Response> {
        const url = `${this.baseUrl}/staffs`;

        const config = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        // return this.httpClient.post(url, JSON.stringify(client), { headers: config }).pipe(
        //     map(this.extractData),
        //     catchError(this.handleError));

        return this.httpClient.post(url, staff).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getSlots(staffId, timeStamp, skip: boolean = false) {
        const url = `${this.baseUrl}/staffs/${staffId}/slots/${timeStamp}`;
        if (!skip) {
            return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
        }
        else {
            return from(this.tenantSettingsService.getTenantInfobySubDomain()).pipe(
                mergeMap(_tenant_response => this.httpClient
                    .get(url, { headers: { skip: "true" } }).pipe(map(this.extractData), catchError(this.handleError))));
        }

        // return this.httpClient.get(url).pipe(
        //     map(this.extractData),
        //     catchError(this.handleError));
    }
}
