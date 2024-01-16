import {Component, OnInit} from '@angular/core';
import {CoursesService} from "./services/courses.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TW-Frontend';

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  constructor(
    private coursesServices: CoursesService
  ) {

  }


  ngOnInit(): void {
    if (this.currentTheme) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    const observable$ = this.coursesServices.getCourses();
    observable$.subscribe(courses => {
      this.coursesServices.coursesList = courses.data;
    })

  }






}
