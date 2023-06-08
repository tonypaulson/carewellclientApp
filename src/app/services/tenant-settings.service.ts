import { HttpBaseService } from '../core/services/httpbase.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../core/services/app-config.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TenantSettingsModel } from '../models/tenant-settings.model';
import { Response } from '../core/contracts/Response';
import { User } from '../core/models/user.model';
import { Utility } from '../core/helpers/utilities';
import { throwError as observableThrowError } from 'rxjs';
import { from, Observable } from "rxjs";

@Injectable()
export class TenantSettingsService extends HttpBaseService {
    private baseUrl = '';
    private config = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    constructor(
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
    }

    getAllCalenderViews(): Observable<Response> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/accountsettings/calenderviews`;
        return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
    }

    getAllCurrencyUnits(): Observable<Response> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/accountsettings/currencyunits`;
        return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
    }

    getTenantInfo(): Observable<Response> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/accountsettings/tenantinfo`;
        return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
    }

    updateTenant(tenant: TenantSettingsModel): Observable<Response> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/accountsettings/tenantinfo`;
        return this.httpClient.put(url, tenant).pipe(map(this.extractData), catchError(this.handleError));
    }

    getTenantCurrencyUnit(skip: boolean = false): Observable<Response> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/accountsettings/tenantcurrencyunit`;
        if (!skip) {
            return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));
        } else {
            return from(this.getTenantInfobySubDomain()).pipe(
                mergeMap(_token_response =>
                    this.httpClient.get(url, { headers: { skip: "true" } }).pipe(map(this.extractData), catchError(this.handleError))));
        }
    }

    tenantSignUp(user: User): Observable<Response> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/tenants`;
        return this.httpClient.post(url, user).pipe(map(this.extractData), catchError(this.handleError));
    }

    getTenantInfobySubDomain() {       
        var full = window.location.host;
        var parts = new Array<string>();

        if (Utility.isNotEmptyString(window.location.port)) {
            full = full.replace(':' + window.location.port, '');
        }

        if (this.isSubdomain(full)) {
            var domain = 'medicare';
            parts = full.split('.');
            domain = parts[0];
        }
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        if (localStorage.getItem('tenantId') === undefined || localStorage.getItem('tenantId') === null || localStorage.getItem('tenantId') === '' || localStorage.getItem('tenantId') === '0') {
            return new Promise((resolve, reject) => {
        
                this.httpClient
                    .get(`${this.baseUrl}/tenants/${domain}`, { headers: { internal: "true" } }).pipe(catchError((error: any) => {
                        resolve(true);
                        return observableThrowError(error || 'Server error');
                    }))
                    .subscribe((envResponse: any) => {
                        if (envResponse !== null && envResponse !== undefined) {
                            localStorage.setItem('tenantId', envResponse.id);
                            resolve(true);
                        } else {
                            localStorage.setItem('tenantId', '0');
                            resolve(false);
                        }

                        // resolve(true);
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        }
    }

    private isSubdomain(url) {
        // var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);
        var regex = new RegExp(/(http:\/\/)?(([^.]+)\.)?([\w-]+\.[\w-]+\.\w+)$/);
        return !!url.match(regex);
    }
}
