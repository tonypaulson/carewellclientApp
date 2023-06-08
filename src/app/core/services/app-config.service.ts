import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AppConfigService {
    private configUrl = environment.name === 'local' ? `assets/config/config.json` :
        `assets/config/config.${environment.name}.json`;
    public environment: any;

    constructor(
        private httpService: HttpClient) { }

    loadConfiguration() {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(this.configUrl, { headers: { internal: "true" } }).pipe(catchError((error: any) => {
                    resolve(true);
                    return observableThrowError(error || 'Server error');
                }))
                .subscribe((envResponse: any) => {
                    this.environment = envResponse;
                    resolve(true);
                });
        });
    }
}