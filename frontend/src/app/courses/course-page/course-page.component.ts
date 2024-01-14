import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {slideInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:650})

  ],
})
export class CoursePageComponent implements OnInit{

  public courseTitle:any;
  content01:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed dolor id augue molestie bibendum id pharetra nisi. Cras quis eros ut leo euismod blandit. Mauris fermentum dolor ac diam tempor, a gravida purus lacinia. Nam non eleifend justo. Proin elementum interdum nisi, quis elementum magna blandit condimentum. Aliquam vitae nisi mauris. Etiam scelerisque blandit massa eget congue. Nullam luctus iaculis nunc, aliquet egestas enim porta quis. Morbi sed lectus quis purus tempor placerat. Ut tortor lectus, faucibus nec porta consequat, sodales vel metus. Praesent maximus molestie odio, eu consequat lorem posuere id. Fusce in pellentesque libero. Suspendisse vitae tempus est, sit amet sodales sapien. In ut dui a nisi pretium varius.\n";
  content02:string = "Etiam sed nisl urna. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse viverra, risus id tristique ultrices, libero felis eleifend lacus, id finibus risus metus sit amet eros. Praesent sed semper augue. Vivamus gravida nulla ut scelerisque tristique. Donec aliquet non dolor ut rhoncus. Suspendisse vel volutpat nisi. Pellentesque erat arcu, bibendum et dignissim ac, tempus id metus. Aliquam erat volutpat";
  content03:string = "Integer lacinia varius posuere. Maecenas scelerisque vitae justo eu consequat. Nulla pretium urna eget urna pellentesque aliquam. Suspendisse scelerisque, magna et varius tincidunt, urna urna iaculis libero, semper faucibus tortor orci vitae sapien. Donec mattis est eget tortor eleifend, ac sagittis diam efficitur. Quisque felis augue, euismod et semper volutpat, varius a libero. Nam hendrerit, dui id fringilla tempor, odio libero dignissim metus, pretium faucibus urna elit tincidunt orci. Pellentesque imperdiet tellus ut commodo elementum. Cras id pharetra quam, non efficitur eros. Morbi a finibus nunc. Nulla varius risus eget erat sollicitudin placerat. Sed euismod gravida augue, vel tristique nibh tempor at. Ut pretium nec magna id venenatis.";
  constructor(private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(){
    this.courseTitle = this.activatedRoute.snapshot.paramMap.get('title');
  }

}
