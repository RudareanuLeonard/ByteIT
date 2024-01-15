import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {ExercisesService} from "../services/exercises.service";
import {Exercise} from "../entities/exercise";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
})
export class ExercisesComponent implements OnInit{

  exercisesList:Exercise[] = [];
  constructor(
    private exercisesService:ExercisesService,
  ) {
  }


  ngOnInit(){
    const observable$ = this.exercisesService.getExercises()
    observable$.subscribe(exercises => {
      this.exercisesList = exercises.data;
      console.log(this.exercisesList);
    })

  }
}

