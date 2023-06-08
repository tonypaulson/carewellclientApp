import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarewellToastrNotificationService } from 'src/app/core/services/toastr-snackbar.service';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AuthenticationService } from 'src/app/core/services/authentication-service.service';
import { Utility } from 'src/app/core/helpers/utilities';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup;
  loginType: number;
  showLoginSelector: boolean = true;
  userName: string;
  password: string;
  showLoading: boolean;


  constructor(
    public dialogRef: MatDialogRef<UserLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _CarewellToastrNotificationService: CarewellToastrNotificationService,
    private environmentService: AppConfigService,
    private loaderService: LoaderService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this.userLoginForm = this.formBuilder.group({
      userNameFormControl: ['', [Validators.required, Validators.pattern(emailPattern)]],
      passwordFormControl: ['', [Validators.required]]
    });
  }

  cancelLogin() {

  }

  setLoginType(type: number) {
    this.loginType = type;
    this.showLoginSelector = false;
  }

  loginWithEmail() {
    if (!this.userLoginForm.invalid) {
      this.showLoader();
      this.authService.login(this.userName, this.password).subscribe(res => {
        console.log(res);
        this.onSuccessLogin(res)
      }, error => {
        this.hideLoader();
        this._CarewellToastrNotificationService.showErrorNotification(error.error.message);
      });
    }
  }

  onSuccessLogin(response) {
    this.hideLoader();
    if (Utility.isValidInstance(response)) {
      //this._CWLToastrNotificationService.showSuccessNotification(response.message);
      this.dialogRef.close({ status: 1 });
    }
  }

  private showLoader(): void {
    this.userLoginForm.disable();
    this.showLoading = true;
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.userLoginForm.enable();
    this.showLoading = false;
    this.loaderService.hide();
  }

}
