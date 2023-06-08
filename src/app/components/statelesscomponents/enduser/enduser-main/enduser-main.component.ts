import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication-service.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { AppointmentAction } from "src/app/enums/appointment-action.enum";
import { Utility } from "src/app/core/helpers/utilities";
import { MatDialog } from "@angular/material/dialog";
import { AccountSettingsModel, CompanyModel } from "src/app/models/account-settings.model";
import { OnlineBookingService } from "src/app/services/online-booking.service";
import { CarewellToastrNotificationService } from "src/app/core/services/toastr-snackbar.service";
import { error } from "protractor";
import { Router } from '@angular/router';
import { SubscriptionLike as ISubscription, forkJoin } from 'rxjs';
import { Response } from 'src/app/core/contracts/Response';
import { RoutePath } from 'src/app/core/config/rout-path';
declare function removeContentSideBar();
declare function goToContent();
import * as moment from 'moment';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ScriptService } from 'src/app/core/services/script.service';
import { BusinessHourModel } from 'src/app/models/business-hour.model';
import { WorkingTime } from 'src/app/models/dayOff.model';
import { ServiceByCatogery } from "src/app/models/service-by-category.model";
import { Category } from "src/app/models/category.model";
import { ResponseStatus } from "src/app/enums/response-status.enum";
import { ServiceService } from "src/app/services/service.service";
declare var $: any

@Component({
  selector: 'app-enduser-main',
  templateUrl: './enduser-main.component.html',
  styleUrls: ['./enduser-main.component.css']
})
export class EnduserMainComponent implements OnInit {
  accountSettings: AccountSettingsModel = new AccountSettingsModel();
  company_banner_Image: string;
  companyDesc : string[] = [];
  showLoading: boolean;
  bookingMasterSubscription: ISubscription;
  _activeSection: string = 'home';
  areas = 'home,aboutus,services,contact';
  @ViewChildren('home,aboutus,services,contact') sections: QueryList<ElementRef>;
  routerPath = RoutePath;
  showServicesLoader: boolean;
  serviceByCatogery: ServiceByCatogery[] = [];
  showReadMore : boolean = false;
  isLengthyDesc : boolean = false;
  readBtnLabel = "Read More";



  constructor(
    private _scriptService: ScriptService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private serviceService: ServiceService,
    private loaderService: LoaderService,
    private onlineBookingService: OnlineBookingService,
    private _CarewellToastrNotificationService: CarewellToastrNotificationService
  ) { }

  ngOnInit(): void {
    this.InitializeScripts();
    this.authenticationService.logout();
    this.getAccountSettings();
    window.addEventListener('scroll', this.scroll, true);

    
    this.showServicesLoader = true;
    this.bookingMasterSubscription = forkJoin([
    this.serviceService.getAllServicesByCatogery(true)]).subscribe(
      result => {
        
        this.getCategories_OnSuccess(result[0]);
        this.showServicesLoader = false;
      },
    
    );

  }

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.bottom >= 50 &&
      rect.right >= 0 &&
      rect.top <= ((window.innerHeight || document.documentElement.clientHeight)) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  getCategories_OnSuccess(response: Response, selectedCategory?: Category) {
    if (response.status === ResponseStatus.Success) {
      if (Utility.isValidInstance(response.data) && response.data.length > 0) {
        this.serviceByCatogery = response.data;
      }
    }
  }
  scroll = (event): void => {
    const activeSection = this.sections.toArray()
      .findIndex(section => this.isElementInViewport(section.nativeElement));

    console.log(this.areas.split(',')[activeSection]);
    this._activeSection = this.areas.split(',')[activeSection];

    if (event.srcElement.scrollTop > 200) {
      $('.scrolling-navbar').addClass('top-nav-collapse');
    } else {
      $('.scrolling-navbar').removeClass('top-nav-collapse');
    }

    if (event.srcElement.scrollTop > 200) {
      $('.fixed-top').addClass('menu-bg');
    } else {
      $('.fixed-top').removeClass('menu-bg');
    }
  };

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  onWindowScroll(event) {
    console.log(event);
  }

