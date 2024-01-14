import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../services/alert.service";
import {AlertType} from "../enums/alert-type";

@Component({
  selector: 'app-subscription-pop-up',
  templateUrl: './subscription-pop-up.component.html',
  styleUrls: ['./subscription-pop-up.component.css']
})
export class SubscriptionPopUpComponent {
  subscriptionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptionForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      subscription: ['', Validators.required],
    });
  }

  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  subscribe(){
    this.showAlert(AlertType.INFO,'Subscription Updated Successfully!');
  }


  closeModal() {
    const loginModal = document.getElementById("subscriptionModal");
    console.log("Sign up modal closed");
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
