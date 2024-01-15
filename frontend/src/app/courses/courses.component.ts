import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course} from "../entities/course";
import {slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation} from "angular-animations";
import {Router} from "@angular/router";
import {Levels} from "../enums/levels";


@Component({
  selector: 'app-courses',
  animations:[
    slideInUpOnEnterAnimation({duration:300, delay:300}),
    slideOutDownOnLeaveAnimation({duration:300})

  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{
  categoryList = ["Introduction Courses", "Beginner Courses", "Intermediate Courses", "Advanced Courses"]
  currentValue = 0;
  animationState:boolean = false;

  coursesList: Course[] = [];

  constructor(private coursesServices: CoursesService, private router: Router) {
    this.animate();

  }

  number(level:Levels){
    let nr;
    if(level == "introduction")
    {
      nr = 0;
    }
    else if(level == "beginner"){
      nr = 1;
    }
    else if(level == "intermediate"){
      nr = 2;
    }
    else if(level == "advanced"){
      nr = 3;
    }
    else{
      nr = 0;
    }
    return nr == this.currentValue;
  }
  ngOnInit(): void {

    this.coursesServices.getAllCourses();
    localStorage.setItem("coursesList", JSON.stringify(this.coursesServices.coursesList));

    this.coursesList = this.coursesServices.coursesList.filter((obj) =>{
      return this.number(obj.level);

    })

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
      this.coursesList = this.coursesServices.coursesList.filter((obj) =>{
        return this.number(obj.level);

      })
    }
  }

  left() {
    if (this.currentValue > 0) {
      this.currentValue--;
      this.animate();
      this.coursesList = this.coursesServices.coursesList.filter((obj) =>{
        return this.number(obj.level);
      })
    }
  }

  openCourse(course:Course){
    this.router.navigate(['/courses',course.name]);
  }


}

