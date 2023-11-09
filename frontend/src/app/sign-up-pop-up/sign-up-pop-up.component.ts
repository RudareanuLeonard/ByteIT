import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-pop-up',
  templateUrl: './sign-up-pop-up.component.html',
  styleUrls: ['./sign-up-pop-up.component.css']
})
export class SignUpPopUpComponent {

  closeModal() {
    const loginModal = document.getElementById("signupModal");
    console.log("close sign up button pressed");
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }

}
