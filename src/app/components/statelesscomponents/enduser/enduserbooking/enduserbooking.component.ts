import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { RoutePath } from 'src/app/core/config/rout-path';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Utility } from 'src/app/core/helpers/utilities';
import { SubscriptionLike as ISubscription, forkJoin } from 'rxjs';
import { ResponseStatus } from 'src/app/enums/response-status.enum';
import { Response } from 'src/app/core/contracts/Response';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ServiceService } from 'src/app/services/service.service';
import { CarewellToastrNotificationService } from 'src/app/core/services/toastr-snackbar.service';
import { Service } from 'src/app/models/service.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TenantSettingsService } from 'src/app/services/tenant-settings.service';
import { CurrencyUnitModel } from 'src/app/models/currency-unit.model';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/services/masterdata.service';
import { DurationModel } from 'src/app/models/duration.model';
import * as _ from 'lodash';
import { AuthenticationService } from 'src/app/core/services/authentication-service.service';
import { TimeHelperModel } from 'src/app/models/time-helper-model';
import { TimeHelper } from 'src/app/core/services/time-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { forEach } from 'lodash';
import { ServiceByCatogery } from 'src/app/models/service-by-catogery.model';
import { TimeSlotsModel } from 'src/app/models/time-slots.model';
import { time } from 'console';
import { Constants } from 'src/app/core/config/constants';
import { User } from 'src/app/core/models/user.model';
import { AppointmentInputModel } from 'src/app/models/appointment-input.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AccountSettingsModel } from 'src/app/models/account-settings.model';
import { OnlineBookingService } from 'src/app/services/online-booking.service';

declare var $: any;


@Component({
  selector: 'app-enduserbooking',
  templateUrl: './enduserbooking.component.html',
  styleUrls: ['./enduserbooking.component.css']
})
export class EnduserbookingComponent implements OnInit {

  step: number = 1;
  showStep1Button1: boolean = false;
  showStep1Button2: boolean = false;
  showStep1Button3: boolean = false;
  showStep1Button4: boolean = false;
  servicesVisibility: boolean;
  isServiceSelected: boolean = false;
  isStaffSelected: boolean = false;
  isTeleMeeting: boolean;
  patient: User = new User();
  timeSlotsModel: TimeSlotsModel[];
  minDate = new Date();
  selectedDate = new Date();
  selected_durationId: number;
  disableDuration: boolean = true;
  startTime: string;

  // categories: Category[];
  // categoryServices: Service[];
  serviceByCatogery: ServiceByCatogery[] = [];
  selectedCategory: Category;
  durationModel: DurationModel[];
  serviceStaffs: Staff[];
  selectedTimeSlot: TimeSlotsModel;
  selectedStaff: Staff;
  selectedService: Service;
  timeHelperModel: TimeHelperModel[];
  currencyUnit: CurrencyUnitModel;
  accountSettings : AccountSettingsModel;

  utility: Utility;
  addPatientform: FormGroup;
  catogeryListingSubscription: ISubscription;
  getServicesByCatogerySubscription: ISubscription;
  bookingMasterSubscription: ISubscription;
  saveAppointmentSubscription: ISubscription;

  public categoryTabIndex = -1;
  tabIndex: number;
  prevCategory: string;
  showServicesLoader: boolean;
  showStaffLoader: boolean;
  showTimeSlotsLoader: boolean;
  showSlotsLoader: boolean;
  showConfirmButton: boolean;
  showSaveLoading: boolean;
  companyLogo: string;



  constructor(private router: Router,
    private appointmentService: AppointmentService,
    private loaderService: LoaderService,
    private serviceService: ServiceService,
    private service: ServiceService,
    private _carewellToastrNotificationService: CarewellToastrNotificationService,
    private tenantSettingsService: TenantSettingsService,
    private staffService: StaffService,
    private formBuilder: FormBuilder,
    private masterdataService: MasterDataService,
    private authenticationService: AuthenticationService,
    private timeHelper: TimeHelper,
    public dialog: MatDialog,
    public onlineBookingService : OnlineBookingService) { 
      this.utility = Utility;
  }

  ngOnInit(): void {
    this.getAccountSettings();
    this.addPatientformGroup();
    this.showServicesLoader = true;
    this.bookingMasterSubscription = forkJoin([this.tenantSettingsService.getTenantCurrencyUnit(true),
    this.serviceService.getAllServicesByCatogery(true)]).subscribe(
      result => {
        this.getTenantCurrencyUnit_onSuccess(result[0]);
        this.getCategories_OnSuccess(result[1]);
        this.showServicesLoader = false;
      },
      error => {
        this.showServicesLoader = false;
        this.onError(error);
      }
    );
  }

