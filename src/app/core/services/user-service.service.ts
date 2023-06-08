import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AppConfigService } from './app-config.service';
import { PasswordResetModel } from '../models/password-Reset.model';
import { Observable } from 'rxjs';
import { Response } from '../contracts/Response';
import { catchError, map } from 'rxjs/operators';
import { HttpBaseService } from './httpbase.service';

@Injectable({ providedIn: 'root' })
export class UserService extends HttpBaseService {
    private baseUrl = '';
    constructor(private http: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.carewell;
    }

    getAll() {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    getById(id: number): Observable<Response> {
        const url = `${this.baseUrl}/users?userId=${id}`;
        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    Passwordset(passwordResetModel: PasswordResetModel) {
        return this.http.post<boolean>(`${this.baseUrl}/users/resetpassword`, passwordResetModel);
    }

    passwordReset(passwordResetModel: PasswordResetModel): Observable<Response> {
        const url = `${this.baseUrl}/users/forget/reset`;
        return this.http.post(url, passwordResetModel).pipe(map(this.extractData), catchError(this.handleError));
    }
}