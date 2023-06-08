import { NgModule ,APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigService } from './core/services/app-config.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenDecoderService } from './core/services/token-decoder.service';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarewellToastrNotificationService } from './core/services/toastr-snackbar.service';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { NumberRepeater } from './components/core/pipes/number-repeater-pipe';
import { EnduserbookingComponent } from './components/statelesscomponents/enduser/enduserbooking/enduserbooking.component';
import { ScriptService } from './core/services/script.service';
import { MenuChangeListnerService } from './services/menu-change-listener.service';
import { ServiceService } from './services/service.service';
import { LoaderService } from './core/services/loader.service';
import { OnlineBookingService } from './services/online-booking.service';
import { CarewellloaderComponent } from './components/core/carewellloader/carewellloader.component';
import { SessionMainComponent } from './components/sessioncomponents/session-main/session-main.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientService } from './services/patient.service';
import { DatePipe } from '@angular/common';
import { StaffService } from './services/staff.service';
import { ToastrSnackbarComponent } from './components/core/toastr-snackbar/toastr-snackbar.component';
import { GrdFilterPipe } from './components/core/pipes/grd-filter-pipe';
import { EnduserMainComponent } from './components/statelesscomponents/enduser/enduser-main/enduser-main.component';
import { TenantSettingsService } from './services/tenant-settings.service';
import { TimeHelper } from './core/services/time-helper.service';
import { AppointmentService } from './services/appointment.service';
import { DurationHelper } from './core/services/duration-helper.service';
import { PatientListingEventListenerService } from './core/services/patient-listing-event-listener.service';
import { NotFoundComponent } from './components/core/components/not-found/not-found.component';
import { StatelessmainComponent } from './components/statelesscomponents/statelessmain/statelessmain.component';
import { AuthInterceptor } from './core/services/http-interceptor-auth.service';
import { AuthGuard } from './core/services/auth-guard.service';
import { UserService } from './core/services/user-service.service';
import { MeetingService } from './services/meeting-service';
import { WorkScheduleService } from './services/work-schedule.service';
import { MasterDataService } from './services/masterdata.service';
import { WorkScheduleEventListenerService } from './core/services/work-schedule-event-listener.service';
import { AuthenticationService } from './core/services/authentication-service.service';
import { FakeBackendInterceptor } from './core/services/fake-backend-interceptor.service';
import { FacebookLoginComponent } from './components/statelesscomponents/enduser/facebook-login/facebook-login.component';
import { GmailLoginComponent } from './components/statelesscomponents/enduser/gmail-login/gmail-login.component';
import { UserRegisterComponent } from './components/statelesscomponents/enduser/user-register/user-register.component';
import {CarewellconfirmationComponent} from './components/core/carewellconfirmation/carewellconfirmation.component';
import { ProviderListingComponent } from './components/statelesscomponents/enduser/provider-listing/provider-listing.component'

const components = [EnduserMainComponent,GrdFilterPipe,
  StatelessmainComponent,NotFoundComponent,UserRegisterComponent,GmailLoginComponent,FacebookLoginComponent
,NumberRepeater,EnduserbookingComponent,CarewellloaderComponent, SessionMainComponent,CarewellconfirmationComponent,ToastrSnackbarComponent];

const providers = [MenuChangeListnerService,OnlineBookingService,LoaderService,ServiceService,AppConfigService,TenantSettingsService,
  TokenDecoderService,AuthenticationService,AppointmentService,DurationHelper,StaffService,TimeHelper,CarewellToastrNotificationService,
  ScriptService,PatientService,DatePipe,FakeBackendInterceptor,PatientListingEventListenerService,AuthGuard,
  UserService,MeetingService,WorkScheduleService,WorkScheduleEventListenerService,MasterDataService];

  const entryComponents = [ToastrSnackbarComponent, CarewellconfirmationComponent];


@NgModule({
  declarations: [
    AppComponent,
    components,
    ProviderListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MaterialModule,
    BrowserAnimationsModule,
    NgxContentLoadingModule
  ],
  entryComponents,
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppConfig,
      deps: [AppConfigService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    providers,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initAppConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfiguration();
}
