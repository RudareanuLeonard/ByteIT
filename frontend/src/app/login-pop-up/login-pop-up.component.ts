import {Component, OnInit} from '@angular/core';
import { zoomInUpOnEnterAnimation } from 'angular-animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.css'],
  animations: [
    zoomInUpOnEnterAnimation({ duration: 1500 })
  ]
})
export class LoginPopUpComponent implements OnInit {
  loginForm!: FormGroup;

  animationState: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.animate();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 100);
  }

  loginUser(){
    const username = this.loginForm.get('username')?.value;
    this.authService.authenticateUser(username);
    this.closeModal();
    window.location.reload();
  }

  closeModal() {
    const loginModal = document.getElementById("loginModal");
    this.animate();
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
