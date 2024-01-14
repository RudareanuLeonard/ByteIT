import { Component } from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";

export interface TableHeaders {
  position: number;
  photo:string;
  name: string;
  level: string;
  problemsSolved: number;
}
const TABLE_DATA: TableHeaders[] = [
  {position: 1, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'vasile', level: "BEGINNER", problemsSolved: 33},
  {position: 2, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'ion', level: "BEGINNER", problemsSolved: 31},
  {position: 3, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'john_doe', level: "BEGINNER", problemsSolved: 29},
  {position: 4, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'gigi', level: "BEGINNER", problemsSolved: 24},
  {position: 5, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'ionela', level: "BEGINNER", problemsSolved: 21},
  {position: 6, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'marcel', level: "BEGINNER", problemsSolved: 13},
  {position: 7, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'viorel', level:"BEGINNER", problemsSolved: 9},
  {position: 8, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'petru', level: "BEGINNER", problemsSolved: 6},
  {position: 9, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'maria', level: "BEGINNER", problemsSolved: 4},
  {position: 10, photo:"https://robohash.org/hehehe?bgset=bg1", name: 'florin', level: "BEGINNER", problemsSolved: 3},
];
@Component({
  selector: 'app-leaderboard',
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  displayedColumns: string[] = ['position', 'photo', 'name', 'level', 'problemsSolved'];
  dataSource = TABLE_DATA;
}
