import {Component, OnInit} from '@angular/core';
import { zoomInUpOnEnterAnimation } from 'angular-animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {AlertType} from "../enums/alert-type";
import {AlertService} from "../services/alert.service";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

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
    private http:HttpClient,
    private router: Router
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

  var data = this.loginForm.value;
  console.log(data);
  const url = "http://localhost/backend/login.php";

  interface MyResponse {
    success: number;
  }


  this.http.post<MyResponse>(url, data, {responseType: "json"}).subscribe(
    (response) => {
      //console.log("TS Response = ", response["success"]);

      if(response["success"] == 0){
        // console.log("RESPONSE = 0");
        this.showAlert(AlertType.ERROR,'Username or password is incorrect!');
      }
      else{
        var username = data["username"];
        const observable$ = this.authService.authenticateUser(username);
        observable$.subscribe(loggedUser => {
          this.authService.loggedUser = loggedUser.data[0]
          console.log(this.authService.loggedUser);
          localStorage.setItem("loggedUser", JSON.stringify(this.authService.loggedUser));
        })



        this.closeModal();
        this.showAlert(AlertType.SUCCESS,'Login Successful!');
        setTimeout(() => {
          window.location.reload();

        }, 1500);
        // Reload the page after showing the notification
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      }


    },
    (error) => {
      console.log("TS Error =", error);
      this.showAlert(AlertType.ERROR,'Login Failed!');
    }
  );
}








































  // loginUser(){
  //   const url = "http://localhost/backend/login.php";
  //   var data = this.loginForm.value;
  //   console.log("DATA = " , data);

    // interface MyResponse {
    //   success: number;
    // }


  //   return new Promise((resolve, reject) => {
  //     this.http.post<MyResponse>(url, data, { responseType: 'json' }).subscribe(
  //       (response) => {
  //         console.log("RESPONE =", response);
          // const username = this.loginForm.get('username')?.value;
          // this.authService.authenticateUser(username);
  //         this.closeModal();
  //         this.showAlert(AlertType.SUCCESS,'Login Successful!');
  //         setTimeout(() => {
  //           // Reload the page after showing the notification
  //           window.location.reload();
  //         }, 1500);
  //       },
  //       (error) => {
  //         console.error(error);
  //         reject(0);
  //       }
  //     );
  //   });

  // }



  // async loginUser(){

  //   const result = await this.checkIfLogInSuccessful();


  //   if(result === 1){
  //     console.log("THIS SHOULD LOG ME IN");
  //     const username = this.loginForm.get('username')?.value;
  //     this.authService.authenticateUser(username);
  //     this.closeModal();
  //     this.showAlert(AlertType.SUCCESS,'Login Successful!');
  //     setTimeout(() => {
  //       // Reload the page after showing the notification
  //       window.location.reload();
  //     }, 1500);
  //   }
  //   else{
  //     console.log("login not working")
  //   }



    // this.router.navigate(['/']);


    // const url = "http://localhost/backend/login.php";
    // var data = this.loginForm.value;
    // console.log("DATA = " , data);

    // interface MyResponse {
    //   success: number; // or boolean, depending on your API response
    //   // other properties...
    // }


    // this.http.post<MyResponse>(url, data, {responseType: 'json'}).subscribe(
    //   (response) => {
    //     if(response.success === 1){
    //       const username = this.loginForm.get('username')?.value;
    //       this.authService.authenticateUser(username);
    //       this.closeModal();
    //       this.showAlert(AlertType.SUCCESS,'Login Successful!');
    //       setTimeout(() => {
    //         // Reload the page after showing the notification
    //         window.location.reload();
    //       }, 1500);
    //     }
    //     console.log('Response:', response.success);
    //     this.closeModal();
    //   },
    //   (error)=>{console.error("ERROR! LOGIN FAILED!", error);},

    // )

  //}

  closeModal() {
    const loginModal = document.getElementById("loginModal");
    this.animate();
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
