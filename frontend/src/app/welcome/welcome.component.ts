import { Component } from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-welcome',
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  animationState:boolean = false;

  constructor() {
    this.animate();
  }
  animate(){
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 100);
  }
}
