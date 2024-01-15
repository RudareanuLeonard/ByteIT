import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Course} from "../entities/course";


@Injectable({
  providedIn: 'root'
})
export class CoursesService{

  // @ts-ignore
  private _coursesList:any = JSON.parse(localStorage.getItem("coursesList"));

  constructor(
    private http:HttpClient
  ) {}

  get coursesList(): Course[] {
    return this._coursesList;

  }

  set coursesList(value: Course[]) {
    this._coursesList = value;
  }

  getCourses(){
    const url = "http://localhost/backend/courses.php";

    return this.http.get<any>(url);
  }

  getAllCourses(){
    const observable$ = this.getCourses();
    observable$.subscribe(courses => {
      this.coursesList = courses.data;
    })
  }

}


