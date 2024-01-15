import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertType} from "../../../enums/alert-type";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-course-chapter',
  templateUrl: './course-chapter.component.html',
  styleUrls: ['./course-chapter.component.css'],
  animations:[
    trigger('smoothCollapse',[
      state('initial', style({
        height:0,
        overflow: 'hidden',
        opacity: 0,
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden',

      })),
      transition('initial <=> final', animate('250ms'))
    ]),
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(180deg)'})),
      transition('default <=> rotated', animate('300ms'))
    ])
  ]

})
export class CourseChapterComponent {
  @Input() title: string = '';
  showContent = false;
  loggedUser: any;
  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.loggedUser = this.authService.loggedUser;
  }

  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  toggle(){
    if(this.title == "Introduction")
      this.showContent = !this.showContent;
    else if(this.loggedUser.subscription != "no_subscription"){
      this.showContent = !this.showContent;
    }
    else{
      this.showAlert(AlertType.INFO,'Upgrade your subscription to access courses content!');
    }
  }
}
