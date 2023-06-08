import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalWindowData } from 'src/app/models/modal-window-data.model';
import { Utility } from 'src/app/core/helpers/utilities';
import { ModalWindowAction } from 'src/app/enums/modal-window-action.enum';

@Component({
  selector: 'app-carewellconfirmation',
  templateUrl: './carewellconfirmation.component.html',
  styleUrls: ['./carewellconfirmation.component.css']
})
export class CarewellconfirmationComponent implements OnInit {
  modalHeading: string;
  modalBody: string;

  constructor(public dialogRef: MatDialogRef<CarewellconfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalWindowData) { }

  ngOnInit(): void {

    if (Utility.isValidInstance(this.data)) {
      this.modalHeading = Utility.isValidInstance(this.data.heading) ? this.data.heading
        : (this.data.action === ModalWindowAction.Warning ? 'Warning' : 'Confirmation');
      this.modalBody = this.data.message;
    }
  }

  CloseDialog() {
    this.dialogRef.close(false);
  }

  OnYesClicked() {
    this.dialogRef.close(true);
  }

}
