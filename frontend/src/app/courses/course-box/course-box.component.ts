import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-course-box',
  templateUrl: './course-box.component.html',
  styleUrls: ['./course-box.component.css']
})
export class CourseBoxComponent {
  @Input() title = '';
  @Input() image = '';
  @Input() description = '';
}
