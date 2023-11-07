import { Component } from '@angular/core';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.css']
})
export class LoginPopUpComponent {


  closeModal(){
    const loginModal = document.getElementById("loginModal");

    if(loginModal != null)
    loginModal.style.display = 'none';

    // this.dialog.open(LoginPopUpComponent);
  }
}
