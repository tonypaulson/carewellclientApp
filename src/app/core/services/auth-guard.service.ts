import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication-service.service';
import { RoutePath } from '../config/rout-path';
import { take, map } from 'rxjs/operators';

// import { AuthenticationService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = this.authenticationService.currentUserValue;
        // if (currentUser) {
        //     // check if route is restricted by role
        //     if (route.data.roles && route.data.roles.indexOf(currentUser.userRoleCode) === -1) {
        //         // role not authorised so redirect to home page
        //         // this.router.navigate(['/']);
        //         return false;
        //     }

        //     // authorised so return true
        //     return true;
        // }

        // // not logged in so redirect to login page with the return url
        // this.router.navigate(['/' + RoutePath.Login], { queryParams: { returnUrl: state.url } });
        // return false;

        return this.authenticationService.isLoggesIn.pipe(take(1), map((loginStatus: boolean) => {
            // To check if user is not logged in
            if (!loginStatus) {
                this.router.navigate(['/' + RoutePath.Login], { queryParams: { returnUrl: state.url } });
                return false;
            }

            return true;
        }));
    }
}