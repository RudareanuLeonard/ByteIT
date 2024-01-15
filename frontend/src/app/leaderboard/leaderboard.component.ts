import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../entities/user";
import {Observable} from "rxjs";

export interface TableHeaders {
  name: string;
  level: string;
  exercisesSolved: number;
}
const TABLE_DATA: TableHeaders[] = [
  {name: 'vasile', level: "BEGINNER", exercisesSolved: 33},
  {name: 'ion', level: "BEGINNER", exercisesSolved: 31},
  {name: 'john_doe', level: "BEGINNER", exercisesSolved: 29},
  {name: 'gigi', level: "BEGINNER", exercisesSolved: 24},
  {name: 'ionela', level: "BEGINNER", exercisesSolved: 21},
  {name: 'marcel', level: "BEGINNER", exercisesSolved: 13},
  {name: 'viorel', level:"BEGINNER", exercisesSolved: 9},
  {name: 'petru', level: "BEGINNER", exercisesSolved: 6},
  {name: 'maria', level: "BEGINNER", exercisesSolved: 4},
  {name: 'florin', level: "BEGINNER", exercisesSolved: 3},
];
@Component({
  selector: 'app-leaderboard',
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit{
  displayedColumns: string[] = ['position', 'photo', 'name', 'level', 'exercisesSolved'];
  dataSource = TABLE_DATA

  allUsers$: Observable<User[]> | undefined;

  users:User[] = [];

  constructor(
    private authService: AuthenticationService
  ) {}


  ngOnInit(): void {
    this.allUsers$ = this.authService.getAllUsers()

    const observable$ = this.authService.getAllUsers()
    observable$.subscribe(users => {
      this.users = users.data;
      console.log(this.users);
    })

  }
}
