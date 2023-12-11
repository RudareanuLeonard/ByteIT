import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import { HttpClient } from '@angular/common/http';
import {AlertType} from "../enums/alert-type";
import {AlertService} from "../services/alert.service";


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
    private http:HttpClient,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
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
    const url = "http://localhost/backend/register.php";
    var data = this.signupForm.value;
    this.http.post(url, data, {responseType: 'text'}).subscribe(
      (response) => {
        console.log('Response:', response);
        this.closeModal();
        this.showAlert(AlertType.SUCCESS,'Account created successfully!');
      },
      (error)=>{
        console.error("ERROR! SIGNUP FAILED!", error);
        this.showAlert(AlertType.ERROR,'Signup failed! Please try again.');
        },

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
