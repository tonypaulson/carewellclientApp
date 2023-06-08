import { HttpBaseService } from "../core/services/httpbase.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfigService } from "../core/services/app-config.service";
import { Observable } from "rxjs";
import { StaffScheduleModel } from "../models/staff-schedule.model";
import { map, catchError } from "rxjs/operators";
import { Response } from "../core/contracts/Response";

@Injectable()
export class WorkScheduleService extends HttpBaseService {
  private baseUrl = "";

  constructor(
    private httpClient: HttpClient,
    private environmentService: AppConfigService
  ) {
    super();
    this.baseUrl = this.environmentService.environment.api.carewell;
  }

  saveWorkSchedule(schedules: StaffScheduleModel): Observable<Response> {
    const url = `${this.baseUrl}/staff/2/schedule`;

    const config = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    // return this.httpClient.post(url, JSON.stringify(client), { headers: config }).pipe(
    //     map(this.extractData),
    //     catchError(this.handleError));

    return this.httpClient
      .post(url, schedules)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetWorkSchedule(staffId: number): Observable<Response> {
    const url = `${this.baseUrl}/staff/` + staffId + `/schedule`;

    return this.httpClient
      .get(url)
      .pipe(map(this.extractData), catchError(this.handleError));
  }
}