  getAccountSettings() {
    this.onlineBookingService.getAccountSettings(true).subscribe(
      (response) => {
        if (
          Utility.isValidObjectInstance(response) &&
          Utility.isValidObjectInstance(response.data)
        ) {
          this.accountSettings = response.data;
          this.companyLogo = this.accountSettings.companyDetails.companylogo;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDateTimeFormat(timeStamp) {
    return new Date(timeStamp * 1000);
  }

  onError(error) {
    this._carewellToastrNotificationService.showErrorNotification(error);
  }

  ngOnDestroy() {
    if (Utility.isValidInstance(this.getServicesByCatogerySubscription)) {
      this.getServicesByCatogerySubscription.unsubscribe();
    }
    if (Utility.isValidInstance(this.catogeryListingSubscription)) {
      this.catogeryListingSubscription.unsubscribe();
    }
    if (Utility.isValidInstance(this.bookingMasterSubscription)) {
      this.bookingMasterSubscription.unsubscribe();
    }
    if (Utility.isValidInstance(this.saveAppointmentSubscription)) {
      this.saveAppointmentSubscription.unsubscribe();
    }
  }

  getTenantCurrencyUnit_onSuccess(response: Response) {
    if (response.status === ResponseStatus.Success) {
      this.currencyUnit = response.data;
    }
  }

  getDurations_onSuccess(response: Response) {
    if (Utility.isValidInstance(response.data)) {
      this.startTime = "";
      this.durationModel = _.cloneDeep(response.data);
    }
  }

  getCategories_OnSuccess(response: Response, selectedCategory?: Category) {
    if (response.status === ResponseStatus.Success) {
      if (Utility.isValidInstance(response.data) && response.data.length > 0) {
        this.serviceByCatogery = response.data;
      }
    }
  }

  closeBooking() {
    this.router.navigate([RoutePath.EndUserHome]);
  }

  getFirstCharOfStaffName(firstName: string) {
    return firstName.charAt(0).toUpperCase();
  }

  getServiceStaffs() {
    this.showStaffLoader = true;
    this.staffService.getServicesOrStaffs(0, this.selectedService.id, true).subscribe(res => {
      this.showStaffLoader = false;
      this.getServiceStaffs_OnSuccess(res);
    }, (error) => {
      this._carewellToastrNotificationService.showErrorNotification('Error while fetching staffs, Pleease try again');
      this.showStaffLoader = false;
    });
  }

  getServiceStaffs_OnSuccess(response: Response) {
    if (response.status === ResponseStatus.Success) {
      if (Utility.isValidInstance(response.data) && Utility.isNotEmptyArray(response.data.staffs)) {
        this.serviceStaffs = response.data.staffs;
      } else {
        this.serviceStaffs = [];
      }
    }
  }

  onStartDateChanged(event) {
    this.selectedDate = event;
    console.log(this.selectedDate);
    if (Utility.isValidInstance(this.selectedDate)) {
      this.showSlotsLoader = true;
      const _startTime = this.timeHelper.withoutTime(this.selectedDate);
      // const _startTime_timeStamp = (_startTime as any) / 1000;
      const _startTime_timeStamp = Date.UTC(_startTime.getFullYear(), _startTime.getMonth(), _startTime.getDate()) / 1000;
      const staffId = this.selectedStaff.id;
      if (Utility.isNonZeroNumber(staffId)) {
        this.staffService.getSlots(staffId, _startTime_timeStamp, true).subscribe((success) => {
          console.log(success);
          this.timeSlotsModel = success;
          this.showSlotsLoader = false;
        }, (error) => {
          console.error(error);
          this.showSlotsLoader = false;
        });
      }
    }
  }

  getFirstChar(name: string) {
    return name.charAt(0).toUpperCase();
  }


  onServiceSelectByDivClick(selectedService: Service) {
    this.isServiceSelected = !selectedService.isSelected;
    this.serviceByCatogery.forEach(x => {
      x.services.forEach(y => {
        y.isSelected = y.id == selectedService.id ? this.isServiceSelected : false;
      })
    });
    if (this.isServiceSelected) {
      this.selectedService = selectedService;
      this.bookNow();
    }
    else {
      this.selectedService = null;
    }
    // this.showButton = this.isServiceSelected;
  }

  onServiceSelect(selectedService: Service) {
    this.isServiceSelected = selectedService.isSelected;
    this.serviceByCatogery.forEach(x => {
      x.services.forEach(y => {
        y.isSelected = y.id == selectedService.id ? this.isServiceSelected : false;
      })
    });
    if (this.isServiceSelected) {
      this.selectedService = selectedService;
      this.bookNow();
    }
    else {
      this.selectedService = null;
    }

    // this.showButton = this.isServiceSelected;
  }

  ontimeSlotSelect(timeSlot: TimeSlotsModel) {
    this.selectedTimeSlot = timeSlot;
    this.bookNow();
  }

  onStaffSelect(selectedStaff) {
    this.serviceStaffs.forEach(x => {
      x.isSelected = x.id == selectedStaff.id ? true : false;
    });
    this.selectedStaff = selectedStaff;
    this.bookNow();
  }

  onDurationChange() {
    this.selectedService.duration = this.durationModel.find(s => { return s.id == parseInt(this.selectedService.selected_durationId) });
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  onBackClick() {
    this.step--;
    this.handleBookingFlow();
  }

  bookNow() {
    this.step++;
    this.handleBookingFlow();
  }

  backToHomePage() {
    this.router.navigate([RoutePath.EndUserHome]);
  }


  handleBookingFlow() {
    switch (this.step) {
      case 1:
        this.showStep1Button1 = this.selectedService !== undefined ? true : false;
        this.showStep1Button2 = false;
        this.showStep1Button3 = false;
        this.showStep1Button4 = false;
        this.showConfirmButton = false;
        break;
      case 2:
        this.showStep1Button1 = false;
        this.showStep1Button2 = this.selectedStaff !== undefined ? true : false;
        this.showStep1Button3 = false;
        this.showStep1Button4 = false;
        this.showConfirmButton = false;
        this.getServiceStaffs();
        break;
      case 3:
        this.onStartDateChanged(this.selectedDate);
        this.showStep1Button1 = false;
        this.showStep1Button2 = false;
        this.showStep1Button3 = this.selectedTimeSlot !== undefined ? true : false;
        this.showStep1Button4 = false;
        this.showConfirmButton = false;
        break;
      case 4:
        this.showStep1Button1 = false;
        this.showStep1Button2 = false;
        this.showStep1Button3 = false;
        this.showStep1Button4 = false;
        this.showConfirmButton = true;
        break;
      case 5:
        this.showStep1Button1 = false;
        this.showStep1Button2 = false;
        this.showStep1Button3 = false;
        this.showStep1Button4 = false;
        this.showConfirmButton = false;
        break;
      default:
        break;
    }
  }

  confirmBooking() {
    if (this.addPatientform.valid) {
      this.addPatientform.disable();
      this.showSaveLoading = true;
      const appointmentRequestModel = this.getAppointmentRequestModel();
      this.saveAppointmentSubscription = this.appointmentService.addAppointment(appointmentRequestModel, true).subscribe((response: Response) => {
        if (response.status === ResponseStatus.Success) {
          this.addPatientform.enable();
          this.showSaveLoading = false;
          this.bookNow();
        }
      }, error => {
        this.showSaveLoading = false;
        this.addPatientform.enable();
        this._carewellToastrNotificationService.showErrorNotification('Error while booking. Please try again');
      });
    } else {
      // const toastrConfig = new MatSnackBarConfig();
      // toastrConfig.verticalPosition = "bottom";
      this._carewellToastrNotificationService.showErrorNotification('Please fill all the mandatory fields');
    }
  }

  getAppointmentRequestModel(): AppointmentInputModel {
    const appointmentRequestModel = new AppointmentInputModel();
    appointmentRequestModel.id = 0;
    appointmentRequestModel.telemeeting = this.isTeleMeeting;
    appointmentRequestModel.patient = null;
    appointmentRequestModel.staff = this.selectedStaff.id;
    appointmentRequestModel.service = this.selectedService.id;
    // appointmentRequestModel.status = this.appointmentModel.status;
    appointmentRequestModel.startAt = this.selectedTimeSlot.timestamp;
    appointmentRequestModel.duration = this.selectedService.duration.id;
    const patientInfo = new User();
    patientInfo.firstName = this.patient.firstName;
    patientInfo.lastName = this.patient.lastName;
    patientInfo.email = this.patient.email;
    patientInfo.phoneNumber = this.patient.phoneNumber;
    patientInfo.gender = 0;
    appointmentRequestModel.guest = patientInfo;
    appointmentRequestModel.hostName = window.location.host;
    return appointmentRequestModel;
  }

  createAppointment() {
    if (!this.addPatientform.invalid) {
      if (!this.authenticationService.checkLoginStatus()) {
        const dialogRef = this.dialog.open(UserRegisterComponent, {
          panelClass: 'register-modal',
          disableClose: true
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result && result.status === 2) {
            this.openSignInModal();
          }
        });
      }
    }
    else {
      this.step--;
    }
  }

  addPatientformGroup() {
    this.addPatientform = this.formBuilder.group({
      firstNameFormControl: ['', Validators.required],
      lastNameFormControl: ['', Validators.required],
      mobileNumberFormControl: ['', [Validators.required, Validators.pattern(Constants.mobileNumberPattern)]],
      EmailFormControl: ['', [Validators.required, Validators.pattern(Constants.emailPattern)]],
      isTeleMeetingFormControl: []
    });
  }

  openSignInModal() {
    const dialogRef = this.dialog.open(UserLoginComponent, {
      panelClass: 'register-modal',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.status === 2) {

      }
    })
  }


}
