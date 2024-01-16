import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../services/alert.service";
import {AlertType} from "../enums/alert-type";
import {AuthenticationService} from "../services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscription-pop-up',
  templateUrl: './subscription-pop-up.component.html',
  styleUrls: ['./subscription-pop-up.component.css']
})
export class SubscriptionPopUpComponent {
  subscriptionForm!: FormGroup;

  loggedUser : any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private http:HttpClient,
    private router: Router
  ) {
  }



  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser;

    this.subscriptionForm = this.formBuilder.group({
      username: [this.loggedUser.username, Validators.required],
      email: [this.loggedUser.email, Validators.required],
      name: [this.loggedUser.fullname, Validators.required],
      subscription: [this.loggedUser.subscription, Validators.required],
    });

    console.log(this.loggedUser);

  }

  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  subscribe(){
    const url = "http://localhost/backend/subscription.php?";
    var data = this.subscriptionForm.value;
    this.http.post(url, data, {responseType: 'text'}).subscribe(
      (response) => {
        console.log('Response:', response);
        this.closeModal();

        if(response.includes("failed")){
          this.showAlert(AlertType.ERROR,'Subscription Update FAILED! Please try again!');
        }
        else{
          this.showAlert(AlertType.INFO,'Subscription Updated Successfully!');

        this.authService.loggedUser.subscription = this.subscriptionForm.value.subscription;
        localStorage.setItem("loggedUser", JSON.stringify(this.authService.loggedUser));
      }
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });

      },
      (error)=>{
        console.error("ERROR! EDIT FAILED!", error);
        this.showAlert(AlertType.ERROR,'Subscription Update FAILED! Please try again!');
      },

    )
  }


  closeModal() {
    const loginModal = document.getElementById("subscriptionModal");
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
