import { Injectable } from '@angular/core';
import { HttpBaseService } from '../core/services/httpbase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../core/services/app-config.service';
import { Category } from '../models/category.model';
import { Response } from '../core/contracts/Response';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Service } from '../models/service.model';
import { from, Observable } from "rxjs";
import { TenantSettingsService } from './tenant-settings.service';
import { Utility } from '../core/helpers/utilities';

@Injectable()
export class ServiceService extends HttpBaseService {
    private baseUrl = '';
    private config = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    constructor(
        private tenantSettingsService: TenantSettingsService,
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.carewell;
    }

    getAllServices(): Observable<Response> {
        const url = `${this.baseUrl}/service`;
        return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
    }

    getAllServicesByCatogery(skip: boolean = false): Observable<Response> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/service/servicesbycatogery`;
        if (!skip) {
            return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
        }
        else {
            return from(this.tenantSettingsService.getTenantInfobySubDomain()).pipe(
                mergeMap(_tenant_response => this.httpClient
                    .get(url, { headers: { skip: "true" } }).pipe(map(this.extractData), catchError(this.handleError))));
        }
    }

    addCategory(category: Category): Observable<Response> {
        const url = `${this.baseUrl}/category`;
        return this.httpClient.post(url, category).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getCategories(): Observable<Response> {
        const url = `${this.baseUrl}/category`;
        return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
    }

    getServicesByCategory(catId): Observable<Response> {
        const url = `${this.baseUrl}/service/${catId}/category`;
        return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
    }

    addService(service: Service): Observable<Response> {
        const url = `${this.baseUrl}/service`;
        return this.httpClient.post(url, service).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    deletecategory(categoryId: number): Observable<Response> {
        const url = `${this.baseUrl}/category/${categoryId}`;
        return this.httpClient.delete(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    deleteService(serviceId: number): Observable<Response> {
        const url = `${this.baseUrl}/service/${serviceId}`;
        return this.httpClient.delete(url).pipe(map(this.extractData),
            catchError(this.handleError));
    }
}
