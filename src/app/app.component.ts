import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { User } from './core/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/services/authentication-service.service';
import { Role } from './core/enums/role.enum';
import { ScriptService } from './core/services/script.service';
declare function addContentSideBar();


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Carewell_client_app';
  currentUser: User;


  constructor(private loaderService: LoaderService,
    private _scriptService: ScriptService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit(): void {
 
  }
}
