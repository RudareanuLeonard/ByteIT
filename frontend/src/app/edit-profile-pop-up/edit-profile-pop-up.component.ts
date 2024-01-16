import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../services/alert.service";
import {AlertType} from "../enums/alert-type";
import {AuthenticationService} from "../services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile-pop-up',
  templateUrl: './edit-profile-pop-up.component.html',
  styleUrls: ['./edit-profile-pop-up.component.css'],
})
export class EditProfilePopUpComponent {
  editProfileForm!: FormGroup;

  loggedUser : any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private http:HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser;

    this.editProfileForm = this.formBuilder.group({
      username: [this.loggedUser.username, Validators.required],
      password: [this.loggedUser.password, Validators.required],
      email: [this.loggedUser.email, Validators.required],
      name: [this.loggedUser.fullname, Validators.required],
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
    const url = "http://localhost/backend/edit-profile.php?";
    var data = this.editProfileForm.value;
    this.http.post(url, data, {responseType: 'text'}).subscribe(
      (response) => {
        console.log('Response:', response);
        this.closeModal();

        if(response.includes("failed")){
          this.showAlert(AlertType.ERROR,'There was an error editing your profile. Please try again!');
        }
        else{

        
          this.showAlert(AlertType.SUCCESS,'Profile Updated Successfully!');

          this.authService.loggedUser.fullname = this.editProfileForm.value.name;
          this.authService.loggedUser.email = this.editProfileForm.value.email;
          this.authService.loggedUser.password = this.editProfileForm.value.password;
          localStorage.setItem("loggedUser", JSON.stringify(this.authService.loggedUser));
        }
        const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });

      },
      (error)=>{
        console.error("ERROR! EDIT FAILED!", error);
        this.showAlert(AlertType.ERROR,'There was an error editing your profile. Please try again!  ');
      },

    )
  }


  closeModal() {
    const loginModal = document.getElementById("editProfileModal");
    if (loginModal != null) {
      loginModal.style.display = 'none';
    }
  }
}
