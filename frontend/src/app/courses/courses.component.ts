import { Component } from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course} from "../entities/course";
import {slideInUpOnEnterAnimation} from "angular-animations";


@Component({
  selector: 'app-courses',
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  categoryList = ["Introduction", "Beginner Courses", "Intermediate Courses"]
  currentValue = 0;
  animationState:boolean = false;

  allCoursesList: Course[] = [];
  coursesList: Course[] = [];

  constructor(private coursesServices: CoursesService) {
    this.allCoursesList = coursesServices.coursesList;
    this.coursesList = this.allCoursesList.filter((obj) =>{
      return obj.category == this.categoryList[this.currentValue];
    })
    this.animate();
  }

  animate(){
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 100);
  }

  right() {
    if (this.currentValue < this.categoryList.length - 1) {
      this.currentValue++;
      this.animate();
      this.coursesList = this.allCoursesList.filter((obj) =>{
        return obj.category == this.categoryList[this.currentValue];

      })
    }
  }

  left() {
    if (this.currentValue > 0) {
      this.currentValue--;
      this.animate();
      this.coursesList = this.allCoursesList.filter((obj) =>{
        return obj.category == this.categoryList[this.currentValue];
      })
    }
  }

}

