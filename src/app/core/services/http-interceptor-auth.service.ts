import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import * as moment from 'moment';
import { tap, catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication-service.service';
import { TokenDecoderService } from './token-decoder.service';
import { TenantSettingsService } from 'src/app/services/tenant-settings.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // myMoment: moment.Moment = ; 
    //moment(new Date, 'MM/DD/YYYY');
    private isTokenRefreshing: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    constructor(private authenticationService: AuthenticationService,
        private tenantSettingsService: TenantSettingsService,
        private tokenDecoderService: TokenDecoderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add authorization header with basic auth credentials if available
        const _timeZone = this.getBrowserTimeZone();
        const _dateTimeNow = new Date();
        const _dateTimeNowString = moment().format("MM/DD/YYYY");
        request = request.clone({
            setHeaders: {
                TimeZone: _timeZone,
                DateTimeNow: _dateTimeNowString
            }
        });

        if (request.headers.get("internal")) {
            return next.handle(request);
        }

        if (request.headers.get("skip")) {
            return next.handle(this.attachBasicAuthToRequest(request));
        }

        return next.handle(this.attachTokenToRequest(request)).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log("Success");
                }
            }),
            catchError((err): Observable<any> => {
                if (err instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>err).status) {
                        case 401:
                            console.log("Token expired. Attempting refresh ...");
                            return this.handleHttpResponseError(request, next);
                        case 400:
                            return <any>this.authenticationService.logout();
                        default: return throwError(this.handleError);
                    }
                } else {
                    return throwError(this.handleError);
                }
            })

        );
    }

    // Global error handler method 
    private handleError(errorResponse: HttpErrorResponse) {
        let errorMsg: string;

        if (errorResponse.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = "An error occured : " + errorResponse.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
        }

        return throwError(errorMsg);
    }

    // Method to handle http error response
    private handleHttpResponseError(request: HttpRequest<any>, next: HttpHandler) {
        // First thing to check if the token is in process of refreshing
        if (!this.isTokenRefreshing)  // If the Token Refresheing is not true
        {
            this.isTokenRefreshing = true;

            // Any existing value is set to null
            // Reset here so that the following requests wait until the token comes back from the refresh token API call
            this.tokenSubject.next(null);

            /// call the API to refresh the token
            return this.authenticationService.getNewRefreshToken().pipe(
                switchMap((tokenresponse: any) => {
                    if (tokenresponse && tokenresponse.token) {
                        this.tokenSubject.next(tokenresponse.token);
                        localStorage.setItem('loginStatus', '1');
                        localStorage.setItem('jwt', tokenresponse.token);
                        localStorage.setItem('username', tokenresponse.username);
                        localStorage.setItem('expiration', tokenresponse.expiration);
                        localStorage.setItem('refreshToken', tokenresponse.refresh_token);
                        localStorage.setItem('currencyUnit', tokenresponse.currencyUnit);
                        localStorage.setItem('companyLogo', tokenresponse.companyLogo);
                        console.log("Token refreshed...");
                        return next.handle(this.attachTokenToRequest(request));
                    }

                    return <any>this.authenticationService.logout();
                }),
                catchError(err => {
                    this.authenticationService.logout();
                    return this.handleError(err);
                }),
                finalize(() => {
                    this.isTokenRefreshing = false;
                })
            );
        }
        else {
            this.isTokenRefreshing = false;
            return this.tokenSubject.pipe(filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.attachTokenToRequest(request));
                }));
        }
    }

    private attachTokenToRequest(request: HttpRequest<any>) {
        var token = localStorage.getItem('jwt');
        var tenantId = this.tokenDecoderService.getTenantIdFromJWT();
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}`, TimeZone: this.getBrowserTimeZone() } });
    }

    private attachBasicAuthToRequest(request: HttpRequest<any>) {
        var _basicToken = btoa("anonymous:anonymous");
        const _request = request.clone({ setHeaders: { Authorization: `Basic ${_basicToken}`, TimeZone: this.getBrowserTimeZone(), TenantId: localStorage.getItem('tenantId') } });
        return (_request);
        // if (localStorage.getItem('tenantId') === undefined || localStorage.getItem('tenantId') === null || localStorage.getItem('tenantId') === '') {
        //     this.tenantSettingsService.getTenantInfobySubDomain().then((response) => {
        //         console.log(response);

        //         return new Promise((resolve, reject) => {
        //             const _request = request.clone({ setHeaders: { Authorization: `Basic ${_basicToken}`, TimeZone: this.getBrowserTimeZone(), TenantId: localStorage.getItem('tenantId') } });
        //             resolve(_request);
        //         });
        //     });
        // } else {
        //     return new Promise((resolve, reject) => {
        //         const _request = request.clone({ setHeaders: { Authorization: `Basic ${_basicToken}`, TimeZone: this.getBrowserTimeZone(), TenantId: localStorage.getItem('tenantId') } });
        //         resolve(_request);
        //     });
        // }
    }

    private getBrowserTimeZone(): string {
        return /\((.*)\)/.exec(new Date().toString())[1];
    }
}