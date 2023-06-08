import { HttpBaseService } from '../core/services/httpbase.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../core/services/app-config.service';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Response } from '../core/contracts/Response';


@Injectable()
export class PatientService extends HttpBaseService {
    private baseUrl = '';

    constructor(
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.carewell;
    }

    deletePatient(id): Observable<Response> {
        const url = `${this.baseUrl}/patient/${id}`;
        return this.httpClient.delete(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getPatients(): Observable<Response> {
        const url = `${this.baseUrl}/patient`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    addPatient(patient: Patient): Observable<Response> {
        const url = `${this.baseUrl}/patient`;

        const config = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        // return this.httpClient.post(url, JSON.stringify(client), { headers: config }).pipe(
        //     map(this.extractData),
        //     catchError(this.handleError));

        return this.httpClient.post(url, patient).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }
}