  InitializeScripts() {
    // this.removeContentSideBar();
    const $this = this;
    // setTimeout(function (e) {
    $this._scriptService
      .load(['jqueryJS', 'popperJS', 'bootstrapJS',
        'jquerymixitup', 'nivolightbox',
        'owlcarouselJS', 'jquerystellarJS', 'jquerynavJS', 'scrollingnavJS', 'jqueryeasingJS',
        'smoothscrollJS', 'jqueryslicknavJS', 'wowJS', 'jqueryvideJS',
        'jquerycounterupJS', 'jquerymagnificpopupJS', 'waypointsJS', 'formvalidatorJS', 'contactformJS', 'mainJS'])
      .then(data => {

      });
    // }, 1000);

    // setTimeout(function (e) {
    //   $this._scriptService.loadScript('jqueryJS');
    //   $this._scriptService.loadScript('popperJS');
    //   $this._scriptService.loadScript('bootstrapJS');
    //   $this._scriptService.loadScript('jquerymixitup');
    //   $this._scriptService.loadScript('nivolightbox');
    //   $this._scriptService.loadScript('owlcarouselJS');
    //   $this._scriptService.loadScript('jquerystellarJS');
    //   $this._scriptService.loadScript('jquerynavJS');
    //   $this._scriptService.loadScript('scrollingnavJS');
    //   $this._scriptService.loadScript('jqueryslicknavJS');
    //   $this._scriptService.loadScript('jqueryeasingJS');
    //   $this._scriptService.loadScript('smoothscrollJS');
    //   $this._scriptService.loadScript('wowJS');
    //   $this._scriptService.loadScript('jqueryvideJS');
    //   $this._scriptService.loadScript('jquerymagnificpopupJS');
    //   $this._scriptService.loadScript('waypointsJS');
    //   $this._scriptService.loadScript('formvalidatorJS');
    //   $this._scriptService.loadScript('contactformJS');
    //   $this._scriptService.loadScript('mainJS');
    // }, 1000);
  }

  isCurrentDay(day) {
    return moment().format('dddd').trim().toUpperCase() === day.trim().toUpperCase();
  }

  // removeContentSideBar() {
  //   removeContentSideBar();
  // }

  goToContent() {
    // goToContent();
  }

  NewAppointmentPopupOnClick() {
    // const dialogRef = this.dialog.open(CreateAppointmentComponent, {
    //   panelClass: 'full-screen-modal',
    //   disableClose: true,
    //   data: { action: AppointmentAction.Add }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (Utility.isValidInstance(result) && result.saved === true) {
    //   }
    // });
    this.router.navigate([RoutePath.EndUserBooking]);
  }


  getAccountSettings() {
    this.showLoader();
    this.onlineBookingService.getAccountSettings(true).subscribe(
      (response) => {
        if (
          Utility.isValidObjectInstance(response) &&
          Utility.isValidObjectInstance(response.data)
        ) {
          this.accountSettings = response.data;
          if (this.accountSettings !== undefined && this.accountSettings !== null && this.accountSettings.companyDetails !== undefined
            && this.accountSettings.companyDetails !== null && this.accountSettings.companyDetails.companyName !== null
            && this.accountSettings.companyDetails.companyName !== undefined
            && this.accountSettings.companyDetails.companyName !== '') {
            document.title = this.accountSettings.companyDetails.companyName + ' | Carewell';
          }

          if (Utility.isValidObjectInstance(this.accountSettings.companyDetails) && Utility.isNotEmptyString(this.accountSettings.companyDetails.companyDescription)) {
            if (this.accountSettings.companyDetails.companyDescription.length > 750) {
              this.showReadMore = true;
              this.isLengthyDesc = true;
              this.readBtnLabel = "Read More";
              this.companyDesc[0] = this.accountSettings.companyDetails.companyDescription.substring(0, 750);
            }
          }

          if (Utility.isValidObjectInstance(this.accountSettings.companyDetails) && Utility.isNotEmptyString(this.accountSettings.companyDetails.bannerImage)) {
            this.company_banner_Image = this.accountSettings.companyDetails.bannerImage;
          } else {
            this.company_banner_Image = 'https://images.pexels.com/photos/196650/pexels-photo-196650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'; //'https://images.pexels.com/photos/1558691/pexels-photo-1558691.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'; //'assets/images/banner.jpeg';
          }
        } else {
          this.bindEmptyWorkingHours();
          this.company_banner_Image = 'https://images.pexels.com/photos/196650/pexels-photo-196650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'; //'https://images.pexels.com/photos/1558691/pexels-photo-1558691.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'; //'assets/images/banner.jpeg';
        }

        this.goToContent();
        this.hideLoader();
      },
      (error) => {
        this.company_banner_Image = 'https://images.pexels.com/photos/196650/pexels-photo-196650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'; // 'https://images.pexels.com/photos/1558691/pexels-photo-1558691.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'; //'assets/images/banner.jpeg';
        console.error(error);
        this._CarewellToastrNotificationService.showErrorNotification(error);
        this.hideLoader();
        // this._CWLToastrNotificationService.showErrorNotification(
        //   error.error.message
        // );
      }
    );
  }

