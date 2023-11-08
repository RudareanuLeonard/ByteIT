import { Component } from '@angular/core';
import { zoomInUpOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.css'],
  animations: [
    zoomInUpOnEnterAnimation({ duration: 1500 })
  ]
})
export class LoginPopUpComponent {
  animationState: boolean = false;

  constructor() {
    this.animate();
  }


  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 100);
  }


  closeModal() {
    const loginModal = document.getElementById("loginModal");
    this.animate();
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
