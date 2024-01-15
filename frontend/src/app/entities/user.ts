import {Subscriptions} from "../enums/subscriptions";
import {Levels} from "../enums/levels";

export interface User {
  id: number
  username:string
  fullname: string
  email: string
  subscription: Subscriptions
  level:Levels
  picture_url : string
  exercises_solved : number

}
