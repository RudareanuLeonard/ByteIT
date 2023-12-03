import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {AuthenticationService} from "../services/authentication.service";
import {Subscriptions} from "../enums/subscriptions";
import {Levels} from "../enums/levels";
import {Router} from "@angular/router";

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
    private router: Router
  ) {
    this.animate();
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser
  }
  animate(){
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 100);
  }

  logoutUser(){
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  protected readonly Subscriptions = Subscriptions;
  protected readonly Levels = Levels;
}
