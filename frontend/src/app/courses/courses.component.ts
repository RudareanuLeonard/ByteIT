import { Component } from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course} from "../entities/course";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  categoryList = ["Introduction", "Beginner Courses", "Intermediate Courses"]
  currentValue = 0;

  allCoursesList: Course[] = [];
  coursesList: Course[] = [];

  constructor(private coursesServices: CoursesService) {
    this.allCoursesList = coursesServices.coursesList;
    this.coursesList = this.allCoursesList.filter((obj) =>{
      return obj.category == this.categoryList[this.currentValue];
    })
  }

  right() {
    if (this.currentValue < this.categoryList.length - 1) {
      this.currentValue++;
      this.coursesList = this.allCoursesList.filter((obj) =>{
        return obj.category == this.categoryList[this.currentValue];
      })
    }
  }

  left() {
    if (this.currentValue > 0) {
      this.currentValue--;
      this.coursesList = this.allCoursesList.filter((obj) =>{
        return obj.category == this.categoryList[this.currentValue];
      })
    }
  }
}
