import { HttpBaseService } from "../core/services/httpbase.service";
import { map, catchError, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfigService } from "../core/services/app-config.service";
import { from, Observable } from "rxjs";
import { Response } from "../core/contracts/Response";
import { AccountSettingsModel } from "../models/account-settings.model";
import { Utility } from '../core/helpers/utilities';
import { TenantSettingsService } from './tenant-settings.service';

@Injectable()
export class OnlineBookingService extends HttpBaseService {
  private baseUrl = "";

  constructor(
    private tenantSettingsService: TenantSettingsService,
    private httpClient: HttpClient,
    private environmentService: AppConfigService
  ) {
    super();
    this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
  }

  saveAccountSettings(
    accountsettings: AccountSettingsModel
  ): Observable<Response> {
    this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
    const url = `${this.baseUrl}/accountSettings`;

    const config = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    return this.httpClient
      .post(url, accountsettings)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getAccountSettings(skip: boolean = false): Observable<Response> {
    this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
    const url = `${this.baseUrl}/accountSettings`;

    const config = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    if (!skip) {
      return this.httpClient
        .get(url)
        .pipe(map(this.extractData), catchError(this.handleError))
    } else {
      return from(this.tenantSettingsService.getTenantInfobySubDomain()).pipe(
        mergeMap(_token_response => this.httpClient
          .get(url, { headers: { skip: "true" } }).pipe(
            map(this.extractData),
            catchError(this.handleError))));
    }
  }
}
