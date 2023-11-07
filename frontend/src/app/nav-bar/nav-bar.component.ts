import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopUpComponent } from '../login-pop-up/login-pop-up.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
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
      alert("Closed");
    }

    

}
