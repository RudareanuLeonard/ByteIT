import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit{

  public courseTitle:any;
  constructor(private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(){
    this.courseTitle = this.activatedRoute.snapshot.paramMap.get('title');
  }

}
