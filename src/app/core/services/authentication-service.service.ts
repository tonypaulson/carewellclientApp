import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AppConfigService } from './app-config.service';
import { Utility } from '../helpers/utilities';
import { TokenRequestModel } from '../models/token-request.model';
import { HttpBaseService } from './httpbase.service';
import { TokenDecoderService } from './token-decoder.service';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends HttpBaseService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private baseUrl = '';

    // User related properties
    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
    private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
    private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));
    private CurrencyUnit = new BehaviorSubject<string>(localStorage.getItem('currencyUnit'));
    private CompanyLogo = new BehaviorSubject<string>(localStorage.getItem('companyLogo'));
    private profileImage = new BehaviorSubject<string>(localStorage.getItem('profileImage'));

    constructor(private http: HttpClient,
        private tokenDecoderService: TokenDecoderService,
        private environmentService: AppConfigService) {
        super();
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getNewRefreshToken(): Observable<any> {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const username = localStorage.getItem('username');
        const refreshToken = localStorage.getItem('refresh_Token');
        const grantType = 'refresh_token';
        const _tokenRequestModel = new TokenRequestModel();
        _tokenRequestModel.grantType = grantType;
        _tokenRequestModel.tenantId = this.tokenDecoderService.getTenantIdFromJWT();
        _tokenRequestModel.userName = username;
        _tokenRequestModel.refreshToken = refreshToken;
        return this.http.post<any>(`${this.baseUrl}/api/users/authadmin`, _tokenRequestModel).pipe(map(result => {
            if (result && result.token) {
                this.loginStatus.next(true);
                localStorage.setItem('loginStatus', '1');
                localStorage.setItem('jwt', result.token);
                localStorage.setItem('username', result.username);
                localStorage.setItem('expiration', result.expiration);
                localStorage.setItem('refreshToken', result.refresh_token);
                localStorage.setItem('companyLogo', result.companyLogo);
                localStorage.setItem('profileImage', result.profileImage);
            }

            return <any>result;
        }));
    }

    forgotPassword(email: string) {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const url = `${this.baseUrl}/users/forget`;
        return this.http.post(url, { email: email, hostName: window.location.host }).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    login(username: string, password: string) {
        this.baseUrl = Utility.isValidInstance(this.environmentService.environment) ? this.environmentService.environment.api.carewell : '';
        const _tokenRequestModel = new TokenRequestModel();
        _tokenRequestModel.grantType = 'password';
        _tokenRequestModel.password = password;
        // _tokenRequestModel.tenantId = 1;
        _tokenRequestModel.userName = username;
        return this.http.post<any>(`${this.baseUrl}/users/authadmin`, _tokenRequestModel)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.loginStatus.next(true);
                    localStorage.setItem('loginStatus', '1');
                    localStorage.setItem('jwt', user.token);
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('expiration', user.expiration);
                    localStorage.setItem('refresh_Token', user.refresh_Token);
                    localStorage.setItem('currencyUnit', user.currencyUnit);
                    localStorage.setItem('companyLogo', user.companyLogo);
                    localStorage.setItem('profileImage', user.profileImage);
                    this.UserName.next(localStorage.getItem('username'));
                    this.currentUserSubject.next(user);
                }

                return user;
            }), catchError(this.handleError));
    }

    logout() {
        // remove user from local storage to log user out
        this.loginStatus.next(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        localStorage.removeItem('expiration');
        localStorage.removeItem('companyLogo');
        localStorage.removeItem('profileImage');
        localStorage.setItem('loginStatus', '0');
        localStorage.removeItem('tenantId');
        this.currentUserSubject.next(null);
    }

    checkLoginStatus(): boolean {
        var loginCookie = localStorage.getItem("loginStatus");

        if (loginCookie == "1") {
            if (localStorage.getItem('jwt') != null || localStorage.getItem('jwt') != undefined) {
                return true;
            }

            /*
             // Get and Decode the Token
             const token = localStorage.getItem('jwt');
             const decoded = jwt_decode(token);
            // Check if the cookie is valid

            if(decoded.exp === undefined) 
            {
                return false;
            }

            // Get Current Date Time
            const date = new Date(0);

             // Convert EXp Time to UTC
            let tokenExpDate = date.setUTCSeconds(decoded.exp);

            // If Value of Token time greter than 

            if(tokenExpDate.valueOf() > new Date().valueOf()) 
            {
                return true;
            }

            console.log("NEW DATE " + new Date().valueOf());
            console.log("Token DATE " + tokenExpDate.valueOf());

            return false;
          */
        }
        return false;
    }

    getCompanyLogo() {
        return localStorage.getItem('companyLogo');
    }

    setCompanyLogo(logo) {
        localStorage.setItem('companyLogo', logo);
        this.CompanyLogo.next(logo);
    }

    get getCompanyLogo_AsObservable() {
        return this.CompanyLogo.asObservable();
    }

    getProfileImage() {
        return localStorage.getItem('profileImage');
    }

    setProfileImage(profileImage) {
        localStorage.setItem('profileImage', profileImage);
        this.profileImage.next(profileImage);
    }

    get getProfileImage_AsObservable() {
        return this.profileImage.asObservable();
    }

    getCurrencyUnit() {
        return localStorage.getItem('currencyUnit');
    }

    setCurrencyUnit(string) {
        localStorage.setItem('currencyUnit', string);
        this.CurrencyUnit.next(string);
    }

    get isLoggesIn() {
        return this.loginStatus.asObservable();
    }

    get currentUserName() {
        return this.UserName.asObservable();
    }

    get currentUserRole() {
        return this.UserRole.asObservable();
    }

    get TenantCurrencyUnit() {
        return this.CurrencyUnit.asObservable();
    }
}