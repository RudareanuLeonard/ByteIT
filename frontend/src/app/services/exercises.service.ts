
import { Injectable } from '@angular/core';
import {Exercise} from "../entities/exercise";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ExercisesService {


  constructor(
    private http:HttpClient
  ) { }


  exercisesList:Exercise[]=[
    {id:1, title:"Introduction: Exercise 1" , description:"Print 'Hello, World!'", solution: "Hello, World!"},
    {id:2, title:"Introduction: Exercise 2" , description:"Solve 3 + 5 and print the result.", solution: "8"},
    {id:3, title:"Introduction: Exercise 3" , description:"Create a list containing: 3, 5, 2 and 7.\n Do the sum of the numbers and print the result.", solution:"17"},
    {id:4, title:"Introduction: Exercise 4" , description:"Create a list containing: 3, 4 , 10, 7, 1. Sort the list ascending. (leave spaces between numbers)", solution:"1 3 4 7 10"},
    {id:5, title:"Introduction: Exercise 5" , description:"Create a list containing: 3, 4 , 10, 7, 1. Sort the list descending. (leave spaces between numbers)", solution: "10 7 4 3 1"},
  ]

  getExercises(){
    const url = "http://localhost/backend/exercises.php";

    return this.http.get<any>(url);
  }
}

