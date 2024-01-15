import {Levels} from "../enums/levels";

export interface Course {
  id: number
  name: string
  level:Levels
  image: string
  description: string
}
