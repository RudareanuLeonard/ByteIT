import { Injectable } from '@angular/core';
import { Course } from '../entities/course'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  coursesList:Course[]=[
    {id:1, title: "Beginner Course 1", category:"Beginner Courses", description:"Description for B Courses 1", image:''},
    {id:2, title: "Beginner Course 2", category:"Beginner Courses", description:"Description for B Courses 2", image:''},
    {id:3, title: "Beginner Course 3", category:"Beginner Courses", description:"Description for B Courses 3", image:''},
    {id:4, title: "Beginner Course 4", category:"Beginner Courses", description:"Description for B Courses 4", image:''},
    {id:5, title: "Introduction Course 1", category:"Introduction", description:"Description for I Courses 1", image:''},
    {id:6, title: "Introduction Course 2", category:"Introduction", description:"Description for I Courses 1", image:''},
    {id:7, title: "Introduction Course 3", category:"Introduction", description:"Description for I Courses 1", image:''},
    {id:8, title: "Intermediate Course 1", category:"Intermediate Courses", description:"Description for Inter Courses 1", image:''},
    {id:9, title: "Intermediate Course 2", category:"Intermediate Courses", description:"Description for Inter Courses 2", image:''},
    {id:10, title: "Intermediate Course 3", category:"Intermediate Courses", description:"Description for Inter Courses 3", image:''},
    {id:11, title: "Intermediate Course 4", category:"Intermediate Courses", description:"Description for Inter Courses 4", image:''},
    {id:12, title: "Intermediate Course 5", category:"Intermediate Courses", description:"Description for Inter Courses 5", image:''},



  ]
}