  bindEmptyWorkingHours() {
    this.accountSettings = new AccountSettingsModel();
    this.accountSettings.companyDetails = new CompanyModel();
    this.accountSettings.companyDetails.phone = '';
    this.accountSettings.companyDetails.address = '';
    this.accountSettings.companyDetails.phone = '';
    this.accountSettings.companyDetails.city = '';
    this.accountSettings.companyDetails.email = '';
    this.accountSettings.companyDetails.zip = '';
    this.accountSettings.companyDetails.twitterURL = '';
    this.accountSettings.companyDetails.facebookURL = '';
    this.accountSettings.companyDetails.website = '';
    this.accountSettings.companyDetails.companyName = '';

    this.accountSettings.businessHours = new Array<BusinessHourModel>();
    const _businessHourModel = new BusinessHourModel();
    _businessHourModel.day = 'Monday';
    _businessHourModel.workingTime = new WorkingTime();
    this.accountSettings.businessHours.push({ ..._businessHourModel });

    _businessHourModel.day = 'Tuesday';
    _businessHourModel.workingTime = new WorkingTime();
    this.accountSettings.businessHours.push({ ..._businessHourModel });

    _businessHourModel.day = 'Wednesday';
    _businessHourModel.workingTime = new WorkingTime();
    this.accountSettings.businessHours.push({ ..._businessHourModel });

    _businessHourModel.day = 'Thursday';
    _businessHourModel.workingTime = new WorkingTime();
    this.accountSettings.businessHours.push({ ..._businessHourModel });

    _businessHourModel.day = 'Friday';
    _businessHourModel.workingTime = new WorkingTime();
    this.accountSettings.businessHours.push({ ..._businessHourModel });

    _businessHourModel.day = 'Saturday';
    _businessHourModel.workingTime = new WorkingTime();
    this.accountSettings.businessHours.push({ ..._businessHourModel });

    _businessHourModel.day = 'Sunday';
    _businessHourModel.workingTime = new WorkingTime();
    this.accountSettings.businessHours.push({ ..._businessHourModel });
  }

  registerUser() {
    const dialogRef = this.dialog.open(UserRegisterComponent, {
      panelClass: 'register-modal',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.status === 1) {
        //this.getClients();
      }
    });
  }

  loginUser() {
    const dialogRef = this.dialog.open(UserLoginComponent, {
      panelClass: 'register-modal',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.status === 1) {
        //this.getClients();
      }
    });
  }

  private showLoader(): void {
    // this.showLoading = true;
    // this.loaderService.show();
    // $('#loader').fadeIn();
  }

  private hideLoader(): void {
    // this.showLoading = false;
    // this.loaderService.hide();
    $('#loader').fadeOut();
  }

  showLengthyContentInCompDesc() {
    this.showReadMore = !this.showReadMore;
    if (this.showReadMore) {
      this.readBtnLabel = "Read More";
    } else {
      this.readBtnLabel = "Read Less";
    }
  }



}
