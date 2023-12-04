import {Component, Input} from '@angular/core';
import {Course} from "../../entities/course";

@Component({
  selector: 'app-course-box',
  templateUrl: './course-box.component.html',
  styleUrls: ['./course-box.component.css']
})
export class CourseBoxComponent {
  @Input() course!:Course;


}
