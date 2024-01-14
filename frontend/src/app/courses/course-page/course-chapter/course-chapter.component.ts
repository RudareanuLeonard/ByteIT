import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

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


  toggle(){
    this.showContent = !this.showContent;
  }
}
