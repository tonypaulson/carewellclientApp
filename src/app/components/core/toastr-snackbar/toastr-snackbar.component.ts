import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/enums/toastr-snackbar-status.enum';

@Component({
  selector: 'app-toastr-snackbar',
  templateUrl: './toastr-snackbar.component.html',
  styleUrls: ['./toastr-snackbar.component.css']
})
export class ToastrSnackbarComponent implements OnInit {

  constructor(private snackBarRef: MatSnackBarRef<ToastrSnackbarComponent>) { }
  content: any;
  snackBarAction: string;
  snackbarStatus: SnackBarStatus;

  ngOnInit(): void {
  }

}
