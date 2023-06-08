import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../core/services/app-config.service';
import { HttpBaseService } from '../core/services/httpbase.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MeetingService extends HttpBaseService {
    private baseUrl = '';
    constructor(private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.carewell;
    }

    getMeeting(meetingCode: string, redirectUrl: string): Observable<any> {
        const url = `${this.baseUrl}/appointment/${meetingCode}/meeting?redirectUrl=${redirectUrl}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }
}