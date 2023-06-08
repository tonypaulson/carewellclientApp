import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication-service.service';

@Component({
  selector: 'app-session-main',
  templateUrl: './session-main.component.html',
  styleUrls: ['./session-main.component.css']
})
export class SessionMainComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
