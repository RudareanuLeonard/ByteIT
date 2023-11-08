import {Component} from '@angular/core';
import {zoomInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations:[
    zoomInUpOnEnterAnimation({duration: 1500})
  ]
})
export class NavBarComponent {

  openDropDownMenu(){
    // @ts-ignore
    const dropDownMenu:Element = document.querySelector('.dropdown_menu');
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open');

    // @ts-ignore
    const toggleBtnIcon:Element = document.querySelector('.toggle_btn i');
    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
  }


  // animationState:boolean = false;

  // animate(){
  //   this.animationState = false;
  //   setTimeout(() => {
  //     this.animationState = true;
  //   }, 100);
  // }

    openModal(){
      const loginModal = document.getElementById("loginModal");
      if(loginModal != null)
      loginModal.style.display = 'block';


      // this.dialog.open(LoginPopUpComponent);
      // alert("Open");
    }

    closeModal(){
      const loginModal = document.getElementById("loginModal");

      if(loginModal != null)
      loginModal.style.display = 'none';

      // this.dialog.open(LoginPopUpComponent);
      // alert("Closed");
    }



}
