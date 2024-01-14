import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../services/alert.service";
import {AlertType} from "../enums/alert-type";

@Component({
  selector: 'app-edit-profile-pop-up',
  templateUrl: './edit-profile-pop-up.component.html',
  styleUrls: ['./edit-profile-pop-up.component.css'],
})
export class EditProfilePopUpComponent {
  editProfileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
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

  editProfile(){
    this.showAlert(AlertType.INFO,'Profile Updated Successfully!');
  }


  closeModal() {
    const loginModal = document.getElementById("editProfileModal");
    console.log("Sign up modal closed");
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
