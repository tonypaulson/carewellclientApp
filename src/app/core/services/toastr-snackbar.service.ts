import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastrSnackbarComponent } from "src/app/components/core/toastr-snackbar/toastr-snackbar.component";
import { config } from 'rxjs';
import { Utility } from '../helpers/utilities';
import { SnackBarStatus } from 'src/app/enums/toastr-snackbar-status.enum';

@Injectable()
export class CarewellToastrNotificationService {
    snackBarStatus: SnackBarStatus;
    constructor(private _snackBar: MatSnackBar) {

    }


    showSuccessNotification(snackbarContent: string, config?: MatSnackBarConfig) {
        config = this.getConfig(config);
        config.panelClass = 'style-success';
        let snackBarRef = this._snackBar.openFromComponent(ToastrSnackbarComponent, config);
        snackBarRef.instance.content = snackbarContent;
        snackBarRef.instance.snackbarStatus = 0;
        snackBarRef.onAction().subscribe(() => {
            // console.log('Action clicked!');
        });
    }

    showErrorNotification(snackbarContent: string, config?: MatSnackBarConfig) {
        config = this.getConfig(config);
        config.panelClass = 'style-error';
        let snackBarRef = this._snackBar.openFromComponent(ToastrSnackbarComponent, config);
        snackBarRef.instance.content = snackbarContent;
        snackBarRef.instance.snackbarStatus = 1;
        snackBarRef.onAction().subscribe(() => {
            // console.log('Action clicked!');
        });
    }

    getConfig(config: MatSnackBarConfig) {
        if (config === undefined) {
            config = new MatSnackBarConfig();
            config.duration = 5000;
            config.verticalPosition = 'top'
            config.horizontalPosition = 'center'
        } else if (Utility.isValidInstance(config)) {
            if (config.duration === undefined || config.duration === null || config.duration === 0) {
                config.duration = 1000;
            }

            if (config.verticalPosition === undefined || config.verticalPosition === null) {
                config.verticalPosition = 'top';
            }

            if (config.horizontalPosition === undefined || config.horizontalPosition === null) {
                config.horizontalPosition = 'center';
            }
        }

        return config;
    }
}
