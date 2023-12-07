import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {AuthenticationService} from "../services/authentication.service";
import {Subscriptions} from "../enums/subscriptions";
import {Levels} from "../enums/levels";
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {AlertType} from "../enums/alert-type";

@Component({
  selector: 'app-user-settings',
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit{
  animationState:boolean = false;

  loggedUser: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.animate();
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser
  }

  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  animate(){
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 100);
  }

  logoutUser(){
    this.authService.logout();
    this.router.navigate(['/']);
    this.showAlert(AlertType.INFO,'Logout Successful!');
  }

  protected readonly Subscriptions = Subscriptions;
  protected readonly Levels = Levels;
}
