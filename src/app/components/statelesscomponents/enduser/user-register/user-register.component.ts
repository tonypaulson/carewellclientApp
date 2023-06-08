import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarewellToastrNotificationService } from 'src/app/core/services/toastr-snackbar.service';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { Utility } from 'src/app/core/helpers/utilities';
import { RoutePath } from 'src/app/core/config/rout-path';
import { PatientService } from 'src/app/services/patient.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ResponseStatus } from 'src/app/enums/response-status.enum';
import { Response } from 'src/app/core/contracts/Response';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  step: number = 1;
  userRegisterForm: FormGroup;
  patient: Patient;
  showLoading: boolean;
  addPatientSubscription: ISubscription;

  constructor(public dialogRef: MatDialogRef<UserRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _CarewellToastrNotificationService: CarewellToastrNotificationService,
    private datePipe: DatePipe,
    private environmentService: AppConfigService,
    private patientService: PatientService,
    private loaderService: LoaderService) { 
      this.patient = new Patient();
    }

  ngOnInit(): void {
  }

  createAddPatientForm() {
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this.userRegisterForm = this.formBuilder.group({
      firstNameFormControl: ['', Validators.required],
      lastNameFormControl: ['', Validators.required],
      mobileNumberFormControl: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      EmailFormControl: ['', [Validators.required, Validators.pattern(emailPattern)]],
      birthDayFormControl: [''],
      genderFormControl: [''],
      patientNoteFormControl: [''],
      addressFormControl: [''],
      cityFormControl: [''],
      stateFormControl: [''],
      zipFormControl: [''],
      enableUserLoginFormControl: ['']
    });
  }

  onSubmit() {
    if (!this.userRegisterForm.invalid) {
      if (Utility.isValidInstance(this.patient.selected_gender)) {
        this.patient.user.gender = +this.patient.selected_gender;
      } else {
        this.patient.user.gender = 0;
      }
      this.patient.user.userRoleCode = "PATIENT";
      this.patient.user.userLoginEnabled = true;
      this.patient.user.resetPasswordLink = this.GetUserActivtionUrl();

      this.showLoader();
      this.addPatientSubscription = this.patientService.addPatient(this.patient).subscribe(
        response => {
          this.addPatient_OnSuccess(response);
        },
        error => {
          this.hideLoader();
          this._CarewellToastrNotificationService.showErrorNotification(error.error.message);
        });
    }
  }

  CloseSignUpDialog(): void {
    this.dialogRef.close();
  }

  addPatient_OnSuccess(response: Response) {
    this.hideLoader();
    if (response.status === ResponseStatus.Success) {
      this._CarewellToastrNotificationService.showSuccessNotification(response.message);
      this.dialogRef.close({ data: response.data, status: 1 });
    } else {
      if (response.status === ResponseStatus.Error) {
        this._CarewellToastrNotificationService.showErrorNotification(response.message);
      }
    }
  }


  GetUserActivtionUrl(): string {
    return this.environmentService.environment.baseurl + '/' + RoutePath.PasswordSettings
  }



  signUpEmail() {
    this.step = 2;
  }

  cancelSignup() {
    this.step = 1;
  }

  onClickBack() {

    if (this.step === 1) {
      this.CloseSignUpDialog();
    }
    this.step--;
  }

  signInOptions() {
    this.dialogRef.close({ status: 2 });
  }

  private showLoader(): void {
    this.userRegisterForm.disable();
    this.showLoading = true;
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.userRegisterForm.enable();
    this.showLoading = false;
    this.loaderService.hide();
  }

}
