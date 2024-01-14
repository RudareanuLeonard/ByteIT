import {Component, ElementRef, ViewChild} from '@angular/core';
import {zoomInUpOnEnterAnimation} from "angular-animations";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {AlertType} from "../enums/alert-type";
import {AlertService} from "../services/alert.service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations:[
    zoomInUpOnEnterAnimation({duration: 1500})
  ]
})
export class NavBarComponent {
  @ViewChild('toggleButton') toggleButton?: ElementRef;
  @ViewChild('menu') menu?: ElementRef;

  isMenuOpen = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
  ) {

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  openDropDownMenu(){
    // @ts-ignore
    const dropDownMenu:Element = document.querySelector('.dropdown_menu');
    dropDownMenu.classList.toggle('open')
    this.isMenuOpen = dropDownMenu.classList.contains('open');

    // @ts-ignore
    const toggleBtnIcon:Element = document.querySelector('.toggle_btn i');
    toggleBtnIcon.className = this.isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'

    // this.renderer.listen(dropDownMenu, 'click',(event)=> {
    //   // @ts-ignore
    //   if (dropDownMenu.classList.contains('open')) {
    //     dropDownMenu.classList.toggle('open')
    //   }
    //   else if(!dropDownMenu.classList.contains('open') && event.target.classList.contains('toggle_btn')){
    //     dropDownMenu.classList.toggle('open')
    //   }
    // });
  }



  openLoginModal(){
      const loginModal = document.getElementById("loginModal");
      if(loginModal != null)
      loginModal.style.display = 'block';

  }

  openSignUpModal(){
    const signupModal = document.getElementById("signupModal");
    console.log("open sign up button pressed");
    if(signupModal != null)
      signupModal.style.display = 'block';


    // this.dialog.open(LoginPopUpComponent);
    // alert("Open");
  }
  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  logoutUser(){
    this.authService.logout();
    this.router.navigate(['/']);
    this.showAlert(AlertType.INFO,'Logout Successful!');
  }

    closeModal(){
      const loginModal = document.getElementById("loginModal");

      if(loginModal != null)
      loginModal.style.display = 'none';

      // this.dialog.open(LoginPopUpComponent);
      // alert("Closed");
    }


  protected readonly AlertType = AlertType;
}
