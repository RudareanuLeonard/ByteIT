import {Component, Input} from '@angular/core';
import {Course} from "../../entities/course";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-box',
  templateUrl: './course-box.component.html',
  styleUrls: ['./course-box.component.css']
})
export class CourseBoxComponent {
  @Input() course!:Course;

  constructor(private router: Router) {

  }
  openCourse(course:Course){
    this.router.navigate(['/courses',course.title]);
  }
}
