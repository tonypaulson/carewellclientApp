import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable } from 'rxjs';
import { AppConfigService } from '../core/services/app-config.service';
import { HttpBaseService } from '../core/services/httpbase.service';
import { Response } from "../core/contracts/Response";
import { User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService extends HttpBaseService {

  private baseUrl = "";

  constructor(
    private httpClient: HttpClient,
    private environmentService: AppConfigService
  ) {
    super();
    this.baseUrl = this.environmentService.environment.api.carewell;
  }

  saveProfileSettings(
    profileSettings: User
  ): Observable<Response> {
    const url = `${this.baseUrl}/accountSettings/UpdateProfile`;
    return this.httpClient
      .post(url, profileSettings)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getProfileSettings(): Observable<Response> {
    const url = `${this.baseUrl}/accountSettings/profileInfo`;
    return this.httpClient
      .get(url).pipe(map(this.extractData), catchError(this.handleError));
  }

  checkPassword(
    password: string
  ): Observable<Response> {
    const url = `${this.baseUrl}/accountSettings/checkPassword/${password}`;
    return this.httpClient
      .get(url).pipe(map(this.extractData), catchError(this.handleError));
  }
}
