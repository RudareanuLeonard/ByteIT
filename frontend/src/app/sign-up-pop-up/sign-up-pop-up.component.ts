import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-sign-up-pop-up',
  templateUrl: './sign-up-pop-up.component.html',
  styleUrls: ['./sign-up-pop-up.component.css']
})
export class SignUpPopUpComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signupUser(){

  }

  closeModal() {
    const loginModal = document.getElementById("signupModal");
    console.log("close sign up button pressed");
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }

}
