import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {AuthenticationService} from "../services/authentication.service";
import {Subscriptions} from "../enums/subscriptions";
import {Levels} from "../enums/levels";
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {AlertType} from "../enums/alert-type";
import { HttpClient } from '@angular/common/http';

import { Request, Response } from 'express';
import * as mysql from 'mysql';
import { map } from 'rxjs';
import { data } from 'jquery';


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'byteit_database',
};



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

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  checkedTheme!: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private http:HttpClient,
  ) {
    this.animate();
  }





  getAll(){
    const username = this.authService.loggedUser.name;
    alert(username);
    const url = "http://localhost/backend/user-settings.php?username=" + username;
    return this.http.get(url).pipe(
      map(
        (res:any) => {
          return res['data'];
        }
      )
    );
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser

    // const url = "http://localhost/backend/user-settings.php";
    // this.http.get(url).subscribe(
    //   data => this.
    // )

    this.getAll().subscribe(
     (data: any) =>{
      // console.log("VEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      console.log(data);
      this.loggedUser = data;
  
     },
     (err) => {
      console.log(err);
     }
    )


    // const connection = mysql.createConnection(dbConfig);

    // connection.connect( (err) => {
    //   if(err){
    //     console.error('ERROR CONNECTING TO MYSQL USER SETTING TS = ', err);
    //     return;
    //   }
    //   console.log("CONNECTED TO MYSQL DB BY USING TS");
    // }

    // )


    if (this.currentTheme) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      this.checkedTheme = this.currentTheme != "dark";
    }
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


  openEditProfileModal(){
    const editProfileModal = document.getElementById("editProfileModal");
    if(editProfileModal != null)
      editProfileModal.style.display = 'block';

  }

  openSubscriptionModal(){
    const subscriptionModal = document.getElementById("subscriptionModal");
    if(subscriptionModal != null)
      subscriptionModal.style.display = 'block';

  }

  logoutUser(){
    this.authService.logout();
    this.router.navigate(['/']);
    this.showAlert(AlertType.INFO,'Logout Successful!');
  }

  // @ts-ignore
  switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); //add this
      console.log("light");
    } else {

      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); //add this
      console.log("dark");
    }
  }

  protected readonly Subscriptions = Subscriptions;
  protected readonly Levels = Levels;
}
