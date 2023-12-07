import {Component, OnInit} from '@angular/core';
import { zoomInUpOnEnterAnimation } from 'angular-animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {AlertType} from "../enums/alert-type";
import {AlertService} from "../services/alert.service";
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
    private authService: AuthenticationService,
    private alertService: AlertService,
  ) {
    this.animate();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
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
    this.showAlert(AlertType.SUCCESS,'Login Successful!');
    setTimeout(() => {
      // Reload the page after showing the notification
      window.location.reload();
    }, 1500);
    // this.router.navigate(['/']);


  }

  closeModal() {
    const loginModal = document.getElementById("loginModal");
    this.animate();
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
