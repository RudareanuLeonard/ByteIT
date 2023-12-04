import {Component} from '@angular/core';
import {zoomInUpOnEnterAnimation} from "angular-animations";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations:[
    zoomInUpOnEnterAnimation({duration: 1500})
  ]
})
export class NavBarComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  openDropDownMenu(){
    // @ts-ignore
    const dropDownMenu:Element = document.querySelector('.dropdown_menu');
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open');

    // @ts-ignore
    const toggleBtnIcon:Element = document.querySelector('.toggle_btn i');
    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
  }



    openModal(){
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

  logoutUser(){
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

    closeModal(){
      const loginModal = document.getElementById("loginModal");

      if(loginModal != null)
      loginModal.style.display = 'none';

      // this.dialog.open(LoginPopUpComponent);
      // alert("Closed");
    }



}
