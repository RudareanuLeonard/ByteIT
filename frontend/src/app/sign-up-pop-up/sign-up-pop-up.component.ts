import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development'; 


@Component({
  selector: 'app-sign-up-pop-up',
  templateUrl: './sign-up-pop-up.component.html',
  styleUrls: ['./sign-up-pop-up.component.css']
})
export class SignUpPopUpComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private http:HttpClient
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required]
    });
  }



  closeModal() {
    const loginModal = document.getElementById("signupModal");
    console.log("close sign up button pressed");
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }


  signupUser(){
    console.log(this.signupForm.value);

    console.log("YOOOO");

    // var formData = new FormData();

    // formData.append('username', this.signupForm.value.username);
    // formData.append('email', this.signupForm.value.email);
    // formData.append('name', this.signupForm.value.name);
    // formData.append('password', this.signupForm.value.password);

    const url = "http://localhost/backend/register.php";
    var data = this.signupForm.value;
    this.http.post(url, data, {responseType: 'text'}).subscribe(
      (response) => {console.log('Response:', response)},
      (error)=>{console.error("ERROR! SIGNUP FAILED!", error);},

    )



  }



  // signupUser(){
  //   alert("FORM SUBMITTED!");
    
  //   if(this.signupForm.valid){
  //     var url = "http://localhost/backend/register.php"; //need to change it to auto get the url, not hardcode it...
  //     this.http.post(url, this.signupForm.value).subscribe(
  //       response =>{console.log("Sign Up completed! Inserted");},
  //       error => {console.error("Sign Up Failed! Not inserted!", error);}
  //     )

      
  //   }
  // }

  // signupUser(){
  //   alert("FORM SUBMITTED");
  // }

}
