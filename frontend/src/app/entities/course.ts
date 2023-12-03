import {Levels} from "../enums/levels";

export interface Course {
  id: number
  title: string
  level:Levels
  image: string
  description: string
}
