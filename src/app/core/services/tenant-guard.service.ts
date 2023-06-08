import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoutePath } from '../config/rout-path';
import { TenantSettingsService } from 'src/app/services/tenant-settings.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TenantGuard implements CanActivate {
    constructor(
        private tenantSettingService: TenantSettingsService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(res => {
        
            if (localStorage.getItem('tenantId') === undefined || localStorage.getItem('tenantId') === null || localStorage.getItem('tenantId') === '' || localStorage.getItem('tenantId') === '0') {
                this.tenantSettingService.getTenantInfobySubDomain().then((response) => {
                    if (response) {
                        res(true);
                    } else {
                        this.router.navigate([RoutePath.NotFound]);
                        res(false);
                    }
                });
            } else {
                res(true);
            }
        });
    }
}