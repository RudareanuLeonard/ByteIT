import {Component} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course} from "../entities/course";
import {slideInUpOnEnterAnimation} from "angular-animations";
import {Router} from "@angular/router";


@Component({
  selector: 'app-courses',
  animations:[
    slideInUpOnEnterAnimation({duration:650})

  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  categoryList = ["Introduction Courses", "Beginner Courses", "Intermediate Courses", "Advanced Courses"]
  currentValue = 0;
  animationState:boolean = false;

  allCoursesList: Course[] = [];
  coursesList: Course[] = [];

  constructor(private coursesServices: CoursesService, private router: Router) {
    this.allCoursesList = coursesServices.coursesList;
    this.coursesList = this.allCoursesList.filter((obj) =>{
      return obj.level == this.currentValue;
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
        return obj.level == this.currentValue;

      })
    }
  }

  left() {
    if (this.currentValue > 0) {
      this.currentValue--;
      this.animate();
      this.coursesList = this.allCoursesList.filter((obj) =>{
        return obj.level == this.currentValue;
      })
    }
  }

  openCourse(course:Course){
    this.router.navigate(['/courses',course.title]);
  }
}

