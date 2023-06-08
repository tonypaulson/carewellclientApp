import { HttpBaseService } from '../core/services/httpbase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../core/services/app-config.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from '../core/contracts/Response';

@Injectable()
export class MasterDataService extends HttpBaseService {
    private baseUrl = '';

    constructor(
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.carewell;
    }

    getDurations(skip: boolean = true): Observable<Response> {
        const url = `${this.baseUrl}/masterdata/durations`;
        const config = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        return !skip ? this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError))
            : this.httpClient.get(url, { headers: { skip: "true" } }).pipe(
                map(this.extractData),
                catchError(this.handleError));
    }
}