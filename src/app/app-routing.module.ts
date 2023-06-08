import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from './core/config/rout-path';
import { TenantGuard } from './core/services/tenant-guard.service';
import { EnduserMainComponent } from './components/statelesscomponents/enduser/enduser-main/enduser-main.component';
import { StatelessmainComponent } from './components/statelesscomponents/statelessmain/statelessmain.component';
import { EnduserbookingComponent } from './components/statelesscomponents/enduser/enduserbooking/enduserbooking.component';
import { NotFoundComponent } from './components/core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: StatelessmainComponent,
    children: [
      {
        path: RoutePath.EndUserHome,
        component: EnduserMainComponent,
        pathMatch: 'full',
        canActivate: [TenantGuard]
      },
      {
        path: RoutePath.EndUserBooking,
        component: EnduserbookingComponent
      },
      {
        path: '',
        redirectTo: RoutePath.EndUserHome,
        pathMatch: 'full'
      },
      {
        path: RoutePath.NotFound,
        component: NotFoundComponent
      },
      {
        path: '**',
        redirectTo: RoutePath.NotFound,
        pathMatch: 'full'
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
